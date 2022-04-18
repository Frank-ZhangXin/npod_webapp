import React, { useState, useEffect } from "react";
import { API, Auth } from "aws-amplify";

export default function useCheckAAbExist(
  caseId,
  setCheckFail,
  setExist,
  setHLAExist,
  setHLAExistMsg
) {
  const [checkResult, setCheckResult] = useState(false);
  useEffect(() => {
    if (caseId !== "") {
      checkExist(caseId);
    }
  }, [caseId]);

  async function checkExist(id) {
    return await API.post("dbapi", "/db/check_HLA_exist", {
      body: {
        case_id: id,
      },
    })
      .then((res) => {
        setCheckFail(false);
        if (res[0]["COUNT(1)"] > 0) {
          setExist(true);
          setHLAExist(true);
          setCheckResult(true);
          setHLAExistMsg("HLA exists, click 'Update' to proceed updating.");
          console.log(`Check exist. HLA case ${caseId} exists!`);
        } else {
          setExist(false);
          setHLAExist(false);
          setCheckResult(false);
          setHLAExistMsg(
            "HLA DOES NOT exist, click 'Create' to proceed creating."
          );
        }
      })
      .catch((error) => {
        console.log("[HLA] Amplify API call error", error);
        setCheckFail(true);
      });
  }
  return checkResult;
}
