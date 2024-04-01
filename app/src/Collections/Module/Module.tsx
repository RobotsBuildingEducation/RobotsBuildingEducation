import { ui } from "../../common/uiSchema";
import { ComingSoonModule, StyledModule } from "../../styles/lazyStyles";

export const Module = ({
  handleModuleSelection,
  module,
  userStateReference,
  currentModule,
}): JSX.Element | null => {
  if (currentModule?.underConstruction && currentModule?.isModuleDisabled) {
    return (
      <ComingSoonModule
        patreonObject={currentModule}
        key={currentModule.button}
        onClick={() => {
          !currentModule?.isModuleDisabled
            ? handleModuleSelection(currentModule, module)
            : null;
        }}
      >
        {currentModule.sourceType === "video" ? (
          <span>
            {" "}
            &#9658;
            <br /> {currentModule.button}
          </span>
        ) : (
          ""
        )}
        {currentModule.sourceType === "markdown" ? (
          <span>
            📄 <br /> {currentModule.button}
          </span>
        ) : (
          ""
        )}
      </ComingSoonModule>
    );
  }

  // console.log("userStateReference", userStateReference);
  // console.log("module", module);

  const isDisabled =
    !userStateReference?.databaseUserDocument?.unlocks?.[module];

  console.log("module", module);
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
      {isDisabled && (
        <>
          <span style={{ fontSize: "24px" }}>🔒</span>
          <br />
        </>
      )}
      {/* {currentModule.button}   */}

      {currentModule.sourceType === "video" && !isDisabled ? (
        <span>
          {" "}
          &#9658;
          <br /> {currentModule.button}
        </span>
      ) : (
        ""
      )}
      {currentModule.sourceType === "markdown" && !isDisabled ? (
        <span>
          📄 <br /> {currentModule.button}
        </span>
      ) : (
        ""
      )}
    </StyledModule>
  );
};
