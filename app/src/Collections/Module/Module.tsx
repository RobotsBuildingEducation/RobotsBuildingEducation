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

  return (
    <StyledModule
      module={module}
      disabled={isDisabled}
      patreonObject={currentModule}
      key={currentModule.button}
      onClick={() => {
        !currentModule?.isModuleDisabled
          ? handleModuleSelection(currentModule, module)
          : null;
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
          <br /> {currentModule.button}
        </span>
      )}
    </StyledModule>
  );
};
