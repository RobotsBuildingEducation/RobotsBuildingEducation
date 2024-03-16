import { useState } from "react";
// import { pwaInstallHandler } from "pwa-install-handler";
import { Button, Modal } from "react-bootstrap";
import { usePWAInstall } from "react-use-pwa-install";

import { logEvent } from "firebase/analytics";
import { analytics, auth } from "../../database/firebaseResources";
import { DiscordButton } from "../../common/ui/Displays/DiscordButton/DiscordButton";

import {
  FadeInComponent,
  PanLeftComponent,
  PanRightComponent,
  RiseDownAnimation,
  RiseUpAnimation,
  japaneseThemePalette,
  textBlock,
} from "../../styles/lazyStyles";
import FAQSection from "./FAQs/FAQs";

let data = {};
export const LearnMore = ({
  languageMode,
  canInstallPwa,
  handleZeroKnowledgePassword,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNewsModalOpen, setIsNewsModalOpen] = useState(false);

  const install = usePWAInstall();
  // console.log("install", install);
  return (
    <>
      {/* {canInstallPwa ? <><Button
      variant="dark"
      style={{
        color: "white",
        textShadow: "0px 0px 4px black",
      }}
      onClick={install}
    >
      Install app
    </Button>      &nbsp; &nbsp; &nbsp; &nbsp;</>: null} */}
      <FadeInComponent>
        <div style={{ fontFamily: "Bungee", color: "white" }}>rox</div>
      </FadeInComponent>
      <br />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <br />
        <PanLeftComponent speed={0.3}>
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
                // setIsNewsModalOpen(true);
              }}
            >
              o-fi 📰
            </Button>
          </a>
        </PanLeftComponent>
        <br />
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
        {localStorage.getItem("patreonPasscode") ===
        import.meta.env.VITE_PATREON_PASSCODE ? (
          <PanRightComponent speed={0.3}>
            <Button
              style={{ margin: 6, width: 110 }}
              variant={"dark"}
              onClick={() => {
                localStorage.clear();
                handleZeroKnowledgePassword(null, true, false);
              }}
            >
              Log out
            </Button>
          </PanRightComponent>
        ) : null}
      </div>

      {/* 
      <Button
        variant="danger"
        onClick={() => {
          auth.signOut();
        }}
      >
        Sign Out{" 😭😭😭"}
      </Button> */}

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
          style={{ backgroundColor: "black", color: "white" }}
          onHide={() => setIsModalOpen(false)}
        >
          {/* <Modal.Title>{languageMode.modals.titles["1"]}</Modal.Title> */}
        </Modal.Header>
        <Modal.Body
          style={{
            backgroundColor: "black",
            color: "white",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            // maxWidth: 700,
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
        {/* <Modal.Footer style={{ backgroundColor: "black", color: "white" }}>
          <Button variant="dark" onClick={() => setIsModalOpen(false)}>
            Back to app
          </Button>
        </Modal.Footer> */}
      </Modal>
    </>
  );
};
