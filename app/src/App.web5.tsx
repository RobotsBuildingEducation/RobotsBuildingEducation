import React, { useState, useEffect } from "react";
import NDK, {
  NDKPrivateKeySigner,
  NDKEvent,
  NDKKind,
} from "@nostr-dev-kit/ndk";
import { Buffer } from "buffer";
import { bech32 } from "bech32";

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

export const useSharedNostr = () => {
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState(null);

  const connectNostr = async () => {
    const nsec = import.meta.env.VITE_GLOBAL_NOSTR_NSEC;
    const npub =
      "npub14vskcp90k6gwp6sxjs2jwwqpcmahg6wz3h5vzq0yn6crrsq0utts52axlt";

    try {
      // Decode the nsec from Bech32
      const { words: nsecWords } = bech32.decode(nsec);
      const hexNsec = Buffer.from(bech32.fromWords(nsecWords)).toString("hex");

      // Decode the npub from Bech32
      const { words: npubWords } = bech32.decode(npub);
      const hexNpub = Buffer.from(bech32.fromWords(npubWords)).toString("hex");

      // Create a new NDK instance
      const ndk = new NDK({
        explicitRelayUrls: ["wss://relay.damus.io", "wss://relay.primal.net"],
      });

      // Connect to the relays
      await ndk.connect();
      console.log("NDK connected");
      setConnected(true);

      // Return the connected NDK instance and signer
      return { ndk, hexNpub, signer: new NDKPrivateKeySigner(hexNsec) };
    } catch (err) {
      console.error("Error connecting to Nostr:", err);
      setError(err.message);
      return null;
    }
  };

  const postContent = async (content) => {
    const connection = await connectNostr();
    if (!connection) return;

    const { ndk, hexNpub, signer } = connection;

    // Create a new note event
    const note = new NDKEvent(ndk, {
      kind: NDKKind.Text,
      tags: [["test_1"]],
      content: content,
      created_at: Math.floor(Date.now() / 1000),
      pubkey: hexNpub,
    });

    // Sign the note event
    await note.sign(signer);

    console.log("Signed Note", note.rawEvent());

    // Publish the note event
    await note.publish();
  };

  return { connected, error, postContent };
};
