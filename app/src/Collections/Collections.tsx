import styled, { keyframes } from "styled-components";
import { uiCollections } from "../common/uiSchema";
import {
  StyledCollectionContainer,
  japaneseThemePalette,
} from "../styles/lazyStyles";
import { Module } from "./Module/Module";

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
const StyledAnimatedModule = styled.div`
  animation: ${delayedAnimation} 0.15s ease-out;
  animation-delay: ${(props) => props.index * 0.06}s; /* Delay based on index */
  opacity: 0; /* Start with opacity 0 to make the animation visible */
  animation-fill-mode: forwards; /* Keep the element visible after the animation */
`;

/**
handles the container for all of the lectures inside of a path.
Currently, there's only one lecture per path. However, this can easily be changed/extended in the uiSchema file.
 */
export const Collections = ({
  handleModuleSelection,
  currentPath,
  userStateReference,
}): JSX.Element | null => {
  // Check if the currentPath exists in the ui schema
  if (!currentPath || !uiCollections || !uiCollections[currentPath])
    return null;

  //although not displayed, this is the first child under a Path. For example, it would be "Coding Crash Course Version 3" under Engineer
  const collections = Object.keys(uiCollections[currentPath]);

  // get the modules for each collection
  const displayCollections = collections.map((collection) => {
    const modules = Object.keys(uiCollections[currentPath][collection]);

    if (modules && modules.length > 0) {
      return (
        <div>
          <br />
          <StyledCollectionContainer>
            {modules.map((module, index) => (
              <StyledAnimatedModule index={index} key={module}>
                <Module
                  path={currentPath}
                  collection={collection}
                  module={module}
                  handleModuleSelection={handleModuleSelection}
                  userStateReference={userStateReference}
                />
              </StyledAnimatedModule>
            ))}
          </StyledCollectionContainer>
        </div>
      );
    }

    return null;
  });

  return (
    <div style={{ transition: "0.23s all ease-in-out" }}>
      {displayCollections}
    </div>
  );
};
