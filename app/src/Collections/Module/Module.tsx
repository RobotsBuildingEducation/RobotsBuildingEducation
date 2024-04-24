import { modalConfig } from "../../App.constants";
import { useGlobalModal } from "../../App.hooks";
import { ComingSoonModule, StyledModule } from "../../styles/lazyStyles";

export const Module = ({
  handleModuleSelection,
  module,
  userStateReference,
  currentModule,
}): JSX.Element | null => {
  // renders a lock emoji if the user doesn't have the lecture unlocked yet
  const isDisabled =
    !userStateReference?.databaseUserDocument?.unlocks?.[module];
  let handleModal = useGlobalModal(modalConfig);
  return (
    <StyledModule
      module={module}
      isDisabled={isDisabled}
      patreonObject={currentModule}
      key={currentModule.header}
      onClick={() => {
        if (isDisabled) {
          handleModal("disabledModule");
        } else {
          handleModuleSelection(currentModule, module);
        }
      }}
    >
      {isDisabled ? (
        <>
          <span style={{ fontSize: "24px" }}>🔒</span>
          <br />
        </>
      ) : (
        <span>
          &#9658;
          <br /> {currentModule.header}
        </span>
      )}
    </StyledModule>
  );
};
