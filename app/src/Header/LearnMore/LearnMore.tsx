import { useState } from "react";

import { Button, Modal } from "react-bootstrap";
import { logEvent } from "firebase/analytics";
import { analytics } from "../../database/firebaseResources";
import { DiscordButton } from "./DiscordButton/DiscordButton";
import { FadeInComponent, RiseUpAnimation } from "../../styles/lazyStyles";
import FAQSection from "./FAQs/FAQs";
import { WalletAuth } from "../WalletAuth/WalletAuth";

/**
 * `LearnMore` component that provides additional information and resources to the user.
 *
 * This component displays a section with a stylized "rox.ai" title and two buttons. The first button links to a news page, while the second opens a modal with FAQs and a Discord connection button. It uses animations for visual enhancement and tracks the modal's open state to manage its visibility.
 *
 * Props:
 * @param {Object} languageMode - Contains localized strings for button labels and other UI elements, allowing for dynamic language switching.
 *
 * State:
 * @state {boolean} isModalOpen - Tracks whether the FAQ and Discord modal is open.
 *
 * Behavior:
 * - On clicking the news button, logs an event to Firebase Analytics and navigates the user to an external news page.
 * - On clicking the about button, toggles the modal's visibility, showing or hiding additional resources including FAQs and a Discord invite.
 * - Utilizes `FadeInComponent` and `RiseUpAnimation` for entrance animations, enhancing user experience with visual effects.
 * - The modal provides a centralized way to access FAQs and connect with the Discord community, promoting engagement.
 */
export const LearnMore = ({ languageMode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <br />
      <FadeInComponent>
        <h2 style={{ fontFamily: "Bungee", color: "white" }}>ROX.AI</h2>
      </FadeInComponent>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* <RiseUpAnimation speed={0.3}>
          <a
            style={{ color: "white" }}
            href={"https://old-fashionedintelligence.info/news"}
            target={"_blank"}
          >
            <Button
              variant="dark"
              style={{
                color: "white",
                textShadow: "0px 0px 4px black",
                margin: 6,
                width: 180,
              }}
              onClick={() => {
                logEvent(analytics, "select_content", {
                  content_type: "button",
                  item_id: "Old-Fashioned Intelligence",
                });
              }}
            >
              📰
            </Button>
          </a>
        </RiseUpAnimation> */}

        <RiseUpAnimation speed={0.3}>
          <Button
            variant="dark"
            style={{
              color: "white",
              textShadow: "0px 0px 4px black",
              margin: 6,
              width: 180,
            }}
            onClick={() => {
              logEvent(analytics, "select_content", {
                content_type: "button",
                item_id: "About",
              });
              setIsModalOpen(true);
            }}
          >
            {languageMode.buttons["9"]}
          </Button>
        </RiseUpAnimation>

        <RiseUpAnimation>
          <div style={{ margin: 6 }}>
            <WalletAuth />
          </div>
        </RiseUpAnimation>
      </div>

      <Modal
        centered
        show={isModalOpen}
        fullscreen
        style={{ backgroundColor: "black" }}
        keyboard={true}
        onHide={() => setIsModalOpen(false)}
      >
        <Modal.Header
          closeButton
          closeVariant="white"
          style={{
            backgroundColor: "black",
            color: "white",
            border: "1px solid black",
          }}
          onHide={() => setIsModalOpen(false)}
        ></Modal.Header>
        <Modal.Body
          style={{
            backgroundColor: "black",
            color: "white",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          <FAQSection />
          <br />
          <br />

          <br />
          <br />
          <DiscordButton />
        </Modal.Body>
      </Modal>
    </>
  );
};
