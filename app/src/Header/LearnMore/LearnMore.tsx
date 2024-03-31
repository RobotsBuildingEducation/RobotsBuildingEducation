import { useState } from "react";

import { Button, Modal } from "react-bootstrap";
import { logEvent } from "firebase/analytics";
import { analytics } from "../../database/firebaseResources";
import { DiscordButton } from "./DiscordButton/DiscordButton";
import { FadeInComponent, RiseUpAnimation } from "../../styles/lazyStyles";
import FAQSection from "./FAQs/FAQs";

export const LearnMore = ({ languageMode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <br />
      <FadeInComponent>
        <div style={{ fontFamily: "Bungee", color: "white" }}>rox.ai</div>
      </FadeInComponent>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <RiseUpAnimation speed={0.3}>
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
                width: 110,
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
        </RiseUpAnimation>

        <RiseUpAnimation speed={0.3}>
          <Button
            variant="dark"
            style={{
              color: "white",
              textShadow: "0px 0px 4px black",
              margin: 6,
              width: 110,
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
        <br />
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
