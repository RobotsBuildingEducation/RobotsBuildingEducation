import React, { useState, useEffect } from "react";

import NDK, {
  NDKPrivateKeySigner,
  NDKEvent,
  NDKKind,
} from "@nostr-dev-kit/ndk";
import { nip19, getPublicKey } from "nostr-tools";

import { Buffer } from "buffer";
import { bech32 } from "bech32";
import { CashuMint, CashuWallet, getEncodedToken } from "@cashu/cashu-ts";

/**
 * used to test web5 data. should move to app.web5.ts
 */
export const deleteWebNodeRecords = async (recordSet, web5) => {
  for (let i = 0; i < recordSet.length; i++) {
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
};

export const useSharedNostr = (initialNpub, initialNsec) => {
  const [isConnected, setIsConnected] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [nostrPubKey, setNostrPubKey] = useState(initialNpub || "");
  const [nostrPrivKey, setNostrPrivKey] = useState(initialNsec || "");

  useEffect(() => {
    // Load keys from local storage if they exist
    const storedNpub = localStorage.getItem("local_npub");
    const storedNsec = localStorage.getItem("local_nsec");

    if (storedNpub) {
      setNostrPubKey(storedNpub);
    }

    if (storedNsec) {
      setNostrPrivKey(storedNsec);
    }
  }, []);

  const generateNostrKeys = async (userDisplayName = null) => {
    const privateKeySigner = NDKPrivateKeySigner.generate();

    const privateKey = privateKeySigner.privateKey;
    const user = await privateKeySigner.user();

    const publicKey = user.npub;

    const encodedNsec = bech32.encode(
      "nsec",
      bech32.toWords(Buffer.from(privateKey, "hex"))
    );
    const encodedNpub = bech32.encode(
      "npub",
      bech32.toWords(Buffer.from(publicKey, "hex"))
    );
    console.log("encoded npub", encodedNpub);
    console.log("encodedNsec", encodedNsec);

    setNostrPrivKey(encodedNsec);
    setNostrPubKey(encodedNpub);

    // if (!localStorage.getItem("local_nsec")) {
    //   postNostrContent(
    //     JSON.stringify({
    //       // name: userDisplayName,
    //       about: "A student onboarded with Robots Building Education",
    //     }),
    //     0,
    //     publicKey,
    //     encodedNsec
    //   );
    // }

    localStorage.setItem("local_nsec", encodedNsec);
    localStorage.setItem("local_npub", publicKey);
    localStorage.setItem("uniqueId", publicKey);

    return { npub: publicKey, nsec: encodedNsec };
  };

  const connectToNostr = async (npubRef = null, nsecRef = null) => {
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

      setIsConnected(true);

      // Return the connected NDK instance and signer
      return { ndkInstance, hexNpub, signer: new NDKPrivateKeySigner(hexNsec) };
    } catch (err) {
      console.error("Error connecting to Nostr:", err);
      setErrorMessage(err.message);
      return null;
    }
  };

  const auth = async (nsecPassword) => {
    let testnsec = nsecPassword;

    console.log("im authing", nip19);
    let decoded = nip19.decode(testnsec);
    console.log("decoded", decoded);
    console.log("decoded type..", decoded.type); //nsec
    const pubkey = getPublicKey(decoded.data);
    console.log("pk", pubkey);

    const ndk = new NDK({
      explicitRelayUrls: ["wss://relay.damus.io", "wss://relay.primal.net"],
    });
    console.log("ndk");
    let user = ndk.getUser({ pubkey: pubkey });

    console.log("user?", user.npub);
    console.log("user profile", user.profile);

    setNostrPrivKey(testnsec);
    setNostrPubKey(user.npub);

    localStorage.setItem("local_nsec", testnsec);
    localStorage.setItem("local_npub", user.npub);
    localStorage.setItem("uniqueId", user.npub);
  };

  const postNostrContent = async (
    content,
    kind = NDKKind.Text,
    npubRef = null,
    nsecRef = null
  ) => {
    const connection = await connectToNostr(npubRef, nsecRef);
    if (!connection) return;

    const { ndkInstance, hexNpub, signer } = connection;

    console.log("connection", connection);

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

    // Publish the note event
    await noteEvent.publish();
  };

  const getHexNPub = (npub) => {
    // Decode the npub from Bech32
    const { words: npubWords } = bech32.decode(npub);
    const hexNpub = Buffer.from(bech32.fromWords(npubWords)).toString("hex");

    return hexNpub;
  };

  const assignExistingBadgeToNpub = async (
    badgeNaddr,
    awardeeNpub = localStorage.getItem("local_npub"), // The public key of the user being awarded
    ownerNsec = import.meta.env.VITE_SECRET_KEY // Your private key to sign the event
  ) => {
    if (!awardeeNpub) {
      console.error("Awardee public key is required to award the badge.");
      return;
    }

    if (!ownerNsec) {
      console.error(
        "Owner's private key is required to sign the badge award event."
      );
      return;
    }

    // Connect to Nostr as the badge owner
    const connection = await connectToNostr(
      "npub14vskcp90k6gwp6sxjs2jwwqpcmahg6wz3h5vzq0yn6crrsq0utts52axlt",
      ownerNsec
    );
    if (!connection) return;

    const { ndkInstance, signer } = connection;

    // Create the event for awarding the badge
    const badgeAwardEvent = new NDKEvent(ndkInstance, {
      kind: NDKKind.BadgeAward, // Badge Award event kind
      tags: [
        ["a", badgeNaddr], // Reference to the Badge Definition event
        [
          "p",
          //npub14vskcp90k6gwp6sxjs2jwwqpcmahg6wz3h5vzq0yn6crrsq0utts52axlt
          getHexNPub(localStorage.getItem("local_npub")),
        ], // Public key of the awardee
      ],
      created_at: Math.floor(Date.now() / 1000),
      //npub14vskcp90k6gwp6sxjs2jwwqpcmahg6wz3h5vzq0yn6crrsq0utts52axlt
      pubkey: getHexNPub(
        "npub14vskcp90k6gwp6sxjs2jwwqpcmahg6wz3h5vzq0yn6crrsq0utts52axlt"
      ),
      // Your public key as the issuer
    });

    // Sign the badge event
    try {
      await badgeAwardEvent.sign(signer);
    } catch (error) {
      console.error("Error signing badge event:", error);
    }

    // Publish the badge event
    try {
      await badgeAwardEvent.publish();
      console.log("Badge awarded successfully to:", awardeeNpub);
    } catch (error) {
      console.error("Error publishing badge event:", error);
    }
  };

  const getAddressPointer = (naddr) => {
    return nip19.decode(naddr).data;
  };

  const getBadgeData = async (addy) => {
    try {
      // Connect to Nostr
      const connection = await connectToNostr();
      if (!connection) return [];

      const { ndkInstance, hexNpub } = connection;

      const addressPointer = await getAddressPointer(addy);

      console.log("BDT", addressPointer);
      // Create a filter for badge events (kind 30008) for the given user
      const filter = {
        kinds: [NDKKind.BadgeDefinition], // Use the NDKKind enum for better readability
        authors: [addressPointer.pubkey], // The user's hex-encoded npub
        "#d": [addressPointer.identifier],
        limit: 1,
      };

      // Create a subscription to fetch the events
      const subscription = ndkInstance.subscribe(filter, { closeOnEose: true });

      // Array to hold badges
      const badges = [];

      // Listen for events
      subscription.on("event", (event) => {
        const badgeInfo = {
          content: event.content,
          createdAt: event.created_at,
          tags: event.tags,
          badgeAddress: addy,
        };
        badges.push(badgeInfo);
      });

      // Wait for the subscription to finish
      await new Promise((resolve) => subscription.on("eose", resolve));

      // Log the retrieved badges

      return badges;
    } catch (error) {
      console.error("Error retrieving badges:", error);
      setErrorMessage(error.message);
      return [];
    }
  };
  const getUserBadges = async (npub = localStorage.getItem("local_npub")) => {
    try {
      const connection = await connectToNostr();
      if (!connection) return [];

      const { ndkInstance } = connection;
      const hexNpub = getHexNPub(npub); // Convert npub to hex

      // Create a filter for badge award events (kind 30009) where the user is the recipient
      const filter = {
        kinds: [NDKKind.BadgeAward], // Kind 30009 for badge awards
        "#p": [hexNpub], // Filter by the user's hex-encoded public key as the recipient
        limit: 100, // Adjust the limit as needed
      };

      const subscription = ndkInstance.subscribe(filter, { closeOnEose: true });

      const badges = [];

      subscription.on("event", (event) => {
        const badgeInfo = {
          content: event.content,
          createdAt: event.created_at,
          tags: event.tags,
        };
        badges.push(badgeInfo);
      });

      await new Promise((resolve) => subscription.on("eose", resolve));

      console.log("badges", badges);
      const uniqueNAddresses = [
        ...new Set(
          badges.flatMap(
            (badge) =>
              badge.tags
                .filter((tag) => tag[0] === "a" && tag[1]) // Find tags where the first element is "a"
                .map((tag) => tag[1]) // Extract the naddress
          )
        ),
      ];

      console.log("uniqueNAddresses", uniqueNAddresses);
      let badgeData = uniqueNAddresses.map((naddress) =>
        getBadgeData(naddress)
      );

      let resolvedBadges = await Promise.all(badgeData);

      const formattedBadges = [];

      // Loop through each outer array in the badgeDataArray
      resolvedBadges.forEach((badgeArray) => {
        // For each inner badge object array (which should have one object), extract name and image
        console.log("badge arr", badgeArray);
        badgeArray.forEach((badge) => {
          let name = "";
          let image = "";

          badge.tags.forEach((tag) => {
            if (tag[0] === "name") {
              name = tag[1];
            }
            if (tag[0] === "image") {
              image = tag[1];
            }
          });

          // Push the object containing name and image to the badges array
          if (name && image) {
            formattedBadges.push({
              name,
              image,
              badgeAddress: badge.badgeAddress,
            });
          }
        });
      });

      console.log("formattedBadges", formattedBadges);
      return formattedBadges;
    } catch (error) {
      console.error("Error retrieving badges:", error);
      return [];
    }
  };

  return {
    isConnected,
    errorMessage,
    nostrPubKey,
    nostrPrivKey,
    generateNostrKeys,
    postNostrContent,
    auth,
    assignExistingBadgeToNpub,
    getUserBadges,
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
    console.log("Mint Object", mint);

    try {
      const info = await mint.getInfo();
      console.log("Mint data", info);
      setDataOutput(info);

      const { keysets } = await mint.getKeys();
      console.log("mint keysets", keysets);

      const satKeyset = keysets.find((k) => k.unit === "sat");
      console.log("sat keysets", satKeyset);

      let walletRef = new CashuWallet(mint, { keys: satKeyset, unit: "sat" });

      console.log("wallet object", walletRef);
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
    console.log("mint quote", quote);

    localStorage.setItem("address", quote.request);

    setDataOutput(quote);

    let count = 0;

    const intervalId = setInterval(async () => {
      try {
        if (count === 36 || parseInt(localStorage.getItem(balance)) > 0) {
          clearInterval(intervalId);
        } else {
          const { proofs } = await w.mintTokens(amount, quote.quote, {
            keysetId: w.keys.id,
          });

          console.log("Minted token proofs", proofs);

          setDataOutput({ "minted proofs": proofs });
          setFormData((prevData) => ({ ...prevData }));
          addProofs(proofs);
          clearInterval(intervalId);
        }
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
      console.log("Send", send);
      const encodedToken = getEncodedToken({
        token: [{ proofs: send, mint: wallet.mint.mintUrl }],
      });

      console.log("encoded token", encodedToken);

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
