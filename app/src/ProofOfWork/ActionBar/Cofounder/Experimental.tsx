import { Modal, Form, Button, Spinner, Alert } from "react-bootstrap";

import React, { useState } from "react";
import isEmpty from "lodash/isEmpty";
import {
  DynamicRoleDisplay,
  createPrompt,
  formatLabel,
  generatePromptBasedOnSwitches,
} from "./Experimental.compute";
import {
  RoxanaLoadingAnimation,
  postInstructions,
} from "../../../common/uiSchema";
import { updateImpact } from "../../../App.compute";
import {
  Timestamp,
  addDoc,
  collection,
  deleteField,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { database } from "../../../database/firebaseResources";
import {
  japaneseThemePalette,
  responsiveBox,
} from "../../../styles/lazyStyles";
import { ExternalLink } from "../../../common/ui/Elements/ExternalLink/ExternalLink";

export const Experimental = ({
  isCofounderOpen,
  setIsCofounderOpen,
  zap,
  handleZap,
  userStateReference,
  globalStateReference,
}) => {
  const [switchStates, setSwitchStates] = useState(
    userStateReference?.databaseUserDocument?.switchStates
      ? {
          softwareEngineer:
            userStateReference?.databaseUserDocument?.switchStates
              ?.softwareEngineer,
          contentCreator:
            userStateReference?.databaseUserDocument?.switchStates
              ?.contentCreator,
          executiveAssistant:
            userStateReference?.databaseUserDocument?.switchStates
              ?.executiveAssistant,
          investor:
            userStateReference?.databaseUserDocument?.switchStates?.investor,
        }
      : {
          softwareEngineer: true,
          contentCreator: true,
          executiveAssistant: true,
          investor: true,
        }
  );

  const [isSettingLoading, setIsSettingLoading] = useState(false);
  const [additionalContext, setAdditionalContext] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [isticketLoading, setIsTicketLoading] = useState(false);

  const [message, setMessage] = useState("");
  const [contact, setContact] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSwitchChange = (role) => {
    setSwitchStates((prev) => ({ ...prev, [role]: !prev[role] }));
  };

  const [gptResponse, setGptResponse] = useState({});

  const handleTicketSubmit = async (event) => {
    event.preventDefault();
    setIsTicketLoading(true);
    try {
      // Add a new document in collection "tickets"
      await addDoc(collection(database, "tickets"), {
        message: message,
        contact: contact,
        isComplete: false,
        createdAt: Timestamp.fromDate(new Date()), // Firestore timestamp
      });

      setShowSuccess(true);
      setMessage("");
      setContact("");
      setIsTicketLoading(false);
      // setError("");
    } catch (err) {
      // setError("Failed to submit the ticket. Please try again.");
      console.error("Error adding document: ", err);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true); // Start loading
    // Process the form data here, such as sending it to a backend or logging it

    const prompt = generatePromptBasedOnSwitches(
      switchStates,
      additionalContext
    );
    createPrompt(prompt);

    const response = await fetch(postInstructions.url, {
      method: postInstructions.method,
      headers: postInstructions.headers,
      body: JSON.stringify({
        prompt,
        isJsonMode: true,
      }),
    })
      .then((response) => {
        if (
          localStorage.getItem("patreonPasscode") ===
          import.meta.env.VITE_BITCOIN_PASSCODE
        ) {
          zap().then((lightningResponse) => {
            if (lightningResponse?.preimage) {
              updateImpact(1, userStateReference, globalStateReference);
            }
          });
        }

        return response;
      })
      .catch((error) => {
        // setHasError(true);
        console.log("error", error);
        console.log("{ERROR}", error);
      });

    if (response) {
      let data = await response.json();

      //   let result = JSON.parse(data?.bot?.content);

      //   let outcome = result.schedule;
      let outcome = data?.bot?.content;

      setGptResponse(outcome);

      handleZap("ai");
      // setCofounder(outcome);
    }
    // setIsCofounderLoading(false);
    setIsLoading(false); // End loading
  };

  const handleSaveToFirebaseChange = async (event) => {
    setIsSettingLoading(true);

    let userId = userStateReference?.databaseUserDocument?.userAuthObj?.uid;

    const userDocRef = doc(database, "users", userId);

    try {
      // Use setDoc with { merge: true } to update the document without overwriting other fields
      await setDoc(userDocRef, { switchStates: switchStates }, { merge: true });
    } catch (error) {
      console.error(error);
    }
    setIsSettingLoading(false);
  };

  return (
    <Modal
      centered
      show={isCofounderOpen}
      fullscreen
      onHide={() => setIsCofounderOpen(false)}
    >
      <Modal.Header
        closeButton
        closeVariant="white"
        style={{
          color: "white",
          backgroundColor: "black",
          fontFamily: "Bungee",
          borderBottom: "1px solid black",
        }}
      >
        <Modal.Title>Co-founder</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ color: "white", backgroundColor: "black" }}>
        <h4 style={{ fontFamily: "Bungee" }}>Connect</h4>
        <div style={responsiveBox}>
          Feel welcome to connect if you need additional support :)
        </div>
        <br />
        <ExternalLink
          color={"#4003ba"}
          textDisplay={"#pls-help"}
          link={"https://discord.gg/ZbvuK3KW2P"}
        />
        <br />
        <br />
        <ExternalLink
          color={"#4003ba"}
          textDisplay={"agenda-based meetings"}
          link={
            "https://www.patreon.com/posts/creating-86150994?utm_medium=clipboard_copy&utm_source=copyLink&utm_campaign=postshare_creator&utm_content=join_link"
          }
        />
        <br />
        <br />
        or
        <br />
        <br />
        <Form style={responsiveBox} onSubmit={handleTicketSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>
              <b>Message</b>
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>
              {" "}
              <b>Preferred contact method</b>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="contact details"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            disabled={
              isticketLoading || (message?.length < 20 && contact.length < 5)
            }
          >
            {isticketLoading ? "Sending..." : "Send"}
          </Button>

          {showSuccess && (
            <Alert variant="success" className="mt-3">
              Thank you for connecting! We'll reach out soon!
            </Alert>
          )}
        </Form>
        <br />
        <br />
        <Form onSubmit={handleSubmit}>
          <h4 style={{ fontFamily: "Bungee" }}>Choose your role</h4>
          <div style={responsiveBox}>
            The cofounder assistant will help you with various tasks including
            the ability to write software and documents, structure content,
            create schedules or discover investment insight.
          </div>
          <div style={{ marginBottom: 12 }}>
            {Object.keys(switchStates).map((role, index) => (
              <Form.Check
                key={index}
                type="switch"
                id={`${role}-switch`}
                label={formatLabel(role)}
                checked={switchStates[role]}
                onChange={() => handleSwitchChange(role)}
              />
            ))}
          </div>
          <Button
            variant="dark"
            size="sm"
            onClick={handleSaveToFirebaseChange}
            disabled={isSettingLoading}
          >
            {isSettingLoading ? <Spinner size="sm" /> : null} Save settings
          </Button>
          <br />
          <br />
          <Form.Group className="mb-3" controlId="additionalContext">
            <Form.Label>What are we up to?</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={additionalContext}
              onChange={(e) => setAdditionalContext(e.target.value)}
              style={{ maxWidth: 700 }}
            />
          </Form.Group>
          <br />

          <Button
            variant="primary"
            type="submit"
            disabled={isEmpty(additionalContext)}
          >
            Submit
          </Button>
        </Form>
        <br /> <br />
        {isLoading ? <RoxanaLoadingAnimation /> : null}
        <div style={{ maxWidth: 700, padding: 60, marginBottom: 100 }}>
          {DynamicRoleDisplay(gptResponse)}
        </div>
      </Modal.Body>
    </Modal>
  );
};

