import React, { useState, useEffect, useRef } from "react";
import isEmpty from "lodash/isEmpty";
import { Button, Form, Modal } from "react-bootstrap";
import { japaneseThemePalette, textBlock } from "../../../../styles/lazyStyles";
import { useZapAnimation } from "../../../../App.hooks";
import { useChatStream } from "../Stream/useChatCompletion";
import { RoxanaLoadingAnimation } from "../../../../App.compute";
import { HintUI } from "../HintUI/HintUI";
import Markdown from "react-markdown";

// Styles for Emotional Intelligence components
const EmotionalIntelligenceStyles = {
  Header: { backgroundColor: "black", color: "white" },
  Body: { backgroundColor: "black", color: "white" },
  EmotionHeader: {
    backgroundColor: "black",
    color: "white",
    borderBottom: "0px solid transparent",
    borderRight: "2px solid lavender",
    borderLeft: "2px solid lavender",
    borderTop: "2px solid lavender",
  },
  EmotionBody: {
    backgroundColor: "black",
    color: "white",
    borderRight: "2px solid lavender",
    borderLeft: "2px solid lavender",
    height: 500,
  },
  EmotionFooter: {
    backgroundColor: "black",
    color: "white",
    borderTop: "1px solid transparent",
    borderRight: "2px solid lavender",
    borderLeft: "2px solid lavender",
    borderBottom: "2px solid lavender",
  },
};

const promptMap = {
  quiz: "Students are having a challenging open-note quiz with you. Keep your guidance brief but effective in order to inspire creative thinking. I will provide the questions students are working on, but do not mention them in any circumstance, it is only for context: \n\n",
};

const gatherConversationContext = (children) => {
  let result = [];
  children?.forEach((child) => {
    if (typeof child === "string") result.push(child);
  });
  return result;
};

const customInstructions = ({ type, messageContext }) => {
  let instructions = `${promptMap[type]}`;
  let humanReadableContext = messageContext.join("\n\n");
  return instructions + humanReadableContext;
};

