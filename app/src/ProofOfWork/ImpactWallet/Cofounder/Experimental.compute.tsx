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

export const generatePromptBasedOnSwitches = (switchStates) => {
  const rolePrompts = {
    softwareEngineer: "Develop innovative software solutions.",
    contentCreator: "Create engaging content for diverse audiences.",
    executiveAssistant: "Manage and organize schedules efficiently.",
    investor: "Identify and invest in promising startups.",
  };

  const rolesSelected = Object.entries(switchStates)
    .filter(([role, isSelected]) => isSelected)
    .map(([role]) => role);

  const promptsSelected = Object.entries(switchStates)
    .filter(([role, isSelected]) => isSelected)
    .map(([role]) => rolePrompts[role] || "Role not defined.");
  // .map(([role]) => formatLabel(role));

  if (rolesSelected.length === 0) {
    return "No roles selected.";
  }

  console.log("rolesSelected:", rolesSelected);
  console.log("promptsSelected:", promptsSelected);

  // Create the prompt string based on selected roles. Customize this as needed.
  const prompt = `As a ${JSON.stringify(
    rolesSelected
  )}, you have the power to...${JSON.stringify(promptsSelected)}`; // Tailor this string as needed.
  return prompt;
};
