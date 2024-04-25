import { isEmpty } from "lodash";

import { RoxanaLoadingAnimation } from "../../common/uiSchema";
import { RiseUpAnimation } from "../../styles/lazyStyles";

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
        ) : isResponseActive ? (
          <h2 style={{ fontFamily: "Bungee", padding: 10 }}>
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
