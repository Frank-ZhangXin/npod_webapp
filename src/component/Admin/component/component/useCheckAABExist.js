import React, { useState, useEffect } from "react";
import { API, Auth } from "aws-amplify";
import { TrendingUp } from "@material-ui/icons";

export default function useCheckAABExist(
  caseId,
  setCheckFail,
  setExist,
  setAABExist,
  setAABExistMsg
) {
  const [checkResult, setCheckResult] = useState(false);
  useEffect(() => {
    if (caseId !== "") {
      checkExist(caseId);
    }
  }, [caseId]);

  async function checkExist(id) {
    return await API.post("dbapi", "/db/check_AAB_exist", {
      body: {
        case_id: id,
      },
    })
      .then((res) => {
        setCheckFail(false);
        if (res[0]["COUNT(1)"] > 0) {
          setExist(true);
          setAABExist(true);
          setCheckResult(true);
          setAABExistMsg("AAB exists, click 'Update' to proceed updating.");
          console.log(`Check exist. AAB case ${caseId} exists!`);
        } else {
          setExist(false);
          setAABExist(false);
          setCheckResult(false);
          setAABExistMsg(
            "Case DOES NOT exist, click 'Create' to proceed creating."
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
