import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useStore } from "../../../../Store";
import RandomCharacter from "../RandomCharacter/RandomCharacter";
import { paddingBlock } from "../../../../styles/lazyStyles";

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
        </Modal.Body>
      </Modal>
    </>
  );
};
