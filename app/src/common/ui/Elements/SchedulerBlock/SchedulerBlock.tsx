import React, { useEffect, useRef, useState } from "react";
import { Button, Form, Modal, Row, Col } from "react-bootstrap";
import Lottie from "react-lottie";
import isEmpty from "lodash/isEmpty";
import styled from "styled-components";
import {
  FadeInComponent,
  japaneseThemePalette,
  textBlock,
} from "../../../../styles/lazyStyles";
import roxanaGif from "../../../media/images/roxanaGif.gif";
import { customInstructions } from "./SchedulerBlock.compute";
import { useZapAnimation } from "../../../../App.hooks";
import chat_loading_animation from "../../../anims/chat_loading_animation.json";
import { HintUI } from "../HintUI/HintUI";
import { RoxanaLoadingAnimation } from "../../../../App.compute";
import { useChatStream } from "../Stream/useChatCompletion"; // Import the useChatStream hook
import Markdown from "react-markdown";

const postInstructions = {
  url: "https://us-central1-learn-robotsbuildingeducation.cloudfunctions.net/app/prompt",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export const EmotionalIntelligenceStyles = {
  EmotionHeader: {
    backgroundColor: "black",
    color: "white",
    borderBottom: "0px solid transparent",
    borderRight: "5px solid lavender",
    borderLeft: "5px solid lavender",
    borderTop: "5px solid lavender",
  },
  EmotionBody: {
    backgroundColor: "black",
    color: "white",
    borderRight: "5px solid lavender",
    borderLeft: "5px solid lavender",
    borderBottom: "5px solid lavender",
    height: 500,
  },
  EmotionFooter: {
    backgroundColor: "black",
    color: "white",
    borderTop: "1px solid transparent",
    borderRight: "5px solid lavender",
    borderLeft: "5px solid lavender",
    borderBottom: "5px solid lavender",
  },
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
  color: #bf8902;
`;

const Stage = styled.div`
  background-color: black;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin: 10px 0;
  padding: 20px;
  color: white;
`;

const Title = styled.h2`
  color: #31d660;
`;

const Time = styled.p`
  font-weight: bold;
  color: darkgray;
  color: white;
`;

const Explanation = styled.p``;

export const SchedulerBlock = ({ children, hasTutorial = false }) => {
  const zapAnimation = useZapAnimation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  let [boxShadow, setBoxShadow] = useState(false);
  const [formState, setFormState] = useState({
    description: "",
    pace: "daily",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState({});
  const [parsedContent, setParsedContent] = useState("");

  // Initialize the chat stream
  const { messages, loading, submitPrompt, resetMessages } = useChatStream({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    model: "gpt-4o",
    temperature: 0.9,
    response_format: { type: "json_object" },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    zapAnimation();
    resetMessages();
    setApiResponse({});
    setIsLoading(true);

    let prompt = customInstructions(parsedContent, formState);

    await submitPrompt([{ role: "user", content: prompt }]);
  };

  useEffect(() => {
    if (messages?.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (!lastMessage.meta.loading) {
        try {
          const result = JSON.parse(lastMessage.content);
          setApiResponse(result.result);
          setIsLoading(false);
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

  const extractText = (children) => {
    const childArray = React.Children.toArray(children);
    return childArray
      .map((child) => {
        if (typeof child === "string") {
          return child;
        } else if (
          React.isValidElement(child) &&
          child.props &&
          child.props.children
        ) {
          return extractText(child.props.children);
        }
        return "";
      })
      .filter((text) => text !== null && text !== "")
      .flat();
  };

  useEffect(() => {
    const textArray = extractText(children).join("");
    setParsedContent(textArray);
  }, [children]);

  const messagesTopRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Scroll to the bottom of the messages container whenever messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "instant" });
    }
  }, [messages]);

  useEffect(() => {
    if (!isLoading && messages.length > 0 && messagesTopRef.current) {
      messagesTopRef.current.scrollIntoView({ behavior: "instant" });
    }
  }, [isLoading, messages]);

  return (
    <div
      style={{
        width: "100%",
        borderRadius: "50px",
        backgroundColor: japaneseThemePalette.PhthaloBluePurple,
        padding: 24,
        boxShadow: "4px 4px 5px 0px rgba(0,0,0,0.75)",
      }}
    >
      <Button
        variant="dark"
        onMouseEnter={() => {
          setBoxShadow(true);
        }}
        onMouseLeave={() => {
          setBoxShadow(false);
        }}
        style={{
          width: 48,
          height: 48,
          textShadow: "1px 1px 1px black",
          borderBottom: boxShadow
            ? "2px solid transparent"
            : `2px solid ${japaneseThemePalette.CobaltBlue}`,
        }}
        onMouseDown={() => {
          setIsModalOpen(true);
        }}
      >
        🌀
      </Button>
      <br />
      {hasTutorial ? (
        <HintUI
          message={"The executive assistant will help you create a study plan."}
        />
      ) : null}
      <br />
      <br />
      {children}
      <Modal
        show={isModalOpen}
        centered
        keyboard
        onHide={() => setIsModalOpen(false)}
        style={{ zIndex: 1000000 }}
        size="lg"
      >
        <Modal.Header
          closeButton
          closeVariant="white"
          style={EmotionalIntelligenceStyles.EmotionHeader}
        >
          <Modal.Title style={{ fontFamily: "Bungee" }}>Assistant</Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            ...EmotionalIntelligenceStyles.EmotionBody,
            overflow: "scroll",
          }}
        >
          <div ref={messagesTopRef} /> {/* Reference to the top of messages */}
          <div>
            <Form>
              <Form.Group controlId="paceSelect">
                <Form.Label>Choose your pace</Form.Label>
                <Form.Control
                  as="select"
                  name="pace"
                  value={formState.pace}
                  onChange={handleInputChange}
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                </Form.Control>
              </Form.Group>
              <br />
              <Form.Group controlId="descriptionTextarea">
                <Form.Label>
                  What else can you tell me about your schedule?
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  placeholder="Enter a description..."
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
          {loading ? (
            <>
              <RoxanaLoadingAnimation header="Creating and designing 🌀" />
              {messages?.length > 0 && isEmpty(apiResponse) && (
                <div style={{ whiteSpace: "pre-wrap" }}>
                  {messages
                    ?.map((msg, index) =>
                      index === 0 ||
                      index % 2 === 0 ||
                      index !== messages.length - 1 ? null : (
                        <Markdown key={index}>{msg.content}</Markdown>
                      )
                    )
                    .reverse()}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </>
          ) : !isEmpty(apiResponse) ? (
            <div>
              <Container>
                {apiResponse?.breakdown.map((stage, index) => (
                  <Stage key={index}>
                    <Title>{stage?.description}</Title>
                    <Time>
                      <b>
                        Suggested Amount of Time: {stage?.suggestedAmountOfTime}
                      </b>
                    </Time>
                    <Explanation>{stage?.explanation}</Explanation>
                  </Stage>
                ))}
              </Container>
            </div>
          ) : null}
        </Modal.Body>
        {/* <Modal.Footer style={EmotionalIntelligenceStyles.EmotionFooter}>
          <Button variant="dark" onMouseDown={() => setIsModalOpen(false)}>
            Exit
          </Button>
        </Modal.Footer> */}
      </Modal>
    </div>
  );
};
