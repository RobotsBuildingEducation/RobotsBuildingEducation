import React, { useState } from "react";
import { Collapse, Button } from "react-bootstrap";
import styled, { keyframes } from "styled-components";

import {
  RiseUpAnimation,
  japaneseThemePalette,
  textBlock,
} from "../../../../styles/lazyStyles";
import { getRandomColor } from "../../../../App.compute";
import RandomCharacter from "../RandomCharacter/RandomCharacter";
import gold_bars from "../../../media/images/gold_bars.png";
const delayedAnimation = keyframes`
from {
    transform: translateY(100px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;
const StyledFAQItem = styled.div`
  animation: ${delayedAnimation} 0.5s ease-out;
  animation-delay: ${(props) => props.index * 0.06}s; /* Delay based on index */
  opacity: 0; /* Start with opacity 0 to make the animation visible */
  animation-fill-mode: forwards; /* Keep the element visible after the animation */
`;
const SummaryItem = ({ question, answer, index }) => {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ marginBottom: "10px" }}>
      <div index={index}>
        {/* <Button
          style={{ padding: 25, width: "100%", marginTop: 12 }}
          onMouseDown={() => setOpen(!open)}
          aria-controls="example-collapse-text"
          aria-expanded={open}
          variant="dark"
        >
          <h4>{question}</h4>
        </Button> */}
        <button
          aria-controls="example-collapse-text"
          aria-expanded={open}
          onMouseDown={() => setOpen(!open)}
          style={{
            // backgroundColor: japaneseThemePalette.PhthaloBluePurple,
            ...textBlock(
              japaneseThemePalette?.PowerPurple,
              1,
              8,
              "white",
              null,
              25
            ),

            // backgroundColor: "#63FEA2",
            // color: "white",
            // padding: 25,
            width: "100%",
            marginTop: 12,
          }}
        >
          <h4>{question}</h4>
        </button>
      </div>
      <Collapse in={open}>
        <div id="example-collapse-text">
          <br />
          {answer}
          <br />
        </div>
      </Collapse>
    </div>
  );
};

export const RevealButton = ({ content }) => {
  const data = [
    {
      question: (
        <div>
          <img src={gold_bars} width="75px" />
        </div>
      ),
      answer: (
        <p
          style={{
            maxWidth: "100%",
            // width: 700 /* Add your text block styles here */,
            ...textBlock(japaneseThemePalette?.PowerPurple, 0),
            borderRadius: 32,
            paddingBottom: 48,
          }}
        >
          <RandomCharacter speed={0.2} />
          {content}
        </p>
      ),
    },
  ];

  return (
    <div style={{ maxWidth: 700, width: "100%" }}>
      {/* <h1>Frequently Asked Questions</h1> */}
      {data.map((faq, index) => (
        <SummaryItem
          index={index}
          key={index}
          question={faq.question}
          answer={faq.answer}
        />
      ))}
    </div>
  );
};