const Chat = ({ conversation, gradeResult, messages }) => {
  const requestStyle = {
    textAlign: "left",
    backgroundColor: "#4003ba",
    padding: "20px",
    borderTopLeftRadius: "50px",
    borderTopRightRadius: "50px",
    borderBottomLeftRadius: "50px",
    borderBottomRightRadius: "0px",
    marginBottom: "10px",
    maxWidth: "70%",
    alignSelf: "flex-end",
  };

  const responseStyle = {
    textAlign: "left",
    backgroundColor: "#2C2C2E",
    color: "white",
    padding: "20px",
    borderRadius: "10px",
    marginBottom: "10px",
    maxWidth: "95%",
    alignSelf: "flex-start",
    borderBottomLeftRadius: "0px",
    borderTopLeftRadius: "50px",
    borderTopRightRadius: "50px",
    borderBottomRightRadius: "50px",
  };

  const loadingStyle = {
    textAlign: "left",
    backgroundColor: "black",
    color: "white",
    padding: "10px",
    borderRadius: "10px",
    marginBottom: "10px",
    maxWidth: "70%",
    alignSelf: "flex-start",
    borderBottomRightRadius: "0px",
    borderTopLeftRadius: "50px",
    borderTopRightRadius: "50px",
    borderBottomLeftRadius: "50px",
  };

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    padding: "15px",
    backgroundColor: "black",
    overflowY: "scroll",
    height: 300,
  };

  const topRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: "instant" });
    }
  }, [conversation]);

  // Scroll to the bottom of the messages container whenever messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "instant" });
    }
  }, [messages]);

  return conversation ? (
    <div style={containerStyle}>
      {conversation?.map((item, index) => (
        <React.Fragment key={index}>
          {item?.request && (
            <div style={requestStyle}>
              {" "}
              <div ref={topRef}></div>
              {item.request}
            </div>
          )}
          <div style={item.response.length > 0 ? responseStyle : loadingStyle}>
            {item.response.length > 0 ? (
              <>
                <Markdown key={index}>{item.response}</Markdown>
              </>
            ) : (
              <RoxanaLoadingAnimation />
            )}
          </div>
          {messages?.length > 0 && isEmpty(item.response) && (
            <div style={{ whiteSpace: "pre-wrap" }}>
              {messages.map((msg, index) =>
                index === 0 ||
                index % 2 === 0 ||
                index !== messages.length - 1 ? null : (
                  <Markdown key={index}>{msg.content}</Markdown>
                )
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  ) : null;
};

const ConversationGrader = ({
  conversationInput,
  setConversationInput,
  conversation,
  gradeResult,
  messages,
}) => (
  <>
    <Chat
      conversation={conversation}
      gradeResult={gradeResult}
      messages={messages}
    />
    <Form.Control
      as="textarea"
      rows={3}
      onChange={(event) => setConversationInput(event.target.value)}
      value={conversationInput}
    />
  </>
);

export const ChatBlock = ({ children, type = "quiz", hasTutorial = false }) => {
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
  });

  const zapAnimation = useZapAnimation();
  const [isConversationContextWindowOpen, setIsConversationContextWindowOpen] =
    useState(false);
  const [conversationInput, setConversationInput] = useState("");
  const [conversation, setConversation] = useState([]);
  const [chatGptResponse, setChatGptResponse] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [gradeResult, setGradeResult] = useState("");
  const [isGrading, setIsGrading] = useState(false);
  const [boxShadow, setBoxShadow] = useState(false);

  let messageContext = gatherConversationContext(children);
  let instructions = customInstructions({ type, messageContext });

  const handleConversation = (grade = false) => {
    zapAnimation();
    const prompt = grade
      ? `This is the quiz ${messageContext.join(
          ""
        )}. This quiz is for context only. This is the stringified JSON of the conversation ${JSON.stringify(
          conversation
        )}. Please grade the conversation only with a score 0-10. Do not weigh the original quiz content under any circumstance. Be a tough grader. Strongly weigh the quality of the requests AND responses. The requests should be thoughtful and complete inquries. All questions in the quiz should be specifically talked about in the conversation. The amount of conversation indexes should match or exceed the amount of questions or topics asked in the quiz. If not, students should get points heavily deducted for that section. Report back what was done well and what could have been done better, outlining each question. Each question or topic is worth 10 points, for a total of the total amount of questions or topics. If questions or topics go unanswered, give a score of 0 and add it to the overall result.`
      : instructions +
        (conversation.length > 0
          ? `This is the stringified JSON of conversation so far: ${JSON.stringify(
              conversation
            )}. Answer this input only: ${conversationInput}`
          : `Answer this input only: ${conversationInput}`);

    if (grade) {
      setIsGrading(true);
      setConversation([
        ...conversation,
        { request: "pls grade our conversation 🙏", response: "" },
      ]);
    } else {
      setConversation([
        ...conversation,
        { request: conversationInput, response: "" },
      ]);
    }

    setConversationInput("");
    submitPrompt([{ role: "user", content: prompt }]);
  };

  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];

      if (!lastMessage.meta.loading) {
        const result = lastMessage.content;
        const newResponse = { request: conversationInput, response: result };
        setConversation((prevConversation) => {
          const updatedConversation = [...prevConversation];
          updatedConversation[updatedConversation.length - 1].response = result;
          return updatedConversation;
        });
        setIsGrading(false);
      }
    }
  }, [messages]);

  return (
    <div
      style={{
        width: "100%",
        borderRadius: "50px",
        backgroundColor: japaneseThemePalette.PowerPurple,
        padding: 24,
        boxShadow: "4px 4px 5px 0px rgba(0,0,0,0.75)",
      }}
    >
      <Button
        variant="dark"
        style={{
          width: 48,
          height: 48,
          textShadow: "1px 1px 1px black",
          borderBottom: boxShadow
            ? "2px solid transparent"
            : `2px solid ${japaneseThemePalette.CobaltBlue}`,
        }}
        onMouseEnter={() => setBoxShadow(true)}
        onMouseLeave={() => setBoxShadow(false)}
        onMouseDown={() => setIsModalOpen(true)}
      >
        💎
      </Button>
      <br />
      {hasTutorial && (
        <HintUI
          message={
            "The conversation quiz will grade your curiosity and provide feedback."
          }
        />
      )}
      <br />
      <Modal
        centered
        show={isModalOpen}
        onHide={() => setIsModalOpen(false)}
        keyboard={true}
        style={{ zIndex: 1000000 }}
        size="lg"
      >
        <Modal.Header
          closeButton
          closeVariant="white"
          style={{
            backgroundColor: "black",
            color: "white",
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            borderTop: "2px solid lavender",
            borderLeft: "2px solid lavender",
            borderRight: "2px solid lavender",
            borderBottom: "1px solid black",
          }}
        >
          <Modal.Title style={{ fontFamily: "Bungee" }}>Quiz</Modal.Title>
          &nbsp;&nbsp; &nbsp;
          <Button
            variant="primary"
            onMouseDown={() => handleConversation(true)}
            disabled={isGrading || loading}
          >
            Grade
          </Button>
        </Modal.Header>
        <Modal.Body
          style={{
            backgroundColor: "black",
            color: "white",
            padding: 24,
            borderLeft: "2px solid lavender",
            borderRight: "2px solid lavender",
          }}
        >
          <div
            style={{
              border: "3px solid pink",
              cursor: "pointer",
              ...textBlock(japaneseThemePalette.FujiSanBlue, 0, 12),
              boxShadow: " -4px -5px 0px 0px rgba(9,0,255,1)",
              padding: 6,
            }}
            onMouseDown={() => setIsConversationContextWindowOpen(true)}
          >
            View quiz
          </div>
          <ConversationGrader
            conversationInput={conversationInput}
            setConversationInput={setConversationInput}
            conversation={conversation}
            gradeResult={gradeResult}
            messages={messages}
          />
        </Modal.Body>
        <Modal.Footer
          style={{
            backgroundColor: "black",
            borderBottom: "2px solid lavender",
            borderLeft: "2px solid lavender",
            borderRight: "2px solid lavender",
            borderTop: "1px solid black",
          }}
        >
          <Button
            variant="dark"
            onMouseDown={() => handleConversation(false)}
            disabled={isGrading || loading}
          >
            Add to conversation
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={isConversationContextWindowOpen}
        centered
        keyboard
        onHide={() => setIsConversationContextWindowOpen(false)}
        style={{ zIndex: 100000000 }}
      >
        <Modal.Header
          closeButton
          closeVariant="white"
          style={EmotionalIntelligenceStyles.EmotionHeader}
        >
          <Modal.Title style={{ fontFamily: "Bungee" }}>
            Conversation Context
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            ...EmotionalIntelligenceStyles.EmotionBody,
            overflow: "scroll",
          }}
        >
          {children}
        </Modal.Body>
        <Modal.Footer style={EmotionalIntelligenceStyles.EmotionFooter}>
          <Button
            variant="dark"
            onMouseDown={() => setIsConversationContextWindowOpen(false)}
          >
            Exit
          </Button>
        </Modal.Footer>
      </Modal>
      <br /> <br />
      {children}
    </div>
  );
};
