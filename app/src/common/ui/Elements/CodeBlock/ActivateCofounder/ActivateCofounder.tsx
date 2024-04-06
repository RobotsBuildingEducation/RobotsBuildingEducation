import { useState } from "react";
import { japaneseThemePalette } from "../../../../../styles/lazyStyles";

export const ActivateCofounder = ({ setIsModalOpen }) => {
  let [boxShadow, setBoxShadow] = useState("6px 6px 5px 0px rgba(0,0,0,0.75)");

  return (
    <>
      <button
        onMouseEnter={() => {
          setBoxShadow(`6px 6px 5px 0px ${japaneseThemePalette.StrongBlue}`);
        }}
        onMouseLeave={() => {
          setBoxShadow("6px 6px 5px 0px rgba(0,0,0,0.75)");
        }}
        style={{
          boxShadow: boxShadow,
          backgroundColor: japaneseThemePalette.StrongBlue,
        }}
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        🌀
      </button>
      <br />
      <br />
    </>
  );
};
