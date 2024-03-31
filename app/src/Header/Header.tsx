import { useState, useEffect } from "react";
import { LearnMore } from "./LearnMore/LearnMore";
import { prettyColorPalette } from "../styles/lazyStyles";
import { words } from "../common/words/words";

/**
 * Represents a Header component that manages upper level functionality.
 *
 * This component allows users to toggle between Spanish and English language modes using a switch.
 * The component also integrates the `LearnMore` component, passing down the current language mode for
 * consistent localization. This feature is currently disabled.
 *
 * Props:
 * @param {Object} languageMode - The current language mode settings including text and labels.
 * @param {Function} setLanguageMode - Function to update the global language mode state.
 *
 * State:
 * @state {boolean} isSpanishMode - Tracks whether Spanish mode is active.
 * @state {string} languageModeLabel - Displays the current language label (English/Español).
 *
 * Behavior:
 * - Toggles between Spanish and English modes on user interaction.
 * - Updates language mode globally affecting the entire application scope.
 * - Dynamically updates labels based on the current state for immediate visual feedback.
 */
export const Header = ({ languageMode, setLanguageMode }) => {
  // State for Language mode switch
  const [isSpanishMode, setIsSpanishMode] = useState(false);
  const [languageModeLabel, setLanguageModeLabel] = useState("English");

  // Function to toggle language mode and update label
  const toggleLanguageMode = () => {
    setIsSpanishMode(!isSpanishMode);
  };

  // Update the language mode label when switch state changes
  useEffect(() => {
    setLanguageModeLabel(isSpanishMode ? "Spanish" : "English");
    setLanguageMode(isSpanishMode ? words["Spanish"] : words["English"]);
  }, [isSpanishMode]);

  return (
    <div style={{ color: prettyColorPalette.softYellowGlow }}>
      <LearnMore languageMode={languageMode} />
    </div>
  );
};
