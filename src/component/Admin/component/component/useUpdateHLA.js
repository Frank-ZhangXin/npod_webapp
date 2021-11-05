import React, { useState, useEffect } from "react";
import { API, Auth } from "aws-amplify";

export default function useUpdateHLA(
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
      console.log("[HLA] Updating case columns...");
      updateHLA(caseId, updateColumns, updateValues);
    }
  }, [caseId, update, changed]);
  async function updateHLA(id, columnNames, columnValues) {
    let columns = { case_id: id };
    for (let i = 0; i < columnNames.length; i++) {
      columns[columnNames[i]] = columnValues[i];
    }
    console.log(columns);
    return await API.put("dbapi", "/db/update_HLA", {
      body: {
        columns: columns,
      },
    })
      .then((res) => {
        if (res["affectedRows"] ?? false) {
          console.log("[HLA Update] Success id", id);
          console.log("[HLA Update] Success columns", columns);
          setResult(true);
          setShowUpdateError(false);
          setShowUpdateSuccess(true);
          setUpdateMsg("[HLA] Update is successful!");
          console.log("[HLA] Update case columns are successful!");
        }
      })
      .catch((error) => {
        setAccept(false);
        setShowUpdateError(true);
        setShowUpdateSuccess(false);
        setUpdateMsg("[HLA Update] Failed");
        console.log("[HLA Update] Amplify API call error", error);
        console.log("[HLA Update] Fail case id", id);
        console.log("[HLA Update] Fail columns", columns);
      });
  }

  return result;
}
