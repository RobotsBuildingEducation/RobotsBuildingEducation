import { Creator } from "./ui/Creator/Creator";
import { Engineer } from "./ui/Engineer/Engineer";
import { Entrepeneur } from "./ui/Entrepeneur/Entrepeneur";
import roxanaGif from "./media/images/roxanaGif.gif";
import roxSplashAnimation from "./media/images/roxSplashAnimation.gif";
import { FadeInComponent } from "../styles/lazyStyles";

interface IPrompt {
  impact: number;

  action: string;

  icon: string;

  request: string;

  response: string | JSX.Element;

  spanish?: string | boolean | JSX.Element;

  //customs & practice prompt
  [index: string]: any;
}

interface IModule {
  hasCode?: boolean;

  // title header
  header: string;

  // video or .markdown fies
  fileSource: any;

  // styling for modules
  dealerBorder?: boolean;
  creatorBorder?: boolean;

  prompts: {
    welcome: Partial<IPrompt>;

    quiz: IPrompt;

    ask: IPrompt;

    inspire: IPrompt;

    define: IPrompt;

    summarize: IPrompt;

    demonstrate: IPrompt;

    guide: IPrompt;

    patreon: IPrompt;

    shop: IPrompt;

    practice?: IPrompt;
  };

  [index: string]: any;
}

interface ICollection {
  [index: string]: Record<string, IModule>;
}
interface IPath {
  Engineer: ICollection;
  Creator: ICollection;
  Entrepeneur: ICollection;
}
// repeatable + defining word combos. Level 1 prompts
/**
 * no long actively used. legacy data in the ui schema
 */
export let ultimateEffeciencyJutsu = (key) => {
  let map = {
    [`Lesson 1`]: `coding and computer logic`,
    [`Lesson 2`]: `sets of data and functions in computer programming`,
    [`Lesson 3`]: `object oriented programming and CRUD applications`,
    [`Lesson 4`]: `HTTP methods`,
    [`Lesson 5`]: `computer programming loops`,
    [`Lesson 6`]: `HTML`,
    [`Lesson 7`]: `CSS`,
    [`Lesson 8`]: `React programming`,
    [`Lesson 9`]: `oauth`,
    [`Lesson 10`]: `database design`,
    [`Lesson 11`]: `backend software engineering`,
    [`Lesson 12`]: `computer operating systems`,
    [`Lesson 13`]: `command line interfaces`,
    [`Lesson 14`]: `fintech APIs`, // wow this one is crazy in commonElements.ts lol
    [`Lesson 15`]: `noSQL with Firebase Firestore`,
    [`Lesson 16`]: `Git and Github`,
    ["Build For Undocumented"]:
      "opportunities to consult as an undocumented immigrant with Hydrogen by Shopify",
    ["Build For Teachers"]: "GitHub for teachers",
    ["Build For Community"]:
      "the relationship between bitcoin, automation and universal basic income",
    ["Social Chat"]:
      "a chat app where users can subscribe to people's private chats",
    ["Programming Languages"]: "the theory of programming languages",
    ["Recursion"]: "recursion",
    ["Linked Lists"]: "linked lists",
    ["Link Travel"]: "traversing linked lists and trees",
    ["Link Changing"]: "swapping nodes in a linked list, tree, or graph",
    ["Algorithms"]: "tree and graph algorithms",
    ["Content Review"]: "reviewing content to grow on social media",
    ["UI/UX"]: "human computer interaction, user centered design and UI/UX",
    ["Influence & Expression"]:
      "expression and its impacts on influence in social media",
    ["Creating Purpose"]:
      "creating purpose by choosing problems to solve and journeys to take",
    ["The Drug War"]:
      "why the drug war has been the primary source for inequality in the United States (This is under construction 🚧🚧🚧) ",
    ["Abraham Lincoln"]: "Abraham Lincoln and his views on divine providence",
    ["Philosophy"]:
      "the relationship between the philosophy of purpose, critical race theory and machine learning algorithms",
    ["Bitcoin, Automa & the Drug War"]:
      "the relationship between bitcoin, automation, universal basic income and the drug war",
    // ["Bitcoin x Social Technology"]:
    //   "the relationship between decentralized identities, civil liberties and our experience on the internet",
    // ["Tech Recession Investing"]: "the benefits of investing in recessions",
    // ["Tech Recession Investing x Real Estate II"]:
    //   "the benefits of using IRA exceptions and FHA loans to purchase your first home with $10,000",
    ["Wealth Management"]:
      "how real estate is tied to the overall market and is a safe way to leverage money",
    ["Learn Coding"]:
      "how computer science is intersectional with any subject of interest",
    ["Creating Competitive Entry Level Resumes"]:
      "how to write an effective resume",
    ["Focus Investing"]:
      "resource allocation with the focused investing discipline",

    // ["Financial Technology Investing"]:
    //   "the pros and cons of investing in financial technology",
    ["Social Media Investing"]: "incentives behind social media",
    // ["Metaverse Investing"]: "incentives behind the metaverse",
    // ["Mexican-American Trade Investing"]:
    //   "the pros and cons of investing strong Mexican-American railroads",
    // ["Infrastructure Investing"]:P
    //   "the pros and cons of investing in AEC technology",
    // ["Cloud Investing"]:
    //   "the pros and cons of investing in cloud software like Cloudflare",
    ["Little Village"]: "Little Village, Chicago",

    ["Lesson 1 Coding Fundamentals"]:
      "the fundamentals of object oriented programming",

    ["Lesson 2 Frontend Event-Driven Programming"]:
      "the fundamentals of event-driven programming and user-centered design",

    ["Lesson 3 Understanding Backend Engineering"]:
      "the foundations of backend engineering, cloud computing and big data",

    ["Lesson 4 Building Apps"]: "how to build a startup and raise investment",
    ["Lesson 5 Computer Science"]:
      "the foundations of data structures and algorithms",
    ["SEO: Search Engine Optimization"]:
      "understanding search engine optimization",

    ["Human-Computer Interaction"]:
      "human-computer interaction, search engine optimization and influence",

    ["The Psychology Of Self-esteem"]:
      "the psychology of self-esteem and emotional health",
    ["Memes"]: "cook and season birds for dinner",
  };
  return map[key] || "null";
};

