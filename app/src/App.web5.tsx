import React, { useState, useEffect } from "react";

import NDK, {
  NDKPrivateKeySigner,
  NDKEvent,
  NDKKind,
} from "@nostr-dev-kit/ndk";
import { Buffer } from "buffer";
import { bech32 } from "bech32";
import { CashuMint, CashuWallet, getEncodedToken } from "@cashu/cashu-ts";

/**
 * used to test web5 data. should move to app.web5.ts
 */
export const deleteWebNodeRecords = async (recordSet, web5) => {
  for (let i = 0; i < recordSet.length; i++) {
    console.log(`deleting record set at ${i}`, recordSet[i]);
    let currentId = recordSet[i]?.id;

    await web5.dwn.records.delete({
      message: {
        recordId: currentId,
      },
    });
  }
};

/**
 * queries the user's dwn and creates an array we can set to state
 */
export const queryAndSetWebNodeRecords = async (web5) => {
  const { records } = await web5.dwn.records.query({
    message: {
      filter: {
        // dataFormat: "text/plain",
        dataFormat: "application/json",
        // Additional filters if available
      },
    },
  });
  let set = [];
  for (let record of records) {
    const data = await record.data.json();
    const transcript = { record, data, id: record.id };

    set.push(transcript);
  }

  return set;
};

/**
 * looks for a record with robotsbuildingeducation.com and if the set of records does not contain it, it gets created.
 */
export const createWebNodeRecord = async (web5, set, userUnlocks) => {
  let robots = set.find((item) =>
    item?.data?.protocol?.includes("https://robotsbuildingeducation.com")
  );

  if (!robots) {
    await web5.dwn.records.create({
      data: {
        protocol: "https://robotsbuildingeducation.com",
        ...userUnlocks,
      },
      message: {
        dataFormat: "application/json",
        published: true,
      },
    });
  }
};

export let updateWebNodeRecord = async (web5, dwnRecords, unlocks) => {
  const { record } = await web5.dwn.records.read({
    message: {
      filter: {
        recordId: dwnRecords?.find(
          (item) =>
            item?.data?.protocol === "https://robotsbuildingeducation.com"
        )?.id,
      },
    },
  });

  const transcript = await record.data.json();
  await record.update({
    data: {
      ...transcript,
      ...unlocks,
    },
  });
};

export let testUpdatedWebNodeRecords = async (web5, dwnRecords) => {
  // console.log("final result:");
  const { record: testRecord } = await web5.dwn.records.read({
    message: {
      filter: {
        recordId: dwnRecords?.find(
          (item) =>
            item?.data?.protocol === "https://robotsbuildingeducation.com"
        )?.id,
      },
    },
  });
  const outcome = await testRecord.data.json();
  console.log("dwn outcome", outcome);
};

