import { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import { Button, Modal } from "react-bootstrap";
import { isEmpty } from "lodash";
import ReactJson from "react-json-view";

import { StyledPromptButton } from "../../styles/lazyStyles";
import { engineerHeaders } from "../../App.constants";

const delayedAnimation = keyframes`
from {
    transform: translateY(100px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;
const AnimatedPrompt = styled.div`
  animation: ${delayedAnimation} 0.5s ease-out;
  animation-delay: ${(props) => props.index * 0.12}s; /* Delay based on index */
  opacity: 0; /* Start with opacity 0 to make the animation visible */
  animation-fill-mode: forwards; /* Keep the element visible after the animation */
`;
// Reusable Button Component
const PromptButton = ({
  patreonObject,
  icon,
  action,
  type,
  loading,
  onMouseDown,
  prompt,
  handleZap,
  zap,
  isPracticeComplete,
  isVideoWatched,
}) => {
  let actionVar = action === "generate" ? "discover" : action;
  if (
    localStorage.getItem("patreonPasscode") ===
    import.meta.env.VITE_BITCOIN_PASSCODE
  ) {
    // let satoshis = computeTotalImpactFromPrompt(patreonObject, type);
    // let data = useZap(satoshis);
    // let zap = useZap(1);

    return (
      <StyledPromptButton
        tabindex="0"
        borderHighlight={"#48484a"}
        style={{ display: loading ? "none" : "flex" }}
        onMouseDown={(e) => {
          zap()
            .then((response) => {
              console.log("response from zap", response);
              onMouseDown(e);
            })
            .catch((error) => {
              console.log("error", error);
              console.log("{error}", { error });
            });
        }}
      >
        <a style={{ color: "white" }}>
          {icon} &nbsp;{actionVar || type}
        </a>
      </StyledPromptButton>
    );
  }

  let isGold = true;
  if (patreonObject?.header !== "Learning Mindset & Perspective") {
    isGold = false;
  } else if (type === "shop") {
    isGold = false;
  } else if (type === "guide") {
    isGold = false;
  } else if (type === "patreon") {
    if (isVideoWatched) isGold = false;
  } else if (type === "practice") {
    if (isPracticeComplete) isGold = false;
  }

  return (
    <StyledPromptButton
      tabindex="0"
      isGold={isGold}
      borderHighlight={"#48484a"}
      style={{
        display: loading ? "none" : "flex",
      }}
      onMouseDown={(e) => {
        onMouseDown(e, prompt, type);
      }}
    >
      <a style={{ color: "white" }}>
        {icon} &nbsp;{actionVar || type}
      </a>
    </StyledPromptButton>
  );
};

// Modal Content as a separate component
const ModalContent = ({ patreonObject }) => (
  <>
    <h3>What is this?</h3>
    <p>
      This is for students and teachers who are curious of how the AI is
      prompted and fine-tuned over time.
    </p>
    <ReactJson
      theme="threezerotwofour"
      enableClipboard
      src={patreonObject}
      quotesOnKeys={false}
    />
  </>
);

export const Prompts = ({
  loadingMessage,
  patreonObject,
  handleSubmit,
  handleZap,
  userStateReference,
  zap,
  uiStateReference,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPrompts, setShowPrompts] = useState(false);
  const componentRef = useRef(null);

  // console.log("patreonobj", patreonObject);
  // console.log("user ref", userStateReference);
  // console.log("db user doc", userStateReference?.databaseUserDocument);

  let isl1 = patreonObject?.header === "Learning Mindset & Perspective";

  let isVideoWatched =
    isl1 &&
    userStateReference?.databaseUserDocument?.watches?.[
      "Learning Mindset & Perspective"
    ];
  let isPracticeComplete =
    isl1 &&
    userStateReference?.databaseUserDocument?.progress?.[
      "Learning Mindset & Perspective"
    ];

  if (isEmpty(patreonObject)) return null;

  const promptTypes = ["patreon", "guide", "practice", "shop"];

  console.log("currpth", uiStateReference);
  useEffect(() => {
    if (engineerHeaders.includes(patreonObject?.header)) {
      const timer = setTimeout(() => {
        setShowPrompts(true);
      }, 0); // 5000 milliseconds = 5 seconds

      return () => clearTimeout(timer); // Clear the timeout if the component unmounts
    } else {
      setShowPrompts(true);
    }
  }, []); // Empty dependency array means this effect runs only once after the initial render

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        flexDirection: "column",
      }}
      ref={componentRef}
      className={`fade-in ${showPrompts ? "show" : ""}`}
    >
      {showPrompts &&
        promptTypes.map((type, index) => {
          const prompt = patreonObject.prompts[type];

          if (!prompt) return null;
          return (
            <AnimatedPrompt index={index}>
              {type === "shop" ? (
                <>
                  {" "}
                  <PromptButton
                    patreonObject={patreonObject}
                    key={type}
                    icon={prompt?.icon}
                    action={prompt?.action}
                    type={type}
                    loading={!!loadingMessage}
                    prompt={prompt}
                    onMouseDown={(e) =>
                      !loadingMessage && handleSubmit(e, prompt, type)
                    }
                    handleZap={handleZap}
                    zap={zap}
                  />
                  <br />
                  <br />
                  <br />
                </>
              ) : (
                <PromptButton
                  patreonObject={patreonObject}
                  key={type}
                  icon={prompt?.icon}
                  action={prompt?.action}
                  type={type}
                  loading={!!loadingMessage}
                  prompt={prompt}
                  onMouseDown={(e) =>
                    !loadingMessage && handleSubmit(e, prompt, type)
                  }
                  handleZap={handleZap}
                  zap={zap}
                  isPracticeComplete={isPracticeComplete}
                  isVideoWatched={isVideoWatched}
                />
              )}
            </AnimatedPrompt>
          );
        })}

      <br />
      {/* <Button
        variant="dark"
        onMouseDown={() => {
          logEvent(analytics, "select_content", {
            content_type: "button",
            item_id: "View Roxana",
          });
          setIsModalOpen(true);
        }}
      >
        💗 Roxana
      </Button> */}
      <br />
      <br />
      <Modal
        centered
        fullscreen
        show={isModalOpen}
        onHide={() => setIsModalOpen(false)}
        keyboard={true}
      >
        <Modal.Header
          closeButton
          style={{ color: "white", backgroundColor: "black" }}
        >
          <Modal.Title>AI Prompt Engineering</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "black", color: "white" }}>
          <ModalContent patreonObject={patreonObject} />
        </Modal.Body>
        <Modal.Footer style={{ color: "white", backgroundColor: "black" }}>
          <Button variant="dark" onMouseDown={() => setIsModalOpen(false)}>
            Back to app
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
