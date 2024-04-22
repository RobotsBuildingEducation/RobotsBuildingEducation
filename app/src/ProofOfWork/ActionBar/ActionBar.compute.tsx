import { Button, Form } from "react-bootstrap";
import isEmpty from "lodash/isEmpty";
import roxanaChat from "../../common/media/images/roxanaChat.png";

import { logEvent } from "firebase/analytics";

import { decentralizedEducationTranscript } from "../../App.constants";

import { FadeInComponent, japaneseThemePalette } from "../../styles/lazyStyles";
import { analytics } from "../../database/firebaseResources";
import { useState } from "react";

export const renderTranscriptAwards = (profileData) => {
  if (isEmpty(profileData)) {
    return (
      <div>
        No data is available. <br />
        <br />
      </div>
    );
  }

  let awards = [];

  for (const key in decentralizedEducationTranscript) {
    awards.push(
      <div
        id={`${key}`}
        label={`${key}`}
        style={{
          width: 125,
          height: 125,
          backgroundColor: profileData[key]
            ? "rgba(13,41,179, 1)"
            : "rgba(206, 206, 214,0.3)",
          margin: 2,
          border: profileData[key]
            ? "5px solid rgba(0,0,255, 1)"
            : "5px solid gray",
          borderRadius: "20%",
          padding: 5,
        }}
      >
        {key}
      </div>
    );
  }

  return awards;
};

export const renderCheckboxes = (profileData) => {
  let checkboxes = [];

  if (isEmpty(profileData)) {
    return (
      <div>
        No data is available. <br />
        <br />
      </div>
    );
  }

  for (const key in profileData) {
    if (profileData[key]) {
      checkboxes.push(
        <Form.Check
          type="checkbox"
          id={`${key}`}
          label={`${key}`}
          checked={profileData[key]}
          readOnly
        />
      );
    }
  }

  if (checkboxes.length < 1) {
    return (
      <div>
        rox doesn't see any proof of work yet. Have you not studied yet?😠{" "}
        <br />
      </div>
    );
  }

  return checkboxes;
};

