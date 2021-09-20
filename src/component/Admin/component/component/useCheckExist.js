import React, { useState, useEffect } from "react";
import { API, Auth } from "aws-amplify";
import { TrendingUp } from "@material-ui/icons";

export default function useCheckExist(caseId, setCheckFail, setExist) {
  const [checkResult, setCheckResult] = useState(false);
  useEffect(() => {
    if (caseId !== "") {
      checkExist(caseId);
    }
  }, [caseId]);

  async function checkExist(id) {
    return await API.post("dbapi", "/db/get_object_case", {
      body: {
        case_id: id,
      },
    })
      .then((res) => {
        setCheckFail(false);
        if (res[0]["COUNT(1)"] > 0) {
          setExist(true);
          setCheckResult(true);
        } else {
          setExist(false);
          setCheckResult(false);
        }
      })
      .catch((error) => {
        console.log("Amplify API call error", error);
        setCheckFail(true);
      });
  }
  return checkResult;
}
