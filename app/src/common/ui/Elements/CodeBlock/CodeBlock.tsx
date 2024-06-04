import React, { useState, useEffect, useRef } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import Lottie from "react-lottie";
import arrow_animation from "../../../anims/arrow_animation.json";
import { japaneseThemePalette, textBlock } from "../../../../styles/lazyStyles";
import { useZap, useZapAnimation } from "../../../../App.hooks";
import {
  completeZapEvent,
  updateImpact,
  RoxanaLoadingAnimation,
} from "../../../../App.compute";
import { ActivateCofounder } from "./ActivateCofounder/ActivateCofounder";
import { HintUI } from "../HintUI/HintUI";
import { useChatStream } from "../Stream/useChatCompletion";

import isEmpty from "lodash/isEmpty";
import { customInstructions } from "./CodeBlock.compute";
import { CodeDisplay } from "../CodeDisplay/CodeDisplay";
import Markdown from "react-markdown";
import { Typewriter } from "../Typewriter/Typewriter";

// Styling for SoftwareEngineer modal
const styling = {
  Header: {
    backgroundColor: "black",
    color: "white",
    borderBottom: "0px solid transparent",
    borderRight: "5px solid lavender",
    borderLeft: "5px solid lavender",
    borderTop: "5px solid lavender",
  },
  Body: {
    backgroundColor: "black",
    color: "white",
    borderRight: "5px solid lavender",
    borderLeft: "5px solid lavender",
    borderBottom: "5px solid lavender",
    height: 500,
    overflowY: "auto", // Ensure overflow is scrollable
  },
  Footer: {
    backgroundColor: "black",
    color: "white",
    borderTop: "1px solid transparent",
    borderRight: "5px solid lavender",
    borderLeft: "5px solid lavender",
    borderBottom: "5px solid lavender",
  },
};

const SoftwareEngineer = ({
  isModalOpen,
  setIsModalOpen,
  isLoading,
  formState,
  apiResponse,
  handleInputChange,
  handleSubmit,
  messages,
}) => {
  console.log("messages...", messages);

  // Reference to the messages container
  const messagesTopRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Scroll to the bottom of the messages container whenever messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "instant" });
    }
  }, [messages]);

  // Scroll to the top of the messages container when loading is complete
  useEffect(() => {
    if (!isLoading && messages.length > 0 && messagesTopRef.current) {
      messagesTopRef.current.scrollIntoView({ behavior: "instant" });
    }
  }, [isLoading, messages]);

  return (
    <Modal
      show={isModalOpen}
      centered
      keyboard
      onHide={() => setIsModalOpen(false)}
      style={{ zIndex: 10000 }}
      size="lg"
    >
      <Modal.Header closeButton closeVariant="white" style={styling.Header}>
        <Modal.Title style={{ fontFamily: "Bungee" }}>Assistant</Modal.Title>
      </Modal.Header>
      <Modal.Body style={styling.Body}>
        <div ref={messagesTopRef} /> {/* Reference to the top of messages */}
        <div>
          <Form>
            <Form.Group controlId="descriptionTextarea">
              <Form.Label>Let's create code</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                placeholder="How do I create an AI app?"
                value={formState.description}
                onChange={handleInputChange}
              />
            </Form.Group>
            <br />
            <Button variant="primary" onMouseDown={handleSubmit}>
              Create
            </Button>
          </Form>
        </div>
        <br />
        {isLoading && (
          <RoxanaLoadingAnimation header={"Creating and designing 🌀"} />
        )}
        {messages?.length > 0 && isEmpty(apiResponse) && (
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
            <div ref={messagesEndRef} />{" "}
            {/* Reference to the end of messages */}
          </div>
        )}
        <br />
        <br />
        {!isEmpty(apiResponse) && (
          <div>
            <div
              style={{
                ...textBlock(japaneseThemePalette.KyotoPurple, 0, 12),
                marginBottom: 12,
              }}
            >
              <h3 style={{ fontFamily: "Bungee" }}>Frontend</h3>
              <p style={{ lineHeight: "1.5" }}>
                {apiResponse.frontend_code.explanation}
              </p>
            </div>
            <CodeDisplay code={apiResponse.frontend_code.code} />
            <br />
            <br />
            <br />
            <div
              style={{
                ...textBlock(japaneseThemePalette.BambooForestGreen, 0, 12),
                marginBottom: 12,
              }}
            >
              <h3 style={{ fontFamily: "Bungee" }}>Backend</h3>
              <p style={{ lineHeight: "1.5" }}>
                {apiResponse.backend_code.explanation}
              </p>
            </div>
            <CodeDisplay code={apiResponse.backend_code.code} />
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default SoftwareEngineer;

export const CodeBlock = ({
  children,
  userStateReference,
  globalStateReference,
  patreonObject,
}) => {
  const {
    messages,
    loading,
    submitPrompt,
    abortResponse,
    resetMessages,
    setMessages,
  } = useChatStream({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    model: "gpt-4o",
    temperature: 0.9,
    response_format: { type: "json_object" },
  });

  let zap = useZap();
  const zapAnimation = useZapAnimation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formState, setFormState] = useState({ description: "" });
  const [apiResponse, setApiResponse] = useState({});

  useEffect(() => {
    if (messages?.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (!lastMessage.meta.loading) {
        try {
          const result = JSON.parse(lastMessage.content);
          setApiResponse(result.result);
        } catch (error) {
          console.error(
            "Error parsing JSON content:",
            lastMessage.content,
            error
          );
          // Handle the error or set a fallback value for apiResponse if needed
          setApiResponse(null);
        }
      }
    }
  }, [messages]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    resetMessages();
    setApiResponse({});
    e.preventDefault();
    zapAnimation();
    const prompt = customInstructions(formState);
    submitPrompt([{ role: "user", content: prompt }]);
    completeZapEvent(
      zap,
      updateImpact,
      userStateReference,
      globalStateReference
    );
  };

  return (
    <div
      style={{
        backgroundColor: japaneseThemePalette.PhthaloBluePurple,
        borderRadius: 30,
        padding: 12,
        boxShadow: "4px 4px 5px 0px rgba(0,0,0,0.75)",
      }}
    >
      <ActivateCofounder setIsModalOpen={setIsModalOpen} />
      {patreonObject.header === "Learning Mindset & Perspective" && (
        <HintUI
          message={
            "The cofounder assistant will help you set up basic applications and features."
          }
        />
      )}
      <br />
      <br />
      {children}
      <SoftwareEngineer
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        isLoading={loading}
        formState={formState}
        apiResponse={apiResponse}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        messages={messages}
      />
    </div>
  );
};
