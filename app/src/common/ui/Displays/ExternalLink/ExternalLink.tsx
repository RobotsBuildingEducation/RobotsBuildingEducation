import React from "react";

export const ExternalLink = ({ textDisplay, link }) => {
  return (
    <a
      target="_blank"
      style={{
        border: "1px solid teal",
        color: "white",
        backgroundColor: "teal",
        borderRadius: "12px",
        padding: 12,
      }}
      href={link}
    >
      {textDisplay}
    </a>
  );
};
