import React, { useEffect, useState } from "react";
import { Modal, Button, Alert, Form } from "react-bootstrap";

import RandomCharacter from "../common/ui/Elements/RandomCharacter/RandomCharacter";
import { paddingBlock } from "../styles/lazyStyles";
import { uiCollections } from "../common/uiSchema";
import { ExternalLink } from "../common/ui/Elements/ExternalLink/ExternalLink";

function PasscodeChecker({ setIsLocalModalActive, handleModuleSelection }) {
  const [input, setInput] = useState("");
  const [isValid, setIsValid] = useState(null);

  const correctPasscode =
    import.meta.env.VITE_PATREON_PASSCODE ||
    import.meta.env.VITE_BITCOIN_PASSCODE;

  let lecture =
    uiCollections.Entrepeneur["Understanding Business"]["Focus Investing"];

  useEffect(() => {
    if (input === correctPasscode) {
      localStorage.setItem("patreonPasscode", input);

      setIsLocalModalActive(false);
      handleModuleSelection(lecture, "Focus Investing");
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

export const PasscodeModal = ({
  isLocalModalActive,
  setIsLocalModalActive,
  handleModuleSelection,
}) => {
  const handleClose = () => setIsLocalModalActive(false);

  return (
    <>
      <Modal show={isLocalModalActive} onHide={handleClose} centered>
        <Modal.Header
          closeButton
          closeVariant="white"
          closeButton
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
          <div style={paddingBlock("#500CB5")}>
            Time is money friend. You'll need to subscribe in order to access
            this lecture.
            <br />
            <br />
            <ExternalLink
              color="#6F018E"
              textDisplay={"Access passcode"}
              link={
                "https://www.patreon.com/posts/passcode-to-101201134?utm_medium=clipboard_copy&utm_source=copyLink&utm_campaign=postshare_creator&utm_content=join_link"
              }
            />
          </div>
          <br />
          {/* {JSON.stringify(modalContent)} */}
          <PasscodeChecker
            setIsLocalModalActive={setIsLocalModalActive}
            handleModuleSelection={handleModuleSelection}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};
