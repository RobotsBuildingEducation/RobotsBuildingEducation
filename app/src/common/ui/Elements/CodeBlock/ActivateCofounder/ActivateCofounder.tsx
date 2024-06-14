import { useState } from "react";
import { japaneseThemePalette } from "../../../../../styles/lazyStyles";
import { Button } from "react-bootstrap";

export const ActivateCofounder = ({ setIsOffcanvasOpen }) => {
  let [boxShadow, setBoxShadow] = useState(false);

  return (
    <>
      <Button
        variant="dark"
        style={{
          width: 48,
          height: 48,
          textShadow: "1px 1px 1px black",
          borderBottom: boxShadow
            ? "2px solid transparent"
            : `2px solid ${japaneseThemePalette.CobaltBlue}`,
        }}
        onMouseEnter={() => {
          setBoxShadow(true);
        }}
        onMouseLeave={() => {
          setBoxShadow(false);
        }}
        onMouseDown={() => {
          setIsOffcanvasOpen(true);
        }}
      >
        🌀
      </Button>
      <br />
    </>
  );
};
