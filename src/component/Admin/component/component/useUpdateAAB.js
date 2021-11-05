import React, { useState, useEffect } from "react";
import { API, Auth } from "aws-amplify";

export default function useUpdateAAB(
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
      console.log("[AAB] Updating case columns...");
      updateAAB(caseId, updateColumns, updateValues);
    }
  }, [caseId, update, changed]);
  async function updateAAB(id, columnNames, columnValues) {
    let columns = { case_id: id };
    for (let i = 0; i < columnNames.length; i++) {
      columns[columnNames[i]] = columnValues[i];
    }
    console.log(columns);
    return await API.put("dbapi", "/db/update_AAB", {
      body: {
        columns: columns,
      },
    })
      .then((res) => {
        if (res["affectedRows"] ?? false) {
          console.log("[AAB] Update success id", id);
          console.log("[AAB] Update success columns", columnNames);
          console.log("[AAB] Update success values", columnValues);
          setResult(true);
          setShowUpdateError(false);
          setShowUpdateSuccess(true);
          setUpdateMsg("[AAB] Update is successful!");
          console.log("[AAB] Update case columns are successful!");
        }
      })
      .catch((error) => {
        setAccept(false);
        setShowUpdateError(true);
        setShowUpdateSuccess(false);
        setUpdateMsg("[AAB] Update is failed");
        console.log("[AAB] Amplify API call error", error);
        console.log("[AAB] Update fail id", id);
        console.log("[AAB] Update fail columns", columnNames);
        console.log("[AAB] Update fail values", columnValues);
      });
  }

  return result;
}
