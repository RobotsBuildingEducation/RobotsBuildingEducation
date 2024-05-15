import React from "react";
import Lottie from "react-lottie";
import arrow_animation from "../../../anims/arrow_animation.json";
import { japaneseThemePalette, textBlock } from "../../../../styles/lazyStyles";

export const HintUI = ({ message }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: arrow_animation,
  };

  return (
    <>
      <div
        style={{
          transform: `rotate(180deg)`,
          display: "flex",
          justifyContent: "flex-start",
          width: "fit-content",
          marginLeft: -7,
        }}
      >
        <Lottie options={defaultOptions} width={60} height={60} />
      </div>
      <div
        style={{
          ...textBlock(japaneseThemePalette.TokyoTwilight, 0, 24),
        }}
      >
        <b>{message}</b>
      </div>
    </>
  );
};
