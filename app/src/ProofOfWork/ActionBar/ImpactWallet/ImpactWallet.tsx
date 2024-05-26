import {
  Alert,
  Button,
  Form,
  InputGroup,
  Modal,
  ProgressBar,
  Spinner,
} from "react-bootstrap";

import IMPACT_BACKGROUND from "../../../common/media/images/IMPACT_BACKGROUND.jpg";
import {
  animateBorderLoading,
  copyToClipboard,
  handleUserAuthentication,
} from "../../../App.compute";
import { useState } from "react";
import { renderCheckboxes, renderTranscriptAwards } from "../ActionBar.compute";
import { responsiveBox } from "../../../styles/lazyStyles";
import { getDoc, updateDoc } from "firebase/firestore";
import { Title } from "../../../common/svgs/Title";

export const ImpactWallet = ({
  isImpactWalletOpen,
  setIsImpactWalletOpen,
  userStateReference,
  globalStateReference,
  uiStateReference,
  updateUserEmotions,
  databaseUserDocument,
  globalScholarshipCounter,
  calculatedPercentage,
  globalImpactCounter,
  setIsStartupOpen,
}) => {
  let [copyString, setCopyString] = useState(
    "Click to copy ID and save it somewhere safe."
  );
  let [borderStateForCopyButton, setBorderStateForCopyButton] =
    useState("1px solid purple");

  const [inputValue, setInputValue] = useState("");
  const [isValidDidKey, setIsValidDidKey] = useState(false);
  const [displayNameInput, setDisplayNameInput] = useState("");

  const [isDisplayNameUpdating, setIsDisplayNameUpdating] = useState(false);

  let impactResult = databaseUserDocument?.impact;

  const handleChange = (event) => {
    const { value } = event.target;
    setInputValue(value);
    setIsValidDidKey(value.includes("did:key:"));

    if (value.includes("did:key:")) {
      localStorage.setItem("uniqueId", value);
      handleUserAuthentication({
        uiStateReference,
        userStateReference,
        globalStateReference,
        updateUserEmotions,
      }).catch((error) => {
        console.error("Error handling user authentication:", error);
      });
    }
  };

  const handleDisplayNameInput = (event) => {
    setDisplayNameInput(event.target.value);
  };

  const saveDisplayName = async () => {
    setIsDisplayNameUpdating(true);
    await updateDoc(userStateReference.userDocumentReference, {
      displayName: displayNameInput,
    });

    const response = await getDoc(userStateReference.userDocumentReference);
    userStateReference.setDatabaseUserDocument(response.data());
    setDisplayNameInput("");

    setIsDisplayNameUpdating(false);
  };

  return (
    <>
      <Modal
        centered
        show={isImpactWalletOpen}
        fullscreen
        onHide={() => {
          setIsImpactWalletOpen(false);
          setIsStartupOpen(false);
        }}
        keyboard
      >
        <Modal.Header
          closeVariant="white"
          closeButton
          style={{
            backgroundColor: "black",
            color: "white",
            border: "1px solid black",
          }}
        >
          <Title
            title={
              <div>
                Proof of Work{" "}
                {userStateReference.databaseUserDocument.displayName
                  ? "w/"
                  : "@"}
                &nbsp;
                {userStateReference.databaseUserDocument.displayName
                  ? userStateReference.databaseUserDocument.displayName
                  : (localStorage.getItem("uniqueId")?.substr(0, 16) || "") +
                    "..."}
              </div>
            }
            closeFunction={() => {
              setIsImpactWalletOpen(false);
              // setIsStartupOpen(false);
            }}
          />
          <Modal.Title style={{ fontFamily: "Bungee" }}></Modal.Title>
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
            <div style={responsiveBox}>
              Your identity wallet keeps track of the data that you can migrate
              to other platforms, services or applications. The work recorded is
              the amount of information distributed by rox.
            </div>
            <br />
            Create an account name
            <InputGroup className="mb-3">
              <Form.Control
                type="text"
                placeholder="queen rox"
                value={displayNameInput}
                onChange={handleDisplayNameInput}
                style={{ maxWidth: 400 }}
              />
              &nbsp; &nbsp;
              <Button
                variant="dark"
                onMouseDown={() => {
                  saveDisplayName();
                }}
              >
                {isDisplayNameUpdating ? <Spinner size={"sm"} /> : "✅"}
              </Button>
            </InputGroup>
            <br />
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
              onMouseDown={async () => {
                copyToClipboard(localStorage.getItem("uniqueId"));
                setCopyString("Copied!");
                animateBorderLoading(
                  setBorderStateForCopyButton,
                  "1px solid gold",
                  "1px solid purple"
                );
                const delay = (ms) =>
                  new Promise((resolve) => setTimeout(resolve, ms));
                await delay(750);
                setCopyString("Click to copy ID and save it somewhere safe.");
              }}
            >
              <span>📄 &nbsp;{copyString}</span>
            </div>
            <br />
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
            <br />
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
            <br />
            <br />
            <h4 style={{ fontFamily: "Bungee" }}>
              Scholarships Created: {globalScholarshipCounter}
            </h4>
            <p>
              Work Done By You
              <br />
              <b>{Number(impactResult / 1000).toFixed(2)}</b>
              {/* <ProgressBar
                style={{
                  backgroundColor: "black",
                  margin: 12,
                  borderRadius: 5,
                }}
                // variant="success"
                now={Math.floor(calculatedPercentage * 100)}
              /> */}
              <br />
              <br />
              Work Done By All
              <br />
              <b>{Number(globalImpactCounter / 1000).toFixed(2)}</b>
              <br />
              <br />
              {/* You are &nbsp;
              <b>
                {(
                  ((databaseUserDocument.impact || 0) / globalImpactCounter) *
                  100
                ).toFixed(2) || "0"}
                %
              </b>
              &nbsp;of the work 😳 */}
              {/* <ProgressBar
                style={{
                  backgroundColor: "black",

                  margin: 12,
                  borderRadius: 5,
                }}
                variant="warning"
                now={Math.floor(
                  ((databaseUserDocument.impact || 0) / globalImpactCounter) *
                    100
                )}
              /> */}
              <hr />
              <br />
              <br />
            </p>
            <br />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
