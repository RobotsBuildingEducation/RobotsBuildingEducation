import React, { useState, useContext, useEffect } from "react";
import {
  Alert,
  Button,
  Form,
  InputGroup,
  Modal,
  Spinner,
  Accordion,
  Card,
  AccordionContext,
  useAccordionButton,
} from "react-bootstrap";
import { CashuMint, CashuWallet, getEncodedToken } from "@cashu/cashu-ts";

import IMPACT_BACKGROUND from "../../../common/media/images/IMPACT_BACKGROUND.jpg";
import {
  animateBorderLoading,
  copyToClipboard,
  handleUserAuthentication,
} from "../../../App.compute";
import { renderCheckboxes, renderTranscriptAwards } from "../ActionBar.compute";
import {
  japaneseThemePalette,
  responsiveBox,
  textBlock,
} from "../../../styles/lazyStyles";
import { getDoc, updateDoc } from "firebase/firestore";
import { Title } from "../../../common/svgs/Title";
import {
  useCashuWallet,
  useProofStorage,
  useSharedNostr,
} from "../../../App.web5";
import { IdentityCard } from "../../../common/ui/Elements/IdentityCard/IdentityCard";
import { WalletAuth } from "../../../Header/WalletAuth/WalletAuth";

const PINK = "#4003ba";
const BLUE = "black";

function ContextAwareToggle({ children, eventKey, callback }) {
  const { activeEventKey, alwaysOpen } = useContext(AccordionContext);

  const decoratedOnClick = useAccordionButton(
    eventKey,
    () => callback && callback(eventKey)
  );

  const isCurrentEventKey = activeEventKey === eventKey;

  return (
    <button
      type="button"
      style={{
        backgroundColor: isCurrentEventKey ? PINK : "#222222",
        color: "white",
      }}
      onClick={decoratedOnClick}
    >
      {children}
    </button>
  );
}

