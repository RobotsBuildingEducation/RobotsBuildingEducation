import { useEffect, useState } from "react";
import isEmpty from "lodash/isEmpty";
import Lottie from "react-lottie";
import {
  Alert,
  Button,
  Fade,
  Form,
  InputGroup,
  Modal,
  ProgressBar,
} from "react-bootstrap";
import zap_animation from "../../common/anims/zap_animation.json";
import bitcoin_animation from "../../common/anims/bitcoin_animation.json";

// import cashAppCard from "../../common/media/images/cashAppCard.jpeg";
import IMPACT_BACKGROUND from "../../common/media/images/IMPACT_BACKGROUND.jpg";
import roxanaChat from "../../common/media/images/roxanaChat.png";
import { logEvent } from "firebase/analytics";
import { analytics, database } from "../../database/firebaseResources";
import { doc, getDoc } from "firebase/firestore";
import { Link, useParams } from "react-router-dom";
import { EmotionalIntelligence } from "./EmotionalIntelligence/EmotionalIntelligence";
import { FadeInComponent } from "../../styles/lazyStyles";

import { decentralizedEducationTranscript, npub } from "../../App.constants";

import { BossMode } from "./BossMode/BossMode";
import { Experimental } from "./Cofounder/Experimental";
import {
  animateBorderLoading,
  copyToClipboard,
  handleUserAuthentication,
} from "../../App.compute";
import { WalletAuth } from "./WalletAuth/WalletAuth";

const renderTranscriptAwards = (profileData) => {
  if (isEmpty(profileData)) {
    return (
      <div>
        No data is available. <br />
        <br />
      </div>
    );
  }

  let awards = [];

  let decentralizedEducationTranscriptCopy = decentralizedEducationTranscript;
  for (const key in decentralizedEducationTranscript) {
    awards.push(
      <div
        id={`${key}`}
        label={`${key}`}
        style={{
          width: 125,
          height: 125,
          backgroundColor: profileData[key]
            ? "rgba(13,41,179, 1)"
            : "rgba(206, 206, 214,0.3)",
          margin: 2,
          border: profileData[key]
            ? "5px solid rgba(0,0,255, 1)"
            : "5px solid gray",
          borderRadius: "20%",
          padding: 5,
        }}
      >
        {key}
      </div>
    );
  }

  return awards;
};
const renderCheckboxes = (profileData) => {
  let checkboxes = [];

  if (isEmpty(profileData)) {
    return (
      <div>
        No data is available. <br />
        <br />
      </div>
    );
  }

  for (const key in profileData) {
    if (profileData[key]) {
      checkboxes.push(
        <Form.Check
          type="checkbox"
          id={`${key}`}
          label={`${key}`}
          checked={profileData[key]}
          readOnly
        />
      );
    }
  }

  if (checkboxes.length < 1) {
    return (
      <div>
        rox doesn't see any proof of work yet. Have you not studied yet?😠{" "}
        <br />
      </div>
    );
  }

  return checkboxes;
};

