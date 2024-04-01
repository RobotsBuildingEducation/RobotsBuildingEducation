import styled, { keyframes } from "styled-components";
import { StyledNavigationContainer, StyledLink } from "../styles/lazyStyles";

// Helper function to create display elements
const delayedAnimation = keyframes`
from {
  opacity: 0;
}
to {
  opacity: 1;
} 
`;
const StyledPathItem = styled.div`
  animation: ${delayedAnimation} 0.3s ease-out;
  animation-delay: ${(props) => props.index * 0.15}s; /* Delay based on index */
  opacity: 0; /* Start with opacity 0 to make the animation visible */
  animation-fill-mode: forwards; /* Keep the element visible after the animation */
`;

// helper function to render
const createPathElements = (
  topPaths,
  handlePathSelection,
  pathSelectionAnimationData,
  unlockCreatorKey,
  unlockDealerKey
) => {
  return topPaths.map((path, index) => {
    const displayText = path !== "Entrepeneur" ? path : "Dealer";

    if (unlockCreatorKey && unlockDealerKey) {
      return (
        <StyledPathItem index={index} key={path}>
          <StyledLink
            active
            to="/"
            pathSelectionAnimationData={pathSelectionAnimationData}
            path={path}
            id={path}
            onClick={handlePathSelection}
            key={path}
            isUnlocked={true}
          >
            {displayText}
          </StyledLink>
        </StyledPathItem>
      );
    } else {
      if (path === "Engineer") {
        return (
          <StyledPathItem index={index} key={path}>
            <StyledLink
              active
              to="/"
              pathSelectionAnimationData={pathSelectionAnimationData}
              path={path}
              id={path}
              onClick={handlePathSelection}
              key={path}
              isUnlocked={true}
            >
              {displayText}
            </StyledLink>
          </StyledPathItem>
        );
      } else if (path === "Creator") {
        return (
          <StyledPathItem index={index} key={path}>
            <StyledLink
              active
              to="/"
              pathSelectionAnimationData={pathSelectionAnimationData}
              path={path}
              id={path}
              key={path}
              isUnlocked={unlockCreatorKey}
              onClick={(event) =>
                unlockCreatorKey ? handlePathSelection(event) : null
              }
            >
              {displayText}
            </StyledLink>
          </StyledPathItem>
        );
      } else if (path === "Entrepeneur") {
        return (
          <StyledPathItem index={index} key={path}>
            <StyledLink
              active
              to="/"
              pathSelectionAnimationData={pathSelectionAnimationData}
              path={path}
              id={path}
              key={path}
              isUnlocked={unlockDealerKey}
              onClick={(event) =>
                unlockDealerKey ? handlePathSelection(event) : null
              }
            >
              {displayText}
            </StyledLink>
          </StyledPathItem>
        );
      }
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
  // checks the user's document to see whether or not they've unlocked the paths
  let unlockCreatorKey =
    userStateReference?.databaseUserDocument?.unlocks?.[
      "Lesson 2 Frontend Programming"
    ];

  let unlockDealerKey =
    userStateReference?.databaseUserDocument?.unlocks?.[
      "Lesson 4 Building Apps & Startups"
    ];

  // Define the paths
  const paths = ["Engineer", "Creator", "Entrepeneur"];

  // Generate the display elements for the top paths
  const pathElements = createPathElements(
    paths,
    handlePathSelection,
    pathSelectionAnimationData,
    unlockCreatorKey,
    unlockDealerKey
  );

  return <StyledNavigationContainer>{pathElements}</StyledNavigationContainer>;
};