export const RenderActionBarControls = ({
  displayName,
  setIsBossModeOpen,
  setIsCofounderOpen,
  setIsEmotionalIntelligenceOpen,
  setIsImpactWalletOpen,
  isStartupOpen,
  setIsStartupOpen,
}) => {
  const [isHovered, setIsHovered] = useState({
    bossMode: false,
    cofounder: false,
    chatLink: false,
    emotionalIntelligence: false,
    impactWallet: false,
    startup: false,
  });

  // Handler for mouse enter and leave
  const handleHover = (button, value) => {
    setIsHovered((prev) => ({ ...prev, [button]: value }));
  };
  return (
    <FadeInComponent>
      <span style={{ fontSize: "66%" }}>
        <b style={{ fontFamily: "Bungee" }}>
          {displayName
            ?.split(" ")
            ?.map((name) => name[0]?.toUpperCase())
            ?.join("")}
        </b>
      </span>
      {/* <Button
        style={{
          textShadow: "1px 1px 1px black",
          borderBottom: isHovered.bossMode
            ? "0px solid transparent"
            : `2px solid ${japaneseThemePalette.CobaltBlue}`,
        }}
        onClick={() => {
          logEvent(analytics, "select_content", {
            content_type: "button",
            item_id: "Boss Mode",
          });
          setIsBossModeOpen(true);
          setIsCofounderOpen(false);
          setIsEmotionalIntelligenceOpen(false);
          setIsImpactWalletOpen(false);
        }}
        variant="dark"
        onMouseEnter={() => handleHover("bossMode", true)}
        onMouseLeave={() => handleHover("bossMode", false)}
      >
        🫂
      </Button>
      &nbsp;&nbsp;&nbsp; */}
      <Button
        style={{
          textShadow: "1px 1px 1px black",
          borderBottom: isHovered.bossMode
            ? "0px solid transparent"
            : `2px solid ${japaneseThemePalette.CobaltBlue}`,
        }}
        onClick={() => {
          logEvent(analytics, "select_content", {
            content_type: "button",
            item_id: "Boss Mode",
          });
          setIsBossModeOpen(true);
          setIsCofounderOpen(false);
          setIsEmotionalIntelligenceOpen(false);
          setIsImpactWalletOpen(false);
        }}
        variant="dark"
        onMouseEnter={() => handleHover("bossMode", true)}
        onMouseLeave={() => handleHover("bossMode", false)}
      >
        💎
      </Button>
      &nbsp; &nbsp;
      <Button
        style={{
          textShadow: "1px 1px 1px black",
          borderBottom: isHovered.cofounder
            ? "0px solid transparent"
            : `2px solid ${japaneseThemePalette.CobaltBlue}`,
        }}
        onClick={() => {
          logEvent(analytics, "select_content", {
            content_type: "button",
            item_id: "Cofounder",
          });
          setIsCofounderOpen(true);
          setIsBossModeOpen(false);
          setIsEmotionalIntelligenceOpen(false);
          setIsImpactWalletOpen(false);
        }}
        variant="dark"
        onMouseEnter={() => handleHover("cofounder", true)}
        onMouseLeave={() => handleHover("cofounder", false)}
      >
        🌀
      </Button>
      &nbsp; &nbsp;
      <a
        href="https://chat.openai.com/g/g-09h5uQiFC-ms-roxana"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button
          style={{
            textShadow: "1px 1px 1px black",
            borderBottom: isHovered.chatLink
              ? "0px solid transparent"
              : `2px solid ${japaneseThemePalette.CobaltBlue}`,
          }}
          onClick={() => {
            logEvent(analytics, "select_content", {
              content_type: "button",
              item_id: "chatGPT_link",
            });
          }}
          variant="dark"
          onMouseEnter={() => handleHover("chatLink", true)}
          onMouseLeave={() => handleHover("chatLink", false)}
        >
          <img
            src={roxanaChat}
            alt="Chat with Ms. Roxana"
            width="16"
            style={{
              borderRadius: "50%",
              boxShadow: "1px 1px 1px black",
              marginBottom: 1,
            }}
          />
        </Button>
      </a>
      &nbsp; &nbsp;
      <Button
        style={{
          textShadow: "1px 1px 1px black",
          borderBottom: isHovered.emotionalIntelligence
            ? "0px solid transparent"
            : `2px solid ${japaneseThemePalette.CobaltBlue}`,
        }}
        onClick={() => {
          logEvent(analytics, "select_content", {
            content_type: "button",
            item_id: "Therapy Session",
          });
          setIsEmotionalIntelligenceOpen(true);
          setIsBossModeOpen(false);
          setIsCofounderOpen(false);
          setIsImpactWalletOpen(false);
        }}
        variant="dark"
        onMouseEnter={() => handleHover("emotionalIntelligence", true)}
        onMouseLeave={() => handleHover("emotionalIntelligence", false)}
      >
        🫶🏽
      </Button>
      &nbsp; &nbsp;
      <Button
        style={{
          textShadow: "1px 1px 1px black",
          borderBottom: isHovered.impactWallet
            ? "0px solid transparent"
            : `2px solid ${japaneseThemePalette.CobaltBlue}`,
        }}
        onClick={() => {
          logEvent(analytics, "select_content", {
            content_type: "button",
            item_id: "Proof of Work",
          });
          setIsImpactWalletOpen(true);
          setIsEmotionalIntelligenceOpen(false);
          setIsBossModeOpen(false);
          setIsCofounderOpen(false);
        }}
        variant="dark"
        onMouseEnter={() => handleHover("impactWallet", true)}
        onMouseLeave={() => handleHover("impactWallet", false)}
      >
        🏦
      </Button>
    </FadeInComponent>
  );
};