export const ImpactWallet = ({
  displayName,
  isChatFrameOpen,
  setIsChatFrameOpen,
  globalScholarshipCounter,
  databaseUserDocument,
  computePercentage,
  globalImpactCounter,
  isImpactWalletOpen,
  setIsImpactWalletOpen,

  userAuthObject = { uid: "null" },
  handlePathSelection,
  isDemo,
  globalReserveObject,

  isEmotionalIntelligenceOpen,
  setIsEmotionalIntelligenceOpen,
  usersEmotionsCollectionReference,
  usersEmotionsFromDB,
  updateUserEmotions,
  setIsSchedulerOpen,
  isSchedulerOpen,

  showStars,
  showZap,
  isCofounderOpen,
  setIsCofounderOpen,
  handleZeroKnowledgePassword,
  userStateReference,
  globalStateReference,
  zap,
  isBossModeOpen,
  setIsBossModeOpen,
  handleZap,
  authStateReference,
  uiStateReference,
}) => {
  let [databaseUserDocumentCopy, setDatabaseUserDocumentCopy] = useState({});
  const [inputValue, setInputValue] = useState("");
  const [isValidDidKey, setIsValidDidKey] = useState(false);
  const [isWarningDismissed, setIsWarningDismissed] = useState(false);

  let [borderStateForCopyButton, setBorderStateForCopyButton] =
    useState("1px solid purple");

  let params = useParams();

  useEffect(() => {
    if (params?.profileID && params?.profileID !== userAuthObject?.uid) {
      const docRef = doc(database, "users", params?.profileID);
      getDoc(docRef).then((res) => {
        if (!res?.data()) {
          // unsafe case?
        } else {
          setDatabaseUserDocumentCopy(res?.data());
          setIsImpactWalletOpen(true);
        }
      });
    } else {
      setDatabaseUserDocumentCopy(databaseUserDocument);
    }
  }, [databaseUserDocument]);

  let impactResult = databaseUserDocumentCopy?.impact;

  /**
   *               {/* <iframe
                src="https://chat.openai.com/g/g-09h5uQiFC-ms-roxana"
                title="W3Schools Free Online Web Tutorials"
              ></iframe> 
  */
  const handleChange = (event) => {
    const { value } = event.target;
    setInputValue(value);
    setIsValidDidKey(value.includes("did:key:"));
    //
    if (value.includes("did:key:")) {
      localStorage.setItem("uniqueId", value);
      handleUserAuthentication(
        {},
        {
          authStateReference,
          uiStateReference,
          userStateReference,
          globalStateReference,
          updateUserEmotions,
        }
      ).catch((error) => {
        console.error("Error handling user authentication:", error);
      });
    }
  };

  // console.log("showZap", showZap);
  return (
    <>
      <div style={{ padding: 6 }}>
        {showZap || showStars ? (
          <div style={{ height: 38 }}>
            {/* <FadeInComponent speed={2}> */}
            {/* <PopAnimation> */}
            {/* <span
                style={{
                  textShadow: "1px 1px 4px gold",
                }}
              >
                {showStars ? "✨" : showZap ? "⚡" : null}
              </span> */}
            <FadeInComponent speed={1.5}>
              <Lottie
                options={{
                  loop: true,
                  autoplay: true,
                  animationData: showZap ? bitcoin_animation : zap_animation, // Your animation data goes here
                  // rendererSettings: {
                  //   // preserveAspectRatio: "xMidYMid slice", // Adjust as needed
                  // },
                }}
                width={showZap ? 40 : 40}
                height={showZap ? 40 : 40}
              />
            </FadeInComponent>
            {/* @ts-ignore */}
            {/* </PopAnimation> */}
            {/* </FadeInComponent> */}
          </div>
        ) : (
          /* <StarsContainer
              id="star-container"
              className={showStars ? "animate" : ""}
            >
              {[...Array(25)].map((_, index) => (
                <Star className="star" key={index}>
                  ✨
                </Star>
              ))}
            </StarsContainer>
            <StarsContainer
              id="zap-container"
              className={showZap ? "animate" : ""}
            >
              {[...Array(25)].map((_, index) => (
                <Star className="zap" key={index}>
                  ⚡
                </Star>
              ))}
            </StarsContainer> */

          <FadeInComponent>
            {" "}
            <span style={{ fontSize: "66%" }}>
              <b style={{ fontFamily: "Bungee" }}>
                {displayName
                  ?.split(" ")
                  ?.map((name) => name[0]?.toUpperCase())
                  ?.join("")}
              </b>
              {/* 👾 -&nbsp;
          {databaseUserDocumentCopy?.impact / 1000 ||
            databaseUserDocument?.impact / 1000 ||
            0}{" "} */}{" "}
              &nbsp;
            </span>
            &nbsp;
            {!isDemo ? (
              <Button
                style={{ textShadow: "2px 2px 12px black" }}
                onClick={() => {
                  logEvent(analytics, "select_content", {
                    content_type: "button",
                    item_id: "Boss Mode",
                  });
                  setIsBossModeOpen(true);
                }}
                variant="secondary"
                // disabled
              >
                💎
              </Button>
            ) : null}
            &nbsp; &nbsp;
            {!isDemo ? (
              <Button
                style={{ textShadow: "2px 2px 12px black" }}
                onClick={() => {
                  logEvent(analytics, "select_content", {
                    content_type: "button",
                    item_id: "Cofounder",
                  });
                  setIsCofounderOpen(true);
                }}
                variant="secondary"
              >
                🌀
              </Button>
            ) : null}
            &nbsp; &nbsp;
            {!isDemo ? (
              <a
                href="https://chat.openai.com/g/g-09h5uQiFC-ms-roxana"
                target="_blank"
              >
                <Button
                  style={{ textShadow: "2px 2px 12px black" }}
                  onClick={() => {
                    logEvent(analytics, "select_content", {
                      content_type: "button",
                      item_id: "Scheduler",
                    });
                    // setIsChatFrameOpen(true);
                  }}
                  variant="secondary"
                >
                  <img
                    src={roxanaChat}
                    width="16"
                    style={{
                      borderRadius: "50%",
                      boxShadow: "2px 2px 12px black",
                      marginBottom: 1,
                    }}
                  />
                </Button>
              </a>
            ) : null}
            &nbsp; &nbsp;
            {!isDemo ? (
              <Button
                style={{ textShadow: "2px 2px 12px black" }}
                onClick={() => {
                  logEvent(analytics, "select_content", {
                    content_type: "button",
                    item_id: "Therapy Session",
                  });
                  setIsEmotionalIntelligenceOpen(true);
                }}
                variant="secondary"
              >
                🫶🏽
              </Button>
            ) : null}
            &nbsp; &nbsp;
            <Button
              style={{ textShadow: "2px 2px 12px black" }}
              onClick={() => {
                logEvent(analytics, "select_content", {
                  content_type: "button",
                  item_id: "Proof of Work",
                });
                setIsImpactWalletOpen(true);
              }}
              variant="secondary"
            >
              🏦
            </Button>
          </FadeInComponent>
        )}

        {/* &nbsp; &nbsp; &nbsp;{" "} */}
        <div>
          <ProgressBar
            style={{
              backgroundColor: "black",
              borderRadius: "0px",
              margin: 6,
              height: 6,
              borderRadius: 4,
              backgroundColor: "skyblue",
            }}
            now={Math.floor(computePercentage * 100)}
          />
        </div>
      </div>

      {/* need to conditionall render this */}
      <Modal
        centered
        show={isImpactWalletOpen}
        fullscreen
        onHide={() => setIsImpactWalletOpen(false)}
        keyboard
      >
        <Modal.Header
          closeVariant="white"
          closeButton
          style={{ backgroundColor: "black", color: "white" }}
        >
          <Modal.Title style={{ fontFamily: "Bungee" }}>
            Proof of Work @{" "}
            {localStorage.getItem("uniqueId").substr(0, 16) + "..."}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            padding: 0,
            backgroundColor: "black",
            color: "white",
            backgroundImage: `url(${IMPACT_BACKGROUND})`,
            backgroundPosition: "center center",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
          }}
        >
          <div
            style={{
              backgroundColor: "rgba(0,0,0,0.8)",
              padding: 24,
              boxSizing: "border-box",
              width: "100%",
            }}
          >
            <div
              style={{
                maxWidth: "fit-content",
                display: "flex",
                padding: 8,
                borderRadius: 8,
                color: "#D6CFFE",
                backgroundColor: "#0B0536",
                cursor: "pointer",
                border: borderStateForCopyButton,
                transition: "0.25s all ease-in-out",
              }}
              onClick={() => {
                copyToClipboard();
                animateBorderLoading(
                  setBorderStateForCopyButton,
                  "1px solid gold",
                  "1px solid purple"
                );
              }}
            >
              <span>📄 &nbsp;click to copy ID and save it somewhere safe.</span>
            </div>
            <br />
            Enter your ID to switch accounts
            <InputGroup className="mb-3">
              <Form.Control
                type="text"
                placeholder="did:key:z6MktG2..."
                value={inputValue}
                onChange={handleChange}
                style={{ maxWidth: 400 }}
              />
            </InputGroup>
            {inputValue && (
              <Alert
                variant={isValidDidKey ? "success" : "danger"}
                style={{ maxWidth: "fit-content" }}
              >
                {isValidDidKey
                  ? "Accounts have switched"
                  : "Invalid DID entered"}
              </Alert>
            )}
            {/* <AlbyButton onConnect={() => alert("Connected!")}></AlbyButton> */}
            {/* <BitcoinManager
                handleZeroKnowledgePassword={handleZeroKnowledgePassword}
              /> */}
            or
            <br />
            <br />
            <WalletAuth
              handleZeroKnowledgePassword={handleZeroKnowledgePassword}
            />
            <br />
            <br />
            <h4 style={{ fontFamily: "Bungee" }}>
              Your Decentralized Transcript
            </h4>
            <div
              style={{
                borderRadius: "12px",
                width: "fit-content",
                padding: 12,
                color: "black",
                backgroundColor: "rgba(252, 233, 177, 1)",
                // textShadow: "0px 0px 20px black",
              }}
            >
              <Form>
                {renderCheckboxes(
                  userStateReference.databaseUserDocument.profile
                )}
              </Form>
            </div>
            <br />
            <h4 style={{ fontFamily: "Bungee" }}>Transcript Awards</h4>
            <div
              style={{
                width: "100%",
                display: "flex",
                flexWrap: "wrap",
              }}
            >
              {renderTranscriptAwards(
                userStateReference.databaseUserDocument.profile
              )}
            </div>
            <br />
            <h4 style={{ fontFamily: "Bungee" }}>
              Scholarships Created: {globalScholarshipCounter}
            </h4>
            <p>
              Work Done By You
              <br />
              {impactResult}
              {/* / {getGlobalImpact()} */}
              <ProgressBar
                style={{
                  backgroundColor: "black",
                  borderRadius: "0px",
                  margin: 12,
                  borderRadius: 5,
                }}
                // variant="success"
                now={Math.floor(computePercentage * 100)}
              />
              <br />
              Work Done By All
              <br />
              <b>{globalImpactCounter}</b>
              <br />
              <br />
              You are &nbsp;
              <b>
                {(
                  ((databaseUserDocumentCopy?.impact ||
                    databaseUserDocument.impact ||
                    0) /
                    globalImpactCounter) *
                  100
                ).toFixed(2) || "0"}
                %
              </b>
              &nbsp;of the work 😳
              <ProgressBar
                style={{
                  backgroundColor: "black",
                  borderRadius: "0px",
                  margin: 12,
                  borderRadius: 5,
                }}
                variant="warning"
                now={Math.floor(
                  ((databaseUserDocumentCopy?.impact ||
                    databaseUserDocument.impact ||
                    0) /
                    globalImpactCounter) *
                    100
                )}
              />
              <hr />
              <br />
              <br />
            </p>
            <br />
            {/* <br />

            <div>
              <h4 style={{ fontFamily: "Bungee" }}>The Reserve</h4>
              <h6>invested {globalReserveObject?.invested || "N/A"}</h6>

              <h6>last updated {globalReserveObject?.last_updated}</h6>
              <div></div>
            </div> */}
          </div>
        </Modal.Body>
        {/* <Modal.Footer style={{ backgroundColor: "black", color: "white" }}>
          <Link to={`/`}>
            <Button variant="dark" onClick={() => setIsImpactWalletOpen(false)}>
              Back to app
            </Button>
          </Link>
        </Modal.Footer> */}
      </Modal>

      <EmotionalIntelligence
        isEmotionalIntelligenceOpen={isEmotionalIntelligenceOpen}
        setIsEmotionalIntelligenceOpen={setIsEmotionalIntelligenceOpen}
        usersEmotionsCollectionReference={usersEmotionsCollectionReference}
        usersEmotionsFromDB={usersEmotionsFromDB}
        updateUserEmotions={updateUserEmotions}
        userStateReference={userStateReference}
        globalStateReference={globalStateReference}
        zap={zap}
        handleZap={handleZap}
      />
      {/* 
      <Scheduler
        isSchedulerOpen={isSchedulerOpen}
        setIsSchedulerOpen={setIsSchedulerOpen}
        userStateReference={userStateReference}
        zap={zap}
      /> */}

      {/* <Cofounder
        isCofounderOpen={isCofounderOpen}
        setIsCofounderOpen={setIsCofounderOpen}
        userStateReference={userStateReference}
        globalStateReference={globalStateReference}
        zap={zap}
        handleZap={handleZap}
      /> */}
      <Experimental
        isCofounderOpen={isCofounderOpen}
        setIsCofounderOpen={setIsCofounderOpen}
        userStateReference={userStateReference}
        globalStateReference={globalStateReference}
        zap={zap}
        handleZap={handleZap}
      />

      <BossMode
        isBossModeOpen={isBossModeOpen}
        setIsBossModeOpen={setIsBossModeOpen}
        userStateReference={userStateReference}
        globalStateReference={globalStateReference}
        zap={zap}
        handleZap={handleZap}
      />

      {/* <ChatFrame
        setIsChatFrameOpen={setIsChatFrameOpen}
        isChatFrameOpen={isChatFrameOpen}
        userStateReference={userStateReference}
        globalStateReference={globalStateReference}
      /> */}
    </>
  );
};
