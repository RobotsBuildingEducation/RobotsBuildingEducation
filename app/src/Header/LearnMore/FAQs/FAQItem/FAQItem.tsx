import { useState } from "react";
import { Collapse, Button } from "react-bootstrap";
import styled, { keyframes } from "styled-components";

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
  animation: ${delayedAnimation} 0.2s linear;
  animation-delay: ${(props) => props.index * 0.03}s; /* Delay based on index */
  opacity: 0; /* Start with opacity 0 to make the animation visible */
  animation-fill-mode: forwards; /* Keep the element visible after the animation */
`;

/**
 * `FAQItem` component responsible for displaying an individual FAQ question and its answer.
 *
 * This component renders a question as a button. When the button is clicked, it toggles the visibility of the answer section below it. The component uses styled-components for animation, introducing a delayed fade-in effect based on the item's index to enhance the user experience with a visually appealing entry.
 *
 * Props:
 * @param {string} question - The FAQ question to be displayed on the button.
 * @param {JSX.Element} answer - The detailed answer to the FAQ question. This can include formatted text or other React components.
 * @param {number} index - Position of the FAQ item in the list, used to calculate the animation delay for a staggered appearance.
 *
 * State:
 * @state {boolean} open - A local state that tracks whether the answer section is expanded or collapsed.
 *
 * The component utilizes `react-bootstrap` for the collapsible functionality and `styled-components` for custom animations. Each FAQ item has an individually calculated delay before it appears, creating a cascading effect as they enter the viewport.
 *
 */
export const FAQItem = ({ question, answer, index }) => {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ marginBottom: "10px" }}>
      <StyledFAQItem index={index}>
        <Button
          style={{ padding: 25, width: "100%", marginTop: 12 }}
          onClick={() => setOpen(!open)}
          aria-controls="example-collapse-text"
          aria-expanded={open}
          variant="dark"
        >
          <h4>{question}</h4>
        </Button>
      </StyledFAQItem>
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
