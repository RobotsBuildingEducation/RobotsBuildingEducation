import { Modal, Form, Button } from "react-bootstrap";
import React, { useState } from "react";
import {
  createPrompt,
  formatLabel,
  generatePromptBasedOnSwitches,
} from "./Experimental.compute";

export const Experimental = ({ isCofounderOpen, setIsCofounderOpen }) => {
  const [switchStates, setSwitchStates] = useState({
    softwareEngineer: false,
    contentCreator: false,
    executiveAssistant: false,
    investor: false,
  });
  const [additionalContext, setAdditionalContext] = useState("");

  const handleSwitchChange = (role) => {
    setSwitchStates((prev) => ({ ...prev, [role]: !prev[role] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process the form data here, such as sending it to a backend or logging it

    const prompt = generatePromptBasedOnSwitches(switchStates);
    createPrompt(prompt);
    console.log(switchStates, additionalContext);
    // Clear form or provide feedback to user
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
        style={{ color: "white", backgroundColor: "black" }}
      >
        <Modal.Title>Co-founder</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ color: "white", backgroundColor: "black" }}>
        <Form onSubmit={handleSubmit}>
          <h4>Choose your role:</h4>
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
          <Form.Group className="mb-3" controlId="additionalContext">
            <Form.Label>Additional Context</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={additionalContext}
              onChange={(e) => setAdditionalContext(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
