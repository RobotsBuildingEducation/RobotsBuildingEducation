import { useState } from "react";
import { modalConfig } from "../../App.constants";
import { useGlobalModal } from "../../App.hooks";
import { ComingSoonModule, StyledModule } from "../../styles/lazyStyles";

export const Module = ({
  handleModuleSelection,
  module,
  userStateReference,
  currentModule,
}): JSX.Element | null => {
  const [isMouseEntered, setIsMouseEntered] = useState(false);

  let filterLessonText = (header) => {
    // Regular expression to match "Lesson X" where X is any number
    const lessonRegex = /Lesson \d+/;
    return header?.replace(lessonRegex, "")?.trim();
  };

  // renders a lock emoji if the user doesn't have the lecture unlocked yet
  const isDisabled =
    !userStateReference?.databaseUserDocument?.unlocks?.[module];
  let handleModal = useGlobalModal(modalConfig);

  return (
    <StyledModule
      onMouseEnter={() => setIsMouseEntered(true)}
      onMouseLeave={() => setIsMouseEntered(false)}
      module={module}
      isDisabled={isDisabled}
      patreonObject={currentModule}
      key={currentModule.header}
      onMouseDown={() => {
        console.log(
          "!userStateReference?.databaseUserDocument?.unlocks?.[module]",
          !userStateReference?.databaseUserDocument?.unlocks?.[module]
        );
        if (isDisabled) {
          if (
            localStorage.getItem("patreonPasscode") !==
            import.meta.env.VITE_PATREON_PASSCODE
          ) {
            handleModal("disabledModule");
          } else {
            handleModal("disabledLecture");
          }
        } else {
          handleModuleSelection(currentModule, module);
        }
      }}
    >
      {isDisabled ? (
        <>
          <small>
            {!isMouseEntered ? (
              <span style={{ fontSize: "24px" }}>🔒</span>
            ) : (
              <>
                <span style={{ fontSize: "24px" }}>
                  🔒 <br />{" "}
                </span>
                <span> {filterLessonText(currentModule.header)}</span>
              </>
            )}
            <br />
          </small>

          <br />
        </>
      ) : (
        <span>
          &#9658;
          <br /> <b>{currentModule.header}</b>
        </span>
      )}
    </StyledModule>
  );
};
