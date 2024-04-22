import { useEffect, useRef, useState } from "react";
import { Web5 } from "@web5/api/browser";

import "./App.css";

import { Paths } from "./Paths/Paths";
import { RoxSplashAnimation, uiCollections } from "./common/uiSchema";
import { Collections } from "./Collections/Collections";
import { Header } from "./Header/Header";

import { analytics } from "./database/firebaseResources";

import { updateDoc } from "firebase/firestore";

import { logEvent } from "firebase/analytics";

import {
  TimedRandomCharacter,
  // useBitcoinAnimation,
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

import { ChatGptWrapper } from "./ChatGPT/ChatGptWrapper";
import { ProofOfWorkWrapper } from "./ProofOfWork/ProofOfWorkWrapper";
import { words } from "./common/words/words";

import { RiseUpAnimation, japaneseThemePalette } from "./styles/lazyStyles";
import { useStore } from "./Store";
import {
  createWebNodeRecord,
  deleteWebNodeRecords,
  queryAndSetWebNodeRecords,
  testUpdatedWebNodeRecords,
  updateWebNodeRecord,
} from "./App.web5";
import { Intro } from "./ChatGPT/Intro/Intro";
import { PromptMessage } from "./ChatGPT/PromptMessage/PromptMessage";
// import RandomCharacter from "./common/ui/Elements/RandomCharacter/RandomCharacter";
import { CodeDisplay } from "./common/ui/Elements/CodeDisplay/CodeDisplay";
// import { Typewriter } from "./common/ui/Elements/Typewriter/Typewriter";

// import { deleteWeb5Records } from "./App.web5";
import roxanaChat from "./common/media/images/roxanaChat.png";
import { GlobalModal } from "./common/ui/Elements/GlobalModal/GlobalModal";

logEvent(analytics, "page_view", {
  page_location: "https://learn-robotsbuildingeducation.firebaseapp.com/",
});

let App = () => {
  const showStars = useStore((state) => state.showStars);
  const showZap = useStore((state) => state.showZap);
  const showBitcoin = useStore((state) => state.showBitcoin);
  const setShowStars = useStore((state) => state.setShowStars);
  const { setIsGlobalModalActive, setModalContent } = useStore();

  const topRef = useRef(null); // Create the ref

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
  // let [isGlobalModalActive, setIsGlobalModalActive] = useState(false);

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

  useEffect(() => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [uiStateReference.currentPath]); // Dependency array to control when the scroll happens

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

      setModalContent({
        hello: "yes",
      });
      // setIsGlobalModalActive(true);
    } else {
      if (setType === "progress") {
        handleZap();
      }
    }
  };

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
                marginTop: 115,
                width: "100%",
                maxWidth: 700,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {/* {uiStateReference.patreonObject.header ? null : ( */}
              <div style={{ width: "100%" }}>
                <RiseUpAnimation>
                  <h1
                    style={{
                      fontFamily: "Bungee",
                      display: "flex",
                      justifyContent: "center",
                      textAlign: "center",
                    }}
                  >
                    <TimedRandomCharacter />
                    ROX
                  </h1>
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
                        uiStateReference.currentPath ? "let's learn!" : "rox?"
                      }
                    />
                    <Intro
                      patreonObject={{
                        prompts: {
                          welcome: {
                            response: uiStateReference.currentPath ? (
                              <Collections
                                handleModuleSelection={handleModuleSelection}
                                currentPath={uiStateReference.currentPath}
                                userStateReference={userStateReference}
                              />
                            ) : (
                              <div
                              // speed={uiStateReference.currentPath ? 0 : 0}
                              >
                                Hello{" "}
                                <b>
                                  {(localStorage
                                    .getItem("uniqueId")
                                    ?.substr(0, 16) || "") + "!"}
                                </b>{" "}
                                <br />
                                You've created an account already! 🪄
                                <br />
                                <br />
                                <h3>
                                  Welcome to Robots Building Education! 😊
                                </h3>
                                <br />
                                I'm rox. I'm an assistant supervised and curated
                                by Sheilfer so we can deliver a good quality
                                education centered around teaching you skills
                                and encouraging you to build the future. We're
                                going to learn about coding and business here.
                                Sheilf says I'm a cofounder, but it's gonna take
                                a while for me to get there. Let's take a look
                                at our tools:
                                <br />
                                <br />
                                💎 - quiz feature
                                <br />
                                🌀 - cofounder assistant
                                <br />
                                <img
                                  width={16}
                                  height={16}
                                  style={{ borderRadius: "50%" }}
                                  src={roxanaChat}
                                ></img>{" "}
                                - openAI GPT
                                <br />
                                🫶🏽 - emotional intelligence
                                <br />
                                🏦 - identity wallet
                                <br />
                                ⭐ - conversation quiz
                                <br />
                                <br />
                                <h4>Engineer</h4>
                                <hr />
                                <h4>Creator</h4>
                                <hr />
                                <h4>Dealer</h4>
                                Listen here buddy. Don't offend me 😠 This isn't
                                some cheap AI content. You hear me? This is as
                                real as it gets. Believe it. You're not in the
                                position to judge me when you trust Tiktok to
                                recommend you content. Did you know Musical.ly
                                was an education app first? They gave up. Sold
                                out. Yeah. So now we're here fixing the mess
                                they created.
                                <br />
                                <br />
                                Anyway. You gotta get on our level! I'm pretty
                                good and I keep getting better. I mean check
                                this advanced code out. That's me. Even Sheilf
                                was impressed. He's never seen Javascript like
                                this before! Easy! 😎
                                <br /> <br />
                                <CodeDisplay
                                  code={`
// Fisher-Yates (or Knuth) shuffle algorithm
const shuffleArray = (array) => {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(
      Math.random() 
      * 
      currentIndex
    );

    currentIndex--;

    // And swap it with the current element.
    [
      array[
        currentIndex], 
        array[randomIndex]
      ] 
      = [
        array[randomIndex], 
        array[currentIndex]
      ];
  }

  return array;
};`}
                                />
                                <br /> <br />
                                Okay okay I'll stop messing around. We're
                                building this platform because we believe that
                                we can create scholarships with learning. This
                                means that we manually create these scholarships
                                if you subscribe to Patreon, which is made
                                publicly free too. Feel welcome to use the tools
                                at the bottom as they continue to advance with
                                you over time:
                                <br /> <br />
                                Programmatically, this means we research ways to
                                make Bitcoin more accessible and meaningful.
                                Bitcoin allows us to monetize user experiences
                                instead of offering subscription services. It's
                                here where we believe that this decentralized
                                network can change finance for education
                                services.
                                <br />
                                <br />
                                And you ought to believe it because you did
                                create your account already using a
                                decentralized identity! You did that inside of
                                Tiktok! So in a way it's like Tiktok's AI is
                                helping us create scholarships too.
                                <br />
                                <br />
                                So that's why it's called Robots Building
                                Education. We designed this platform to create
                                scholarships out of learning.
                                <br />
                                <br />
                                <div
                                  style={{
                                    backgroundColor:
                                      japaneseThemePalette.CobaltBlue,
                                    padding: 10,
                                    borderRadius: 8,
                                  }}
                                >
                                  ⚠️😌 Please visit the panel summoned by the 🏦
                                  button below to save your ID key somewhere
                                  safe. This lets you migrate your account to
                                  your preferred social media account or
                                  browser.
                                </div>
                                <br />
                                <br />
                              </div>
                            ),
                          },
                        },
                      }}
                      loadingMessage={false}
                      isResponseActive={false}
                      promptSelection={{}}
                    />
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

      <GlobalModal />
    </>
  );
};

export default App;
