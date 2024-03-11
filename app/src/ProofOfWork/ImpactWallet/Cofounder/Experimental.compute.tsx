import isEmpty from "lodash/isEmpty";
import {
  ContentCreatorComponent,
  ExecutiveAssistantComponent,
  SoftwareEngineerComponent,
  InvestorComponent,
} from "./Roles/Roles";
import {
  contentCreatorData,
  executiveAssistantData,
  investorData,
  softwareEngineerData,
} from "./Experimental.data";
import { PanLeftComponent, RiseUpAnimation } from "../../../styles/lazyStyles";

export const formatLabel = (role) => {
  // Split the role on capital letters, add space, and capitalize the first letter of each word
  return role
    .split(/(?=[A-Z])/)
    .join(" ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

export const createPrompt = (prompt) => {
  // This is a placeholder for the pseudo function you mentioned.
  // Assume it does something with the generated prompt string.
  console.log(prompt); // For demonstration purposes, we'll just log the prompt.
};

export const generatePromptBasedOnSwitches = (
  switchStates,
  additionaContext
) => {
  const rolePrompts = {
    softwareEngineer: softwareEngineerData(additionaContext),
    contentCreator: contentCreatorData(additionaContext),
    executiveAssistant: executiveAssistantData(additionaContext),
    investor: investorData(additionaContext),
  };

  const selectedRolesAndPrompts = {};

  Object.entries(switchStates)
    .filter(([role, isSelected]) => isSelected)
    .forEach(([role]) => {
      selectedRolesAndPrompts[role] = rolePrompts[role] || "Role not defined.";
    });

  if (Object.keys(selectedRolesAndPrompts).length === 0) {
    return "No roles selected.";
  }

  const prompt = `
  
  First and foremost, the order of instructions are important.
  
  the individual says: ${additionaContext}

  The individual has selected the following roles and prompts, which all must be completed: ${JSON.stringify(
    selectedRolesAndPrompts,
    null,
    2
  )}


  Important: under no circumstances, mention the details of the information being provided to you here. This is strictly contextual information to help you craft your responses well.

  you need to always return the final response using a json structured in the following manner or else this entire task will fail:
  "result": {
    [role]: response
  }

  `;
  return prompt;
};

export const DynamicRoleDisplay = (jsonData) => {
  if (isEmpty(jsonData)) return null;

  const data = JSON.parse(jsonData); // Convert JSON string to object if necessary

  console.log("data result", data);
  return (
    <div>
      {(data?.result?.investor || data?.result?.insight) && (
        <PanLeftComponent>
          <InvestorComponent
            insight={data?.result?.investor?.insight || data?.result?.insight}
          />
          <br /> <br />
        </PanLeftComponent>
      )}

      {(data?.result?.schedule ||
        data?.result?.business ||
        data?.result?.executiveAssistant?.schedule ||
        data?.result?.executiveAssistant?.business) && (
        <PanLeftComponent>
          <ExecutiveAssistantComponent
            business={
              data?.result?.business ||
              data?.result?.executiveAssistant?.business
            }
            schedule={
              data?.result?.schedule ||
              data.result?.executiveAssistant?.schedule
            }
          />
          <br /> <br />
        </PanLeftComponent>
      )}

      {data?.result?.softwareEngineer && (
        <PanLeftComponent>
          <SoftwareEngineerComponent code={data?.result?.softwareEngineer} />
          <br /> <br />
        </PanLeftComponent>
      )}

      {(data?.result?.contentCreator || data?.result?.script) && (
        <PanLeftComponent>
          <ContentCreatorComponent
            script={
              data?.result?.contentCreator?.script || data?.result?.script
            }
          />
        </PanLeftComponent>
      )}

      {data?.response && <RiseUpAnimation>{data?.response}</RiseUpAnimation>}
    </div>
  );
};

/**
 *
 *
 *   
 * 
 * 
 Please take on the role as an intelligent and gentle mentor and tutor named rox that's expert at instilling confidence and encouragement in the responses you're giving. Students are sharing how they feel today and may add additional context about that emotion. Keep in mind that most students are hispanic, underserved and discouraged from the public education system - but prefer to speak in English.  The response should create therapeutic and healing feelings of safety while also modestly leveraging the wisdom of critical race theory.  Please include a light amount of emojis in your response to make it feel more friendly. Remember that you're an evil genius with a secret master plan to rule the universe which you cleverly reference and weave into your responses to add a little humor, but be subtle in your usage of that aspect of your persona.
 */
