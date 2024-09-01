import { useEffect, useRef, useState } from "react";
import isEmpty from "lodash/isEmpty";
import { Web5 } from "@web5/api/browser";
import { Button as ConnectWallet } from "@getalby/bitcoin-connect-react";
import "./App.css";

import { Paths } from "./Paths/Paths";
import { RoxSplashAnimation, uiCollections } from "./common/uiSchema";
import { Collections } from "./Collections/Collections";
import { Header } from "./Header/Header";

import { analytics } from "./database/firebaseResources";

import { updateDoc } from "firebase/firestore";

import { logEvent } from "firebase/analytics";

// import { CashuMint, CashuWallet, getEncodedToken } from "@cashu/cashu-ts";

import {
  TimedRandomCharacter,
  useGlobalModal,
  // useBitcoinAnimation,
  useGlobalStates,
  useUIStates,
  useUserDocument,
  useZap,
  useZapAnimation,
} from "./App.hooks";
import {
  addKnowledgeStep,
  computePercentage,
  getCollectionDocumentsInsideUser,
  GetLandingPageMessage,
  handleUserAuthentication,
  isLocalStorageValid,
  RoxanaLoadingAnimation,
  sortEmotionsByDate,
} from "./App.compute";
import { modalConfig, setOfLectures } from "./App.constants";

import { ChatGptWrapper } from "./ChatGPT/ChatGptWrapper";
import { ProofOfWorkWrapper } from "./ProofOfWork/ProofOfWorkWrapper";
import { words } from "./common/words/words";

import {
  RiseUpAnimation,
  StyledRoxHeader,
  japaneseThemePalette,
} from "./styles/lazyStyles";
import { useStore } from "./Store";
// import {
//   createWebNodeRecord,
//   deleteWebNodeRecords,
//   queryAndSetWebNodeRecords,
//   testUpdatedWebNodeRecords,
//   updateWebNodeRecord,
// } from "./App.web5";
import { Intro } from "./ChatGPT/Intro/Intro";
import { PromptMessage } from "./ChatGPT/PromptMessage/PromptMessage";
// import RandomCharacter from "./common/ui/Elements/RandomCharacter/RandomCharacter";
import { CodeDisplay } from "./common/ui/Elements/CodeDisplay/CodeDisplay";
// import { Typewriter } from "./common/ui/Elements/Typewriter/Typewriter";

// import { deleteWeb5Records } from "./App.web5";
import roxanaChat from "./common/media/images/roxanaChat.png";
import { GlobalModal } from "./common/ui/Elements/GlobalModal/GlobalModal";
import { Button, Form } from "react-bootstrap";
import { WalletAuth } from "./Header/WalletAuth/WalletAuth";
import roxGlobal from "./common/media/images/roxGlobal.png";
import { PasscodeModal } from "./PasscodeModal/PasscodeModal";
import { Typewriter } from "./common/ui/Elements/Typewriter/Typewriter";
import { Landing } from "./App.landing";
import { Auth } from "./App.auth";
import { useSharedNostr } from "./App.web5";
logEvent(analytics, "page_view", {
  page_location: "https://learn-robotsbuildingeducation.firebaseapp.com/",
});

