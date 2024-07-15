import { Button, Modal } from "react-bootstrap";
import styled from "styled-components";

import {
  FadeInComponent,
  japaneseThemePalette,
} from "../../../styles/lazyStyles";
import roxanaChat from "../../../common/media/images/roxanaChat.png";
import { Title } from "../../../common/svgs/Title";
import { useState } from "react";
import { logEvent } from "firebase/analytics";
import { analytics } from "../../../database/firebaseResources";
import { BossMode } from "../BossMode/BossMode";
import { Experimental } from "../Cofounder/Experimental";
import { EmotionalIntelligence } from "../EmotionalIntelligence/EmotionalIntelligence";
import { IdentityWallet } from "../IdentityWallet/IdentityWallet";
import { Leetmigo } from "../Leetmigo/Leetmigo";
import { HamburgerMenu } from "../../../common/svgs/HamburgerMenu";

const StyledFeature = styled(Button)`
  max-width: 700px;
  width: 100%;
  height: 75px;
  font-family: Bungee;
  font-size: 16px;
  text-align: left;
`;
export const RenderActionBarControls = ({
  setIsBossModeOpen,
  setIsCofounderOpen,
  setIsEmotionalIntelligenceOpen,
  setIsIdentityWalletOpen,
  setIsStartupOpen,
  setIsLeetmigoOpen,
}) => {
  const [isHovered, setIsHovered] = useState({
    bossMode: false,
    cofounder: false,
    chatLink: false,
    emotionalIntelligence: false,
    impactWallet: false,
    startup: false,
    leetmigo: false,
  });

  // Handler for mouse enter and leave
  const handleHover = (button, value) => {
    setIsHovered((prev) => ({ ...prev, [button]: value }));
  };
  return (
    <FadeInComponent>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* <span style={{ fontSize: "66%" }}>
        <b style={{ fontFamily: "Bungee" }}>
          {displayName
            ?.split(" ")
            ?.map((name) => name[0]?.toUpperCase())
            ?.join("")}
        </b>
      </span> */}
        <StyledFeature
          style={{
            textShadow: "1px 1px 1px black",
            borderBottom: isHovered.impactWallet
              ? "0px solid transparent"
              : `2px solid ${japaneseThemePalette.CobaltBlue}`,
          }}
          onMouseDown={() => {
            logEvent(analytics, "select_content", {
              content_type: "button",
              item_id: "Proof of Work",
            });

            setIsIdentityWalletOpen(true);
            setIsEmotionalIntelligenceOpen(false);
            setIsBossModeOpen(false);
            setIsCofounderOpen(false);
            setIsLeetmigoOpen(false);

            // setIsStartupOpen(false);
          }}
          variant="dark"
          onMouseEnter={() => handleHover("impactWallet", true)}
          onMouseLeave={() => handleHover("impactWallet", false)}
        >
          🏦 Identity Wallet
        </StyledFeature>
        &nbsp; &nbsp;
        <a
          href="https://chat.openai.com/g/g-09h5uQiFC-ms-roxana"
          target="_blank"
          rel="noopener noreferrer"
        >
          <StyledFeature
            style={{
              textShadow: "1px 1px 1px black",
              borderBottom: isHovered.chatLink
                ? "0px solid transparent"
                : `2px solid ${japaneseThemePalette.CobaltBlue}`,
            }}
            onMouseDown={() => {
              logEvent(analytics, "select_content", {
                content_type: "button",
                item_id: "chatGPT_link",
              });
            }}
            variant="dark"
            onMouseEnter={() => handleHover("chatLink", true)}
            onMouseLeave={() => handleHover("chatLink", false)}
            style={{ display: "flex", alignItems: "center" }}
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
            &nbsp;ROX (GPT-4)
          </StyledFeature>
        </a>
        &nbsp; &nbsp;
        <StyledFeature
          style={{
            textShadow: "1px 1px 1px black",
            borderBottom: isHovered.leetmigo
              ? "0px solid transparent"
              : `2px solid ${japaneseThemePalette.CobaltBlue}`,
          }}
          onMouseDown={() => {
            logEvent(analytics, "select_content", {
              content_type: "button",
              item_id: "Leetmigo",
            });
            setIsLeetmigoOpen(true);
            setIsEmotionalIntelligenceOpen(false);
            setIsBossModeOpen(false);
            setIsCofounderOpen(false);
            setIsIdentityWalletOpen(false);

            // setIsStartupOpen(false);
          }}
          variant="dark"
          onMouseEnter={() => handleHover("leetmigo", true)}
          onMouseLeave={() => handleHover("leetmigo", false)}
        >
          🥋 Super Practice Mode
        </StyledFeature>
        &nbsp; &nbsp;
        <StyledFeature
          style={{
            textShadow: "1px 1px 1px black",
            borderBottom: isHovered.bossMode
              ? "0px solid transparent"
              : `2px solid ${japaneseThemePalette.CobaltBlue}`,
          }}
          onMouseDown={() => {
            logEvent(analytics, "select_content", {
              content_type: "button",
              item_id: "Boss Mode",
            });
            setIsBossModeOpen(true);
            setIsCofounderOpen(false);
            setIsEmotionalIntelligenceOpen(false);
            setIsIdentityWalletOpen(false);
            setIsLeetmigoOpen(false);

            // setIsStartupOpen(false);
          }}
          variant="dark"
          onMouseEnter={() => handleHover("bossMode", true)}
          onMouseLeave={() => handleHover("bossMode", false)}
        >
          💎 Challenges
        </StyledFeature>
        &nbsp; &nbsp;
        {/* <StyledFeature
          style={{
            textShadow: "1px 1px 1px black",
            borderBottom: isHovered.cofounder
              ? "0px solid transparent"
              : `2px solid ${japaneseThemePalette.CobaltBlue}`,
          }}
          onMouseDown={() => {
            logEvent(analytics, "select_content", {
              content_type: "button",
              item_id: "Cofounder",
            });
            setIsCofounderOpen(true);
            setIsBossModeOpen(false);
            setIsEmotionalIntelligenceOpen(false);
            setIsIdentityWalletOpen(false);
            setIsLeetmigoOpen(false);

            // setIsStartupOpen(false);
          }}
          variant="dark"
          onMouseEnter={() => handleHover("cofounder", true)}
          onMouseLeave={() => handleHover("cofounder", false)}
        >
          🌀 Assistant
        </StyledFeature> */}
        &nbsp; &nbsp;
        <StyledFeature
          style={{
            textShadow: "1px 1px 1px black",
            borderBottom: isHovered.emotionalIntelligence
              ? "0px solid transparent"
              : `2px solid ${japaneseThemePalette.CobaltBlue}`,
          }}
          onMouseDown={() => {
            logEvent(analytics, "select_content", {
              content_type: "button",
              item_id: "Therapy Session",
            });
            setIsEmotionalIntelligenceOpen(true);
            setIsBossModeOpen(false);
            setIsCofounderOpen(false);
            setIsIdentityWalletOpen(false);
            setIsLeetmigoOpen(false);
            // setIsStartupOpen(false);
          }}
          variant="dark"
          onMouseEnter={() => handleHover("emotionalIntelligence", true)}
          onMouseLeave={() => handleHover("emotionalIntelligence", false)}
        >
          🫶🏽 Emotional Intelligence
        </StyledFeature>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    </FadeInComponent>
  );
};
export const Startup = ({
  setIsStartupOpen,
  isStartupOpen,
  userStateReference,
  globalStateReference,
  zap,
  handleZap,
  isBossModeOpen,
  isCofounderOpen,
  isEmotionalIntelligenceOpen,
  isIdentityWalletOpen,
  setIsIdentityWalletOpen,
  setIsCofounderOpen,
  setIsBossModeOpen,
  uiStateReference,
  updateUserEmotions,
  databaseUserDocument,
  globalScholarshipCounter,
  calculatedPercentage,
  globalImpactCounter,
  usersEmotionsCollectionReference,
  setIsEmotionalIntelligenceOpen,
  usersEmotionsFromDB,
  isAdaptiveLearningOpen,
  setIsAdaptiveLearningOpen,
  isLeetmigoOpen,
  setIsLeetmigoOpen,
  // displayName
}) => {
  return (
    <Modal
      centered
      show={isStartupOpen}
      style={{ backgroundColor: "black" }}
      fullscreen
      keyboard
      onHide={() => {
        setIsStartupOpen(false);
        setIsAdaptiveLearningOpen(false);
      }}
    >
      <Modal.Header
        style={{
          backgroundColor: "black",
          color: "white",
          borderBottom: "1px solid black",
        }}
        closeVariant="white"
        closeButton
      >
        <Title
          closeFunction={() => {
            setIsStartupOpen(false);
            setIsAdaptiveLearningOpen(false);
          }}
          title={
            <div>
              <HamburgerMenu />
              &nbsp;&nbsp;Feature Menu
            </div>
          }
        />
      </Modal.Header>
      <Modal.Body
        style={{
          // backgroundColor: japaneseThemePalette.CobaltBlue,
          backgroundColor: "black",
          // backgroundColor: screenColor,
          color: "white",
        }}
      >
        <RenderActionBarControls
          // displayName={displayName}
          setIsBossModeOpen={setIsBossModeOpen}
          setIsCofounderOpen={setIsCofounderOpen}
          setIsEmotionalIntelligenceOpen={setIsEmotionalIntelligenceOpen}
          setIsIdentityWalletOpen={setIsIdentityWalletOpen}
          setIsStartupOpen={setIsStartupOpen}
          setIsLeetmigoOpen={setIsLeetmigoOpen}
        />
        {isIdentityWalletOpen ? (
          <IdentityWallet
            isIdentityWalletOpen={isIdentityWalletOpen}
            setIsIdentityWalletOpen={setIsIdentityWalletOpen}
            userStateReference={userStateReference}
            globalStateReference={globalStateReference}
            uiStateReference={uiStateReference}
            updateUserEmotions={updateUserEmotions}
            databaseUserDocument={databaseUserDocument}
            globalScholarshipCounter={globalScholarshipCounter}
            calculatedPercentage={calculatedPercentage}
            globalImpactCounter={globalImpactCounter}
            setIsStartupOpen={setIsStartupOpen}
          />
        ) : null}

        {isEmotionalIntelligenceOpen ? (
          <EmotionalIntelligence
            isEmotionalIntelligenceOpen={isEmotionalIntelligenceOpen}
            setIsEmotionalIntelligenceOpen={setIsEmotionalIntelligenceOpen}
            usersEmotionsCollectionReference={usersEmotionsCollectionReference}
            usersEmotionsFromDB={usersEmotionsFromDB}
            updateUserEmotions={updateUserEmotions}
            userStateReference={userStateReference}
            globalStateReference={globalStateReference}
            zap={zap}
            handleZap={handleZap}
            setIsStartupOpen={setIsStartupOpen}
          />
        ) : null}

        {isCofounderOpen ? (
          <Experimental
            isCofounderOpen={isCofounderOpen}
            setIsCofounderOpen={setIsCofounderOpen}
            userStateReference={userStateReference}
            globalStateReference={globalStateReference}
            zap={zap}
            handleZap={handleZap}
            setIsStartupOpen={setIsStartupOpen}
          />
        ) : null}

        {isBossModeOpen ? (
          <BossMode
            isBossModeOpen={isBossModeOpen}
            setIsBossModeOpen={setIsBossModeOpen}
            userStateReference={userStateReference}
            globalStateReference={globalStateReference}
            zap={zap}
            handleZap={handleZap}
            setIsStartupOpen={setIsStartupOpen}
          />
        ) : null}

        {isLeetmigoOpen ? (
          <Leetmigo
            isLeetmigoOpen={isLeetmigoOpen}
            setIsLeetmigoOpen={setIsLeetmigoOpen}
            userStateReference={userStateReference}
            globalStateReference={globalStateReference}
            zap={zap}
            handleZap={handleZap}
            setIsStartupOpen={setIsStartupOpen}
          />
        ) : null}
      </Modal.Body>
    </Modal>
  );
};
