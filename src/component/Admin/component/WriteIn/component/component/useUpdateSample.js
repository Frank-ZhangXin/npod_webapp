import React, { useState, useEffect } from "react";
import { API, Auth } from "aws-amplify";

export default function useUpdateSample(
  caseId,
  vialIdValue,
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
    if (update && !changed && vialIdValue !== "New") {
      console.log("[Sample] Updating case columns...");
      updateSample(caseId, vialIdValue, updateColumns, updateValues);
    } else if (update) {
      setShowUpdateError(true);
      setShowUpdateSuccess(false);
      setUpdateMsg("[Sample] Update is failed.");
    }
  }, [caseId, update, changed]);
  async function updateSample(
    the_case_id,
    the_vial_id,
    columnNames,
    columnValues
  ) {
    let columns = { case_id: the_case_id, vial_id: the_vial_id };
    for (let i = 0; i < columnNames.length; i++) {
      columns[columnNames[i]] = columnValues[i];
    }
    console.log(columns);
    return await API.put("dbapi", "/db/update_sample", {
      body: {
        columns: columns,
      },
    })
      .then((res) => {
        if (res["affectedRows"] ?? false) {
          console.log("[Sample] Update success Case ID", the_case_id);
          console.log("[Sample] Update success Vial ID", the_vial_id);
          console.log("[Sample] Update success columns", columnNames);
          console.log("[Sample] Update success values", columnValues);
          setResult(true);
          setShowUpdateError(false);
          setShowUpdateSuccess(true);
          setUpdateMsg("[Sample] Update is successful!");
          console.log("[Sample] Update case columns are successful!");
        }
      })
      .catch((error) => {
        setAccept(false);
        setShowUpdateError(true);
        setShowUpdateSuccess(false);
        setUpdateMsg("[Sample] Update is failed");
        console.log("[Sample Update] Amplify API call error", error);
        console.log("[Sample] Update fail case ID", the_case_id);
        console.log("[Sample] Update fail Vial ID", the_vial_id);
        console.log("[Sample] Update fail columns", columnNames);
        console.log("[Sample] Update fail values", columnValues);
      });
  }

  return result;
}
