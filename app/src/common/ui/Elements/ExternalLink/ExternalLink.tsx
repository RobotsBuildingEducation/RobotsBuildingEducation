import React from "react";
import { LinkIcon } from "../../../svgs/LinkIcon";

export const ExternalLink = ({ textDisplay, link, color = "#4003ba" }) => {
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
      <LinkIcon /> {textDisplay}
    </a>
  );
};
