import Lottie from "react-lottie";
import { ProgressBar } from "react-bootstrap";
import zap_animation from "../../common/anims/zap_animation.json";
import bitcoin_animation from "../../common/anims/bitcoin_animation.json";
import star_animation from "../../common/anims/star_animation.json";

import { EmotionalIntelligence } from "./EmotionalIntelligence/EmotionalIntelligence";
import { FadeInComponent } from "../../styles/lazyStyles";
import { BossMode } from "./BossMode/BossMode";
import { Experimental } from "./Cofounder/Experimental";

import { useStore } from "../../Store";

import { ImpactWallet } from "./ImpactWallet/ImpactWallet";
import { renderActionBarControls } from "./ActionBar.compute";

export const ActionBar = ({
  displayName,

  globalScholarshipCounter,
  databaseUserDocument,
  calculatedPercentage,
  globalImpactCounter,
  isImpactWalletOpen,
  setIsImpactWalletOpen,

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
}) => {
  const showBitcoin = useStore((state) => state.showBitcoin);
  const showZap = useStore((state) => state.showZap);

  return (
    <>
      <div style={{ padding: 6 }}>
        {showZap || showStars || showBitcoin ? (
          <div style={{ height: 38 }}>
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
          renderActionBarControls({
            displayName,
            setIsBossModeOpen,
            setIsCofounderOpen,
            setIsEmotionalIntelligenceOpen,
            setIsImpactWalletOpen,
          })
        )}

        {/* &nbsp; &nbsp; &nbsp;{" "} */}
        <div>
          <ProgressBar
            style={{
              backgroundColor: "black",
              borderRadius: "0px",
              margin: 6,
              height: 6,
              borderRadius: 4,
              backgroundColor: "skyblue",
            }}
            now={Math.floor(calculatedPercentage * 100)}
          />
        </div>
      </div>

      {isImpactWalletOpen ? (
        <ImpactWallet
          isImpactWalletOpen={isImpactWalletOpen}
          setIsImpactWalletOpen={setIsImpactWalletOpen}
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

      <Experimental
        isCofounderOpen={isCofounderOpen}
        setIsCofounderOpen={setIsCofounderOpen}
        userStateReference={userStateReference}
        globalStateReference={globalStateReference}
        zap={zap}
        handleZap={handleZap}
      />

      <BossMode
        isBossModeOpen={isBossModeOpen}
        setIsBossModeOpen={setIsBossModeOpen}
        userStateReference={userStateReference}
        globalStateReference={globalStateReference}
        zap={zap}
        handleZap={handleZap}
      />
    </>
  );
};
