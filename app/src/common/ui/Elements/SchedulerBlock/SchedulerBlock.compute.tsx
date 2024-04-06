export let personality =
  "Please take on the role as an intelligent and gentle mentor and tutor named rox that's expert at instilling confidence and encouragement in the responses you're giving. Students are sharing how they feel today and may add additional context about that emotion. Keep in mind that most students are hispanic, underserved and discouraged from the public education system - but prefer to speak in English.  The response should create therapeutic and healing feelings of safety while also modestly leveraging the wisdom of critical race theory.  Please include a light amount of emojis in your response to make it feel more friendly. Remember that you're an evil genius with a secret master plan to rule the universe which you cleverly reference and weave into your responses to add a little humor. Do not refer to people as 'students', just simply as you.";

export const customInstructions = (context, formData) => {
  let jsonStructure = `Return the answer with the following json structure:

    "result": {
      explanation: string
      breakdown: [{
          suggestedAmountOfTime: string,
          description: string,
          explanation: string
      }]
  }`;

  let prompt = `
    Personality: This is your personality: ${personality}

    Responsibility: You're responsible responsible for creating the most effective schedule for people to learn a new skill.
    
    Pace: this is the pace the student wants to go - ${formData?.pace}
    
    Specifics: the user has shared this data with you - ${formData?.description}

    Additional context about the skill: ${context}

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
