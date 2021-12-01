import React, { useState, useEffect } from "react";
import { API, Auth } from "aws-amplify";

export default function useCheckAAbExist(
  caseId,
  setCheckFail,
  setExist,
  setAAbExist,
  setAAbExistMsg
) {
  const [checkResult, setCheckResult] = useState(false);
  useEffect(() => {
    if (caseId !== "") {
      checkExist(caseId);
    }
  }, [caseId]);

  async function checkExist(id) {
    return await API.post("dbapi", "/db/check_AAb_exist", {
      body: {
        case_id: id,
      },
    })
      .then((res) => {
        setCheckFail(false);
        if (res[0]["COUNT(1)"] > 0) {
          setExist(true);
          setAAbExist(true);
          setCheckResult(true);
          setAAbExistMsg("AAb exists, click 'Update' to proceed updating.");
          console.log(`Check exist. AAb case ${caseId} exists!`);
        } else {
          setExist(false);
          setAAbExist(false);
          setCheckResult(false);
          setAAbExistMsg(
            "AAb DOES NOT exist, click 'Create' to proceed creating."
          );
        }
      })
      .catch((error) => {
        console.log("[AAb] Amplify API call error", error);
        setCheckFail(true);
      });
  }
  return checkResult;
}
