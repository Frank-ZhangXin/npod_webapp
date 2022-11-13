import React, { useState, useEffect } from "react";
import { API, Auth } from "aws-amplify";

export default function useCreateSample(
  caseId,
  vialIdValue,
  isExist,
  create,
  changed,
  setAccept,
  setExist,
  setCreateMsg,
  setCreateSuccess,
  columnList,
  valueList
) {
  const [result, setResult] = useState(false);
  useEffect(() => {
    if (create && !changed && vialIdValue === "New") {
      createSample(caseId, columnList, valueList);
      console.log("New sample has been created!");
      console.log("column list", columnList);
      console.log("value list", valueList);
    } else {
      console.log("Sample create condition is not met.");
      if (create) {
        setCreateSuccess(false);
        setCreateMsg(`Sample case ${caseId} create is failed.`);
      }
    }
  }, [caseId, isExist, create, changed]);

  async function createSample(the_case_id, columnNames, columnValues) {
    console.log("Creating new RNA");
    let columns = { case_id: the_case_id };
    for (let i = 0; i < columnNames.length; i++) {
      columns[columnNames[i]] = columnValues[i];
    }
    return await API.post("dbapi", "/db/create_sample", {
      body: {
        columns: columns,
      },
    })
      .then((res) => {
        console.log(res);
        setResult(true);
        setExist(true);
        setCreateSuccess(true);
        setCreateMsg(
          `Sample of the case ${the_case_id} was created successfully.`
        );
        console.log(
          `Sample of the case ${the_case_id} was created successfully.`
        );
      })
      .catch((error) => {
        console.log("[Sample] Amplify API call error", error);
        setCreateSuccess(false);
        setResult(false);
        setAccept(false);
      });
  }
  return result;
}
