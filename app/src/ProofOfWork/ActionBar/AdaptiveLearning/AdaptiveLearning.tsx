import React, { useEffect, useRef, useState } from "react";
import { Button, Modal, Spinner, Form, Row, Col } from "react-bootstrap";
import styled from "styled-components";
import { Title } from "../../../common/svgs/Title";
import { collection, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { database } from "../../../database/firebaseResources";
import { customInstructions } from "./AdaptiveLearning.compute";
import {
  RoxanaLoadingAnimation,
  completeZapEvent,
  updateImpact,
} from "../../../App.compute";
import {
  japaneseThemePalette,
  responsiveBox,
  textBlock,
} from "../../../styles/lazyStyles";
import { EditIcon } from "../../../common/svgs/EditIcon";
import { useZap, useZapAnimation } from "../../../App.hooks";

import Markdown from "react-markdown";
import { useChatStream } from "../../../common/ui/Elements/Stream/useChatCompletion";
import { postInstructions } from "../../../common/uiSchema";

export const AdaptiveLearning = ({
  isAdaptiveLearningOpen,
  setIsAdaptiveLearningOpen,
  userStateReference,
  globalStateReference,
  zap,
  handleZap,
}) => {
  const handleZapAnimation = useZapAnimation();

  const isFirstRender = useRef(true);
  const [knowledgeData, setKnowledgeData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [instructions, setInstructions] = useState(
    "The individual has collected this knowledge represented in JSON while learning how to build a business or goal from scratch. In a minimalist markdown, where the biggest headers are ####, recommend the next best possible action to generate revenue, income or success in up to 3 sentences based on what the individual's goals or business is. Then have a section that generates an execution strategy and another section that explains your thought process."
  );
  const [isEditing, setIsEditing] = useState(false);
  const [areInstructionsSaving, setAreInstructionsSaving] = useState(false);
  const userId = localStorage.getItem("uniqueId");
  const [businessGoal, setBusinessGoal] = useState("learning how to code.");
  const [isExiting, setIsExiting] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);

  // Initialize the chat stream
  const { messages, loading, submitPrompt, resetMessages } = useChatStream({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    model: "gpt-4o",
    temperature: 0.9,
    // response_format: { type: "json_object" },
  });
  const fetchUpdate = async (data) => {
    setIsLoading(true);

    let prompt = customInstructions(instructions, data, businessGoal);

    try {
      const response = await fetch(postInstructions.url, {
        method: postInstructions.method,
        headers: postInstructions.headers,
        body: JSON.stringify({ prompt }),
      })
        .then((response) => {
          if (
            localStorage.getItem("patreonPasscode") ===
            import.meta.env.VITE_BITCOIN_PASSCODE
          ) {
            zap();
            setIsLoading(false);
          }

          return response;
        })
        .catch(() => {
          setIsLoading(false);
        });

      completeZapEvent(
        zap,
        updateImpact,
        userStateReference,
        globalStateReference
      );

      const responseData = await response.json();

      setApiResponse(responseData?.bot?.content);
    } catch (error) {
      console.error("Error fetching update: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveInstructions = async () => {
    try {
      setAreInstructionsSaving(true);
      const userDocRef = doc(database, "users", userId);
      await updateDoc(userDocRef, {
        "learning.instructions": instructions,
        "learning.business": businessGoal,
      });

      setIsEditing(false);
      setAreInstructionsSaving(false);
      // fetchUpdate(knowledgeData);
      handleSubmit(knowledgeData);
    } catch (error) {
      console.error("Error saving instructions: ", error);
    }
  };

  const handleSubmit = async (data) => {
    setIsLoading(true);
    resetMessages();

    let prompt = customInstructions(instructions, data, businessGoal);

    submitPrompt([{ role: "user", content: prompt }]);
  };

  useEffect(() => {
    const userDocRef = doc(database, "users", userId);
    const knowledgeCollectionRef = collection(userDocRef, "knowledge");

    const unsubscribe = onSnapshot(userDocRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const userData = docSnapshot.data();
        if (userData.learning && userData.learning.instructions) {
          setInstructions(userData.learning.instructions);
        }
        if (userData.learning && userData.learning.business) {
          setBusinessGoal(userData.learning.business);
        }
      }
    });

    const unsubscribeKnowledge = onSnapshot(
      knowledgeCollectionRef,
      (snapshot) => {
        let data = snapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .sort((a, b) => Number(a.step) - Number(b.step))
          .reverse(); // Sort by step, converting strings to numbers

        // remove any duplicate IDs
        data = Array.from(
          new Map(data.map((item) => [item.id, item])).values()
        );

        setKnowledgeData(data);

        if (!isFirstRender.current && !isAdaptiveLearningOpen && !isExiting) {
          //   handleZapAnimation();
        } else {
          isFirstRender.current = false;
        }

        if (
          isAdaptiveLearningOpen
          //   &&
          //   window.location.hostname === "robotsbuildingeducation.com"
        ) {
          handleSubmit(data);
        }
      }
    );

    setIsExiting(false);
    return () => {
      unsubscribe();
      unsubscribeKnowledge();
    };
  }, [isAdaptiveLearningOpen, userId]);

  useEffect(() => {
    if (loading) {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [loading]);

  useEffect(() => {
    if (messages?.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (!lastMessage.meta.loading) {
        // const result = JSON.parse(lastMessage.content);
        setApiResponse(lastMessage.content);
        setIsLoading(false);
      }
    }
  }, [messages]);

  return (
    <Modal
      centered
      show={isAdaptiveLearningOpen}
      style={{ backgroundColor: "black" }}
      fullscreen
      keyboard
      onHide={() => {
        setIsExiting(true);
        setIsAdaptiveLearningOpen(false);
      }}
    >
      <Modal.Header
        style={{
          backgroundColor: "black",
          color: "white",
          borderBottom: "1px solid black",
        }}
        closeVariant="white"
        closeButton
      >
        <Title
          closeFunction={() => {
            setIsExiting(true);
            setIsAdaptiveLearningOpen(false);
          }}
          title="💭 Adaptive Learning"
        />
      </Modal.Header>
      <Modal.Body
        style={{
          backgroundColor: "black",
          color: "white",
        }}
      >
        <p style={responsiveBox}>
          Adaptive learning is a system that recommends next steps based on an
          individual's learning.
        </p>
        <div>
          {loading ? (
            <>
              <RoxanaLoadingAnimation header={"Creating and designing 🌀"} />
              <br />
              <br />
              <div style={{ whiteSpace: "pre-wrap" }}>
                {messages
                  ?.map((msg, index) =>
                    index === 0 ||
                    index % 2 === 0 ||
                    index !== messages.length - 1 ? null : (
                      <p
                        key={index}
                        style={{
                          ...responsiveBox,
                          textAlign: "left",
                          color: "white",
                          padding: "35px",
                          borderRadius: "10px",
                          marginBottom: "10px",
                          alignSelf: "flex-start",
                          borderBottomLeftRadius: "0px",
                          borderTopLeftRadius: "50px",
                          borderTopRightRadius: "50px",
                          borderBottomRightRadius: "50px",
                        }}
                      >
                        <Markdown>{msg.content}</Markdown>
                      </p>
                    )
                  )
                  .reverse()}
              </div>
            </>
          ) : apiResponse ? (
            <div style={{ marginTop: "24px", color: "white" }}>
              <p
                style={{
                  ...responsiveBox,
                  textAlign: "left",
                  backgroundColor: "#2C2C2E",
                  color: "white",
                  padding: "35px",
                  borderRadius: "10px",
                  marginBottom: "10px",
                  alignSelf: "flex-start",
                  borderBottomLeftRadius: "0px",
                  borderTopLeftRadius: "50px",
                  borderTopRightRadius: "50px",
                  borderBottomRightRadius: "50px",
                }}
              >
                <Markdown>{apiResponse}</Markdown>
              </p>
              <br />
              <br />
            </div>
          ) : null}
        </div>
        {isEditing ? (
          <Form style={{ ...responsiveBox }}>
            <Form.Group as={Row} controlId="instructions">
              <Form.Label column sm="2" style={{ color: "white" }}>
                Instructions
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  placeholder="Instructions inform how rox responds to the learning you've created."
                  as="textarea"
                  rows={12}
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  style={{ backgroundColor: "black", color: "white" }}
                />

                <Col sm="10">
                  <Form.Control
                    placeholder="Describe your goal or startup idea."
                    as="textarea"
                    rows={3}
                    value={businessGoal}
                    onChange={(e) => setBusinessGoal(e.target.value)}
                    style={{ backgroundColor: "black", color: "white" }}
                  />
                </Col>

                <Button
                  variant="primary"
                  onMouseDown={handleSaveInstructions}
                  style={{ marginTop: "10px" }}
                >
                  {areInstructionsSaving ? (
                    <Spinner size="sm" />
                  ) : (
                    "Save Instructions"
                  )}
                </Button>
                <Button
                  variant="secondary"
                  onMouseDown={() => setIsEditing(false)}
                  style={{ marginTop: "10px", marginLeft: "10px" }}
                >
                  Cancel
                </Button>
              </Col>
            </Form.Group>
            <br />
            <br />
          </Form>
        ) : (
          <div
            style={{
              padding: "35px",
              backgroundColor: "#4003ba",
              borderRadius: "50px",
              color: "white",

              ...responsiveBox,
            }}
          >
            <strong>Goal/Startup Idea</strong>
            <p>{businessGoal}</p>
            <br />
            <strong>Instructions</strong>
            <p>{instructions}</p>

            <div
              style={{ cursor: "pointer", padding: 20 }}
              onMouseDown={() => setIsEditing(true)}
            >
              <EditIcon /> <b>Edit instructions</b>
            </div>
          </div>
        )}
        <br />
        <br />
        <div>
          {knowledgeData.length > 0 ? (
            knowledgeData.map((knowledge) => (
              <div
                key={knowledge.id}
                style={{ marginBottom: "10px", ...responsiveBox }}
              >
                <p>
                  <strong>
                    {knowledge.step}. {knowledge.label}
                  </strong>
                </p>
                <p>{knowledge.knowledge}</p>
                <hr style={{ borderColor: "white" }} />
              </div>
            ))
          ) : (
            <p>No data available</p>
          )}
        </div>
        <br />
        <br />
        <br />
        <br /> <br />
        <br />
      </Modal.Body>
    </Modal>
  );
};
