import React, { useState, useEffect, useRef } from "react";
import { addDoc, collection, doc, setDoc, updateDoc } from "firebase/firestore";
import { isEmpty } from "lodash";
import { PromptMessage } from "./PromptMessage/PromptMessage";
import { Prompts } from "./Prompts/Prompts";
import { analytics, database } from "../database/firebaseResources";
import { logEvent } from "firebase/analytics";
import { PromptCombiner9000 } from "./PromptCombiner9000/PromptCombiner9000";
import {
  computeResponseList,
  computeTotalImpactFromPrompt,
} from "./ChatGPT.compute";
import { Intro } from "./Intro/Intro";
import {
  FadeInComponent,
  PanLeftComponent,
  PanRightComponent,
  RiseUpAnimation,
} from "../styles/lazyStyles";
import { useBitcoinAnimation } from "../App.hooks";
import { LectureHeader } from "../LectureHeader/LectureHeader";
import { addKnowledgeStep, updateImpact } from "../App.compute";
import { useCashuWallet, useSharedNostr } from "../App.web5";
import { useStore } from "../Store";

const logAnalyticsEvent = (item_list_id, item_id, item_name) => {
  logEvent(analytics, "select_item", {
    item_list_id,
    item_list_name: item_list_id,
    items: [
      {
        item_id,
        item_name,
      },
    ],
  });
};

