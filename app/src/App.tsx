import { useEffect, useState } from "react";
import { Web5 } from "@web5/api/browser";

import "./App.css";

import { Paths } from "./Paths/Paths";
import { RoxSplashAnimation } from "./common/uiSchema";
import { Collections } from "./Collections/Collections";
import { Header } from "./Header/Header";

import { analytics } from "./database/firebaseResources";

import { updateDoc } from "firebase/firestore";

import { logEvent } from "firebase/analytics";

import {
  useBitcoinAnimation,
  useGlobalStates,
  useUIStates,
  useUserDocument,
  useZap,
  useZapAnimation,
} from "./App.hooks";
import {
  computePercentage,
  getCollectionDocumentsInsideUser,
  handleUserAuthentication,
  sortEmotionsByDate,
} from "./App.compute";
import { setOfLectures } from "./App.constants";

import { LectureHeader } from "./LectureHeader/LectureHeader";
import { ChatGptWrapper } from "./ChatGPT/ChatGptWrapper";
import { ProofOfWorkWrapper } from "./ProofOfWork/ProofOfWorkWrapper";
import { words } from "./common/words/words";

import { RiseUpAnimation } from "./styles/lazyStyles";
import { useStore } from "./Store";
import {
  createWebNodeRecord,
  deleteWebNodeRecords,
  queryAndSetWebNodeRecords,
  testUpdatedWebNodeRecords,
  updateWebNodeRecord,
} from "./App.web5";

// import { deleteWeb5Records } from "./App.web5";

logEvent(analytics, "page_view", {
  page_location: "https://learn-robotsbuildingeducation.firebaseapp.com/",
});

