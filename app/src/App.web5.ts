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
