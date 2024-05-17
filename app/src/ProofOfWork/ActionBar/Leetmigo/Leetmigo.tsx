import React, { useEffect, useRef, useState } from "react";
import { Modal } from "react-bootstrap";

import { Title } from "../../../common/svgs/Title";

import { responsiveBox } from "../../../styles/lazyStyles";

import { ExternalLink } from "../../../common/ui/Elements/ExternalLink/ExternalLink";
import { RenderLeetmigo } from "./Leetmigo.render";

export const Leetmigo = ({
  isLeetmigoOpen,
  setIsLeetmigoOpen,
  userStateReference,
  globalStateReference,
  zap,
  handleZap,
  setIsStartupOpen,
}) => {
  return (
    <Modal
      centered
      show={isLeetmigoOpen}
      style={{ backgroundColor: "black" }}
      fullscreen
      keyboard
      onHide={() => {
        setIsLeetmigoOpen(false);
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
            setIsLeetmigoOpen(false);
          }}
          title="Super Practice Mode (Experimental)"
        />
      </Modal.Header>
      <Modal.Body
        style={{
          backgroundColor: "black",
          color: "white",
        }}
      >
        <p
          style={{ ...responsiveBox, backgroundColor: "#4003ba", padding: 24 }}
        >
          <b>
            {" "}
            Leetmigo is a seperate platform that helps people prepare for
            technical interviews and advanced computer science education. They
            give us the chance to decentralize data so you can migrate your
            progress to other platforms. Learn more & connect with the creator:
          </b>
        </p>
        <br />
        <ExternalLink
          link="https://leetmigo.com"
          textDisplay={"leetmigo.com"}
        />
        <br />
        <br />
        <ExternalLink
          link="https://twitter.com/nilofalvarado"
          textDisplay={"Social media"}
        />

        <br />
        <br />
        <br />

        <RenderLeetmigo />
      </Modal.Body>
    </Modal>
  );
};
