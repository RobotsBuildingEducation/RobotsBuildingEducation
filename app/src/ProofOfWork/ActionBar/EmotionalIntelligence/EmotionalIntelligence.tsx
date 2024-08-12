//@ts-nocheck
import { useState, useEffect } from "react";
import { isEmpty } from "lodash";
import { Button, Modal, Form } from "react-bootstrap";
import Lottie from "react-lottie";
import { addDoc } from "firebase/firestore";
import { postInstructions } from "../../../common/uiSchema";
import {
  highEnergyFeelings,
  lowEnergyFeelings,
} from "./EmotionalIntelligence.data";
import {
  SunsetCanvas,
  customInstructions,
  emotionSummarizer,
  formatEmotionItem,
  formatFriendlyDate,
} from "./EmotionalIntelligence.compute";
import roxanaFocusing from "../../../common/media/images/roxanaFocusing.png";
import roxanaKind from "../../../common/media/images/roxanaKind.png";
import heart_chat_animation from "../../../common/anims/heart_chat_animation.json";
import { useZap } from "../../../App.hooks";
import { RoxanaLoadingAnimation, updateImpact } from "../../../App.compute";
import { responsiveBox } from "../../../styles/lazyStyles";
import { Title } from "../../../common/svgs/Title";
import { useChatStream } from "../../../common/ui/Elements/Stream/useChatCompletion";
import {
  EmotionButton,
  EmotionalIntelligenceStyles,
} from "./EmotionalIntelligence.styles";
import Markdown from "react-markdown";

