import { Alert, Form, InputGroup, Modal, ProgressBar } from "react-bootstrap";

import IMPACT_BACKGROUND from "../../../common/media/images/IMPACT_BACKGROUND.jpg";
import {
  animateBorderLoading,
  computePercentage,
  copyToClipboard,
  handleUserAuthentication,
} from "../../../App.compute";
import { useState } from "react";
import { renderCheckboxes, renderTranscriptAwards } from "../ActionBar.compute";

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
}) => {
  let [borderStateForCopyButton, setBorderStateForCopyButton] =
    useState("1px solid purple");

  const [inputValue, setInputValue] = useState("");
  const [isValidDidKey, setIsValidDidKey] = useState(false);

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
  return (
    <>
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
          style={{
            backgroundColor: "black",
            color: "white",
            border: "1px solid black",
          }}
        >
          <Modal.Title style={{ fontFamily: "Bungee" }}>
            Proof of Work @{" "}
            {(localStorage.getItem("uniqueId")?.substr(0, 16) || "") + "..."}
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
                copyToClipboard(localStorage.getItem("uniqueId"));
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
              {Number(impactResult / 1000).toFixed(2)}
              <ProgressBar
                style={{
                  backgroundColor: "black",
                  borderRadius: "0px",
                  margin: 12,
                  borderRadius: 5,
                }}
                // variant="success"
                now={Math.floor(calculatedPercentage * 100)}
              />
              <br />
              Work Done By All
              <br />
              <b>{Number(globalImpactCounter / 1000).toFixed(2)}</b>
              <br />
              <br />
              You are &nbsp;
              <b>
                {(
                  ((databaseUserDocument.impact || 0) / globalImpactCounter) *
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
                  ((databaseUserDocument.impact || 0) / globalImpactCounter) *
                    100
                )}
              />
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
