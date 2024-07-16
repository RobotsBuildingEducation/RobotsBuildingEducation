import React, { useEffect, useState, memo, useRef } from "react";
import { nip19, getPublicKey } from "nostr-tools";
import NDK from "@nostr-dev-kit/ndk";
import isEmpty from "lodash/isEmpty";

import { getDoc, updateDoc } from "firebase/firestore";

import { useSharedNostr } from "./App.web5";
import { animateBorderLoading, copyToClipboard } from "./App.compute";
import { japaneseThemePalette, textBlock } from "./styles/lazyStyles";
import { Form, InputGroup } from "react-bootstrap";
import { Intro } from "./ChatGPT/Intro/Intro";

const TextInput = memo(({ value, onChange }) => (
  <Form.Control
    id="THIS_ONE"
    type="text"
    value={value}
    onChange={onChange}
    style={{ maxWidth: 400 }}
  />
));

export const Auth = ({
  uiStateReference,
  dataLoading,
  handleModuleSelection,
  userStateReference,
  connect,
}) => {
  const [localNsec, setLocalNsec] = useState(
    localStorage.getItem("local_nsec")
  );
  const [secretKeyState, setSecretKeyState] = useState(
    localStorage.getItem("local_nsec")
  );
  const [userDisplayName, setUserDisplayName] = useState("");
  const [nsecPassword, setnsecPassword] = useState("");
  const [isDisplayNameUpdating, setIsDisplayNameUpdating] = useState(false);
  const [isNsecUpdating, setIsNsecUpdating] = useState(false);
  const [isFirstTimeUser, setIsFirstTimeUser] = useState(false);
  const [copyNostr, setCopyNostr] = useState("Copy keys");
  const [borderStateForNostrCopy, setBorderStateForNostrCopy] =
    useState("2px solid #793feb");
  const [view, setView] = useState(""); // New state to manage the view
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false); // State for checkbox

  const {
    postNostrContent,
    nostrPubKey,
    nostrPrivKey,
    generateNostrKeys,
    auth,
  } = useSharedNostr(localStorage.getItem("local_npub"), secretKeyState);

  const inputRef = useRef(null);
  const nsecInputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [userDisplayName]);

  const handleChangeDisplayName = (event) => {
    setUserDisplayName(event.target.value);
  };
  const handleChangeNsec = (event) => {
    setnsecPassword(event.target.value);
  };
  const handleCheckboxChange = (event) => {
    setIsCheckboxChecked(event.target.checked);
  };

  const createKeys = async () => {
    if (!nostrPrivKey && !nostrPubKey) {
      setIsFirstTimeUser(true);
      const { npub } = await generateNostrKeys();
      localStorage.setItem("displayName", userDisplayName);
      console.log("posting");
      console.log("npub log", localStorage.getItem("local_npub"));
      console.log("nsec log", localStorage.getItem("local_nsec"));
      await postNostrContent(
        JSON.stringify({
          name: userDisplayName,
        }),
        0,
        localStorage.getItem("local_npub"),
        localStorage.getItem("local_nsec")
      ).then((response) => {
        console.log("outcome", response);
      });
    } else {
      alert("nothing");
    }
  };

  const renderButtons = () => (
    <div>
      <h3 style={{ fontFamily: "Bungee", marginBottom: 18 }}>Welcome</h3>

      <button
        onClick={() => setView("create")}
        style={{ width: "185px", backgroundColor: "#212529", color: "white" }}
      >
        <div style={{ textAlign: "left" }}>🔑 Create Account</div>
      </button>
      <br />
      <br />
      <button
        onClick={() => setView("login")}
        style={{ width: "185px", backgroundColor: "#212529", color: "white" }}
      >
        <div style={{ textAlign: "left" }}>🔐 Sign In</div>
      </button>
    </div>
  );

  const renderCreateForm = () => (
    <div>
      <h3 style={{ fontFamily: "Bungee" }}>Create Account</h3>
      <label>Create an account name</label>
      <br />
      <InputGroup className="mb-3">
        <Form.Control
          type="text"
          value={userDisplayName}
          onChange={handleChangeDisplayName}
          style={{ maxWidth: 400 }}
          ref={inputRef}
        />
      </InputGroup>
      <button
        style={{ backgroundColor: "#212529", color: "white" }}
        onClick={() => setView("")}
      >
        Back
      </button>
      &nbsp;
      <button
        style={{ backgroundColor: "#212529", color: "white" }}
        onClick={createKeys}
        disabled={isDisplayNameUpdating}
      >
        {isDisplayNameUpdating ? "Creating..." : "Create"}
      </button>
    </div>
  );

  const renderLoginForm = () => (
    <div>
      <h3 style={{ fontFamily: "Bungee" }}>Sign In</h3>
      <label>Enter your secret key</label>
      <br />
      <InputGroup className="mb-3">
        <Form.Control
          type="text"
          value={nsecPassword}
          onChange={handleChangeNsec}
          style={{ maxWidth: 400 }}
          ref={nsecInputRef}
        />
      </InputGroup>
      <button
        style={{ backgroundColor: "#212529", color: "white" }}
        onClick={() => setView("")}
      >
        Back
      </button>{" "}
      &nbsp;
      <button
        style={{ backgroundColor: "#212529", color: "white" }}
        onClick={() =>
          auth(nsecPassword).then(() => {
            connect();
          })
        }
        disabled={isDisplayNameUpdating}
      >
        {isDisplayNameUpdating ? "Signing in..." : "Sign in"}
      </button>
    </div>
  );

  return (
    <>
      <Intro
        isHome={isEmpty(uiStateReference.patreonObject.header)}
        patreonObject={{
          prompts: {
            welcome: {
              response: (
                <div style={{ width: "100%" }}>
                  <div>
                    {dataLoading ? (
                      <div>connecting...</div>
                    ) : nostrPubKey ? (
                      <div>
                        {isFirstTimeUser && (
                          <div>
                            <h3 style={{ fontFamily: "Bungee" }}>Welcome!</h3>
                            <div>
                              You've created an account using nostr! Nostr is an
                              open cryptographic protocol that enables a truly
                              censorship-resistant and global social network.
                              This is where we hang out to learn more from
                              skilled engineers, designers and activists who
                              want to make the internet better. It lets you own
                              data and publish your content, followers and
                              digital money across networks.
                            </div>
                            <br />
                            <div>
                              Use your keys to manage your account and networks
                              on clients like{" "}
                              <a
                                target="_blank"
                                href="https://primal.net"
                                style={{
                                  color: "white",
                                  textDecoration: "underline",
                                }}
                              >
                                Primal's social wallet
                              </a>{" "}
                              or{" "}
                              <a
                                target="_blank"
                                href="https://openvibe.social/"
                                style={{
                                  color: "white",
                                  textDecoration: "underline",
                                }}
                              >
                                Openvibe's multi-platform network.
                              </a>
                            </div>
                            <br />
                            <div
                              style={{
                                ...textBlock(
                                  japaneseThemePalette.themePurple,
                                  "0",
                                  24
                                ),
                              }}
                            >
                              <b>
                                ⚠️ We will only display this secret key once
                                since it's not stored with us. It is important
                                that you keep this key somewhere safe. It is
                                used to verify your identity privately across
                                networks. Treat it like a password.
                              </b>
                              <br /> <br />
                              <div
                                style={{
                                  maxWidth: "fit-content",
                                  display: "flex",
                                  padding: 8,
                                  borderRadius: 8,
                                  color: "white",
                                  backgroundColor: "#793feb",
                                  cursor: "pointer",
                                  border: borderStateForNostrCopy,
                                  transition: "0.25s all ease-in-out",
                                }}
                                onMouseDown={async () => {
                                  copyToClipboard(
                                    `***PUBLIC KEY***\n${localStorage.getItem(
                                      "local_npub"
                                    )}\n\n***SECRET KEY***\n${localStorage.getItem(
                                      "local_nsec"
                                    )}`
                                  );
                                  setCopyNostr("Copied!");
                                  animateBorderLoading(
                                    setBorderStateForNostrCopy,
                                    "2px solid gold",
                                    "2px solid #793feb",
                                    1500
                                  );
                                  const delay = (ms) =>
                                    new Promise((resolve) =>
                                      setTimeout(resolve, ms)
                                    );
                                  await delay(1500);
                                  setCopyNostr("Copy keys");
                                }}
                              >
                                <span>🔐 &nbsp;{copyNostr}</span>
                              </div>
                            </div>
                            <br />
                            <br />
                            <label>
                              <input
                                type="checkbox"
                                checked={isCheckboxChecked}
                                onChange={handleCheckboxChange}
                              />
                              &nbsp;I have safely stored my keys somewhere.
                            </label>
                            <br />
                            <br />
                            {isCheckboxChecked ? (
                              <button
                                style={{
                                  backgroundColor: "#212529",
                                  color: "white",
                                }}
                                onClick={connect}
                              >
                                Launch app
                              </button>
                            ) : null}
                          </div>
                        )}
                      </div>
                    ) : view === "create" ? (
                      renderCreateForm()
                    ) : view === "login" ? (
                      renderLoginForm()
                    ) : (
                      renderButtons()
                    )}
                  </div>
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
  );
};
