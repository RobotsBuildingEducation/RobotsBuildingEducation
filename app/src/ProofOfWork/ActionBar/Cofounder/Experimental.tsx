import { Modal, Form, Button, Spinner, Alert } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import isEmpty from "lodash/isEmpty";
import {
  DynamicRoleDisplay,
  createPrompt,
  formatLabel,
  generatePromptBasedOnSwitches,
} from "./Experimental.compute";
import { postInstructions } from "../../../common/uiSchema";
import { RoxanaLoadingAnimation, updateImpact } from "../../../App.compute";
import { Timestamp, addDoc, collection, doc, setDoc } from "firebase/firestore";
import { database } from "../../../database/firebaseResources";
import {
  japaneseThemePalette,
  responsiveBox,
} from "../../../styles/lazyStyles";
import { ExternalLink } from "../../../common/ui/Elements/ExternalLink/ExternalLink";
import { Title } from "../../../common/svgs/Title";
import Markdown from "react-markdown";
import { useChatStream } from "../../../common/ui/Elements/Stream/useChatCompletion";

export const Experimental = ({
  isCofounderOpen,
  setIsCofounderOpen,
  zap,
  handleZap,
  userStateReference,
  globalStateReference,
  setIsStartupOpen,
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
  const [gptResponse, setGptResponse] = useState({});

  const handleSwitchChange = (role) => {
    setSwitchStates((prev) => ({ ...prev, [role]: !prev[role] }));
  };

  // Initialize the chat stream
  const { messages, loading, submitPrompt, resetMessages } = useChatStream({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    model: "gpt-4o",
    temperature: 0.9,
    response_format: { type: "json_object" },
  });

  const handleTicketSubmit = async (event) => {
    event.preventDefault();
    setIsTicketLoading(true);
    try {
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
    } catch (err) {
      console.error("Error adding document: ", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    resetMessages();

    const prompt = generatePromptBasedOnSwitches(
      switchStates,
      additionalContext
    );
    createPrompt(prompt);

    await submitPrompt([{ role: "user", content: prompt }]);

    handleZap("ai");
    setIsLoading(false);
  };

  const handleSaveToFirebaseChange = async (event) => {
    setIsSettingLoading(true);

    let userId = userStateReference?.databaseUserDocument?.userAuthObj?.uid;

    const userDocRef = doc(database, "users", userId);

    try {
      await setDoc(userDocRef, { switchStates: switchStates }, { merge: true });
    } catch (error) {
      console.error(error);
    }
    setIsSettingLoading(false);
  };

  useEffect(() => {
    if (messages?.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (!lastMessage.meta.loading) {
        try {
          const result = JSON.parse(lastMessage.content);
          console.log("result", result);
          setGptResponse(result.result);
        } catch (error) {
          console.error(
            "Error parsing JSON content:",
            lastMessage.content,
            error
          );
          setGptResponse(null); // Fallback to raw content
        }
      }
    }
  }, [messages]);
  console.log("gptResponse", gptResponse);

  return (
    <Modal
      centered
      show={isCofounderOpen}
      fullscreen
      onHide={() => {
        setIsCofounderOpen(false);
        setIsStartupOpen(false);
      }}
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
        <Title
          title={"Assistant"}
          closeFunction={() => {
            setIsCofounderOpen(false);
          }}
        />
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
              <b>Message me privately</b>
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
            onMouseDown={handleSaveToFirebaseChange}
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

          <Button
            variant="primary"
            type="submit"
            disabled={isEmpty(additionalContext)}
          >
            Submit
          </Button>
        </Form>
        {isLoading ? (
          <>
            <RoxanaLoadingAnimation header={"creating"} />{" "}
            <div style={{ whiteSpace: "pre-wrap" }}>
              {messages
                .map((msg, index) =>
                  index === 0 ||
                  index % 2 === 0 ||
                  index !== messages.length - 1 ? null : (
                    <Markdown key={index}>{msg.content}</Markdown>
                  )
                )
                .reverse()}
            </div>
          </>
        ) : !isEmpty(gptResponse) && !isLoading ? (
          <div style={{ maxWidth: 700, padding: 60, marginBottom: 100 }}>
            {DynamicRoleDisplay(gptResponse)}
          </div>
        ) : null}
        <br /> <br /> <br />
        <br />
        <br /> <br /> <br /> <br />
      </Modal.Body>
    </Modal>
  );
};
