import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import _ from "lodash";
import isEmpty from "lodash/isEmpty";
import { updateDoc } from "firebase/firestore";
import { database } from "./database/firebaseResources";
import { getGlobalImpact } from "./common/uiSchema";
import {
  decentralizedEducationTranscript,
  userProgression,
  userUnlocks,
  userWatches,
} from "./App.constants";
import { japaneseThemePalette } from "./styles/lazyStyles";

export const sortEmotionsByDate = (usersEmotionsFromDB) => {
  let insertTestDate = usersEmotionsFromDB;

  let sortedDates =
    insertTestDate?.length > 0
      ? insertTestDate?.sort((a, b) => a?.timestamp - b?.timestamp)
      : [];

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const groupedByMonthYear = {};

  sortedDates.forEach((item) => {
    const date = new Date(item.timestamp);
    const month = date.getMonth(); // JavaScript months are 0-based
    const year = date.getFullYear();

    const key = `${monthNames[month]} ${year}`;

    if (!groupedByMonthYear[key]) {
      groupedByMonthYear[key] = [];
    }

    groupedByMonthYear[key].push(item);
  });

  return groupedByMonthYear;
};

export const setupUserDocument = async (
  docRef,
  userStateReference,
  user,
  uniqueID,
  web5
) => {
  const res = await getDoc(docRef);

  if (!res?.data()) {
    // let result = await web5?.dwn?.records?.create({
    //   data: {
    //     protocol: "https://robotsbuildingeducation.com",
    //     ...userUnlocks,
    //   },
    //   message: {
    //     dataFormat: "application/json",
    //     published: true,
    //   },
    // });

    await setDoc(docRef, {
      impact: 0,
      userAuthObj: {
        uid: uniqueID,
      },
      profile: decentralizedEducationTranscript,
      progress: userProgression,
      unlocks: userUnlocks,
      watches: userWatches,
    });
    const response = await getDoc(docRef);
    userStateReference.setDatabaseUserDocument(response.data());
  } else {
    // consider updates from a DWN that wont be saved to your database
    // right now you don't need it because you're managing UI with fb already and there's no impact for wiring it in.
    // so what this means is that web5 is more concerned with decentralized messaging than it is the state of UI
    userStateReference.setDatabaseUserDocument(res.data());
  }
};

export const updateGlobalCounters = async (
  globalImpactDocRef,

  globalStateReference
) => {
  const [globalImpactRes] = await Promise.all([getDoc(globalImpactDocRef)]);

  globalStateReference.setGlobalLeaderName(globalImpactRes.data().discord);
  globalStateReference.setGlobalLevelCounter(globalImpactRes.data().level);
  globalStateReference.setGlobalImpactCounter(globalImpactRes.data().total);
  globalStateReference.setGlobalScholarshipCounter(
    globalImpactRes.data().scholarships
  );
};

export const handleUserAuthentication = async (user, appFunctions) => {
  appFunctions.authStateReference.setUserAuthObject(user || {});

  let _uniqueId =
    localStorage.getItem("uniqueId") || user?.uid || _.uniqueId("rbe-");
  localStorage.setItem("uniqueId", _uniqueId);

  const docRef = doc(database, "users", user?.uid || _uniqueId);

  const globalImpactDocRef = doc(database, "global", "impact");

  await setupUserDocument(
    docRef,
    appFunctions.userStateReference,
    user,
    _uniqueId,
    appFunctions?.web5
  );
  await updateGlobalCounters(
    globalImpactDocRef,
    appFunctions.globalStateReference
  );

  appFunctions.userStateReference.setUserDocumentReference(docRef);
  const usersEmotionsCollectionRef = collection(docRef, "emotions");

  appFunctions.globalStateReference.setGlobalDocumentReference(
    globalImpactDocRef
  );
  appFunctions.userStateReference.setUsersEmotionsCollectionReference(
    usersEmotionsCollectionRef
  );
  appFunctions.updateUserEmotions(usersEmotionsCollectionRef);
  appFunctions.uiStateReference.setProofOfWorkFromModules(getGlobalImpact());
};

export const updateImpact = async (
  impact,
  userStateReference,
  globalStateReference
) => {
  const {
    databaseUserDocument,
    userDocumentReference,
    setDatabaseUserDocument,
  } = userStateReference;
  const {
    globalImpactCounter,
    globalDocumentReference,
    setGlobalImpactCounter,
  } = globalStateReference;

  if (!isEmpty(databaseUserDocument) || !isEmpty(userDocumentReference)) {
    await updateDoc(userDocumentReference, {
      impact: databaseUserDocument?.impact + impact,
    });

    await updateDoc(globalDocumentReference, {
      total: globalImpactCounter + impact,
    });

    setDatabaseUserDocument((prevDoc) => ({
      ...prevDoc,
      impact: prevDoc?.impact + impact,
    }));

    setGlobalImpactCounter((prevCounter) => prevCounter + impact);
  } else {
  }
};

export const updateLevel = async (
  level,
  discordTag,
  userStateReference,
  globalStateReference
) => {
  const {
    databaseUserDocument,
    userDocumentReference,
    setDatabaseUserDocument,
  } = userStateReference;
  const {
    globalImpactCounter,
    globalDocumentReference,
    setGlobalLevelCounter,
    setGlobalLeaderName,
  } = globalStateReference;

  if (!isEmpty(databaseUserDocument) || !isEmpty(userDocumentReference)) {
    await updateDoc(userDocumentReference, {
      level: level + 1,
    });

    if (level + 1 >= globalStateReference?.globalLevelCounter) {
      await updateDoc(globalDocumentReference, {
        level: level + 1,
        discord: discordTag,
      });

      setGlobalLevelCounter(level + 1);
      setGlobalLeaderName(discordTag);
    }

    setDatabaseUserDocument((prevDoc) => ({
      ...prevDoc,
      level: level + 1,
    }));

    // setGlobalImpactCounter((prevCounter) => prevCounter + impact);
  } else {
  }
};

export let getRandomColor = () => {
  const keys = Object.keys(japaneseThemePalette);
  const randomIndex = Math.floor(Math.random() * keys.length);
  const randomKey = keys[randomIndex];
  const color = japaneseThemePalette[randomKey];

  // Handle empty or undefined color values
  if (!color || color === "") {
    return getRandomColor(); // Recursively call the function until a valid color is found
  }

  return color;
};

export let copyToClipboard = () => {
  // Retrieve the value of "uniqueId" from local storage
  const uniqueId = localStorage.getItem("uniqueId");

  // Check if "uniqueId" is actually found in local storage
  if (uniqueId) {
    // Use the Clipboard API to copy the value to the clipboard
    navigator.clipboard
      .writeText(uniqueId)
      .then(() => {
        console.log("UniqueId has been copied to the clipboard successfully.");
      })
      .catch((err) => {
        console.error("Failed to copy uniqueId to the clipboard:", err);
      });
  } else {
    console.log("UniqueId not found in local storage.");
  }
};

export let animateBorderLoading = async (
  stateAnimator,
  styleObjectAfter,
  styleObjectBefore
) => {
  stateAnimator(styleObjectAfter);

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  await delay(750);

  stateAnimator(styleObjectBefore);
};

export const deleteWeb5Records = async (recordSet, web5Reference) => {
  for (let i = 0; i < recordSet.length; i++) {
    console.log(`record set at ${i}`, recordSet[i]);
    let currentId = recordSet[i]?.id;

    const deleteResult = await web5Reference.dwn.records.delete({
      message: {
        recordId: currentId,
      },
    });
  }
};
