import React from "react";
import { LinkIcon } from "../../../svgs/LinkIcon";

export const ExternalLink = ({
  textDisplay,
  link,
  color = "#4003ba",
  isPremium = false,
  width = null,
}) => {
  if (isPremium) {
    return (
      <a
        target="_blank"
        style={
          {
            // border: `1px solid ${color}`,
            // color: "white",
            // backgroundColor: color,
            // borderRadius: "12px",
            // padding: 12,
            // textShadow: "0px 0px 0px black",
          }
        }
        href={link}
      >
        <img
          style={{
            borderRadius: "48px",
            boxShadow: "0px 0.5px 0.5px 1px black",
          }}
          width={width ? width : "100%"}
          src={textDisplay}
        />
      </a>
    );
  }
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
      <>
        <LinkIcon /> {textDisplay}
      </>
    </a>
  );
};

/***
 * 
 * 
 *      {!isPremium ? (
 * 
 * 
 * : (
        <img
          width="100%"
          src={
            "https://c7.patreon.com/https%3A%2F%2Fwww.patreon.com%2F%2Fcard-teaser-image%2Fpost%2F93082226%2Flandscape%3Fc=5377103248202870015/selector/%23post-teaser%2C.png"
          }
        />
      )}
 */
