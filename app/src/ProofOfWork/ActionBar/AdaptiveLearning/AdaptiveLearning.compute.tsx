export const customInstructions = (instructions, promptData, businessGoal) => {
  return `The following business or goal is the individual's focus: ${businessGoal}. ${instructions} + ${JSON.stringify(
    promptData
  )}`;
};

// The individual has collected this knowledge while learning how to build a startup from scratch. Generally speaking, they're starting with code first and need to learn that. This later includes a number of skills like coding, business, investing, design, philosophy, resume writing, and psychology. The idea is to provide real time feedback and suggestions as an individual learns more skills and gains awareness of the challenge. You have a maximum of 3 sentences. This is the following knowledge they've collected so far:
