import { auth } from "../database/firebaseResources";
import {
  RiseDownAnimation,
  RiseUpAnimation,
  japaneseThemePalette,
} from "../styles/lazyStyles";
import { ProofOfWork } from "./ProofOfWork";

// Define the style for the container
const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "sticky",
  bottom: 0,
  width: "min-width",

  // border: "1px solid red",
  zIndex: 1000,

  transition: "0.33s all ease-in-out",
  borderRadius: 12,
};

// Calculate the compute percentage
const computePercentage = (userImpact, proofOfWork) => {
  return (userImpact || 0) / (proofOfWork || 77500);
};

export const ProofOfWorkWrapper = ({
  userStateReference,
  globalStateReference,

  handlePathSelection,
  updateUserEmotions,
  uiStateReference,
  showStars,
  showZap,

  zap,
  handleZap,
}) => {
  const userImpact = userStateReference.databaseUserDocument?.impact;
  const proofOfWork = uiStateReference.proofOfWorkFromModules;
  const calculatedPercentage = computePercentage(userImpact, proofOfWork);

  // Check if the user is eligible to see the ProofOfWork component
  const isUserEligible = userStateReference.databaseUserDocument;

  if (!isUserEligible) return null;

  // Extract properties for easier readability

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
        border: `1px solid ${
          showStars || showZap ? japaneseThemePalette?.OrangeGold : "#33009F"
        }`,
        boxShadow:
          showStars || showZap
            ? "0px 0px 17px 0px rgba(255,204,0,1)"
            : "0px 0px 6px 0px rgba(0,0,0,0.75)",
      }}
    >
      {/* backgroundColor: "", */}
      <ProofOfWork
        displayName={auth?.currentUser?.displayName}
        databaseUserDocument={databaseUserDocument}
        computePercentage={calculatedPercentage}
        globalImpactCounter={globalImpactCounter}
        usersEmotionsCollectionReference={usersEmotionsCollectionReference}
        usersEmotionsFromDB={usersEmotionsFromDB}
        globalScholarshipCounter={globalScholarshipCounter}
        handlePathSelection={handlePathSelection}
        updateUserEmotions={updateUserEmotions}
        userStateReference={userStateReference}
        globalStateReference={globalStateReference}
        showStars={showStars}
        showZap={showZap}
        zap={zap}
        handleZap={handleZap}
        uiStateReference={uiStateReference}
      />
    </RiseUpAnimation>
  );
};
