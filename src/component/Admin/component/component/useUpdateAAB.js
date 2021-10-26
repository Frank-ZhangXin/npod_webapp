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
      console.log("Updating case columns...");
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
          console.log("Update success id", id);
          console.log("Update success columns", columnNames);
          console.log("Update success values", columnValues);
          setResult(true);
          setShowUpdateError(false);
          setShowUpdateSuccess(true);
          setUpdateMsg("Update is successful!");
          console.log("Update case columns are successful!");
        }
      })
      .catch((error) => {
        setAccept(false);
        setShowUpdateError(true);
        setShowUpdateSuccess(false);
        setUpdateMsg("Update is failed");
        console.log("Amplify API call error", error);
        console.log("Update fail id", id);
        console.log("Update fail columns", columnNames);
        console.log("Update fail values", columnValues);
      });
  }

  return result;
}
