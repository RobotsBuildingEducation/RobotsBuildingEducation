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
  setIsStartupOpen,
  setIsAdaptiveLearningOpen,
}) => {
  const [isHovered, setIsHovered] = useState({
    bossMode: false,
    cofounder: false,
    chatLink: false,
    emotionalIntelligence: false,
    impactWallet: false,
    startup: false,
    adaptiveLearning: false,
  });

  // Handler for mouse enter and leave
  const handleHover = (button, value) => {
    setIsHovered((prev) => ({ ...prev, [button]: value }));
  };
  return (
    <FadeInComponent>
      {/* <span style={{ fontSize: "66%" }}>
        <b style={{ fontFamily: "Bungee" }}>
          {displayName
            ?.split(" ")
            ?.map((name) => name[0]?.toUpperCase())
            ?.join("")}
        </b>
      </span> */}
      <Button
        variant="dark"
        style={{
          textShadow: "1px 1px 1px black",
          borderBottom: isHovered.startup
            ? "2px solid transparent"
            : `2px solid ${japaneseThemePalette.CobaltBlue}`,
        }}
        onMouseDown={() => {
          logEvent(analytics, "select_content", {
            content_type: "button",
            item_id: "Startup",
          });
          setIsStartupOpen(true);
          setIsImpactWalletOpen(false);
          setIsEmotionalIntelligenceOpen(false);
          setIsBossModeOpen(false);
          setIsCofounderOpen(false);
          setIsAdaptiveLearningOpen(false);
        }}
        onMouseEnter={() => handleHover("startup", true)}
        onMouseLeave={() => handleHover("startup", false)}
      >
        🌀
      </Button>
      &nbsp; &nbsp;
      <Button
        variant="dark"
        style={{
          textShadow: "1px 1px 1px black",
          borderBottom: isHovered.adaptiveLearning
            ? "2px solid transparent"
            : `2px solid ${japaneseThemePalette.CobaltBlue}`,
        }}
        onMouseDown={() => {
          logEvent(analytics, "select_content", {
            content_type: "button",
            item_id: "Adaptive Learning",
          });
          setIsAdaptiveLearningOpen(true);
          setIsStartupOpen(false);
          setIsImpactWalletOpen(false);
          setIsEmotionalIntelligenceOpen(false);
          setIsBossModeOpen(false);
          setIsCofounderOpen(false);
        }}
        onMouseEnter={() => handleHover("adaptiveLearning", true)}
        onMouseLeave={() => handleHover("adaptiveLearning", false)}
      >
        💭
      </Button>
    </FadeInComponent>
  );
};