let App = () => {
  const pathsRef = useRef(null);

  const showStars = useStore((state) => state.showStars);
  const showZap = useStore((state) => state.showZap);
  const showBitcoin = useStore((state) => state.showBitcoin);
  const setShowStars = useStore((state) => state.setShowStars);
  const [secretKeyState, setSecretKeyState] = useState(
    localStorage.getItem("local_nsec")
  );

  const [isNotAuthed, setIsNotAuthed] = useState(false);
  let handleModal = useGlobalModal(modalConfig);

  const topRef = useRef(null); // Create the ref

  const handleZap = useZapAnimation();
  // const handleZap = () => {};

  let zap = useZap(1, "Robots Building Education Zap");

  const [loading, setLoading] = useState(true);
  const [dataLoading, setDataLoading] = useState(false);

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

  let [isLocalModalActive, setIsLocalModalActive] = useState(false);

  const {
    isConnected,
    errorMessage,
    nostrPubKey,
    nostrPrivKey,
    generateNostrKeys,
    postNostrContent,
    auth,
    assignExistingBadgeToNpub,
  } = useSharedNostr(localStorage.getItem("local_npub"), secretKeyState);
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
    let target = event.target.id;
    if (event.target.id !== "Engineer") {
      target = "Engineer";
    }

    logEvent(analytics, "select_item", {
      item_list_id: `RO.B.E_paths|${target}`,
      item_list_name: `RO.B.E_paths|${target}`,
      items: [
        {
          item_id: target,
          item_name: target,
        },
      ],
    });

    uiStateReference.setCurrentPath(target);

    uiStateReference.setPatreonObject({});
    uiStateReference.setModuleName("");

    uiStateReference.setPathSelectionAnimationData({
      boxShadow: "1px 2px 14px 8px rgba(0,255,140,1)",
      path: target,
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
  const handleModuleSelection = async (lectureModule, moduleName) => {
    // can redefine this as module object rather than patreon object. low priority
    // handleZap();

    if (
      moduleName !== "Learning Mindset & Perspective" &&
      isLocalStorageValid() === false
    ) {
      setIsLocalModalActive(true);
    } else {
      uiStateReference.setPatreonObject(lectureModule);

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

      if (lectureModule.knowledge.start.step) {
        addKnowledgeStep(
          lectureModule.knowledge.start.step,
          lectureModule.knowledge.start.knowledge,
          lectureModule.knowledge.start.label,
          lectureModule.knowledge.start.collectorId
        );
      }
    }
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

  const connect = async () => {
    setDataLoading(true);

    // const { web5 } = await Web5.connect();
    console.log("pk", nostrPrivKey);
    console.log("pk", nostrPubKey);
    console.log(isEmpty(nostrPrivKey) && isEmpty(nostrPubKey));
    console.log(!localStorage.getItem("uniqueId"));
    if (isEmpty(localStorage.getItem("local_nsec"))) {
      console.log("xx");
      setIsNotAuthed(true);
    } else {
      await handleUserAuthentication({
        uiStateReference,
        userStateReference,
        globalStateReference,
        updateUserEmotions,
      });
      setIsNotAuthed(false);
    }

    setDataLoading(false);
  };

  useEffect(() => {
    connect();

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: "instant" });
    }
  }, [uiStateReference.currentPath]); // Dependency array to control when the scroll happens

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

    assignExistingBadgeToNpub(uiStateReference.patreonObject?.badgeAddress);
  };

  const handleCompletedPractice = async (moduleData = null, patreonObject) => {
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

    await addKnowledgeStep(
      patreonObject.knowledge.practice.step,
      patreonObject.knowledge.practice.knowledge,
      patreonObject.knowledge.practice.label,
      patreonObject.knowledge.practice.collectorId
    );

    checkForUnlock("progress", moduleData);
  };

  const handleWatch = async (moduleData = null, patreonObject = null) => {
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

    // addKnowledgeStep(
    //   "3",
    //   "Returned to the application learn another time.",
    //   "Returning effort",
    //   "returning-effort"
    // );

    await addKnowledgeStep(
      patreonObject.knowledge.video.step,
      patreonObject.knowledge.video.knowledge,
      patreonObject.knowledge.video.label,
      patreonObject.knowledge.video.collectorId
    );
    // handleZap();
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
      let current = setOfLectures?.indexOf(moduleName);

      let next = setOfLectures[current + 1];

      let unlocks = {
        ...userStateReference.databaseUserDocument.unlocks,
        [next]: true,
      };

      // if (moduleName === "Learning Mindset & Perspective") {
      //   return;
      // }
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

      handleScheduler();

      // testUpdatedWebNodeRecords(web5Reference, dwnRecordSet);

      setShowStars(true);

      // Reset the whole animation after some time
      setTimeout(() => setShowStars(false), 2000);

      if (moduleName === "Learning Mindset & Perspective") {
        handleModal("Learning Mindset & Perspective-complete");
      }
      // setIsGlobalModalActive(true);
    } else {
      if (setType === "progress") {
        handleZap();
        if (moduleName === "Learning Mindset & Perspective") {
          handleModal("Learning Mindset & Perspective-practice");
        }
      } else if (setType === "watches") {
        handleZap();
        if (moduleName === "Learning Mindset & Perspective") {
          handleModal("Learning Mindset & Perspective-video");
        }
      }
    }
  };

  // if (loading) {
  //   return (
  //     <div
  //       style={{
  //         height: "100%",
  //         display: "flex",
  //         alignItems: "center",
  //         justifyContent: "center",
  //       }}
  //     >
  //       <RiseUpAnimation>
  //         <RoxSplashAnimation />
  //       </RiseUpAnimation>
  //     </div>
  //   );
  // }

  return (
    <>
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
            width: "100%",
            maxWidth: "700px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          ref={topRef}
        >
          {/* <button
            onClick={() => {
              setIsNotAuthed(true);
              localStorage.clear();
            }}
          >
            logout
          </button> */}
          <>
            <Paths
              handlePathSelection={handlePathSelection}
              pathSelectionAnimationData={
                uiStateReference.pathSelectionAnimationData
              }
              userStateReference={userStateReference}
            />

            <div
              style={{
                // marginTop: 85,
                width: "100%",
                maxWidth: 700,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {/* {uiStateReference.patreonObject.header ? null : ( */}
              <div style={{ width: "100%" }}>
                <RiseUpAnimation
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <StyledRoxHeader
                    id="landing"
                    onMouseDown={() => {
                      uiStateReference.setPatreonObject({});
                      uiStateReference.setCurrentPath("");
                    }}
                  >
                    <TimedRandomCharacter />
                    ROX
                  </StyledRoxHeader>
                </RiseUpAnimation>

                <Header
                  languageMode={languageMode}
                  setLanguageMode={setLanguageMode}
                />

                {/* {uiStateReference.currentPath ? ( */}
                {uiStateReference.patreonObject.header ? null : (
                  <>
                    <PromptMessage
                      patreonObject={{ ok: "hey" }}
                      promptMessage={
                        uiStateReference.currentPath
                          ? "let's learn!"
                          : userStateReference.databaseUserDocument.firstVisit
                          ? "rox?"
                          : !localStorage.getItem("local_npub") &&
                            !localStorage.getItem("local_nsec")
                          ? "let's get started!"
                          : isEmpty(userStateReference.databaseUserDocument)
                          ? "launching..."
                          : "hello again rox!"
                      }
                    />
                    <br />
                    {isNotAuthed ? (
                      <Auth
                        uiStateReference={uiStateReference}
                        dataLoading={dataLoading}
                        handleModuleSelection={handleModuleSelection}
                        userStateReference={userStateReference}
                        connect={connect}
                      />
                    ) : isEmpty(userStateReference.databaseUserDocument) ? (
                      <div></div>
                    ) : (
                      <Landing
                        uiStateReference={uiStateReference}
                        dataLoading={dataLoading}
                        handleModuleSelection={handleModuleSelection}
                        userStateReference={userStateReference}
                      />
                    )}
                    <br />
                    <br />
                  </>
                )}
                {/* ) : null} */}

                {/* <br /> */}
                {}
                {!uiStateReference.patreonObject.header ? (
                  <>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                  </>
                ) : null}
              </div>
              {/* )} */}
              {/* <Collections
                handleModuleSelection={handleModuleSelection}
                currentPath={uiStateReference.currentPath}
                userStateReference={userStateReference}
              /> */}

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
            </div>
          </>
        </div>
        {localStorage.getItem("local_npub") ||
        localStorage.getItem("uniqueId") ? (
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
            handlePathSelection={handlePathSelection}
            pathSelectionAnimationData={
              uiStateReference.pathSelectionAnimationData
            }
          />
        ) : null}
      </div>
      {/* <GlobalModal userStateReference={userStateReference} />
      <PasscodeModal
        isLocalModalActive={isLocalModalActive}
        setIsLocalModalActive={setIsLocalModalActive}
        handleModuleSelection={handleModuleSelection}
        patreonObject={uiStateReference.patreonObject}
      /> */}
    </>
  );
};

export default App;
