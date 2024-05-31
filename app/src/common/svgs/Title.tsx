import React, { useState } from "react";
import { Modal } from "react-bootstrap";

export const Title = ({ closeFunction, title }) => {
  const [isHovered, setIsHovered] = useState(false);

  const styleNormal = {
    cursor: "pointer",
    transform: "scale(1)", // Normal size
    transition: "transform 0.18s ease-in-out", // Smooth transformation
  };

  const styleHovered = {
    cursor: "pointer",
    transform: "scale(1.2)", // 10% larger on hover
    transition: "transform 0.18s ease-in-out", // Smooth transformation
  };
  return (
    <div
      style={{
        color: "white",
        fontSize: 36,
        display: "flex",
        fontFamily: "Bungee",
        alignItems: "center",
      }}
    >
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={isHovered ? styleHovered : styleNormal}
        onMouseDown={() => closeFunction()}
      >
        &#8592;
      </div>
      &nbsp;
      <Modal.Title>{title}</Modal.Title>
      {/* &#8678; */}
    </div>
  );
};
