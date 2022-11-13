import React, { useState, useEffect } from "react";
import { API, Auth } from "aws-amplify";

export default function useCheckSampleExist(
  caseId,
  setCheckFail,
  setExist,
  setSampleExist,
  setSampleExistMsg
) {
  const [checkResult, setCheckResult] = useState(false);
  useEffect(() => {
    if (caseId !== "") {
      checkExist(caseId);
    }
  }, [caseId]);

  async function checkExist(id) {
    return await API.post("dbapi", "/db/check_sample_exist", {
      body: {
        case_id: id,
      },
    })
      .then((res) => {
        setCheckFail(false);
        if (res[0]["COUNT(1)"] > 0) {
          setExist(true);
          setSampleExist(true);
          setCheckResult(true);
          setSampleExistMsg(
            "Sample exists, click 'Update' to proceed updating."
          );
          console.log(`Check exist. Sample case ${caseId} exists!`);
        } else {
          setExist(false);
          setSampleExist(false);
          setCheckResult(false);
          setSampleExistMsg(
            "Sample DOES NOT exist, click 'Create' to proceed creating."
          );
        }
      })
      .catch((error) => {
        console.log("[Sample] Amplify API call error", error);
        setCheckFail(true);
      });
  }
  return checkResult;
}
