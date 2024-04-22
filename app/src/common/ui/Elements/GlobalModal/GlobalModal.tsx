import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useStore } from "../../../../Store";

export const GlobalModal = ({}) => {
  const { isGlobalModalActive, setIsGlobalModalActive, modalContent } =
    useStore();

  const handleClose = () => setIsGlobalModalActive(false);

  //   const [show, setShow] = useState(false);s

  //   const handleClose = () => setShow(false);
  //   const handleShow = () => setShow(true);

  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}

      <Modal show={isGlobalModalActive} onHide={handleClose} centered>
        <Modal.Header
          closeButton
          closeVariant="white"
          closeButton
          style={{ backgroundColor: "black", color: "white" }}
        >
          <Modal.Title>A message from rox</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "black", color: "white" }}>
          Good job
          {JSON.stringify(modalContent)}
        </Modal.Body>
      </Modal>
    </>
  );
};
