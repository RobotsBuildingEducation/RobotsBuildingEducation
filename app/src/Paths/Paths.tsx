import styled, { keyframes } from "styled-components";
import { StyledNavigationContainer, StyledLink } from "../styles/lazyStyles";
import { uiPaths } from "../common/uiSchema";
import { useStore } from "../Store";
import { useGlobalModal } from "../App.hooks";
import { modalConfig } from "../App.constants";

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
  perspective: 1000px;
  animation: ${delayedAnimation} 0.3s ease-out;
  animation-delay: ${(props) => props.index * 0.15}s; /* Delay based on index */
  opacity: 0; /* Start with opacity 0 to make the animation visible */
  animation-fill-mode: forwards; /* Keep the element visible after the animation */
`;

// helper function to renders
const createPathElements = (
  handlePathSelection,
  pathSelectionAnimationData,
  unlockCreatorKey,
  unlockDealerKey
) => {
  let handleModal = useGlobalModal(modalConfig);

  return uiPaths.map((path, index) => {
    let displayText = path !== "Entrepeneur" ? path : "Investing";
    if (path === "Creator") displayText = "Thinking";
    if (path === "Engineer") displayText = "Learn";

    // if (unlockCreatorKey && unlockDealerKey) {
    //   return (
    //     <StyledPathItem index={index} key={path}>
    //       <StyledLink
    //         active
    //         to="/"
    //         pathSelectionAnimationData={pathSelectionAnimationData}
    //         path={path}
    //         id={path}
    //         onMouseDown={handlePathSelection}
    //         key={path}
    //         isUnlocked={true}
    //       >
    //         {displayText}
    //       </StyledLink>
    //     </StyledPathItem>
    //   );
    // }
    // else {
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
      // }
      // else if (path === "Creator") {
      //   return (
      //     <StyledPathItem index={index} key={path}>
      //       <StyledLink
      //         active
      //         to="/"
      //         pathSelectionAnimationData={pathSelectionAnimationData}
      //         path={path}
      //         id={path}
      //         key={path}
      //         isUnlocked={unlockCreatorKey}
      //         onMouseDown={(event) =>
      //           unlockCreatorKey
      //             ? handlePathSelection(event)
      //             : handleModal("creator")
      //         }
      //       >
      //         {displayText}
      //       </StyledLink>
      //     </StyledPathItem>
      //   );
      // }
      // else if (path === "Entrepeneur") {
      //   return (
      //     <StyledPathItem index={index} key={path}>
      //       <StyledLink
      //         active
      //         to="/"
      //         pathSelectionAnimationData={pathSelectionAnimationData}
      //         path={path}
      //         id={path}
      //         key={path}
      //         isUnlocked={unlockDealerKey}
      //         onMouseDown={(event) =>
      //           unlockDealerKey
      //             ? handlePathSelection(event)
      //             : handleModal("dealer")
      //         }
      //       >
      //         {displayText}
      //       </StyledLink>
      //     </StyledPathItem>
      //   );
      // }
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
      "Lesson 3 Backend Engineering"
    ];

  let unlockDealerKey =
    userStateReference?.databaseUserDocument?.unlocks?.[
      "Lesson 5 Computer Science"
    ];

  // Define the paths

  // Generate the display elements for the top paths
  const pathElements = createPathElements(
    handlePathSelection,
    pathSelectionAnimationData,
    unlockCreatorKey,
    unlockDealerKey
  );

  return <StyledNavigationContainer>{pathElements}</StyledNavigationContainer>;
};