export const useSharedNostr = (initialNpub, initialNsec) => {
  const [isConnected, setIsConnected] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [nostrPubKey, setNostrPubKey] = useState(initialNpub || "");
  const [nostrPrivKey, setNostrPrivKey] = useState(initialNsec || "");

  useEffect(() => {
    // Load keys from local storage if they exist
    const storedNpub = localStorage.getItem("npub");
    const storedNsec = localStorage.getItem("nsec");

    if (storedNpub) {
      setNostrPubKey(storedNpub);
    }

    if (storedNsec) {
      setNostrPrivKey(storedNsec);
    }
  }, []);

  const generateNostrKeys = async (userDisplayName = null) => {
    const privateKeySigner = NDKPrivateKeySigner.generate();
    console.log("privateKeySigner", privateKeySigner);
    const privateKey = privateKeySigner.privateKey;
    const user = await privateKeySigner.user();
    console.log("user...", user);
    const publicKey = user.npub;
    console.log("public key..", publicKey);

    const encodedNsec = bech32.encode(
      "nsec",
      bech32.toWords(Buffer.from(privateKey, "hex"))
    );
    const encodedNpub = bech32.encode(
      "npub",
      bech32.toWords(Buffer.from(publicKey, "hex"))
    );

    setNostrPrivKey(encodedNsec);
    setNostrPubKey(encodedNpub);

    if (!localStorage.getItem("nsec")) {
      postNostrContent(
        JSON.stringify({
          name: userDisplayName,
          about: "A student onboarded with Robots Building Education",
        }),
        0,
        publicKey,
        encodedNsec
      );
    }

    localStorage.setItem("nsec", encodedNsec);
    localStorage.setItem("npub", publicKey);

    return { npub: publicKey, nsec: encodedNsec };
  };

  const connectToNostr = async (npubRef = null, nsecRef = null) => {
    console.log("REF PUB 2", npubRef);
    console.log("NSEC ref 2", nsecRef);
    const defaultNsec = import.meta.env.VITE_GLOBAL_NOSTR_NSEC;
    const defaultNpub =
      "npub1mgt5c7qh6dm9rg57mrp89rqtzn64958nj5w9g2d2h9dng27hmp0sww7u2v";
    const nsec = nsecRef || nostrPrivKey || defaultNsec;
    const npub = npubRef || nostrPubKey || defaultNpub;

    try {
      // Decode the nsec from Bech32
      const { words: nsecWords } = bech32.decode(nsec);
      const hexNsec = Buffer.from(bech32.fromWords(nsecWords)).toString("hex");

      // Decode the npub from Bech32
      const { words: npubWords } = bech32.decode(npub);
      const hexNpub = Buffer.from(bech32.fromWords(npubWords)).toString("hex");

      // Create a new NDK instance
      const ndkInstance = new NDK({
        explicitRelayUrls: ["wss://relay.damus.io", "wss://relay.primal.net"],
      });

      // Connect to the relays
      await ndkInstance.connect();
      console.log("NDK connected");
      setIsConnected(true);

      // Return the connected NDK instance and signer
      return { ndkInstance, hexNpub, signer: new NDKPrivateKeySigner(hexNsec) };
    } catch (err) {
      console.error("Error connecting to Nostr:", err);
      setErrorMessage(err.message);
      return null;
    }
  };

  const postNostrContent = async (
    content,
    kind = NDKKind.Text,
    npubRef = null,
    nsecRef = null
  ) => {
    console.log("REF PUB", npubRef);
    console.log("NSEC ref", nsecRef);
    const connection = await connectToNostr(npubRef, nsecRef);
    if (!connection) return;

    const { ndkInstance, hexNpub, signer } = connection;

    // Create a new note event
    const noteEvent = new NDKEvent(ndkInstance, {
      kind,
      tags: [],
      content: content,
      created_at: Math.floor(Date.now() / 1000),
      pubkey: hexNpub,
    });

    // Sign the note event
    await noteEvent.sign(signer);

    console.log("Signed Note", noteEvent.rawEvent());

    // Publish the note event
    await noteEvent.publish();
  };

  return {
    isConnected,
    errorMessage,
    nostrPubKey,
    nostrPrivKey,
    generateNostrKeys,
    postNostrContent,
  };
};

export const useProofStorage = () => {
  const [proofs, setProofs] = useState(null);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const storedProofs = localStorage.getItem("proofs");
    if (storedProofs) {
      const parsedProofs = JSON.parse(storedProofs);
      setProofs(parsedProofs);
      const initialBalance = parsedProofs.reduce(
        (total, proof) => total + proof.amount,
        0
      );
      localStorage.setItem("balance", initialBalance);
      setBalance(initialBalance);
    }
  }, []);

  useEffect(() => {
    if (!proofs) return;
    localStorage.setItem("proofs", JSON.stringify(proofs));
    const newBalance = proofs.reduce((total, proof) => total + proof.amount, 0);
    localStorage.setItem("balance", newBalance);
    setBalance(newBalance);
  }, [proofs]);

  const addProofs = (newProofs) => {
    setProofs((prevProofs) => [...(prevProofs || []), ...newProofs]);
  };

  const removeProofs = (proofsToRemove) => {
    if (!proofsToRemove) return;
    setProofs((prevProofs) =>
      prevProofs.filter((proof) => !proofsToRemove.includes(proof))
    );
  };

  const getProofsByAmount = (amount, keysetId = undefined) => {
    const result = [];
    let sum = 0;

    for (const proof of proofs) {
      if (sum >= amount) break;
      if (keysetId && proof.id !== keysetId) continue;
      result.push(proof);
      sum += proof.amount;
    }

    return result.length > 0 && sum >= amount ? result : [];
  };

  return {
    addProofs,
    removeProofs,
    getProofsByAmount,
    balance,
  };
};

