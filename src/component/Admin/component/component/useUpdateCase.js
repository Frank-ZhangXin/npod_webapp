import React, { useState, useEffect } from "react";
import { API, Auth } from "aws-amplify";

export default function useUpdateCase(
  caseId,
  update,
  changed,
  setAccept,
  updateColumns,
  updateValues,
  setShowError,
  setShowSuccess,
  setMsg
) {
  const [result, setResult] = useState(false);
  useEffect(() => {
    if (update && !changed) {
      console.log("[Cases] Updating case columns...");
      updateCase(caseId, updateColumns, updateValues);
    }
  }, [caseId, update, changed]);
  async function updateCase(id, columns, values) {
    return await API.put("dbapi", "/db/update_case", {
      body: {
        case_id: id,
        update_columns: columns,
        update_values: values,
      },
    })
      .then((res) => {
        if (res["affectedRows"] ?? false) {
          console.log("[Cases] Update success id", id);
          console.log("[Cases] Update success columns", columns);
          console.log("[Cases] Update success values", values);
          setResult(true);
          setShowError(false);
          setShowSuccess(true);
          setMsg("[Cases] Update is successful!");
          console.log("[Cases] Update case columns are successful!");
        }
      })
      .catch((error) => {
        setAccept(false);
        setShowError(true);
        setShowSuccess(false);
        setMsg("[Cases] Update is failed");
        console.log("[Cases] Amplify API call error", error);
        console.log("[Cases] Update fail id", id);
        console.log("[Cases] Update fail columns", columns);
        console.log("[Cases] Update fail values", values);
      });
  }

  return result;
}
