import React, { useState, useEffect } from "react";
import { API, Auth } from "aws-amplify";

export default function useRetrieveAllAAbIds(caseId) {
  const [result, setResult] = useState([]);
  useEffect(() => {
    if (caseId !== "") {
      getAAbId(caseId);
    }
  }, [caseId]);

  async function getAAbId(id) {
    return await API.post("dbapi", "/db/get_all_AAb_id", {
      body: {
        case_id: id,
      },
    })
      .then((res) => {
        console.log("AAb id list fetch result", res);
        for (let i = 0; i < res.length; i++) {
          setResult((oldResult) => [...oldResult, res[i]["AAb_id"]]);
        }
      })
      .catch((error) => {
        console.log("[AAb] Amplify API call error", error);
      });
  }
  return result;
}
