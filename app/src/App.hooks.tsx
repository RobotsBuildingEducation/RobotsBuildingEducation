import { useEffect, useState } from "react";
import { useContext } from "react";

import { LightningAddress } from "@getalby/lightning-tools";

import { useStore } from "./Store";
import RandomCharacter from "./common/ui/Elements/RandomCharacter/RandomCharacter";
import { renderTranscriptAwards } from "./ProofOfWork/ActionBar/ActionBar.compute";

/**
 *
 * used to manage the user's collection & its respective document from firestore.
 *
 * databaseUserDocument = the actual user document data
 * userDocumentReference = the argument that gets used to retrieve the user's document from Firestore
 * usersEmotionsCollectionReference = the argument used to retrieve the user's emotions collection (saved data)
 * usersEmotionsFromDB = the actual emotion data
 */
export const useUserDocument = () => {
  const [databaseUserDocument, setDatabaseUserDocument] = useState({});
  const [userDocumentReference, setUserDocumentReference] = useState({});
  const [
    usersEmotionsCollectionReference,
    setUsersEmotionsCollectionReference,
  ] = useState({});

  const [usersEmotionsFromDB, setUsersEmotionsFromDB] = useState([]);

  let userStateReference = {
    databaseUserDocument,
    setDatabaseUserDocument,
    userDocumentReference,
    setUserDocumentReference,
    usersEmotionsCollectionReference,
    setUsersEmotionsCollectionReference,
    usersEmotionsFromDB,
    setUsersEmotionsFromDB,
  };

  return { userStateReference };
};

/**
 *
 
 * Used to manage the global collection in firestore
 *
 * globalDocumentReference = used to retrieve the impact document in the global collection
 * globalImpactCounter = simple counter data, global.impact.total
 * globalScholarshipCounter = simple counter data, global.impact.scholarships
 * globalLevelCounter = highest level in quiz mode
 * globalLeaderName = name of discord user with highest score
 */
export const useGlobalStates = () => {
  const [globalDocumentReference, setGlobalDocumentReference] = useState({});
  const [globalImpactCounter, setGlobalImpactCounter] = useState(0);
  const [globalLevelCounter, setGlobalLevelCounter] = useState(0);
  const [globalLeaderName, setGlobalLeaderName] = useState("RO.B.E");
  const [globalScholarshipCounter, setGlobalScholarshipCounter] = useState(0);

  let globalStateReference = {
    globalDocumentReference,
    setGlobalDocumentReference,
    globalImpactCounter,
    setGlobalImpactCounter,
    globalScholarshipCounter,
    setGlobalScholarshipCounter,

    globalLevelCounter,
    setGlobalLevelCounter,
    globalLeaderName,
    setGlobalLeaderName,
  };

  return { globalStateReference };
};

/**
 *
 * Used to manage the UI state of the application, unrelated to the state of the database.
 *
 * patreonObject = the lecture data set
 * currentPath = path selected between Engineer, Creator, Dealer
 * moduleName = name of lecture selected
 * pathSelectionAnimationData = animation triggers for the path selection/hover
 * proofOfWorkFromModules = calculates the ui() to get all impact points
 */
export const useUIStates = () => {
  const [patreonObject, setPatreonObject] = useState({});
  const [currentPath, setCurrentPath] = useState("");
  const [moduleName, setModuleName] = useState("");
  const [pathSelectionAnimationData, setPathSelectionAnimationData] = useState(
    {}
  );

  const [proofOfWorkFromModules, setProofOfWorkFromModules] = useState(0);

  let uiStateReference = {
    patreonObject,
    setPatreonObject,
    currentPath,
    setCurrentPath,
    moduleName,
    setModuleName,
    pathSelectionAnimationData,
    setPathSelectionAnimationData,

    proofOfWorkFromModules,
    setProofOfWorkFromModules,
  };

  return { uiStateReference };
};

