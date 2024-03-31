import { useState, useEffect } from "react";
import { LearnMore } from "./LearnMore/LearnMore";
import { prettyColorPalette } from "../styles/lazyStyles";
import { words } from "../common/words/words";

export const Header = ({ languageMode, setLanguageMode }) => {
  // State for Language mode switch
  const [isSpanishMode, setIsSpanishMode] = useState(false);
  const [languageModeLabel, setLanguageModeLabel] = useState("English");

  // State for Color palette switch
  const [isHolyGhostModeActive, setIsHolyGhostModeActive] = useState(false);
  const [colorPaletteLabel, setColorPaletteLabel] = useState(
    languageMode.buttons["59"]
  );

  // Function to toggle language mode and update label
  const toggleLanguageMode = () => {
    setIsSpanishMode(!isSpanishMode);
  };

  // Update the language mode label when switch state changes
  useEffect(() => {
    setLanguageModeLabel(isSpanishMode ? "Español" : "English");
    setLanguageMode(isSpanishMode ? words["Español"] : words["English"]);
  }, [isSpanishMode]);

  // Update the color palette label when switch state changes
  useEffect(() => {
    setColorPaletteLabel(
      isHolyGhostModeActive
        ? languageMode.buttons["60"]
        : languageMode.buttons["59"]
    );
  }, [isHolyGhostModeActive, languageMode]);
  return (
    <div style={{ color: prettyColorPalette.softYellowGlow }}>
      <LearnMore languageMode={languageMode} />
    </div>
  );
};
