import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useStore } from "../../../../Store";
import RandomCharacter from "../RandomCharacter/RandomCharacter";
import { paddingBlock } from "../../../../styles/lazyStyles";
import { uiCollections } from "../../../uiSchema";
import { updateDoc } from "firebase/firestore";
import { ExternalLink } from "../ExternalLink/ExternalLink";

function PasscodeChecker({ setIsGlobalModalActive, userStateReference }) {
  const [input, setInput] = useState("");
  const [isValid, setIsValid] = useState(null);

  const correctPasscode =
    import.meta.env.VITE_PATREON_PASSCODE ||
    import.meta.env.VITE_BITCOIN_PASSCODE;

  // let lecture =
  //   uiCollections.Entrepeneur["Investing & Business"]["Focus Investing"];

  let unlockEverything = async () => {
    await updateDoc(userStateReference.userDocumentReference, {
      unlocks: {
        Philosophy: true,
        "Learning Mindset & Perspective": true,
        "Lesson 3 Backend Engineering": true,
        "Lesson 5 Computer Science": true,
        "Resume Writing": true,
        "Lesson 4 Building Apps & Startups": true,
        "Lesson 2 Frontend Programming": true,
        "Focus Investing": true,
        "Interactions & Design": true,
        "Lesson 1 Coding Fundamentals": true,
        "The Psychology Of Self-esteem": true,
      },
      watches: {
        Philosophy: true,
        "Learning Mindset & Perspective": true,
        "Resume Writing": true,
        "Lesson 1 Coding Fundamentals": true,
        "Lesson 3 Backend Engineering": true,
        "Interactions & Design": true,
        "Lesson 5 Computer Science": true,
        "Focus Investing": true,
        "Lesson 4 Building Apps & Startups": true,
        "Lesson 2 Frontend Programming": true,
        "The Psychology Of Self-esteem": true,
      },
      progress: {
        "Lesson 3 Backend Engineering": true,
        "Focus Investing": true,
        "Lesson 2 Frontend Programming": true,
        "Lesson 4 Building Apps & Startups": true,
        "Interactions & Design": true,
        "Resume Writing": true,
        "Lesson 1 Coding Fundamentals": true,
        "The Psychology Of Self-esteem": true,
        "Lesson 5 Computer Science": true,
        "Learning Mindset & Perspective": true,
        Philosophy: true,
      },
    });

    // await updateWebNodeRecord(web5Reference, dwnRecordSet, unlocks);

    userStateReference.setDatabaseUserDocument((prevDoc) => ({
      ...prevDoc,
      unlocks: {
        Philosophy: true,
        "Learning Mindset & Perspective": true,
        "Lesson 3 Backend Engineering": true,
        "Lesson 5 Computer Science": true,
        "Resume Writing": true,
        "Lesson 4 Building Apps & Startups": true,
        "Lesson 2 Frontend Programming": true,
        "Focus Investing": true,
        "Interactions & Design": true,
        "Lesson 1 Coding Fundamentals": true,
        "The Psychology Of Self-esteem": true,
      },
    }));

    setIsGlobalModalActive(false);
  };

  useEffect(() => {
    if (input === correctPasscode) {
      localStorage.setItem("patreonPasscode", input);
      if (localStorage.getItem("uniqueId") === "did:key:shared_global_account")
        unlockEverything();

      // handleModuleSelection(lecture, "Focus Investing");
    }
  }, [input]);

  return (
    <Form>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Enter Passcode</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter passcode"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </Form.Group>
      <br />
    </Form>
  );
}
export const GlobalModal = ({ userStateReference }) => {
  const { isGlobalModalActive, setIsGlobalModalActive, modalContent } =
    useStore();

  const handleClose = () => setIsGlobalModalActive(false);

  //   const [show, setShow] = useState(false);s

  //   const handleClose = () => setShow(false);
  //   const handleShow = () => setShow(true);

  return (
    <>
      {/* <Button variant="primary" onMouseDown={handleShow}>
        Launch demo modal
      </Button> */}

      <Modal show={isGlobalModalActive} onHide={handleClose} centered>
        <Modal.Header
          closeButton
          closeVariant="white"
          style={{
            backgroundColor: "black",
            color: "white",
            border: "1px solid black",
          }}
        >
          <Modal.Title style={{ display: "flex", alignItems: "center" }}>
            <RandomCharacter />
            &nbsp;a message from rox
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "black", color: "white" }}>
          <div style={paddingBlock("#500CB5")}>{modalContent.message}</div>
          {/* {JSON.stringify(modalContent)} */}

          <br />
          <br />
          <ExternalLink
            color={"#500CB5"}
            textDisplay={"Access passcode"}
            link={
              "https://www.patreon.com/posts/passcode-to-101201134?utm_medium=clipboard_copy&utm_source=copyLink&utm_campaign=postshare_creator&utm_content=join_link"
            }
          />
          <br />
          <br />
          <PasscodeChecker
            setIsGlobalModalActive={setIsGlobalModalActive}
            userStateReference={userStateReference}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};