let App = () => {
  const showStars = useStore((state) => state.showStars);
  const showZap = useStore((state) => state.showZap);
  const showBitcoin = useStore((state) => state.showBitcoin);
  const setShowStars = useStore((state) => state.setShowStars);

  const handleZap = useZapAnimation();
  // const handleZap = () => {};

  let zap = useZap(1, "Robots Building Education Zap");

  const [loading, setLoading] = useState(true);

  // handles database data from the "users" collection
  let { userStateReference } = useUserDocument();

  // handles database data from the "global" collection
  let { globalStateReference } = useGlobalStates();

  // handles ui data
  let { uiStateReference } = useUIStates();

  let [web5Reference, setWeb5Reference] = useState(null);
  let [dwnRecordSet, setDwnRecordSet] = useState([]);

  // handles language switching
  let [languageMode, setLanguageMode] = useState(words["English"]);

  /**
   *
   * @param event click event
   * @description a function used to navigate the app
   * - adds event to analytics
   * - handles the selection and visibility of Engineer, Creator and Dealer paths.
   * - clears any existing patreon and module content displayed in the app
   * - creates a small animation for the path button selected
   *
   */
  const handlePathSelection = (event) => {
    logEvent(analytics, "select_item", {
      item_list_id: `RO.B.E_paths|${event.target.id}`,
      item_list_name: `RO.B.E_paths|${event.target.id}`,
      items: [
        {
          item_id: event.target.id,
          item_name: event.target.id,
        },
      ],
    });

    uiStateReference.setCurrentPath(event.target.id);

    uiStateReference.setPatreonObject({});
    uiStateReference.setModuleName("");

    uiStateReference.setPathSelectionAnimationData({
      boxShadow: "1px 2px 14px 8px rgba(0,255,140,1)",
      path: event.target.id,
    });
  };

  /**
   *
   * @param module the block of data containing content and information about a lecture
   * @param moduleName the name of the lecture selected
   * @description a function used to navigate the app
   * - adds event to analytics
   * - handles the selection and visibility of the lecture or module selected
   * - clears the path selected
   *
   */
  const handleModuleSelection = (module, moduleName) => {
    // can redefine this as module object rather than patreon object. low priority
    uiStateReference.setPatreonObject(module);

    logEvent(analytics, "select_item", {
      item_list_id: `RO.B.E_module|${moduleName}`,
      item_list_name: `RO.B.E_module|${moduleName}`,
      items: [
        {
          item_id: moduleName,
          item_name: moduleName,
        },
      ],
    });
    uiStateReference.setModuleName(moduleName);
    uiStateReference.setCurrentPath("");
  };

  /**
   *
   * @param collectionRef A collection object used to retrieve or processdatabase data
   * @description gets each emotion document in a user's collection of emotions and prepares them for display
   * - gets user's data from database
   * - sorts emotions by timestamp date
   * - sets emotions for display
   */
  let updateUserEmotions = async (collectionRef) => {
    let emotions = await getCollectionDocumentsInsideUser(collectionRef);
    let emotionSet = sortEmotionsByDate(emotions);
    userStateReference.setUsersEmotionsFromDB(emotionSet);
  };

  const connectDID = async () => {
    try {
      const { web5 } = await Web5.connect();
      if (!localStorage.getItem("uniqueId")) {
        localStorage.setItem("uniqueId", web5?.did?.agent?.agentDid);
      }

      // setWeb5Reference(web5);
      // let set = await queryAndSetWebNodeRecords(web5);
      // setDwnRecordSet(set);
      // await createWebNodeRecord(web5, set, userUnlocks);

      // use when testing new data
      // deleteWebNodeRecords(set, web5);

      handleUserAuthentication({
        web5,
        uiStateReference,
        userStateReference,
        globalStateReference,
        updateUserEmotions,
      });
    } catch (error) {
      connectDID();
    }
  };

  useEffect(() => {
    connectDID();

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  if (loading) {
    return (
      <div
        style={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <RiseUpAnimation>
          <RoxSplashAnimation />
        </RiseUpAnimation>
      </div>
    );
  }

  const handleScheduler = async (
    scheduleEvent = "video",
    moduleData = null
  ) => {
    let locationOfHeader = uiStateReference.patreonObject.credential;

    let profile = {
      ...userStateReference.databaseUserDocument.profile,
      [locationOfHeader]: true,
    };

    await updateDoc(userStateReference.userDocumentReference, {
      profile,
    });

    userStateReference.setDatabaseUserDocument((prevDoc) => ({
      ...prevDoc,
      profile,
    }));
  };

  const handleCompletedPractice = async (moduleData = null) => {
    let data = {};

    let progress = {
      ...userStateReference.databaseUserDocument.progress,
      [moduleData]: true,
    };

    await updateDoc(userStateReference.userDocumentReference, {
      progress,
    });

    userStateReference.setDatabaseUserDocument((prevDoc) => ({
      ...prevDoc,
      progress,
    }));

    checkForUnlock("progress", moduleData);
  };

  const handleWatch = async (moduleData = null) => {
    let watches = {
      ...userStateReference.databaseUserDocument.watches,
      [moduleData]: true,
    };

    await updateDoc(userStateReference.userDocumentReference, {
      watches,
    });

    userStateReference.setDatabaseUserDocument((prevDoc) => ({
      ...prevDoc,
      watches,
    }));

    checkForUnlock("watches", moduleData);

    handleZap();
  };

  const checkForUnlock = async (setType, moduleName) => {
    //if progress, check watch and vice version
    let unlocked = false;

    if (setType === "progress") {
      if (userStateReference.databaseUserDocument.watches[moduleName]) {
        unlocked = true;
      }
    } else {
      if (userStateReference.databaseUserDocument.progress[moduleName]) {
        unlocked = true;
      }
    }

    if (unlocked) {
      let current = setOfLectures.indexOf(moduleName);

      let next = setOfLectures[current + 1];

      let unlocks = {
        ...userStateReference.databaseUserDocument.unlocks,
        [next]: true,
      };

      if (moduleName === "Lesson 2 Frontend Programming") {
        unlocks = {
          ...unlocks,
          Philosophy: true,
          "Interactions & Design": true,
          "The Psychology Of Self-esteem": true,
        };
      }

      if (moduleName === "Lesson 4 Building Apps & Startups") {
        unlocks = {
          ...unlocks,
          "Resume Writing": true,
          "Focus Investing": true,
        };
      }

      await updateDoc(userStateReference.userDocumentReference, {
        unlocks,
      });

      // await updateWebNodeRecord(web5Reference, dwnRecordSet, unlocks);

      userStateReference.setDatabaseUserDocument((prevDoc) => ({
        ...prevDoc,
        unlocks,
      }));

      // testUpdatedWebNodeRecords(web5Reference, dwnRecordSet);

      setShowStars(true);

      // Reset the whole animation after some time
      setTimeout(() => setShowStars(false), 2000);
    } else {
      if (setType === "progress") {
        handleZap();
      }
    }
  };

  return (
    <div
      style={{
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        className="App"
        style={{
          minHeight: "100dvh",
          width: 640,
          maxWidth: "100%",
        }}
      >
        <Header languageMode={languageMode} setLanguageMode={setLanguageMode} />

        <>
          <Paths
            handlePathSelection={handlePathSelection}
            pathSelectionAnimationData={
              uiStateReference.pathSelectionAnimationData
            }
            userStateReference={userStateReference}
          />

          <Collections
            handleModuleSelection={handleModuleSelection}
            currentPath={uiStateReference.currentPath}
            userStateReference={userStateReference}
          />

          <LectureHeader uiStateReference={uiStateReference} />

          <ChatGptWrapper
            uiStateReference={uiStateReference}
            userStateReference={userStateReference}
            globalStateReference={globalStateReference}
            handleScheduler={handleScheduler}
            handleZap={handleZap}
            zap={zap}
            checkForUnlock={checkForUnlock}
            handleCompletedPractice={handleCompletedPractice}
            handleWatch={handleWatch}
          />
        </>
      </div>

      <ProofOfWorkWrapper
        userStateReference={userStateReference}
        globalStateReference={globalStateReference}
        updateUserEmotions={updateUserEmotions}
        uiStateReference={uiStateReference}
        showStars={showStars}
        showZap={showZap}
        showBitcoin={showBitcoin}
        zap={zap}
        handleZap={handleZap}
        computePercentage={computePercentage}
      />
    </div>
  );
};

export default App;
