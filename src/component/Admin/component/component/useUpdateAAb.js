import React, { useState, useEffect } from "react";
import { API, Auth } from "aws-amplify";

export default function useUpdateAAb(
  caseId,
  AAbIdValue,
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
    if (update && !changed && AAbIdValue !== "New") {
      console.log("[AAb] Updating case columns...");
      updateAAb(caseId, AAbIdValue, updateColumns, updateValues);
    } else if (update) {
      setShowUpdateError(true);
      setShowUpdateSuccess(false);
      setUpdateMsg("[AAb] Update is failed!");
    }
  }, [caseId, update, changed]);
  async function updateAAb(the_case_id, the_AAb_id, columnNames, columnValues) {
    let columns = { case_id: the_case_id, AAb_id: the_AAb_id };
    for (let i = 0; i < columnNames.length; i++) {
      columns[columnNames[i]] = columnValues[i];
    }
    console.log(columns);
    return await API.put("dbapi", "/db/update_AAb", {
      body: {
        columns: columns,
      },
    })
      .then((res) => {
        if (res["affectedRows"] ?? false) {
          console.log("[AAb] Update success case ID", the_case_id);
          console.log("[AAb] Update success AAb ID", the_AAb_id);
          console.log("[AAb] Update success columns", columnNames);
          console.log("[AAb] Update success values", columnValues);
          setResult(true);
          setShowUpdateError(false);
          setShowUpdateSuccess(true);
          setUpdateMsg("[AAb] Update is successful!");
          console.log("[AAb] Update case columns are successful!");
        }
      })
      .catch((error) => {
        setAccept(false);
        setShowUpdateError(true);
        setShowUpdateSuccess(false);
        setUpdateMsg("[AAb] Update is failed");
        console.log("[AAb] Amplify API call error", error);
        console.log("[AAb] Update fail case ID", the_case_id);
        console.log("[AAb] Update fail AAb ID", the_AAb_id);
        console.log("[AAb] Update fail columns", columnNames);
        console.log("[AAb] Update fail values", columnValues);
      });
  }

  return result;
}
