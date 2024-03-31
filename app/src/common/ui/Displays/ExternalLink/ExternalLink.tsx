import React from "react";

export const ExternalLink = ({ textDisplay, link, color = "teal" }) => {
  return (
    <a
      target="_blank"
      style={{
        border: `1px solid ${color}`,
        color: "white",
        backgroundColor: color,
        borderRadius: "12px",
        padding: 12,
        textShadow: "0px 0px 0px black",
      }}
      href={link}
    >
      {textDisplay}
    </a>
  );
};
