import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

import { isEmpty } from "lodash";

import Patreon from "../Patreon/Patreon";
import CodeEditor from "../CodeEditor/CodeEditor";

import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css";
import { PanLeftComponent } from "../../styles/lazyStyles";
import { ContentLinks } from "../../common/ui/Elements/ContentLinks/ContentLinks";
import { CodeDemo } from "./CodeDemo/CodeDemo";

import { CodeBlock } from "../../common/ui/Elements/CodeBlock/CodeBlock";

const delayedAnimation = keyframes`
from {
    transform: translateY(100px);
    opacity: 0;
    visibility: hidden;
  }
  to {
    transform: translateY(0);
    opacity: 1;
    visibility: visible;
  }
`;
const StyledAnimatedPromptCombiner = styled.div`
  animation: ${delayedAnimation} 0.25s ease-out;
  animation-delay: ${(props) => props.index * 0.2}s; /* Delay based on index */
  opacity: 0; /* Start with opacity 0 to make the animation visible */
  visibility: hidden;
  animation-fill-mode: forwards; /* Keep the element visible after the animation */
`;
const Wrapper = styled.div`
  text-align: left;
`;

const Heading = styled.h2`
  margin-top: 24px;
`;

const MessageContainer = styled.div`
  background-color: ${(props) => (props.loading ? "black" : "#2C2C2E")};
  color: white;
  display: ${(props) => (props.loading ? "none" : "flex")};
  justify-content: flex-start;
  padding: 20px;
  min-width: 350px;
  // max-width: 600px;
  max-width: 80.5%;
  border-radius: 50px;
  margin: 24px 0 12px 0;
`;

const FlexBox = styled.div`
  display: flex;
  width: 100%;
`;

const Advertisement = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const StyledPromptHeaderButton = styled.button`
  background-color: transparent;
  border-radius: 8px;
  border-top: 1px solid transparent;
  border-right: 1px solid transparent;
  border-left: 2px solid white;
  border-bottom: 2px solid white;
  color: white;
`;

const renderContent = (
  type,
  response,
  patreonObject,
  handleScheduler,
  userStateReference,
  globalStateReference,
  handleZap,

  zap,
  moduleName,
  checkForUnlock,
  handleCompletedPractice,
  handleWatch
) => {
  switch (type) {
    case "patreon":
      return (
        <Patreon
          patreonObject={patreonObject}
          handleScheduler={handleScheduler}
          handleWatch={handleWatch}
          userStateReference={userStateReference}
          globalStateReference={globalStateReference}
          handleZap={handleZap}
          moduleName={moduleName}
        />
      );
    case "practice":
      return (
        <CodeEditor
          patreonObject={patreonObject}
          moduleName={moduleName}
          handleCompletedPractice={handleCompletedPractice}
          userStateReference={userStateReference}
        />
      );
    case "demonstrate":
      if (patreonObject?.hasCode) {
        return (
          <CodeBlock
            userStateReference={userStateReference}
            globalStateReference={globalStateReference}
          >
            <CodeDemo response={response} patreonObject={patreonObject} />
          </CodeBlock>
        );
      } else {
        return <div style={{ padding: 20 }}>{response}</div>;
      }
    case "shop":
      return (
        <div style={{ padding: 20 }}>
          <code style={{ fontSize: 12 }}>
            <span style={{ color: "lime" }}>
              The following links are affiliate links by Shopify Collabs that
              earn 7-15% commission.
            </span>
            <br />
            <br />
            <span style={{ color: "cyan", fontWeight: "bolder" }}>
              Links with borders are creator businesses in partnership with
              Robots Building Education.
            </span>
          </code>
          <br />
          <br />
          {response}
        </div>
      );
    default:
      return (
        <div style={{ padding: 20 }}>
          {patreonObject?.prompts?.[type]?.headerImageSrc ? (
            <ContentLinks patreonObject={patreonObject} type={type} />
          ) : null}

          {response}
        </div>
      );
  }
};

export const PromptCombiner9000 = ({
  key,
  loadingMessage,
  chatGptResponse,
  patreonObject,
  parentVisibility,
  setParentVisibility,
  handleScheduler,
  userStateReference,
  globalStateReference,
  handleZap,

  zap,
  index,
  moduleName,
  checkForUnlock,
  handleCompletedPractice,
  handleWatch,
}) => {
  const [promptVisibility, setPromptVisibility] = useState("flex");
  if (isEmpty(patreonObject)) {
    return null;
  }

  const { type, response, icon } = chatGptResponse;

  const handlePromptHeaderVisibility = (event) => {
    setParentVisibility(false);

    if (promptVisibility === "none") {
      setPromptVisibility("flex");
    } else {
      setPromptVisibility("none");
    }
  };

  useEffect(() => {
    if (parentVisibility) {
      setPromptVisibility("flex");
    }
  }, [parentVisibility]);

  return (
    <Wrapper>
      {loadingMessage.length < 1 && (
        <Heading
          id={type}
          onClick={handlePromptHeaderVisibility}
          // style={{
          //   border:
          //     promptVisibility === "flex"
          //       ? "1px solid transparent"
          //       : "1px solid white",
          // }}
        >
          <PanLeftComponent>
            <StyledPromptHeaderButton variant="dark">
              {type === "patreon" ? "discover" : type} {icon}
            </StyledPromptHeaderButton>
          </PanLeftComponent>
        </Heading>
      )}

      <StyledAnimatedPromptCombiner index={index}>
        <MessageContainer
          loading={loadingMessage}
          id={key + type}
          style={{
            display: promptVisibility,
          }}
        >
          <FlexBox>
            {loadingMessage.length < 1 &&
              response &&
              renderContent(
                type,
                response,
                patreonObject,
                handleScheduler,
                userStateReference,
                globalStateReference,
                handleZap,

                zap,
                moduleName,
                checkForUnlock,
                handleCompletedPractice,
                handleWatch
              )}
          </FlexBox>
        </MessageContainer>
      </StyledAnimatedPromptCombiner>
    </Wrapper>
  );
};
