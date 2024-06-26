import { useEffect, useState } from "react";
import { ActionBar } from "./ActionBar/ActionBar";

// another pass through element, handles modal activations :D
export const ProofOfWork = ({
  globalScholarshipCounter,
  showBitcoin,
  displayName,
  databaseUserDocument,
  calculatedPercentage,
  globalImpactCounter,

  usersEmotionsCollectionReference,
  usersEmotionsFromDB,
  updateUserEmotions,
  //some redundancy since I haven't refactored these values yet.
  userStateReference,
  globalStateReference,
  showStars,
  showZap,
  zap,
  handleZap,
  uiStateReference,
  handlePathSelection,
  pathSelectionAnimationData,
}) => {
  const [isIdentityWalletOpen, setIsIdentityWalletOpen] = useState(false);
  const [isEmotionalIntelligenceOpen, setIsEmotionalIntelligenceOpen] =
    useState(false);

  const [isCofounderOpen, setIsCofounderOpen] = useState(false);

  const [isBossModeOpen, setIsBossModeOpen] = useState(false);

  const [isStartupOpen, setIsStartupOpen] = useState(false);

  const [isAdaptiveLearningOpen, setIsAdaptiveLearningOpen] = useState(false);

  const [isLeetmigoOpen, setIsLeetmigoOpen] = useState(false);

  useEffect(() => {
    if (isIdentityWalletOpen) {
      setIsEmotionalIntelligenceOpen(false);
      setIsCofounderOpen(false);
      setIsBossModeOpen(false);
      setIsLeetmigoOpen(false);
      // setIsStartupOpen(false);
    }
    if (isEmotionalIntelligenceOpen) {
      setIsIdentityWalletOpen(false);
      setIsCofounderOpen(false);
      setIsBossModeOpen(false);
      setIsLeetmigoOpen(false);
      // setIsStartupOpen(false);
    }
    if (isCofounderOpen) {
      setIsEmotionalIntelligenceOpen(false);
      setIsIdentityWalletOpen(false);
      setIsBossModeOpen(false);
      setIsLeetmigoOpen(false);
      // setIsStartupOpen(false);
    }

    if (isBossModeOpen) {
      setIsEmotionalIntelligenceOpen(false);
      setIsCofounderOpen(false);
      setIsIdentityWalletOpen(false);
      setIsLeetmigoOpen(false);
      // setIsStartupOpen(false);
    }

    if (isLeetmigoOpen) {
      setIsEmotionalIntelligenceOpen(false);
      setIsCofounderOpen(false);
      setIsIdentityWalletOpen(false);
      setIsBossModeOpen(false);
    }

    if (isStartupOpen) {
      // setIsEmotionalIntelligenceOpen(false);
      // setIsCofounderOpen(false);
      // setIsIdentityWalletOpen(false);
      // setIsBossModeOpen(false);
      setIsAdaptiveLearningOpen(false);
    }
    if (isAdaptiveLearningOpen) {
      setIsStartupOpen(false);
    }
  }, [
    isIdentityWalletOpen,
    isEmotionalIntelligenceOpen,
    isCofounderOpen,
    isBossModeOpen,
    isStartupOpen,
    isAdaptiveLearningOpen,
  ]);

  return (
    <div
      style={{
        // border: "1px solid #1C1C1E",

        backgroundColor:
          showStars || showZap || showBitcoin ? "black" : "#1C1C1E",

        maxWidth: "600px",
        minWidth: "300px",
        textAlign: "center",
        width: "100%",
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
      }}
    >
      <ActionBar
        displayName={displayName}
        databaseUserDocument={databaseUserDocument}
        calculatedPercentage={calculatedPercentage}
        globalImpactCounter={globalImpactCounter}
        isIdentityWalletOpen={isIdentityWalletOpen}
        setIsIdentityWalletOpen={setIsIdentityWalletOpen}
        globalScholarshipCounter={globalScholarshipCounter}
        setIsEmotionalIntelligenceOpen={setIsEmotionalIntelligenceOpen}
        isEmotionalIntelligenceOpen={isEmotionalIntelligenceOpen}
        usersEmotionsCollectionReference={usersEmotionsCollectionReference}
        usersEmotionsFromDB={usersEmotionsFromDB}
        updateUserEmotions={updateUserEmotions}
        userStateReference={userStateReference}
        showStars={showStars}
        isCofounderOpen={isCofounderOpen}
        setIsCofounderOpen={setIsCofounderOpen}
        globalStateReference={globalStateReference}
        isBossModeOpen={isBossModeOpen}
        setIsBossModeOpen={setIsBossModeOpen}
        zap={zap}
        handleZap={handleZap}
        uiStateReference={uiStateReference}
        isStartupOpen={isStartupOpen}
        setIsStartupOpen={setIsStartupOpen}
        isAdaptiveLearningOpen={isAdaptiveLearningOpen}
        setIsAdaptiveLearningOpen={setIsAdaptiveLearningOpen}
        isLeetmigoOpen={isLeetmigoOpen}
        setIsLeetmigoOpen={setIsLeetmigoOpen}
        handlePathSelection={handlePathSelection}
        pathSelectionAnimationData={pathSelectionAnimationData}
      />
    </div>
  );
};
