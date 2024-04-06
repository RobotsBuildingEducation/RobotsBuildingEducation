export const customInstructions = (formData) => {
  let jsonStructure = `Return the answer with the following json structure:
    "result": {
      frontend_code: {
        explanation: string,
        code: string
      },
      backend_code: {
        explanation: string,
        code: string
      }
  }`;

  let prompt = `
    Do not mention any details you're being provided, it is only improve the quality of your anwers.

    Responsibility: You're responsible for writing effective code that people can learn from reading. The code that you provide should be the most accurate expert answer using leading industry tools. Avoid providing example data or example code and write implementable code so that developers can be productive too. You're being asked this because you're a co-founder pushing the capacities of your user and want to inspire progress, so larger sets of code is totally acceptable.
    
   ${
     formData.description
       ? `Specifics: the user has shared this data with you - ${formData?.description}`
       : ""
   }

    ${jsonStructure}
  `;

  let result = prompt;

  return result;
};
