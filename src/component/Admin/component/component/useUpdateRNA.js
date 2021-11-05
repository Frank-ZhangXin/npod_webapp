import React, { useState, useEffect } from "react";
import { API, Auth } from "aws-amplify";

export default function useUpdateRNA(
  caseId,
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
    if (update && !changed) {
      console.log("[RNA] Updating case columns...");
      updateRNA(caseId, updateColumns, updateValues);
    }
  }, [caseId, update, changed]);
  async function updateRNA(id, columnNames, columnValues) {
    let columns = { case_id: id };
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
          console.log("[RNA] Update success id", id);
          console.log("[RNA] Update success columns", columns);
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
        console.log("[RNA Update] Fail case id", id);
        console.log("[RNA Update] Fail columns", columns);
      });
  }

  return result;
}
