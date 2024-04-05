import { Button, Form } from "react-bootstrap";
import isEmpty from "lodash/isEmpty";
import roxanaChat from "../../common/media/images/roxanaChat.png";

import { logEvent } from "firebase/analytics";

import { decentralizedEducationTranscript } from "../../App.constants";

import { FadeInComponent } from "../../styles/lazyStyles";
import { analytics } from "../../database/firebaseResources";

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

export const renderActionBarControls = ({
  displayName,
  setIsBossModeOpen,
  setIsCofounderOpen,
  setIsEmotionalIntelligenceOpen,
  setIsImpactWalletOpen,
}) => {
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
      &nbsp;
      <Button
        style={{ textShadow: "2px 2px 12px black" }}
        onClick={() => {
          logEvent(analytics, "select_content", {
            content_type: "button",
            item_id: "Boss Mode",
          });
          setIsBossModeOpen(true);
        }}
        variant="secondary"
      >
        💎
      </Button>
      &nbsp; &nbsp;
      <Button
        style={{ textShadow: "2px 2px 12px black" }}
        onClick={() => {
          logEvent(analytics, "select_content", {
            content_type: "button",
            item_id: "Cofounder",
          });
          setIsCofounderOpen(true);
        }}
        variant="secondary"
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
          style={{ textShadow: "2px 2px 12px black" }}
          onClick={() => {
            logEvent(analytics, "select_content", {
              content_type: "button",
              item_id: "chatGPT_link",
            });
          }}
          variant="secondary"
        >
          <img
            src={roxanaChat}
            alt="Chat with Ms. Roxana"
            width="16"
            style={{
              borderRadius: "50%",
              boxShadow: "2px 2px 12px black",
              marginBottom: 1,
            }}
          />
        </Button>
      </a>
      &nbsp; &nbsp;
      <Button
        style={{ textShadow: "2px 2px 12px black" }}
        onClick={() => {
          logEvent(analytics, "select_content", {
            content_type: "button",
            item_id: "Therapy Session",
          });
          setIsEmotionalIntelligenceOpen(true);
        }}
        variant="secondary"
      >
        🫶🏽
      </Button>
      &nbsp; &nbsp;
      <Button
        style={{ textShadow: "2px 2px 12px black" }}
        onClick={() => {
          logEvent(analytics, "select_content", {
            content_type: "button",
            item_id: "Proof of Work",
          });
          setIsImpactWalletOpen(true);
        }}
        variant="secondary"
      >
        🏦
      </Button>
    </FadeInComponent>
  );
};
