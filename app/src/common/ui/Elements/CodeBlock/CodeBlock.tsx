// imported files. Mostly software functions that are abstracted out for re-use.
import { useState } from "react";
import { japaneseThemePalette } from "../../../../styles/lazyStyles";
import { postInstructions } from "../../../uiSchema";
import { customInstructions } from "./CodeBlock.compute";
import { useZap, useZapAnimation } from "../../../../App.hooks";
import { completeZapEvent, updateImpact } from "../../../../App.compute";
import { ActivateCofounder } from "./ActivateCofounder/ActivateCofounder";
import { SoftwareEngineer } from "./SoftwareEngineer/SoftwareEngineer";

/**
CodeBlock is a component that renders an activation button and a dialogue modal.
The dialogue modal handles a simple form managing a text input and submit/create button.

When the create button is pressed, a message is sent to OpenAI's chat completion API.
Their servers return an answer to the prompt we've requested.

This prompt has a flag called "isJsonMode" and it's set to true, meaning that our response will be structured
using a key-value pairing: 

response {
  frontend_code: {
    explanation,
    code
  },
  backend_code: {
    explanation
    code
  }
}

We use this structure to manage a uniform visual or program that we display for the user.
 */
export const CodeBlock = ({
  //properties from the app that you're passing into your AI dialogue
  children,
  userStateReference,
  globalStateReference,
}) => {
  //hooks
  let zap = useZap();
  const zapAnimation = useZapAnimation();

  //state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formState, setFormState] = useState({
    description: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState({});

  //events
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    zapAnimation();

    let prompt = customInstructions(formState);

    const response = await fetch(postInstructions.url, {
      method: postInstructions.method,
      headers: postInstructions.headers,
      body: JSON.stringify({ prompt, isJsonMode: true }),
    })
      .then((response) => {
        completeZapEvent(
          zap,
          updateImpact,
          userStateReference,
          globalStateReference
        );

        return response;
      })
      .catch(() => {
        setIsLoading(false);
      });

    if (response) {
      let data = await response.json();

      let result = JSON.parse(data?.bot?.content);

      let outcome = result.result;

      setApiResponse(outcome);

      setIsLoading(false);
    }
  };

  //components
  return (
    <div
      style={{
        backgroundColor: japaneseThemePalette.StrongBlue,
        borderRadius: 30,
        padding: 12,
      }}
    >
      {/* button that opens up the cofounder modal in the demonstrate prompt */}
      <ActivateCofounder setIsModalOpen={setIsModalOpen} />
      <br />
      <br />

      {/* the content in the demonstrate prompt */}
      {children}

      {/* the AI dialogue modal to create frontend and backend code examples */}
      <SoftwareEngineer
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        isLoading={isLoading}
        formState={formState}
        apiResponse={apiResponse}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};
