import Lottie from "react-lottie";
import isEmpty from "lodash/isEmpty";
import { ProgressBar } from "react-bootstrap";
import zap_animation from "../../common/anims/zap_animation.json";
import bitcoin_animation from "../../common/anims/bitcoin_animation.json";
import star_animation from "../../common/anims/star_animation.json";

import { EmotionalIntelligence } from "./EmotionalIntelligence/EmotionalIntelligence";
import { FadeInComponent } from "../../styles/lazyStyles";
import { BossMode } from "./BossMode/BossMode";
import { Experimental } from "./Cofounder/Experimental";

import { useStore } from "../../Store";

import { RenderActionBarControls } from "./ActionBar.compute";
import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { database } from "../../database/firebaseResources";
import { useBitcoinAnimation } from "../../App.hooks";
import { Startup } from "./Startup/Startup";
import { AdaptiveLearning } from "./AdaptiveLearning/AdaptiveLearning";
import { useCashuWallet, useProofStorage } from "../../App.web5";
// import { Startup } from "./Startup/Startup";

export const ActionBar = ({
  displayName,

  globalScholarshipCounter,
  databaseUserDocument,
  calculatedPercentage,
  globalImpactCounter,
  isIdentityWalletOpen,
  setIsIdentityWalletOpen,

  isEmotionalIntelligenceOpen,
  setIsEmotionalIntelligenceOpen,
  usersEmotionsCollectionReference,
  usersEmotionsFromDB,
  updateUserEmotions,

  showStars,

  isCofounderOpen,
  setIsCofounderOpen,

  userStateReference,
  globalStateReference,
  zap,
  isBossModeOpen,
  setIsBossModeOpen,
  handleZap,

  uiStateReference,
  isStartupOpen,
  setIsStartupOpen,
  isAdaptiveLearningOpen,
  setIsAdaptiveLearningOpen,
  isLeetmigoOpen,
  setIsLeetmigoOpen,
  handlePathSelection,
  pathSelectionAnimationData,
}) => {
  const showBitcoin = useStore((state) => state.showBitcoin);
  const showZap = useStore((state) => state.showZap);
  const { globalBalance, setGlobalBalance } = useStore((state) => ({
    globalBalance: state.globalBalance,
    setGlobalBalance: state.setGlobalBalance,
  }));

  const [realtimeImpact, setRealtimeImpact] = useState(globalImpactCounter);
  const handleBitcoinAnimation = useBitcoinAnimation();
  const [isImpactMounted, setIsImpactMounted] = useState(false);

  const { balance } = useProofStorage();

  console.log("localStorage balance", localStorage.getItem("balance"));
  console.log("useProofStorage balance", balance);
  console.log("globalBalance", globalBalance);

  useEffect(() => {
    const impactDocRef = doc(database, "global", "impact");

    const unsubscribe = onSnapshot(
      impactDocRef,
      (doc) => {
        if (doc.exists()) {
          const data = doc.data();

          setRealtimeImpact(data.total || 0);
          // handleBitcoinAnimation();

          // if (isImpactMounted) {
          //   console.log("wtffffff asdkaskdfasdfkasdkfaskdfks");
          // } else {
          // }
          // setIsImpactMounted(true);

          // Update local state with the new total
        } else {
          console.log("No such document!");
        }
      },
      (error) => {
        console.log("Error getting document:", error);
      }
    );

    // Optional: fetch and set the globalImpactCounter here or define it statically if it changes

    return () => unsubscribe(); // Cleanup subscription on component unmount
  }, []);

  return (
    <>
      <div style={{ padding: 12 }}>
        {showZap || showStars || showBitcoin ? (
          <div
            style={{
              height: 55,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FadeInComponent speed={1.5}>
              <Lottie
                options={{
                  loop: true,
                  autoplay: true,
                  animationData: showStars
                    ? star_animation
                    : showBitcoin
                    ? bitcoin_animation
                    : showZap
                    ? zap_animation
                    : zap_animation,
                }}
                width={showZap ? 40 : 40}
                height={showZap ? 40 : 40}
              />
            </FadeInComponent>
          </div>
        ) : (
          <RenderActionBarControls
            setIsAdaptiveLearningOpen={setIsAdaptiveLearningOpen}
            displayName={displayName}
            setIsBossModeOpen={setIsBossModeOpen}
            setIsCofounderOpen={setIsCofounderOpen}
            setIsEmotionalIntelligenceOpen={setIsEmotionalIntelligenceOpen}
            setIsIdentityWalletOpen={setIsIdentityWalletOpen}
            setIsStartupOpen={setIsStartupOpen}
            handlePathSelection={handlePathSelection}
            pathSelectionAnimationData={pathSelectionAnimationData}
            userStateReference={userStateReference}
          />
        )}

        {/* &nbsp; &nbsp; &nbsp;{" "} */}
        {/* <div>
          <ProgressBar
            style={{
              margin: 6,
              height: 6,
              borderRadius: 4,
              backgroundColor: "skyblue",
            }}
            // now={Math.floor(calculatedPercentage * 100)}
            now={(realtimeImpact / 21000000) * 100}
          />
        </div> */}
        <div>
          <ProgressBar
            style={{
              margin: 6,
              height: 6,
              borderRadius: 4,
              backgroundColor: "skyblue",
            }}
            // now={Math.floor(calculatedPercentage * 100)}
            now={(localStorage.getItem("balance") / 25) * 100}
          />
        </div>
      </div>

      {/* {isIdentityWalletOpen ? (
        IdentityWallet
          isIdentityWalletOpen={isIdentityWalletOpen}
          setIsIdentityWalletOpen={setIsIdentityWalletOpen}
          userStateReference={userStateReference}
          globalStateReference={globalStateReference}
          uiStateReference={uiStateReference}
          updateUserEmotions={updateUserEmotions}
          databaseUserDocument={databaseUserDocument}
          globalScholarshipCounter={globalScholarshipCounter}
          calculatedPercentage={calculatedPercentage}
          globalImpactCounter={globalImpactCounter}
        />
      ) : null}

      {isEmotionalIntelligenceOpen ? (
        <EmotionalIntelligence
          isEmotionalIntelligenceOpen={isEmotionalIntelligenceOpen}
          setIsEmotionalIntelligenceOpen={setIsEmotionalIntelligenceOpen}
          usersEmotionsCollectionReference={usersEmotionsCollectionReference}
          usersEmotionsFromDB={usersEmotionsFromDB}
          updateUserEmotions={updateUserEmotions}
          userStateReference={userStateReference}
          globalStateReference={globalStateReference}
          zap={zap}
          handleZap={handleZap}
        />
      ) : null}

      {isCofounderOpen ? (
        <Experimental
          isCofounderOpen={isCofounderOpen}
          setIsCofounderOpen={setIsCofounderOpen}
          userStateReference={userStateReference}
          globalStateReference={globalStateReference}
          zap={zap}
          handleZap={handleZap}
        />
      ) : null}

      {isBossModeOpen ? (
        <BossMode
          isBossModeOpen={isBossModeOpen}
          setIsBossModeOpen={setIsBossModeOpen}
          userStateReference={userStateReference}
          globalStateReference={globalStateReference}
          zap={zap}
          handleZap={handleZap}
        />
      ) : null} */}

      {!isEmpty(userStateReference?.databaseUserDocument?.userAuthObj?.uid) ? (
        <AdaptiveLearning
          setIsAdaptiveLearningOpen={setIsAdaptiveLearningOpen}
          isAdaptiveLearningOpen={isAdaptiveLearningOpen}
          userStateReference={userStateReference}
          globalStateReference={globalStateReference}
          zap={zap}
          handleZap={handleZap}
        />
      ) : null}

      {isStartupOpen ? (
        <Startup
          isStartupOpen={isStartupOpen}
          setIsStartupOpen={setIsStartupOpen}
          userStateReference={userStateReference}
          globalStateReference={globalStateReference}
          zap={zap}
          handleZap={handleZap}
          isBossModeOpen={isBossModeOpen}
          isCofounderOpen={isCofounderOpen}
          isEmotionalIntelligenceOpen={isEmotionalIntelligenceOpen}
          isIdentityWalletOpen={isIdentityWalletOpen}
          setIsIdentityWalletOpen={setIsIdentityWalletOpen}
          setIsCofounderOpen={setIsCofounderOpen}
          setIsBossModeOpen={setIsBossModeOpen}
          uiStateReference={uiStateReference}
          updateUserEmotions={updateUserEmotions}
          databaseUserDocument={databaseUserDocument}
          globalScholarshipCounter={globalScholarshipCounter}
          calculatedPercentage={calculatedPercentage}
          globalImpactCounter={globalImpactCounter}
          usersEmotionsCollectionReference={usersEmotionsCollectionReference}
          setIsEmotionalIntelligenceOpen={setIsEmotionalIntelligenceOpen}
          usersEmotionsFromDB={usersEmotionsFromDB}
          isAdaptiveLearningOpen={isAdaptiveLearningOpen}
          setIsAdaptiveLearningOpen={setIsAdaptiveLearningOpen}
          isLeetmigoOpen={isLeetmigoOpen}
          setIsLeetmigoOpen={setIsLeetmigoOpen}
        />
      ) : null}
    </>
  );
};