export const EmotionalIntelligence = ({
  isEmotionalIntelligenceOpen,
  setIsEmotionalIntelligenceOpen,
  usersEmotionsCollectionReference,
  usersEmotionsFromDB,
  updateUserEmotions,
  userStateReference,
  globalStateReference,
  zap,
  handleZap,
  setIsStartupOpen,
}) => {
  const [isEmotionModalOpen, setIsEmotionModalOpen] = useState(false);
  const [selectedEmotion, setSelectedEmotion] = useState("");
  const [emotionNote, setEmotionNote] = useState("");
  const [shouldRenderSaveButton, setShouldRenderSaveButton] = useState(false);
  const [chatGptResponse, setChatGptResponse] = useState("");
  const [summarizerResponse, setSummarizerResponse] = useState("");

  const {
    messages: chatGptMessages,
    loading: chatGptLoading,
    submitPrompt: submitChatGptPrompt,
    resetMessages: resetChatGptMessages,
  } = useChatStream({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    model: "gpt-4o",
    temperature: 0.9,
    // response_format: { type: "json_object" },
  });

  const {
    messages: summarizerMessages,
    loading: summarizerLoading,
    submitPrompt: submitSummarizerPrompt,
    resetMessages: resetSummarizerMessages,
  } = useChatStream({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    model: "gpt-4o",
    temperature: 0.9,
    // response_format: { type: "json_object" },
  });

  const handleEmotionSelection = async (item, shouldRunDatabase = true) => {
    let formattedItem = formatEmotionItem(item, Date.now(), "timestamp");
    formattedItem = formatEmotionItem(formattedItem, item?.ai, "ai");

    if (shouldRunDatabase) {
      setShouldRenderSaveButton(true);
    }

    setIsEmotionModalOpen(true);
    setSelectedEmotion(formattedItem);
  };

  const generateAdviceOrWisdom = async () => {
    setChatGptResponse("");
    resetChatGptMessages();

    let prompt = customInstructions({
      emotionNote,
      selectedEmotion,
    });

    submitChatGptPrompt([{ role: "user", content: prompt }]);
    handleZap("ai");
  };

  const saveEmotionData = async () => {
    let savedData = formatEmotionItem(selectedEmotion, chatGptResponse, "ai");
    savedData = formatEmotionItem(savedData, emotionNote, "note");

    await addDoc(usersEmotionsCollectionReference, savedData);
    updateUserEmotions(usersEmotionsCollectionReference);
    setIsEmotionModalOpen(false);
    setChatGptResponse("");
    setShouldRenderSaveButton(false);
  };

  const reviewJourney = async () => {
    setSummarizerResponse("");
    resetSummarizerMessages();

    let prompt = emotionSummarizer(JSON.stringify(usersEmotionsFromDB));

    submitSummarizerPrompt([{ role: "user", content: prompt }]);
    handleZap("ai");
  };

  useEffect(() => {
    if (chatGptMessages?.length > 0) {
      const lastMessage = chatGptMessages[chatGptMessages.length - 1];
      if (!lastMessage.meta.loading) {
        try {
          // const result = JSON.parse(lastMessage.content);
          setChatGptResponse(lastMessage.content);
        } catch (error) {
          console.error(
            "Error parsing JSON content:",
            lastMessage.content,
            error
          );
          setChatGptResponse(null);
        }
      }
    }
  }, [chatGptMessages]);

  useEffect(() => {
    if (summarizerMessages?.length > 0) {
      const lastMessage = summarizerMessages[summarizerMessages.length - 1];
      if (!lastMessage.meta.loading) {
        try {
          // const result = JSON.parse(lastMessage.content);
          setSummarizerResponse(lastMessage.content);
        } catch (error) {
          console.error(
            "Error parsing JSON content:",
            lastMessage.content,
            error
          );
          setSummarizerResponse(null);
        }
      }
    }
  }, [summarizerMessages]);

  return (
    <>
      <Modal
        centered
        show={isEmotionalIntelligenceOpen}
        fullscreen
        keyboard
        onHide={() => {
          setIsEmotionalIntelligenceOpen(false);
          setIsStartupOpen(false);
        }}
      >
        <Modal.Header
          style={EmotionalIntelligenceStyles.Header}
          closeVariant="white"
          closeButton
        >
          <Title
            title={"Emotional Intelligence"}
            closeFunction={() => {
              setIsEmotionalIntelligenceOpen(false);
            }}
          />
        </Modal.Header>
        <Modal.Body style={EmotionalIntelligenceStyles.Body}>
          <div style={responsiveBox}>
            The emotionally intelligent assistant will help you track, process
            and review your emotions.
          </div>
          <br />
          <h1 style={EmotionalIntelligenceStyles.Banner}>
            <div
              style={{
                ...EmotionalIntelligenceStyles.BannerBackground,
                fontFamily: "Bungee",
              }}
            >
              🌌&nbsp;how do you feel today?
            </div>
          </h1>
          <div style={EmotionalIntelligenceStyles.EnergyLevelContainer}>
            <h3 style={{ textAlign: "center", fontFamily: "Bungee" }}>
              High Energy
            </h3>
            <div style={EmotionalIntelligenceStyles.RowWrapCenter}>
              {highEnergyFeelings.map((item) => (
                <EmotionButton
                  key={item.label}
                  color={item.color}
                  colorHover={item.colorHover}
                  onMouseDown={() => handleEmotionSelection(item, true)}
                >
                  {item?.label}
                  <br />
                  {item?.emoji}
                </EmotionButton>
              ))}
            </div>
            <br />
            <h3 style={{ textAlign: "center", fontFamily: "Bungee" }}>
              Low Energy
            </h3>
            <div style={EmotionalIntelligenceStyles.RowWrapCenter}>
              {lowEnergyFeelings.map((item) => (
                <EmotionButton
                  key={item.label}
                  color={item.color}
                  colorHover={item.colorHover}
                  onMouseDown={() => handleEmotionSelection(item, true)}
                >
                  {item?.label}
                  <br />
                  {item?.emoji}
                </EmotionButton>
              ))}
            </div>
            <br /> <br /> <br />
            {!isEmpty(usersEmotionsFromDB) ? null : (
              <>
                {" "}
                <br />
                <br />
                <br />
                <br />
              </>
            )}
          </div>
          {!isEmpty(usersEmotionsFromDB) ? (
            <>
              <h1
                style={{
                  ...EmotionalIntelligenceStyles.Banner,
                  fontFamily: "Bungee",
                }}
              >
                <div
                  style={{
                    ...EmotionalIntelligenceStyles.BannerBackground,
                    fontFamily: "Bungee",
                  }}
                >
                  the journey &nbsp;
                  <Button variant="light" onMouseDown={reviewJourney}>
                    💌
                  </Button>
                </div>
              </h1>
              {summarizerLoading ? (
                <div
                  style={{
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <RoxanaLoadingAnimation
                      nochat={false}
                      header={"creating"}
                      intel={true}
                    />
                  </div>
                  <div
                    style={{
                      whiteSpace: "pre-wrap",
                      maxWidth: 700,
                      textAlign: "left",
                    }}
                  >
                    {summarizerMessages
                      .map((msg, index) =>
                        index === 0 ||
                        index % 2 === 0 ||
                        index !== summarizerMessages.length - 1 ? null : (
                          <Markdown key={index}>{msg.content}</Markdown>
                        )
                      )
                      .reverse()}
                  </div>
                </div>
              ) : null}
              {!isEmpty(summarizerResponse) ? (
                <div
                  style={
                    EmotionalIntelligenceStyles.SummarizerResponseContainer
                  }
                >
                  <div
                    style={{
                      ...EmotionalIntelligenceStyles.AiResponseMessage,
                      maxWidth: 600,
                    }}
                  >
                    {summarizerResponse}
                  </div>
                </div>
              ) : null}

              <div style={EmotionalIntelligenceStyles.JourneyContainer}>
                {Object.keys(usersEmotionsFromDB)?.map((itemDate) => {
                  return (
                    <div key={itemDate}>
                      <br />
                      <h3
                        style={{
                          textAlign: "center",
                          width: "100vw",
                          fontFamily: "Bungee",
                        }}
                      >
                        {itemDate}
                      </h3>
                      {usersEmotionsFromDB[itemDate]
                        .map((emotion) => (
                          <EmotionButton
                            key={emotion.label}
                            color={emotion?.color}
                            colorHover={emotion.colorHover}
                            onMouseDown={() =>
                              handleEmotionSelection(emotion, false)
                            }
                          >
                            {emotion?.label}
                            <br />
                            {emotion?.emoji}
                          </EmotionButton>
                        ))
                        .reverse()}
                      <br /> <br /> <br />
                      <br />
                      <br />
                    </div>
                  );
                })}
              </div>
            </>
          ) : null}
        </Modal.Body>
      </Modal>

      <Modal
        show={isEmotionModalOpen}
        centered
        keyboard
        onHide={() => {
          setIsEmotionModalOpen(false);
          setChatGptResponse("");
          setShouldRenderSaveButton(false);
          setEmotionNote("");
        }}
        style={{ zIndex: 1000000 }}
      >
        <Modal.Header
          style={EmotionalIntelligenceStyles.EmotionHeader}
          closeVariant="white"
          closeButton
        >
          <Modal.Title style={{ fontFamily: "Bungee" }}>
            <img
              src={shouldRenderSaveButton ? roxanaFocusing : roxanaKind}
              width={50}
            />{" "}
            How You Feel
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={EmotionalIntelligenceStyles.EmotionBody}>
          <div style={{ marginBottom: 12 }}>
            <div style={EmotionalIntelligenceStyles.RowJustifyCenter}>
              <EmotionButton color={selectedEmotion?.color} noClick={true}>
                {selectedEmotion?.label}
                <br />
                {selectedEmotion?.emoji}
              </EmotionButton>
              <br />
              {shouldRenderSaveButton ? (
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder={"Feel welcome to share how you feel :)"}
                  onChange={(event) => setEmotionNote(event.target.value)}
                  style={EmotionalIntelligenceStyles.EmotionNote}
                />
              ) : null}
              {selectedEmotion?.note && !shouldRenderSaveButton ? (
                <div style={{ padding: 10, height: 150, overflow: "scroll" }}>
                  <div>
                    You said the following on <br />
                    {formatFriendlyDate(selectedEmotion?.timestamp)}
                  </div>
                  <br />
                  <div style={{ wordBreak: "break-word" }}>
                    {selectedEmotion?.note}
                  </div>
                </div>
              ) : null}
            </div>
            {shouldRenderSaveButton ? (
              <div>
                <Button
                  variant="light"
                  style={EmotionalIntelligenceStyles.GenerateInsightButton}
                  onMouseDown={generateAdviceOrWisdom}
                  disabled={chatGptLoading}
                >
                  generate insight 💌
                </Button>
              </div>
            ) : null}
          </div>
          {chatGptLoading ? (
            <div
              style={{
                ...EmotionalIntelligenceStyles.TextAlignCenter,
                height: "400px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                ...EmotionalIntelligenceStyles.AiResponseContainer,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <RoxanaLoadingAnimation
                  nochat={false}
                  header={"creating"}
                  intel={true}
                />
              </div>{" "}
              <div style={{ whiteSpace: "pre-wrap" }}>
                {chatGptMessages
                  .map((msg, index) =>
                    index === 0 ||
                    index % 2 === 0 ||
                    index !== chatGptMessages.length - 1 ? null : (
                      <Markdown key={index}>{msg.content}</Markdown>
                    )
                  )
                  .reverse()}
              </div>
            </div>
          ) : null}

          {(chatGptResponse || selectedEmotion?.ai) && !chatGptLoading ? (
            <div style={EmotionalIntelligenceStyles.AiResponseContainer}>
              <div style={EmotionalIntelligenceStyles.AiResponseMessage}>
                {chatGptResponse || selectedEmotion.ai}
              </div>
            </div>
          ) : !chatGptLoading && !selectedEmotion?.note ? (
            <div
              style={{
                height: "400px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <SunsetCanvas />
            </div>
          ) : !shouldRenderSaveButton ? (
            <div
              style={{
                height: "400px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {selectedEmotion.ai
                ? selectedEmotion?.ai
                : "AI assistance was not used."}
            </div>
          ) : null}
        </Modal.Body>
        <Modal.Footer style={EmotionalIntelligenceStyles.EmotionFooter}>
          {shouldRenderSaveButton ? (
            <Button variant="dark" onMouseDown={saveEmotionData}>
              Save
            </Button>
          ) : null}
        </Modal.Footer>
      </Modal>
    </>
  );
};