/**
be pro customization. Redundancy is fine if it allows for more customization.

defines the UI
*/
export const ui = (): IPath => {
  // can branch this further to reduce JSON size computed when invoked.

  return {
    Engineer: Engineer,
    Creator: Creator,
    Entrepeneur: Entrepeneur,
  };
};
export let uiPaths = ["Engineer", "Creator", "Entrepeneur"];

export const uiCollections = ui();

/**
 * @returns the total amount of proof of work points collected from module.prompts[prompt].impact
 */
export let getTotalImpactFromModules = () => {
  let pathKeys = Object.keys(ui());

  let sum = 0;
  let moduleCount = 0;

  const ignoreCollection = [
    "Computer Science (older version)",
    "Crash Course Version 2 (older version)",
  ];

  //used to be boss mode
  const ignorePath = [];

  const ignoreModule = ["Memes", "Self-esteem"];

  const ignorePrompt = ["welcome", "intro"];

  pathKeys.forEach((path) => {
    if (!ignorePath.includes(path)) {
      let collectionKeys = Object.keys(ui()[path]);

      collectionKeys.forEach((collection) => {
        if (!ignoreCollection.includes(collection)) {
          let moduleKeys = Object.keys(ui()[path][collection]);

          moduleKeys.forEach((module) => {
            if (!ignoreModule.includes(module)) {
              moduleCount = moduleCount + 1;

              let mod = ui()[path][collection][module];
              let prompts = Object.keys(mod.prompts);

              prompts.forEach((prompt) => {
                if (!ignorePrompt.includes(prompt)) {
                  sum = sum + mod.prompts[prompt].impact;
                }
              });
            }
          });
        }
      });
    }
  });

  return sum;
};

/**
 *
 * used when calling openai
 */
export let RoxanaLoadingAnimation = () => {
  return (
    <FadeInComponent>
      <div>
        {/* <Spinner animation="grow" variant="info" size="sm">
          <span className="visually-hidden">Loading...</span>
        </Spinner> */}
        <img width="150px" src={roxanaGif} />
        {/* <Spinner animation="grow" variant="primary" size="sm">
          <span className="visually-hidden">Loading...</span>
        </Spinner> */}
      </div>
    </FadeInComponent>
  );
};

/**
 *
 * @returns used when loading the app
 */
export let RoxSplashAnimation = () => {
  return (
    <FadeInComponent>
      <div>
        {/* <Spinner animation="grow" variant="info" size="sm">
          <span className="visually-hidden">Loading...</span>
        </Spinner> */}
        <img width="200px" src={roxSplashAnimation} />
        {/* <Spinner animation="grow" variant="primary" size="sm">
          <span className="visually-hidden">Loading...</span>
        </Spinner> */}
      </div>
    </FadeInComponent>
  );
};

/**
 * used to call openAPI
 */
export const postInstructions = {
  url: "https://us-central1-learn-robotsbuildingeducation.cloudfunctions.net/app/prompt",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};
