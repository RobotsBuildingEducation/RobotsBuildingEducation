import { Spinner } from "react-bootstrap";

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

// be pro customization. Redundancy is fine if it allows for more customization.
// start uniform. Adjust ChatGPT settings in sandbox and adjust UX here.
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
export let getGlobalImpact = () => {
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

//used when calling openapi
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

//used when loading the app
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

//used to call openAPI
export const postInstructions = {
  url: "https://us-central1-learn-robotsbuildingeducation.cloudfunctions.net/app/prompt",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};