export const IdentityWallet = ({
  isIdentityWalletOpen,
  setIsIdentityWalletOpen,
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
  const [toggle, setToggle] = useState(false);
  const [localNsec, setLocalNsec] = useState(localStorage.getItem("nsec"));
  const [secretKeyState, setSecretKeyState] = useState(
    localStorage.getItem("nsec")
  );
  const [copyString, setCopyString] = useState("Press to copy ID");

  const [copyNostr, setCopyNostr] = useState("Press to copy key");
  const [borderStateForCopyButton, setBorderStateForCopyButton] =
    useState("1px solid purple");

  const [borderStateForNostrCopy, setBorderStateForNostrCopy] =
    useState("1px solid purple");
  const [userDidKey, setUserDidKey] = useState("");
  const [isValidDidKey, setIsValidDidKey] = useState(false);
  const [userDisplayName, setUserDisplayName] = useState("");
  const [isDisplayNameUpdating, setIsDisplayNameUpdating] = useState(false);
  const [isFirstTimeUser, setIsFirstTimeUser] = useState(false);

  const {
    isConnected,
    errorMessage,
    nostrPubKey,
    nostrPrivKey,
    generateNostrKeys,
    postNostrContent,
  } = useSharedNostr(localStorage.getItem("npub"), secretKeyState);

  const {
    formData,
    setFormData,
    dataOutput,
    wallet,
    balance,
    handleSetMint,
    handleMint,
    handleSwapSend,
    recharge,
  } = useCashuWallet(false);

  let impactResult = databaseUserDocument?.impact;

  const handleChangeDidKey = (event) => {
    const { value } = event.target;
    setUserDidKey(value);
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

  const handleChangeDisplayName = (event) => {
    setUserDisplayName(event.target.value);
  };

  const saveDisplayName = async () => {
    setIsDisplayNameUpdating(true);

    // Generate Nostr keys if not already present
    if (!nostrPrivKey && !nostrPubKey) {
      setIsFirstTimeUser(true);
      const { npub } = await generateNostrKeys(userDisplayName);
      await updateDoc(userStateReference.userDocumentReference, {
        nostrPubKey: npub,
      });
    } else {
      await postNostrContent(
        JSON.stringify({
          name: userDisplayName,
        }),
        0,
        nostrPubKey,
        secretKeyState
      );
    }

    // Update display name and Nostr keys in Firestore
    await updateDoc(userStateReference.userDocumentReference, {
      displayName: userDisplayName,
    });

    const response = await getDoc(userStateReference.userDocumentReference);
    userStateReference.setDatabaseUserDocument(response.data());
    setUserDisplayName("");

    setIsDisplayNameUpdating(false);
  };

  return (
    <>
      <Modal
        centered
        show={isIdentityWalletOpen}
        fullscreen
        onHide={() => {
          setIsIdentityWalletOpen(false);
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
                {userStateReference.databaseUserDocument.displayName} Identity
                Wallet
              </div>
            }
            closeFunction={() => {
              setIsIdentityWalletOpen(false);
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
            <h4>
              <div style={{ marginBottom: 12 }}>Decentralized Identity</div>
              {localStorage.getItem("uniqueId") ? (
                <IdentityCard
                  theme="web5"
                  number={
                    localStorage.getItem("uniqueId")?.substr(0, 16) + "..."
                  }
                  name={userStateReference.databaseUserDocument.displayName}
                />
              ) : null}{" "}
            </h4>

            <Accordion>
              <Card
                style={{
                  backgroundColor: "transparent",
                  border: "0px solid transparent",
                  textAlign: "left",
                  paddingLeft: 0,
                  paddingTop: 0,
                }}
              >
                <Card.Header>
                  <ContextAwareToggle eventKey="0">
                    Switch accounts
                  </ContextAwareToggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    <label> Enter your DID to switch accounts</label>
                    <InputGroup className="mb-3">
                      <Form.Control
                        type="text"
                        placeholder="did:key:z6MktG2..."
                        value={userDidKey}
                        onChange={handleChangeDidKey}
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
                        setCopyString("Press to copy ID");
                      }}
                    >
                      <span>📄 &nbsp;{copyString}</span>
                    </div>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>

            <br />
            {userDidKey && (
              <Alert
                variant={isValidDidKey ? "success" : "danger"}
                style={{ maxWidth: "fit-content" }}
              >
                {isValidDidKey
                  ? "Accounts have switched"
                  : "Invalid DID entered"}
              </Alert>
            )}
            <h4 style={{ marginBottom: 12 }}>
              NOSTR Identity <br />
            </h4>
            <IdentityCard
              theme="nostr"
              number={
                (localStorage.getItem("npub")?.substr(0, 16) ||
                  "npub1mgt5c7qh6dm9rg57mrp89rqtzn64958nj5w9g2d2h9dng27hmp0sww7u2v".substr(
                    0,
                    16
                  )) + "..."
              }
              name={
                userStateReference.databaseUserDocument.displayName || (
                  <b>rox</b>
                )
              }
            />
            {nostrPubKey && !localStorage.getItem("nsec") ? (
              <>
                {" "}
                <br />
                <div>
                  This browser is missing a nostr secret key and cannot edit
                  your name.
                </div>
                <label>Enter your nsec</label>
                <InputGroup className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="nsec17m26e..."
                    value={localNsec}
                    onChange={(event) => setLocalNsec(event.target.value)}
                    style={{ maxWidth: 400 }}
                  />
                  &nbsp; &nbsp;
                  <Button
                    variant="dark"
                    onMouseDown={() => {
                      localStorage.setItem("nsec", localNsec);
                      setSecretKeyState(localNsec);
                    }}
                  >
                    {isDisplayNameUpdating ? <Spinner size={"sm"} /> : "✅"}
                  </Button>
                </InputGroup>
              </>
            ) : nostrPubKey ? (
              <>
                <br />
                <p>
                  Visit your profile with official clients{" "}
                  <a
                    target="_blank"
                    href={`https://primal.net/p/${localStorage.getItem(
                      "npub"
                    )}`}
                  >
                    on primal.net
                  </a>{" "}
                  or{" "}
                  <a
                    target="_blank"
                    href={`https://iris.to/${localStorage.getItem("npub")}`}
                  >
                    on iris.to
                  </a>
                </p>
                <p></p>
                {isFirstTimeUser && (
                  <Alert variant="success" style={{ ...responsiveBox }}>
                    Welcome to using nostr. You can now manage your profile and
                    connect with others. Rox is a not an official nostr client.
                    Please visit your profile on official clients to learn more
                    about account management and recovery.
                    <br />
                    <br />
                    <b>
                      We will only display this secret key <u>once</u> since
                      it's not stored with us. It important that you keep this
                      key somewhere safe. It is used to verify your identity
                      privately.
                      <br />
                      <input
                        type="password"
                        value={localStorage.getItem("nsec")}
                      />
                    </b>
                    <br />
                    <br />
                    <div
                      style={{
                        maxWidth: "fit-content",
                        display: "flex",
                        padding: 8,
                        borderRadius: 8,
                        color: "#D6CFFE",
                        backgroundColor: "#0B0536",
                        cursor: "pointer",
                        border: borderStateForNostrCopy,
                        transition: "0.25s all ease-in-out",
                      }}
                      onMouseDown={async () => {
                        copyToClipboard(localStorage.getItem("nsec"));
                        setCopyNostr("Copied!");
                        animateBorderLoading(
                          setBorderStateForNostrCopy,
                          "1px solid gold",
                          "1px solid purple"
                        );
                        const delay = (ms) =>
                          new Promise((resolve) => setTimeout(resolve, ms));
                        await delay(750);
                        setCopyNostr("Press to copy secret key");
                      }}
                    >
                      <span>📄 &nbsp;{copyNostr}</span>
                    </div>
                  </Alert>
                )}
                <InputGroup className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Edit display name"
                    value={userDisplayName}
                    onChange={handleChangeDisplayName}
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
              </>
            ) : (
              <>
                <br />
                <label>Create an account name</label>
                <InputGroup className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="rox"
                    value={userDisplayName}
                    onChange={handleChangeDisplayName}
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
              </>
            )}
            <br />
            <br />

            <main>
              <div className="cashu-operations-container">
                <div className="section">
                  <h4>Bitcoin Deposit Card</h4>
                  <IdentityCard
                    number={
                      localStorage.getItem("address")
                        ? localStorage.getItem("address")?.substr(0, 16) + "..."
                        : "Generating..."
                    }
                    name={"balance: " + balance}
                    theme={"BTC"}
                    animateOnChange={true}
                    realValue={
                      localStorage.getItem("address")
                        ? localStorage.getItem("address")
                        : null
                    }
                  />
                </div>
                <br />
                <div className="section">
                  <button
                    style={{ marginBottom: 8 }}
                    className="swap-send-button"
                    onClick={handleSwapSend}
                  >
                    Test cash tap
                  </button>
                  <br />
                  <button className="swap-send-button" onClick={recharge}>
                    Recharge
                  </button>
                </div>
              </div>
            </main>
            <br />
            <br />
            <h4>Wallet</h4>
            <div
              style={{ ...responsiveBox, textAlign: "left", display: "flex" }}
            >
              <WalletAuth />
            </div>
            <br />
            <br />
            <h4>Your Decentralized Transcript</h4>
            <div
              style={{
                borderRadius: "12px",
                width: "fit-content",
                padding: 12,
                color: "black",
                backgroundColor: "rgba(252, 233, 177, 1)",
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
            <h4>Transcript Awards</h4>
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
            <h4>Scholarships Created: {globalScholarshipCounter}</h4>
            <p>
              Work Done By You
              <br />
              <b>{Number(impactResult / 1000).toFixed(2)}</b>
              <br />
              <br />
              Work Done By All
              <br />
              <b>{Number(globalImpactCounter / 1000).toFixed(2)}</b>
              <br />
              <br />
              <hr />
              <br />
              <br />
            </p>
            <br />
          </div>
          {/* <IdentityCard
            number={
              localStorage.getItem("address")
                ? localStorage.getItem("address")?.substr(0, 16) + "..."
                : "Generating..."
            }
            name={"balance: " + balance}
            theme={"BTC"}
            animateOnChange={true}
          /> */}
        </Modal.Body>
      </Modal>
    </>
  );
};
