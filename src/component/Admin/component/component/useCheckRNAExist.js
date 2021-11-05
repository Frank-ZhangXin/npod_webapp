import React, { useState, useEffect } from "react";
import { API, Auth } from "aws-amplify";

export default function useCheckRNAExist(
  caseId,
  setCheckFail,
  setExist,
  setRNAExist,
  setRNAExistMsg
) {
  const [checkResult, setCheckResult] = useState(false);
  useEffect(() => {
    if (caseId !== "") {
      checkExist(caseId);
    }
  }, [caseId]);

  async function checkExist(id) {
    return await API.post("dbapi", "/db/check_RNA_exist", {
      body: {
        case_id: id,
      },
    })
      .then((res) => {
        setCheckFail(false);
        if (res[0]["COUNT(1)"] > 0) {
          setExist(true);
          setRNAExist(true);
          setCheckResult(true);
          setRNAExistMsg("RNA exists, click 'Update' to proceed updating.");
          console.log(`Check exist. RNA case ${caseId} exists!`);
        } else {
          setExist(false);
          setRNAExist(false);
          setCheckResult(false);
          setRNAExistMsg(
            "RNA DOES NOT exist, click 'Create' to proceed creating."
          );
        }
      })
      .catch((error) => {
        console.log("[RNA] Amplify API call error", error);
        setCheckFail(true);
      });
  }
  return checkResult;
}
