import React, { useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { doc, onSnapshot } from "firebase/firestore";
import { database } from "../../../../database/firebaseResources";
import { addKnowledgeStep, completeZapEvent } from "../../../../App.compute";
import { japaneseThemePalette } from "../../../../styles/lazyStyles";
import { useZap, useZapAnimation } from "../../../../App.hooks";

export const KnowledgeCollector = ({
  userReference = null,
  step,
  knowledge,
  label,
  collectorId,
}) => {
  let zap = useZap();
  const zapAnimation = useZapAnimation();

  const [boxShadow, setBoxShadow] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem("uniqueId");
    const userDocRef = doc(database, "users", userId);

    const unsubscribe = onSnapshot(userDocRef, (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        if (data.knowledgeKeys && data.knowledgeKeys.includes(collectorId)) {
          setIsDisabled(true);
        } else {
          setIsDisabled(false);
        }
      }
    });

    return () => unsubscribe();
  }, [collectorId]);

  return (
    <>
      <Button
        variant="dark"
        style={{
          width: 48,
          height: 48,
          textShadow: "1px 1px 1px black",
          borderBottom: boxShadow
            ? "2px solid transparent"
            : `2px solid ${japaneseThemePalette.CobaltBlue}`,
        }}
        onMouseEnter={() => setBoxShadow(true)}
        onMouseLeave={() => setBoxShadow(false)}
        onMouseDown={async () => {
          if (isDisabled) {
          } else {
            setIsLoading(true);

            await addKnowledgeStep(step, knowledge, label, collectorId);

            setIsLoading(false);
          }
        }}
        disabled={isDisabled}
      >
        {isLoading ? <Spinner size="sm" /> : !isDisabled ? "✅" : "💭"}
      </Button>
      <br />
    </>
  );
};