// ("\n    at div\n    at div\n    at form\n    at http://localhost:5173/node_modules/.vite/deps/chunk-C43UL5DL.js?v=2a473af4:747:3\n    at div\n    at http://localhost:5173/node_modules/.vite/deps/chunk-C43UL5DL.js?v=2a473af4:439:5\n    at div\n    at div\n    at http://localhost:5173/node_modules/.vite/deps/react-bootstrap.js?v=2a473af4:6331:3\n    at div\n    at Transition2 (http://localhost:5173/node_modules/.vite/deps/react-bootstrap.js?v=2a473af4:379:30)\n    at http://localhost:5173/node_modules/.vite/deps/react-bootstrap.js?v=2a473af4:966:3\n    at http://localhost:5173/node_modules/.vite/deps/react-bootstrap.js?v=2a473af4:1597:3\n    at DialogTransition\n    at http://localhost:5173/node_modules/.vite/deps/react-bootstrap.js?v=2a473af4:6046:5\n    at http://localhost:5173/node_modules/.vite/deps/react-bootstrap.js?v=2a473af4:6452:3\n    at Experimental (http://localhost:5173/src/ProofOfWork/ImpactWallet/Cofounder/Experimental.tsx?t=1710063288002:23:3)\n    at ImpactWallet (http://localhost:5173/src/ProofOfWork/ImpactWallet/ImpactWallet.tsx?t=1710062487268:121:3)\n    at div\n    at ProofOfWork (http://localhost:5173/src/ProofOfWork/ProofOfWork.tsx?t=1710062487268:20:3)\n    at div\n    at O2 (http://localhost:5173/node_modules/.vite/deps/styled-components.js?v=2a473af4:1176:6)\n    at ProofOfWorkWrapper (http://localhost:5173/src/ProofOfWork/ProofOfWorkWrapper.tsx?t=1710062487268:35:3)\n    at div\n    at App (http://localhost:5173/src/App.tsx?t=1710062487268:43:3)\n    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=2a473af4:3108:5)\n    at RenderErrorBoundary (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=2a473af4:3071:5)\n    at Routes (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=2a473af4:3476:5)\n    at Router (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=2a473af4:3423:15)\n    at RouterProvider (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=2a473af4:3312:5)");
