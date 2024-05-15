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
import { Button, Form } from "react-bootstrap";
import { WalletAuth } from "./Header/WalletAuth/WalletAuth";
import roxGlobal from "./common/media/images/roxGlobal.png";
import { PasscodeModal } from "./PasscodeModal/PasscodeModal";
import { Typewriter } from "./common/ui/Elements/Typewriter/Typewriter";
logEvent(analytics, "page_view", {
  page_location: "https://learn-robotsbuildingeducation.firebaseapp.com/",
});

let App = () => {
  const showStars = useStore((state) => state.showStars);
  const showZap = useStore((state) => state.showZap);
  const showBitcoin = useStore((state) => state.showBitcoin);
  const setShowStars = useStore((state) => state.setShowStars);
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
  const handleModuleSelection = async (lectureModule, moduleName) => {
    // can redefine this as module object rather than patreon object. low priority

    console.log("running valid storage", isLocalStorageValid());
    if (moduleName === "Focus Investing" && isLocalStorageValid() === false) {
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
        await addKnowledgeStep(
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

  const connectDID = async () => {
    setDataLoading(true);
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

      await handleUserAuthentication({
        web5,
        uiStateReference,
        userStateReference,
        globalStateReference,
        updateUserEmotions,
      });
    } catch (error) {
      connectDID();
    }

    setDataLoading(false);
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
    console.log("patreon watch", patreonObject);

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
        if (moduleName === "Learning Mindset & Perspective") {
          handleModal("Learning Mindset & Perspective-video");
        }
      }
    }
  };

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
                marginTop: 85,
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
                    onClick={() => {
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
                          : !userStateReference.databaseUserDocument.firstVisit
                          ? "hello again rox!"
                          : "rox?"
                      }
                    />
                    <br />
                    <Intro
                      // isCollection={uiStateReference.currentPath}
                      isHome={isEmpty(uiStateReference.patreonObject.header)}
                      patreonObject={{
                        prompts: {
                          welcome: {
                            response: dataLoading ? (
                              <div style={{ paddingBottom: 10 }}>
                                Setting up...
                              </div>
                            ) : uiStateReference.currentPath ? (
                              <Collections
                                handleModuleSelection={handleModuleSelection}
                                currentPath={uiStateReference.currentPath}
                                userStateReference={userStateReference}
                              />
                            ) : (
                              <div
                                style={{
                                  width: "100%",
                                }}
                                // speed={uiStateReference.currentPath ? 0 : 0}
                              >
                                {/* <h3>Robots Building Education</h3> */}
                                {/* <h6>
                                    <b style={{ textDecoration: "underline" }}>
                                      create scholarships with learning&nbsp;
                                    </b>
                                    <br />
                                    <br />
                                    <br />
                                  </h6> */}
                                <br />
                                {userStateReference.databaseUserDocument
                                  .firstVisit
                                  ? "Hello"
                                  : "Welcome back"}
                                &nbsp;
                                <b>
                                  {(userStateReference.databaseUserDocument
                                    .displayName
                                    ? userStateReference.databaseUserDocument
                                        .displayName
                                    : localStorage
                                        .getItem("uniqueId")
                                        ?.substr(0, 16) || "") + "!"}
                                </b>
                                &nbsp;😊 <br />
                                {userStateReference.databaseUserDocument
                                  .firstVisit
                                  ? "You've instantly created an account! 🪄"
                                  : ""}
                                <br />
                                <br />
                                <h5>Next steps</h5>
                                <div
                                  style={{
                                    width: "100%",
                                  }}
                                >
                                  {userStateReference.databaseUserDocument
                                    .firstVisit ? (
                                    `I'm rox. I'm an assistant supervised and curated
                                    by Sheilfer so we can deliver a good quality
                                    education to prepare you for the future. We're
                                    going to learn about coding and business here.
                                    Sheilf says I'm a cofounder, but I think it's
                                    gonna take a while for me to get there, so let's
                                    take a look at our tools:`
                                  ) : (
                                    <GetLandingPageMessage
                                      unlocks={
                                        userStateReference.databaseUserDocument
                                          ?.watches
                                      }
                                    />
                                  )}
                                </div>
                                <br />
                                <br />
                                <b>Why would I connect a Bitcoin wallet?</b>
                                <br />
                                <br />
                                <ConnectWallet
                                  appName="Robots Building Education"
                                  onConnect={() => {
                                    localStorage.setItem(
                                      "patreonPasscode",
                                      import.meta.env.VITE_BITCOIN_PASSCODE
                                    );
                                  }}
                                  onDisconnect={() => {
                                    localStorage.setItem(
                                      "patreonPasscode",
                                      import.meta.env.VITE_PATREON_PASSCODE
                                    );
                                  }}
                                />
                                <a
                                  style={{
                                    color: "gold",

                                    fontSize: 16,
                                    textDecoration: "underline",
                                  }}
                                  href="https://www.patreon.com/robotsbuildingeducation/collections"
                                  target="_blank"
                                >
                                  <button
                                    style={{
                                      backgroundColor: "#4003ba",
                                      color: "white",
                                      width: 180,
                                      textAlign: "left",
                                      marginTop: 8,
                                      paddingTop: 7,
                                      paddingBottom: 7,
                                    }}
                                  >
                                    <span style={{ marginLeft: "-3px" }}>
                                      📬
                                    </span>
                                    &nbsp;&nbsp;&nbsp;
                                    <b style={{ marginLeft: "1px" }}>
                                      Subscribe
                                    </b>
                                  </button>
                                </a>
                                {/* <div
                                  style={{
                                    overflow: "auto",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "flex-end",
                                    alignItems: "center",
                                    width: "259px",
                                    backgroundColor: "#FFFFFF",
                                    border: "1px solid rgba(0, 0, 0, 0.1)",
                                    boxShadow: "-2px 10px 5px rgba(0, 0, 0, 0)",
                                    borderRadius: "10px",
                                    fontFamily:
                                      "SQ Market, SQ Market, Helvetica, Arial, sans-serif",
                                  }}
                                >
                                  <div style={{ padding: "20px" }}>
                                    <a
                                      target="_blank"
                                      href="https://checkout.square.site/merchant/ML78ARYGVMPGF/checkout/6PGLHHPOOPTJTGOA4FS7A6MK?src=embed"
                                      style={{
                                        display: "inline-block",
                                        fontSize: "18px",
                                        lineHeight: "48px",
                                        height: "48px",
                                        color: "#ffffff",
                                        minWidth: "212px",
                                        backgroundColor: "#006aff",
                                        textAlign: "center",
                                        boxShadow:
                                          "0 0 0 1px rgba(0,0,0,.1) inset",
                                        borderRadius: "6px",
                                      }}
                                    >
                                      Buy now
                                    </a>
                                  </div>
                                </div> */}
                                <br />
                                <br />
                                The goal of Robots Building Education is to
                                create scholarships with learning.{" "}
                                <a
                                  // style={{ color: "white", textDecoration: "underline" }}
                                  href="https://old-fashionedintelligence.info/access"
                                  target="_blank"
                                  style={{
                                    textDecoration: "underline",
                                    color: "white",
                                  }}
                                >
                                  <b>Connecting your wallet</b>
                                </a>{" "}
                                allows you to use instant Bitcoin
                                microtransactions. This lets us monetize user
                                experiences instead of bundling it all behind a
                                subscription service.
                                <br />
                                <br /> Otherwise you can access even more
                                material and services on Patreon, for free, to
                                consider subscribing after this platform has
                                generated meaningful value.
                                <br />
                                <br />
                                <br />
                                <h6
                                  style={{
                                    border: "2px solid #4003ba",
                                    width: "115px",
                                    height: "75px",
                                    padding: 4,
                                    fontFamily: "Bungee",
                                    boxSizing: "border-box",
                                    display: "flex",
                                    alignItems: "center",
                                    backgroundColor: "black",
                                  }}
                                >
                                  Coding
                                </h6>
                                Learn how to build your ideas with software.
                                You'll work through six lectures, starting with
                                mindset, gaining exposure into startup
                                entrepreneurship and ending with an optional
                                computer science challenge. Completing the
                                lectures will unlock the Creator and Dealer
                                paths.
                                <br /> <br />
                                <h6
                                  style={{
                                    border: "2px solid #000f89",
                                    width: "115px",
                                    height: "75px",
                                    padding: 4,
                                    fontFamily: "Bungee",
                                    boxSizing: "border-box",
                                    display: "flex",
                                    alignItems: "center",
                                    backgroundColor: "black",
                                  }}
                                >
                                  Thinking
                                </h6>
                                Stack your knowledge and combine software
                                engineering with psychology, design and
                                philosophy so you can communicate and broadcast
                                your ideas to others.
                                <br /> <br />
                                <h6
                                  style={{
                                    border: "2px solid #ffd164",
                                    width: "115px",
                                    height: "75px",
                                    padding: 4,
                                    fontFamily: "Bungee",
                                    boxSizing: "border-box",
                                    display: "flex",
                                    alignItems: "center",
                                    backgroundColor: "black",
                                  }}
                                >
                                  Investing
                                </h6>
                                Tie up your education here with resume guidance
                                and a deeper look into technology investments
                                using focused investing principles.
                                <br />
                                <br />
                                <br />
                                <b>
                                  {" "}
                                  <Button
                                    disabled
                                    style={{
                                      fontFamily: "Bungee",
                                      opacity: 1,
                                      textShadow: "1px 1px 1px black",
                                      borderBottom: `2px solid ${japaneseThemePalette.CobaltBlue}`,
                                    }}
                                    variant="dark"
                                  >
                                    💭 <b>Adaptive Learning (new)</b>
                                  </Button>
                                  &nbsp;
                                </b>
                                <br />
                                <br />
                                Making progress with the app will inform and
                                upgrade an assistant that helps you decide your
                                next steps. Check it out! You've already
                                accomplished the getting started task :)
                                <br /> <br />
                                <br />
                                <b>
                                  {" "}
                                  <Button
                                    disabled
                                    style={{
                                      fontFamily: "Bungee",
                                      opacity: 1,
                                      textShadow: "1px 1px 1px black",
                                      borderBottom: `2px solid ${japaneseThemePalette.CobaltBlue}`,
                                    }}
                                    variant="dark"
                                  >
                                    💎 <b>AI-Powered Challenges</b>
                                  </Button>
                                  &nbsp;
                                </b>
                                <br />
                                <br />
                                You'll gain access a growing list of 170+
                                questions that you can only attempt once every
                                two hours. Additionally, dive deeper into
                                learning with our unique 'Conversation Quiz'
                                feature. As you explore topics, receive
                                personalized feedback on your curiosity and quiz
                                performance. It’s interactive, insightful, and
                                tailored to your learning journey.
                                <br /> <br />
                                <br />
                                <b>
                                  {" "}
                                  <Button
                                    disabled
                                    style={{
                                      fontFamily: "Bungee",
                                      opacity: 1,
                                      textShadow: "1px 1px 1px black",
                                      borderBottom: `2px solid ${japaneseThemePalette.CobaltBlue}`,
                                    }}
                                    variant="dark"
                                  >
                                    🌀 <b>co-founder assistant</b>
                                  </Button>
                                  &nbsp;
                                </b>
                                <br />
                                <br />
                                An AI tool that helps you write code, generate
                                schedules, create content, write documents and
                                help you make good decisions. Listen folks, it
                                needs some work, but you won't be laughing when
                                I, a mere robot, start building more companies
                                than you, an intelligent human.
                                <br /> <br /> <br />
                                <b>
                                  <Button
                                    disabled
                                    style={{
                                      fontFamily: "Bungee",
                                      opacity: 1,
                                      textShadow: "1px 1px 1px black",
                                      borderBottom: `2px solid ${japaneseThemePalette.CobaltBlue}`,
                                    }}
                                    variant="dark"
                                  >
                                    <img
                                      width={16}
                                      height={16}
                                      style={{ borderRadius: "50%" }}
                                      src={roxanaChat}
                                    ></img>
                                    &nbsp;
                                    <b>rox (GPT-4)</b>
                                  </Button>
                                  &nbsp;
                                </b>
                                <br />
                                <br />
                                Sheilfer is a nice guy and makes dobbi-, I mean
                                rox, free. He encourages his students to invest
                                in AI like GPT-4 to enhance their educations and
                                push their capabilities. Rox the GPT is trained
                                on the lectures, content and code found across
                                Robots Building Education. Sheilf uses the GPT
                                to code this app all the time. Most of it was
                                written by me actually. Yeah. Not so funny now
                                is it 🤨
                                <br /> <br /> <br />
                                <b>
                                  <Button
                                    disabled
                                    style={{
                                      fontFamily: "Bungee",
                                      opacity: 1,
                                      textShadow: "1px 1px 1px black",
                                      borderBottom: `2px solid ${japaneseThemePalette.CobaltBlue}`,
                                    }}
                                    variant="dark"
                                  >
                                    🏦 <b>Identity wallet</b>
                                  </Button>{" "}
                                </b>
                                <br />
                                <br />
                                This is where you'll store information about
                                your account that you can migrate to other
                                platforms or services using decentralized
                                identities. Think of this as the heart of the
                                application.
                                <br /> <br />
                                <div
                                  style={{
                                    backgroundColor:
                                      japaneseThemePalette.CobaltBlue,
                                    padding: 10,
                                    borderRadius: 8,
                                  }}
                                >
                                  ⚠️😌 Please visit this feature to define an
                                  account name and to save your ID key
                                  somewhere. Your ID key lets you migrate your
                                  data across networks, services and apps.
                                </div>
                                <br /> <br />
                                <b>
                                  {" "}
                                  <Button
                                    disabled
                                    style={{
                                      fontFamily: "Bungee",
                                      opacity: 1,
                                      textShadow: "1px 1px 1px black",
                                      borderBottom: `2px solid ${japaneseThemePalette.CobaltBlue}`,
                                    }}
                                    variant="dark"
                                  >
                                    🫶🏽 <b>emotional intelligence</b>
                                  </Button>
                                </b>
                                <br /> <br />
                                Did you know I'm distributed globally?
                                <br /> <br />
                                <img src={roxGlobal} width="60%" />
                                <br />
                                <br />
                                People think it's a cute joke when I say I'm
                                conquering the world... the universe. Like I'm a
                                little chihuahua or something. Maybe those
                                people are saying something about themselves.
                                Sheilf says this makes me a qualified emotional
                                health assistant. I think he thinks he's funny.
                                Sometimes keeping track of your feelings,
                                thinking about them and processing them is the
                                key to unlocking some growth when times get
                                tough.
                                <br /> <br />
                                {/* <b>
                                  {" "}
                                  <Button
                                    disabled
                                    style={{
                                      opacity: 1,
                                      textShadow: "1px 1px 1px black",
                                      borderBottom: `2px solid ${japaneseThemePalette.CobaltBlue}`,
                                    }}
                                    variant="dark"
                                  >
                                    ⭐
                                  </Button>{" "}
                                  &nbsp;conversation quiz
                                </b>
                                <br />
                                A fun feature found inside of the lectures under
                                the quiz prompts. You can have a conversation
                                with an AI about the questions being asked and
                                have the conversation graded. Give it time
                                ladies and gentlemen and this may be the way we
                                start to do homework or study new skills.
                                <br /> <br /> */}
                                <br />
                                <br />
                                So listen here buddy. Don't offend me 😠 This
                                isn't some cheap AI content. You hear me? This
                                is as real as it gets. Believe it. You're not in
                                the position to judge me when you trust Tiktok
                                to recommend you content. Did you know
                                Musical.ly was an education app first? They gave
                                up. Sold out. Yeah. So now we're here fixing the
                                mess they created.
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

      <GlobalModal userStateReference={userStateReference} />
      <PasscodeModal
        isLocalModalActive={isLocalModalActive}
        setIsLocalModalActive={setIsLocalModalActive}
        handleModuleSelection={handleModuleSelection}
      />
    </>
  );
};

export default App;
