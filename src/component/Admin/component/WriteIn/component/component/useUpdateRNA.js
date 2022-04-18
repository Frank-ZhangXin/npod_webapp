import React, { useState, useEffect } from "react";
import { API, Auth } from "aws-amplify";

export default function useUpdateRNA(
  caseId,
  RNAIdValue,
  update,
  changed,
  setAccept,
  updateColumns,
  updateValues,
  setShowUpdateError,
  setShowUpdateSuccess,
  setUpdateMsg
) {
  const [result, setResult] = useState(false);
  useEffect(() => {
    if (update && !changed && RNAIdValue !== "New") {
      console.log("[RNA] Updating case columns...");
      updateRNA(caseId, RNAIdValue, updateColumns, updateValues);
    } else if (update) {
      setShowUpdateError(true);
      setShowUpdateSuccess(false);
      setUpdateMsg("[RNA] Update is failed.");
    }
  }, [caseId, update, changed]);
  async function updateRNA(the_case_id, the_RNA_id, columnNames, columnValues) {
    let columns = { case_id: the_case_id, RNA_id: the_RNA_id };
    for (let i = 0; i < columnNames.length; i++) {
      columns[columnNames[i]] = columnValues[i];
    }
    console.log(columns);
    return await API.put("dbapi", "/db/update_RNA", {
      body: {
        columns: columns,
      },
    })
      .then((res) => {
        if (res["affectedRows"] ?? false) {
          console.log("[RNA] Update success Case ID", the_case_id);
          console.log("[RNA] Update success RNA ID", the_RNA_id);
          console.log("[RNA] Update success columns", columnNames);
          console.log("[RNA] Update success values", columnValues);
          setResult(true);
          setShowUpdateError(false);
          setShowUpdateSuccess(true);
          setUpdateMsg("[RNA] Update is successful!");
          console.log("[RNA] Update case columns are successful!");
        }
      })
      .catch((error) => {
        setAccept(false);
        setShowUpdateError(true);
        setShowUpdateSuccess(false);
        setUpdateMsg("[RNA] Update is failed");
        console.log("[RNA Update] Amplify API call error", error);
        console.log("[RNA] Update fail case ID", the_case_id);
        console.log("[RNA] Update fail AAb ID", the_RNA_id);
        console.log("[RNA] Update fail columns", columnNames);
        console.log("[RNA] Update fail values", columnValues);
      });
  }

  return result;
}
