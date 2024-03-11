import { personality } from "../../../../ProofOfWork/ImpactWallet/Scheduler/Scheduler.compute";

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

  /**
[{
  description: string,
  explanation: string
}]
   */
  // Personality: This is your personality: ${personality}
  let prompt = `


    Responsibility: You're responsible for writing effective code that people can learn from reading.
    
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

/*

  // const [apiResponse, setApiResponse] = useState({
  //   explanation:
  //     "The provided information outlines a comprehensive journey from beginner to leading professional in the domain of intersectional research, human-computer interaction (HCI), and computer science. This pathway is structured into five stages, each with its own focus on knowledge acquisition, skill development, and professional practice.",
  //   breakdown: [
  //     {
  //       suggestedAmountOfTime: "6-12 months",
  //       description: "Beginner: Introduction to the foundations",
  //       explanation:
  //         "Start with understanding the basics of computer science and get familiarized with programming languages such as Python. Learn about HCI through beginner-friendly books and grasp the concept of intersectionality through foundational texts. This stage lays the groundwork for further exploration and specialization.",
  //     },
  //     {
  //       suggestedAmountOfTime: "6-12 months",
  //       description: "Intermediate: Building on the basics",
  //       explanation:
  //         "Enhance your technical skills by learning another programming language like Java or JavaScript. Take basic courses in UX/UI design to understand HCI principles better and explore intersectionality in detail, focusing on how overlapping social categories affect social justice.",
  //     },
  //     {
  //       suggestedAmountOfTime: "12-24 months",
  //       description: "Advanced: Deepening your knowledge and specialization",
  //       explanation:
  //         "Dive into advanced HCI concepts such as user-centered design and heuristic evaluation. Engage with intersectional research literature and case studies, and strengthen your computer science fundamentals with knowledge of data structures and algorithms.",
  //     },
  //     {
  //       suggestedAmountOfTime: "Continuous, integrated with professional work",
  //       description: "Professional: Practice and real-world experience",
  //       explanation:
  //         "Apply what you've learned in real-world projects that consider both user-centered design and intersectionality. Contribute to HCI related open source projects and participate in webinars and seminars to both learn and share knowledge.",
  //     },
  //     {
  //       suggestedAmountOfTime: "Ongoing",
  //       description:
  //         "Continued Learning & Leading: Staying informed and leading the domain",
  //       explanation:
  //         "Never stop learning. Engage in discussions about intersectionality in tech, stay up-to-date with the latest HCI research, and continue to refine your programming skills. Lead by conducting original research, publishing your findings, and sharing your knowledge through mentoring or consulting.",
  //     },
  //   ],
  // });


*/
