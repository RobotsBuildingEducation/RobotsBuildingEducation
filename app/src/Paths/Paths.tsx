import styled, { keyframes, css } from "styled-components";
import { StyledLink, rectanglePump } from "../styles/lazyStyles";
import { uiPaths } from "../common/uiSchema";
import { useStore } from "../Store";
import { useGlobalModal } from "../App.hooks";
import { modalConfig } from "../App.constants";
import { useEffect, useState } from "react";

// Helper function to create display elements
const delayedAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

// Keyframes for fade-out with scale and translate
const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  to {
    opacity: 0;
    transform: translateY(10px) scale(0.95);
  }
`;
const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const RotatingEmoji = styled.span`
  display: inline-block;
  animation: ${({ isVisible }) =>
    isVisible
      ? "none"
      : css`
          ${rotate} 1s ease-in-out infinite
        `};
`;
const StyledPathItem = styled.div`
  perspective: 1000px;
  border-radius: 6px;
`;

export const StyledNavigationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 0;
  padding: 0;
  // max-width: 100%;
  // min-width: 100%;
  opacity: 1;

  /* max-width: 100%; */
  transition: 0.2s all ease-in-out;

  border-radius: 6px;
  /* box-shadow: 0 3px 6px #0b186be2, 0 6px 6px rgba(0, 0, 0, 0.23); */
  &:hover {
    /* transform: scale(1.01); */
    /* box-shadow: 0 19px 38px  #0b186be2, 0 15px 12px rgba(0,0,0,0.22); */
  }

  position: fixed;
  background-color: black;
  z-index: 100;

  width: min-width;
  &:hover {
    animation: ${rectanglePump} 3s infinite ease-in-out;
  }
  border-top: 0px solid black;
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
`;

// Helper function to render paths
const createPathElements = (
  handlePathSelection,
  pathSelectionAnimationData,
  unlockCreatorKey,
  unlockDealerKey,
  isVisible
) => {
  let handleModal = useGlobalModal(modalConfig);

  return uiPaths.map((path, index) => {
    let displayText = path !== "Entrepeneur" ? path : "Investing";
    if (path === "Creator") displayText = "Thinking";
    if (path === "Engineer") displayText = "Learn";

    if (path === "Engineer") {
      return (
        // <StyledPathItem key={path}>
        <StyledLink
          index={index}
          active
          to="/"
          pathSelectionAnimationData={pathSelectionAnimationData}
          path={path}
          id={path}
          onClick={handlePathSelection}
          key={path}
          isUnlocked={true}
        >
          {isVisible ? (
            <span onClick={handlePathSelection}>{displayText}</span>
          ) : (
            <RotatingEmoji isVisible={isVisible} onClick={handlePathSelection}>
              🌀
            </RotatingEmoji>
          )}
        </StyledLink>
        // </StyledPathItem>
      );
    }
  });
};

/**
 * Paths Component
 *
 * @param handlePathSelection Function to handle path selection
 * @param pathSelectionAnimationData Data for path selection animation
 * @returns JSX.Element
 */
export const Paths = ({
  handlePathSelection,
  pathSelectionAnimationData,
  userStateReference,
}): JSX.Element => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let timeoutId;
    const handleScroll = () => {
      setIsVisible(false);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsVisible(true);
      }, 85);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  let unlockCreatorKey =
    userStateReference?.databaseUserDocument?.unlocks?.[
      "Lesson 3 Backend Engineering"
    ];

  let unlockDealerKey =
    userStateReference?.databaseUserDocument?.unlocks?.[
      "Lesson 5 Computer Science"
    ];

  const pathElements = createPathElements(
    handlePathSelection,
    pathSelectionAnimationData,
    unlockCreatorKey,
    unlockDealerKey,
    isVisible
  );

  return <StyledNavigationContainer>{pathElements}</StyledNavigationContainer>;
};
