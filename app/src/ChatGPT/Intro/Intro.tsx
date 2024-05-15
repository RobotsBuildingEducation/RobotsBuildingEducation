import { isEmpty } from "lodash";

import { RiseUpAnimation } from "../../styles/lazyStyles";
import { RoxanaLoadingAnimation } from "../../App.compute";

// Main Intro component
export const Intro = ({
  patreonObject,
  loadingMessage,
  isResponseActive,
  promptSelection,
  isHome = false,
  isCollection = false,
}) => {
  // Return null if patreonObject is empty
  if (isEmpty(patreonObject)) return null;

  // Roxana's intro text logic
  const RoxanaIntroText = () => (
    <div style={{ padding: 15 }}>
      {!isEmpty(patreonObject?.prompts?.welcome) ? (
        <div>
          <br />
          {patreonObject?.prompts?.welcome?.response}
        </div>
      ) : null}
    </div>
  );

  // Render the main component
  return (
    <RiseUpAnimation
      style={{
        //4003ba //2C2C2E
        backgroundColor: loadingMessage ? "black" : "#2C2C2E",
        color: "white",
        display: "flex",
        justifyContent: "flex-start",
        textAlign: "left",
        padding: 5,
        // maxWidth: isHome ? "90.5%" : "80.5%",
        maxWidth: isHome ? "90.5%" : "80.5%",
        minWidth: isHome ? "90.5%" : "80.5%",

        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        borderBottomRightRadius: 50,
      }}
    >
      <div style={{ display: "flex" }}>
        {loadingMessage ? (
          <RoxanaLoadingAnimation />
        ) : isResponseActive &&
          patreonObject.header === "Learning Mindset & Perspective" ? (
          <div>
            <h2 style={{ fontFamily: "Bungee", padding: 15 }}>
              {promptSelection === "patreon" && "Discover ►"}
              {promptSelection === "guide" && "Guide 🗓️"}
              {promptSelection === "shop" && "Shop 🛍️"}
              {promptSelection === "practice" && "Practice 🥋"}
            </h2>

            <div style={{ padding: 15 }}>
              {promptSelection === "patreon" &&
                "The discover prompt exposes you to beginner, intermediate and advanced subject matter."}
              {promptSelection === "guide" &&
                "The guide prompt offers direction and guardrails for deeper study."}
              {promptSelection === "shop" &&
                "The shop tab lets your connect with other creator platforms and additional resources"}
              {promptSelection === "practice" &&
                "The practice session lets you work through common blocks of code you'll find building software services."}
            </div>
          </div>
        ) : isResponseActive ? (
          <h2 style={{ fontFamily: "Bungee", padding: 15 }}>
            {promptSelection === "patreon" && "Discover ►⚡🎨"}
            {promptSelection === "guide" && "Guide 🧿📚🔮🗓🧪"}
            {promptSelection === "shop" && "Shop 🛍️"}
            {promptSelection === "practice" && "Practice 🥋"}
          </h2>
        ) : (
          <RoxanaIntroText />
        )}
      </div>
    </RiseUpAnimation>
  );
};