export const useCashuWallet = (isUnactivated) => {
  const [formData, setFormData] = useState({
    mintUrl: "https://stablenut.umint.cash",
    mintAmount: "25",
    meltInvoice: "",
    swapAmount: "1",
    swapToken: "",
  });

  const [dataOutput, setDataOutput] = useState(null);
  const [wallet, setWallet] = useState(null);
  const [cashuToken, setCashuToken] = useState(null);
  const { addProofs, balance, removeProofs, getProofsByAmount } =
    useProofStorage();

  useEffect(() => {
    // alert("sat");
    if (isUnactivated && !localStorage.getItem("address") && balance < 1) {
    } else {
      const storedMintData = JSON.parse(localStorage.getItem("mint"));

      if (storedMintData) {
        const { url, keyset } = storedMintData;

        const mint = new CashuMint(url);

        // Initialize wallet with stored keyset to avoid fetching again
        const walletRef = new CashuWallet(mint, { keys: keyset, unit: "sat" });
        setWallet(walletRef);

        setFormData((prevData) => ({ ...prevData, mintUrl: url }));
        // if (!localStorage.getItem("address")) {
        //   handleMint(walletRef);
        // }

        if (!isUnactivated) {
          handleMint(walletRef);
        }
      } else {
        handleSetMint(); // -> add default values
      }
    }
  }, []);

  const handleSetMint = async () => {
    const mint = new CashuMint(formData.mintUrl);

    try {
      const info = await mint.getInfo();
      setDataOutput(info);

      const { keysets } = await mint.getKeys();

      console.log("KEYSETS", keysets);

      const satKeyset = keysets.find((k) => k.unit === "sat");

      let walletRef = new CashuWallet(mint, { keys: satKeyset, unit: "sat" });
      setWallet(walletRef);

      localStorage.setItem(
        "mint",
        JSON.stringify({ url: formData.mintUrl, keyset: satKeyset })
      );

      await handleMint(walletRef);
    } catch (error) {
      console.error(error);
      setDataOutput({ error: "Failed to connect to mint", details: error });
    }
  };

  const handleMint = async (walletRef) => {
    const amount = parseInt(formData.mintAmount);
    let w = wallet || walletRef;

    const quote = await w.getMintQuote(amount);
    localStorage.setItem("address", quote.request);

    console.log("w", w);

    setDataOutput(quote);

    const intervalId = setInterval(async () => {
      try {
        const { proofs } = await w.mintTokens(amount, quote.quote, {
          keysetId: w.keys.id,
        });
        setDataOutput({ "minted proofs": proofs });
        setFormData((prevData) => ({ ...prevData }));
        addProofs(proofs);
        clearInterval(intervalId);
      } catch (error) {
        console.error("Quote probably not paid: ", quote.request, error);
        setDataOutput({ error: "Failed to mint", details: error });
      }
    }, 5000);
  };

  const handleSwapSend = async () => {
    const swapAmount = parseInt(formData.swapAmount);
    const proofs = getProofsByAmount(swapAmount);

    if (proofs.length === 0) {
      alert("Insufficient balance");
      return;
    }

    try {
      const { send, returnChange } = await wallet.send(swapAmount, proofs);
      const encodedToken = getEncodedToken({
        token: [{ proofs: send, mint: wallet.mint.mintUrl }],
      });

      // console.log("ENCODED TOKEN", encodedToken);

      removeProofs(proofs);
      addProofs(returnChange);
      setDataOutput(encodedToken);
      setCashuToken(encodedToken);
      return encodedToken;
    } catch (error) {
      console.error(error);
      setDataOutput({ error: "Failed to swap tokens", details: error });
    }
  };

  const recharge = async () => {
    handleMint(wallet);
  };

  return {
    formData,
    setFormData,
    dataOutput,
    wallet,
    balance,
    handleSetMint,
    handleMint,
    handleSwapSend,
    recharge,
  };
};
