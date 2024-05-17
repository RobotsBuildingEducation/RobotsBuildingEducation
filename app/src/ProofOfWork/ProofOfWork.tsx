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
}) => {
  const [isImpactWalletOpen, setIsImpactWalletOpen] = useState(false);
  const [isEmotionalIntelligenceOpen, setIsEmotionalIntelligenceOpen] =
    useState(false);

  const [isCofounderOpen, setIsCofounderOpen] = useState(false);

  const [isBossModeOpen, setIsBossModeOpen] = useState(false);

  const [isStartupOpen, setIsStartupOpen] = useState(false);

  const [isAdaptiveLearningOpen, setIsAdaptiveLearningOpen] = useState(false);

  const [isLeetmigoOpen, setIsLeetmigoOpen] = useState(false);

  useEffect(() => {
    if (isImpactWalletOpen) {
      setIsEmotionalIntelligenceOpen(false);
      setIsCofounderOpen(false);
      setIsBossModeOpen(false);
      setIsLeetmigoOpen(false);
      // setIsStartupOpen(false);
    }
    if (isEmotionalIntelligenceOpen) {
      setIsImpactWalletOpen(false);
      setIsCofounderOpen(false);
      setIsBossModeOpen(false);
      setIsLeetmigoOpen(false);
      // setIsStartupOpen(false);
    }
    if (isCofounderOpen) {
      setIsEmotionalIntelligenceOpen(false);
      setIsImpactWalletOpen(false);
      setIsBossModeOpen(false);
      setIsLeetmigoOpen(false);
      // setIsStartupOpen(false);
    }

    if (isBossModeOpen) {
      setIsEmotionalIntelligenceOpen(false);
      setIsCofounderOpen(false);
      setIsImpactWalletOpen(false);
      setIsLeetmigoOpen(false);
      // setIsStartupOpen(false);
    }

    if (isLeetmigoOpen) {
      setIsEmotionalIntelligenceOpen(false);
      setIsCofounderOpen(false);
      setIsImpactWalletOpen(false);
      setIsBossModeOpen(false);
    }

    if (isStartupOpen) {
      // setIsEmotionalIntelligenceOpen(false);
      // setIsCofounderOpen(false);
      // setIsImpactWalletOpen(false);
      // setIsBossModeOpen(false);
      setIsAdaptiveLearningOpen(false);
    }
    if (isAdaptiveLearningOpen) {
      setIsStartupOpen(false);
    }
  }, [
    isImpactWalletOpen,
    isEmotionalIntelligenceOpen,
    isCofounderOpen,
    isBossModeOpen,
    isStartupOpen,
    isAdaptiveLearningOpen,
  ]);

  return (
    <div
      style={{
        border: "1px solid #1C1C1E",

        padding: 6,
        backgroundColor:
          showStars || showZap || showBitcoin ? "black" : "#1C1C1E",

        maxWidth: "600px",
        minWidth: "300px",
        textAlign: "center",
        width: "100%",
        borderRadius: 12,
      }}
    >
      <ActionBar
        displayName={displayName}
        databaseUserDocument={databaseUserDocument}
        calculatedPercentage={calculatedPercentage}
        globalImpactCounter={globalImpactCounter}
        isImpactWalletOpen={isImpactWalletOpen}
        setIsImpactWalletOpen={setIsImpactWalletOpen}
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
      />
    </div>
  );
};