/**
 * Custom React hook to create and pay a Lightning Network invoice using Alby's LightningAddress.
 *
 * This hook abstracts the functionality to generate a new Lightning Network invoice with a specified
 * deposit amount and message. It then attempts to pay this invoice using the connected wallet via WebLN.
 *
 * @param {number} depositAmount - The amount in satoshis to be deposited (default is 1 satoshi).
 * @param {string} depositMessage - A message to accompany the deposit, for context (default is a message about Robots Building Education Lecture).
 *
 * @returns {Function} createZap - A function that initiates the creation of a new Lightning Network invoice.
 *
 * @example
 * const createZap = useZap(100, "Donation for project X");
 *
 * useEffect(() => {
 *   createZap();
 * }, []);
 *
 * The hook manages the invoice state internally and automatically attempts payment upon invoice creation.
 * It leverages the `@getalby/lightning-tools` for generating invoices and uses WebLN for payment if available.
 * Errors during the invoice creation or payment process are logged to the console and displayed via alert.
 *
 * Note: This hook requires a WebLN-enabled browser extension like Alby to be installed and configured by the user.
 */
export const useZap = (
  depositAmount = 1,
  depositMessage = "Robots Building Education Lecture"
) => {
  const [invoice, setInvoice] = useState<string | undefined>(undefined);

  let payInvoice = async () => {
    try {
      if (!window.webln || !window.webln) {
        throw new Error("Please connect your wallet");
      }
      if (!invoice) {
        throw new Error("No invoice available");
      }

      const result = await window.webln.sendPayment(invoice);

      if (!result?.preimage) {
        throw new Error("Payment failed. Please try again");
      }

      return result;
    } catch (error) {
      console.log("{error}", { error });
      console.log("error", error);
      alert(
        "Unable to complete Bitcoin transaction. Check your connection, transaction limits or your wallet's balance."
      );
    }
  };

  let createZap = async () => {
    try {
      const ln = new LightningAddress("tomatochipmunk3@primal.net");

      console.log("ln", ln);
      await ln.fetch();

      let invoiceResult = (
        await ln.requestInvoice({
          satoshi: 1,
          comment: "Robots Building Education",
        })
      ).paymentRequest;

      console.log("invoice", invoiceResult);
      setInvoice(invoiceResult);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (invoice) {
      payInvoice();
    }
  }, [invoice]);

  return createZap;
};

/**
 * handles lecture events when a user selects a prompt or completes a task like a completed video or AI completion.
 */
export const useZapAnimation = () => {
  // console.log("running zap..");
  const setShowZap = useStore((state) => state.setShowZap);

  let animation = () => {
    setShowZap(true);
    setTimeout(() => {
      setShowZap(false);
    }, 2000);
  };

  return animation;
};

export const useBitcoinAnimation = () => {
  console.log("bitcoin animation");
  const setShowBitcoin = useStore((state) => state.setShowBitcoin);

  let animation = () => {
    console.log("changing showBitcoin..");
    setShowBitcoin(true);
    setTimeout(() => {
      setShowBitcoin(false);
    }, 2000);
  };

  return animation;
};

export const TimedRandomCharacter = () => {
  const [key, setKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // This updates the key state, causing the component to re-render
      setKey((prevKey) => prevKey + 1);
    }, 3000); // Set the interval to 1000 ms (1 second)

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, []);

  return <RandomCharacter key={key} borderRadius="50%" />;
};

export const useGlobalModal = (config) => {
  const setIsGlobalModalActive = useStore(
    (state) => state.setIsGlobalModalActive
  );
  const setModalContent = useStore((state) => state.setModalContent);

  const handleModal = (type) => {
    let message = config.defaultMessage; // Default message if none provided for type
    if (config.messages && config.messages[type]) {
      message = config.messages[type];
    }

    setModalContent({ message });
    setIsGlobalModalActive(true);
  };

  return handleModal;
};

export const getTranscriptDisplay = (profile) => {
  let data = "ok";

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexWrap: "wrap",
      }}
    >
      {renderTranscriptAwards(profile)}
    </div>
  );
};
