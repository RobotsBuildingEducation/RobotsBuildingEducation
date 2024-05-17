import React, { useEffect, useRef, useState } from "react";
import { Button, Modal, Spinner, Form, Row, Col } from "react-bootstrap";
import styled from "styled-components";
import { Title } from "../../../common/svgs/Title";
import { collection, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { database } from "../../../database/firebaseResources";
import { customInstructions } from "./AdaptiveLearning.compute";
import { postInstructions } from "../../../common/uiSchema";
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
  const [apiResponse, setApiResponse] = useState(null);
  const [instructions, setInstructions] = useState(
    "The individual has collected this knowledge while learning how to build a startup from scratch. Generally speaking, they're starting with code first and need to learn that. This later includes a number of skills like coding, business, investing, design, philosophy, resume writing, and psychology. The idea is to provide real time feedback and suggestions as an individual learns more skills and gains awareness of the challenge. You have a maximum of 3 sentences. This is the following knowledge they've collected so far:"
  );
  const [isEditing, setIsEditing] = useState(false);
  const [areInstructionsSaving, setAreInstructionsSaving] = useState(false);
  const userId = localStorage.getItem("uniqueId");

  const [isExiting, setIsExiting] = useState(false);

  const fetchUpdate = async (data) => {
    setIsLoading(true);

    let prompt = customInstructions(instructions, data);

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
      });

      setIsEditing(false);
      setAreInstructionsSaving(false);
      fetchUpdate(knowledgeData);
    } catch (error) {
      console.error("Error saving instructions: ", error);
    }
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
          handleZapAnimation();
        } else {
          isFirstRender.current = false;
        }

        if (
          isAdaptiveLearningOpen
          //    &&
          //   window.location.hostname === "robotsbuildingeducation.com"
        ) {
          fetchUpdate(data);
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
    if (isLoading) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [isLoading]);

  console.log("knowledge data", knowledgeData);
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
          title="Adaptive Learning (Experimental)"
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
          {isLoading ? (
            <>
              <RoxanaLoadingAnimation />
              <br />
              <br />
            </>
          ) : !isLoading && apiResponse ? (
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
                <strong>Recommendation</strong>
                <div>{apiResponse}</div>
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
                <Button
                  variant="primary"
                  onClick={handleSaveInstructions}
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
                  onClick={() => setIsEditing(false)}
                  style={{ marginTop: "10px", marginLeft: "10px" }}
                >
                  Cancel
                </Button>
              </Col>
            </Form.Group>
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
            <strong>Instructions</strong>
            <p>{instructions}</p>
            <div
              style={{ cursor: "pointer", padding: 20 }}
              onClick={() => setIsEditing(true)}
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
