import { ChatGPT } from "./ChatGPT";
import isEmpty from "lodash/isEmpty";

export const ChatGptWrapper = ({
  uiStateReference,
  userStateReference,
  globalStateReference,
  handleScheduler,
  handleZap,
  zap,
  checkForUnlock,
  handleCompletedPractice,
  handleWatch,
}) => {
  // Early return if patreonObject is empty
  if (isEmpty(uiStateReference.patreonObject)) {
    return null;
  }

  // Extract relevant props
  const { patreonObject, moduleName } = uiStateReference;

  const {
    userDocumentReference,
    databaseUserDocument,
    setDatabaseUserDocument,
  } = userStateReference;

  const {
    globalDocumentReference,
    globalImpactCounter,
    setGlobalImpactCounter,
  } = globalStateReference;

  // Main component rendering
  return (
    <div style={{ width: "100%" }}>
      <ChatGPT
        patreonObject={patreonObject}
        userDocumentReference={userDocumentReference}
        databaseUserDocument={databaseUserDocument}
        setDatabaseUserDocument={setDatabaseUserDocument}
        globalDocumentReference={globalDocumentReference}
        globalImpactCounter={globalImpactCounter}
        setGlobalImpactCounter={setGlobalImpactCounter}
        moduleName={moduleName}
        handleScheduler={handleScheduler}
        handleZap={handleZap}
        zap={zap}
        userStateReference={userStateReference}
        globalStateReference={globalStateReference}
        checkForUnlock={checkForUnlock}
        handleCompletedPractice={handleCompletedPractice}
        handleWatch={handleWatch}
        uiStateReference={uiStateReference}
      />
    </div>
  );
};
