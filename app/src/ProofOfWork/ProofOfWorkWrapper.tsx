import { auth } from "../database/firebaseResources";
import { RiseUpAnimation, japaneseThemePalette } from "../styles/lazyStyles";
import { ProofOfWork } from "./ProofOfWork";

// Define the style for the container
const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "fixed",
  bottom: 0,
  width: "min-width",
  zIndex: 1100,
  transition: "0.33s all ease-in-out",
  borderTopLeftRadius: 12,
  borderTopRightRadius: 12,
  backgroundColor: "#1C1C1E",
  // paddingBottom: 12,
  // paddingTop: 12,
};

/**
 *
 * pass-through styling wrapper
 */
export const ProofOfWorkWrapper = ({
  userStateReference,
  globalStateReference,

  updateUserEmotions,
  uiStateReference,
  showStars,
  showZap,
  showBitcoin,

  zap,
  handleZap,
  computePercentage,
  handlePathSelection,
  pathSelectionAnimationData,
}) => {
  const userImpact = userStateReference.databaseUserDocument?.impact;
  const proofOfWork = uiStateReference.proofOfWorkFromModules;
  const calculatedPercentage = computePercentage(userImpact, proofOfWork);

  // Check if the user is eligible to see the ProofOfWork component
  const isUserEligible = userStateReference.databaseUserDocument;

  if (!isUserEligible) return null;

  const {
    databaseUserDocument,
    usersEmotionsCollectionReference,
    usersEmotionsFromDB,
  } = userStateReference;

  const { globalImpactCounter, globalScholarshipCounter } =
    globalStateReference;

  return (
    <RiseUpAnimation
      style={{
        ...containerStyle,
        borderRight: `1px solid ${
          showStars || showZap || showBitcoin
            ? japaneseThemePalette?.OrangeGold
            : "#33009F"
        }`,
        borderLeft: `1px solid ${
          showStars || showZap || showBitcoin
            ? japaneseThemePalette?.OrangeGold
            : "#33009F"
        }`,
        borderTop: `1px solid ${
          showStars || showZap || showBitcoin
            ? japaneseThemePalette?.OrangeGold
            : "#33009F"
        }`,
        boxShadow:
          showStars || showZap || showBitcoin
            ? "0px 0px 17px 0px rgba(255,204,0,1)"
            : "0px 0px 6px 0px rgba(0,0,0,0.75)",
      }}
    >
      {/* backgroundColor: "", */}
      <ProofOfWork
        displayName={auth?.currentUser?.displayName}
        databaseUserDocument={databaseUserDocument}
        calculatedPercentage={calculatedPercentage}
        globalImpactCounter={globalImpactCounter}
        usersEmotionsCollectionReference={usersEmotionsCollectionReference}
        usersEmotionsFromDB={usersEmotionsFromDB}
        globalScholarshipCounter={globalScholarshipCounter}
        updateUserEmotions={updateUserEmotions}
        userStateReference={userStateReference}
        globalStateReference={globalStateReference}
        showStars={showStars}
        showZap={showZap}
        zap={zap}
        handleZap={handleZap}
        showBitcoin={showBitcoin}
        uiStateReference={uiStateReference}
        handlePathSelection={handlePathSelection}
        pathSelectionAnimationData={pathSelectionAnimationData}
      />
    </RiseUpAnimation>
  );
};
