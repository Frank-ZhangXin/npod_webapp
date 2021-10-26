import React, { useState, useEffect } from "react";
import { API, Auth } from "aws-amplify";
import { TrendingUp } from "@material-ui/icons";

export default function useCheckCaseExist(
  caseId,
  setCheckFail,
  setExist,
  setExistMsg,
  setCaseExist,
  createSuccess
) {
  const [checkResult, setCheckResult] = useState(false);
  useEffect(() => {
    if (caseId !== "") {
      checkExist(caseId);
    }
  }, [caseId, createSuccess]);

  async function checkExist(id) {
    return await API.post("dbapi", "/db/check_case_exist", {
      body: {
        case_id: id,
      },
    })
      .then((res) => {
        setCheckFail(false);
        if (res[0]["COUNT(1)"] > 0) {
          setExist(true);
          setCheckResult(true);
          setCaseExist(true);
          setExistMsg("Case exists, click 'Update' to proceed updating.");
          console.log(`Check exist. case ${caseId} exists!`);
        } else {
          setExist(false);
          setCaseExist(false);
          setCheckResult(false);
          setExistMsg(
            "Case DOES NOT exist, click 'Create' then 'Next' to proceed creating."
          );
        }
      })
      .catch((error) => {
        console.log("Amplify API call error", error);
        setCheckFail(true);
      });
  }
  return checkResult;
}