export const ChatGPT = ({
  currentPath,
  patreonObject,
  userDocumentReference,
  databaseUserDocument,
  setDatabaseUserDocument,
  globalDocumentReference,
  globalImpactCounter,
  setGlobalImpactCounter,

  moduleName,
  handleScheduler,
  handleZap,

  userStateReference,
  globalStateReference,
  zap,
  checkForUnlock,
  handleCompletedPractice,
  handleWatch,
  uiStateReference,
}: Record<string, any>) => {
  const handleBitcoinAnimation = useBitcoinAnimation();
  const [shouldRenderIntro, setShouldRenderIntro] = useState(true);
  const [promptMessage, setPromptMessage] = useState("");
  const [loadingMessage, setLoadingMessage] = useState("");
  const [isResponseActive, setIsResponseActive] = useState(false);
  const [chatGptResponseList, setChatGptResponseList] = useState([]);
  const [promptSelection, setPromptSelection] = useState("");
  const [parentVisibility, setParentVisibility] = useState(true);

  const { connected, error, postNostrContent } = useSharedNostr(
    localStorage.getItem("local_npub"),
    localStorage.getItem("local_nsec")
  );

  const {
    formData,
    setFormData,
    dataOutput,
    wallet,
    balance,
    handleSetMint,
    handleMint,
    handleSwapSend,
    recharge,
  } = useCashuWallet(true);

  const { globalBalance, setGlobalBalance } = useStore((state) => ({
    globalBalance: state.globalBalance,
    setGlobalBalance: state.setGlobalBalance,
  }));

  useEffect(() => {
    setIsResponseActive(false);
    setPromptMessage(patreonObject?.header);
    setChatGptResponseList([]);
  }, [patreonObject]);

  const topRef = useRef(null);

  useEffect(() => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: "instant" });
    }
  }, [loadingMessage]);

  const handlePromptSelection = (promptType) => {
    const itemListId = `RO.B.E_prompt|${promptType}|${moduleName}|${currentPath}`;
    logAnalyticsEvent(itemListId, itemListId, itemListId);
    setPromptSelection(promptType);
    setShouldRenderIntro(false);
    setLoadingMessage("...");
  };

  const storeTokenInFirestore = async (token) => {
    try {
      await addDoc(collection(database, "tokens"), { cashuToken: token });
      console.log("Token successfully stored in Firestore!");
    } catch (error) {
      console.error("Error storing token in Firestore: ", error);
    }
  };

  const handleSubmit = async (event, prompt = null, promptType = null) => {
    event.preventDefault();

    handleBitcoinAnimation();
    let result = computeResult(promptType, patreonObject);

    setParentVisibility(true);

    setPromptMessage(prompt?.request);
    handlePromptSelection(promptType);
    await new Promise((resolve) => setTimeout(resolve, 750));

    setIsResponseActive(true);
    setChatGptResponseList(result?.response);

    let cashuToken = null;
    if (
      parseInt(localStorage.getItem("balance")) > 0 &&
      localStorage.getItem("address")
    ) {
      cashuToken = await handleSwapSend();
      await storeTokenInFirestore(cashuToken);
    }

    console.log("cashuToken", cashuToken);

    // Store the token in Firestore

    // Update the global state with the new balance
    await updateImpact(result.impact, userStateReference, globalStateReference);

    logEvent(analytics, "spend_virtual_currency", {
      value: result.impact,
      virtual_currency_name: "Impact",
      item_name: `${currentPath}|${moduleName}|${promptType}`,
    });

    setLoadingMessage("");

    const remappedPrompts = {
      patreon: "discover",
      guide: "guide",
      shop: "shop",
      practice: "practice",
    };

    if (!(promptType === "practice")) {
      await addKnowledgeStep(
        patreonObject.knowledge[remappedPrompts[promptType]].step,
        patreonObject.knowledge[remappedPrompts[promptType]].knowledge,
        patreonObject.knowledge[remappedPrompts[promptType]].label,
        patreonObject.knowledge[remappedPrompts[promptType]].collectorId
      );

      postNostrContent(
        `User ${localStorage.getItem(
          "uniqueId"
        )} has completed progress on the ${moduleName} lecture and generated ${
          result.impact
        } units of work on Robots Building Education${
          cashuToken
            ? " with cashu token " + cashuToken?.substr(0, 16) + "..."
            : ""
        }. \n\n 
        "${patreonObject.knowledge[remappedPrompts[promptType]].label} | ${
          patreonObject.knowledge[remappedPrompts[promptType]].knowledge
        }"\n
        \n
        The total work generated toward creating scholarships is ${
          globalStateReference.globalImpactCounter
        }. Learn more at https://robotsbuildingeducation.com or support us at https://patreon.com/robotsbuildingeducation.`
      );
    } else {
      postNostrContent(
        `User ${localStorage.getItem(
          "uniqueId"
        )} has completed progress on the ${moduleName} lecture and generated ${
          result.impact
        } units of work on Robots Building Education${
          cashuToken
            ? "with cashu token " + cashuToken?.substr(0, 16) + "..."
            : ""
        }. \n\n 
        "${patreonObject.knowledge[promptType].label} | ${
          patreonObject.knowledge[promptType].knowledge
        }"\n
        \n
        The total work generated toward creating scholarships is ${
          globalStateReference.globalImpactCounter
        }. Learn more at https://robotsbuildingeducation.com or support us at https://patreon.com/robotsbuildingeducation.`
      );
    }
  };

  const computeResult = (promptType, patreonObject) => {
    return {
      response: computeResponseList(patreonObject, promptType),
      impact: computeTotalImpactFromPrompt(patreonObject, promptType),
    };
  };

  return (
    <div
      onSubmit={handleSubmit}
      style={{ transition: "0.3s all ease-in-out", color: "white" }}
      ref={topRef}
    >
      <FadeInComponent>
        <PromptMessage
          promptMessage={promptMessage}
          patreonObject={patreonObject}
          chatGptResponseList={chatGptResponseList}
          loadingMessage={loadingMessage}
          topRef={topRef}
        />
      </FadeInComponent>

      <br />
      <PanLeftComponent>
        <Intro
          patreonObject={patreonObject}
          loadingMessage={loadingMessage}
          isResponseActive={isResponseActive}
          promptSelection={promptSelection}
        />
      </PanLeftComponent>

      {chatGptResponseList?.map((response, index) => (
        <PromptCombiner9000
          key={index}
          loadingMessage={loadingMessage}
          chatGptResponse={response}
          patreonObject={patreonObject}
          parentVisibility={parentVisibility}
          setParentVisibility={setParentVisibility}
          handleScheduler={handleScheduler}
          userStateReference={userStateReference}
          globalStateReference={globalStateReference}
          handleZap={handleZap}
          zap={zap}
          index={index}
          moduleName={moduleName}
          checkForUnlock={checkForUnlock}
          handleCompletedPractice={handleCompletedPractice}
          handleWatch={handleWatch}
        />
      ))}

      <Prompts
        loadingMessage={loadingMessage}
        patreonObject={patreonObject}
        handleSubmit={handleSubmit}
        handleZap={handleZap}
        zap={zap}
        userStateReference={userStateReference}
        uiStateReference={uiStateReference}
      />
    </div>
  );
};
