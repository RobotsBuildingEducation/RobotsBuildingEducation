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
  useGlobalStates,
  useUIStates,
  useUserDocument,
  useZap,
  useZapAnimation,
} from "./App.hooks";
import {
  getCollectionDocumentsInsideUser,
  // deleteWeb5Records,
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
import { WalletAuth } from "./ProofOfWork/ImpactWallet/WalletAuth/WalletAuth";

logEvent(analytics, "page_view", {
  page_location: "https://learn-robotsbuildingeducation.firebaseapp.com/",
});

let App = () => {
  const showStars = useStore((state) => state.showStars);
  const showZap = useStore((state) => state.showZap);
  const setShowStars = useStore((state) => state.setShowStars);

  const handleZap = useZapAnimation();

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
      const { web5, did: aliceDid } = await Web5.connect();
      console.log(!localStorage.getItem("uniqueId"));
      if (!localStorage.getItem("uniqueId")) {
        localStorage.setItem("uniqueId", web5?.did?.agent?.agentDid);
      }

      // setWeb5Reference(web5);

      // const { records } = await web5.dwn.records.query({
      //   message: {
      //     filter: {
      //       // dataFormat: "text/plain",
      //       dataFormat: "application/json",
      //       // Additional filters if available
      //     },
      //   },
      // });

      // let set = [];
      // for (let record of records) {
      //   const data = await record.data.json();
      //   const transcript = { record, data, id: record.id };
      //   // todos.value.push(todo);
      //   set.push(transcript);
      // }

      // setDwnRecordSet(set);

      // let robots = set.find((item) =>
      //   item?.data?.protocol?.includes("https://robotsbuildingeducation.com")
      // );

      // if (!robots) {
      //   const { record } = await web5.dwn.records.create({
      //     data: {
      //       protocol: "https://robotsbuildingeducation.com",
      //       ...userUnlocks,
      //     },
      //     message: {
      //       dataFormat: "application/json",
      //       published: true,
      //     },
      //   });
      // }

      // deleteWeb5Records(set, web5);

      // console.log("set of records", set);

      // console.log("finished");

      // console.log("runnning auth");

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

    setShowStars(true);

    // Reset the whole animation after some time
    setTimeout(() => setShowStars(false), 2000);
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

    setShowStars(true);

    // Reset the whole animation after some time
    setTimeout(() => setShowStars(false), 2000);
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

    // // Randomize animation properties for each star
    // document.querySelectorAll(".star").forEach((star) => {
    //   const scale = Math.random() * 10; // Random scale
    //   const x = Math.random() * 200 - 100; // Random x-position
    //   const y = Math.random() * 200 - 100; // Random y-position
    //   const duration = Math.random() * 1 + 0.5; // Random duration

    //   // star.style.textShadow = "25px 25px 25px gold";
    //   star.style.opacity = 1;
    //   star.style.transform = `scale(${scale}) translate(${x}px, ${y}px)`;
    //   star.style.transition = `transform ${duration}s ease-in-out, opacity ${duration}s ease-in-out`;

    //   // Reset the star after the animation
    //   setTimeout(() => {
    //     star.style.opacity = 0;
    //     star.style.transform = "none";
    //   }, duration * 1000);
    // });

    // Reset the whole animation after some time
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

      // const { record } = await web5Reference.dwn.records.read({
      //   message: {
      //     filter: {
      //       recordId: dwnRecordSet?.find(
      //         (item) =>
      //           item?.data?.protocol === "https://robotsbuildingeducation.com"
      //       )?.id,
      //     },
      //   },
      // });

      // const transcript = await record.data.json();

      // await record.update({
      //   data: {
      //     ...transcript,
      //     ...unlocks,
      //   },
      // });

      userStateReference.setDatabaseUserDocument((prevDoc) => ({
        ...prevDoc,
        unlocks,
      }));

      // // console.log("final result:");
      // const { record: testRecord } = await web5Reference.dwn.records.read({
      //   message: {
      //     filter: {
      //       recordId: dwnRecordSet?.find(
      //         (item) =>
      //           item?.data?.protocol === "https://robotsbuildingeducation.com"
      //       )?.id,
      //     },
      //   },
      // });
      // const outcome = await testRecord.data.json();
      // console.log("dwn outcome", outcome);
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
          <WalletAuth />
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
        handlePathSelection={handlePathSelection}
        updateUserEmotions={updateUserEmotions}
        uiStateReference={uiStateReference}
        showStars={showStars}
        showZap={showZap}
        zap={zap}
        handleZap={handleZap}
      />
    </div>
  );
};

export default App;
