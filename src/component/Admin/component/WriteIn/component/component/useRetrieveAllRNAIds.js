import React, { useState, useEffect } from "react";
import { API, Auth } from "aws-amplify";

export default function useRetrieveAllRNAIds(caseId) {
  const [result, setResult] = useState([]);
  useEffect(() => {
    if (caseId !== "") {
      getRNAId(caseId);
    }
  }, [caseId]);

  async function getRNAId(id) {
    return await API.post("dbapi", "/db/get_all_RNA_id", {
      body: {
        case_id: id,
      },
    })
      .then((res) => {
        console.log("RNA id list fetch result", res);
        for (let i = 0; i < res.length; i++) {
          setResult((oldResult) => [...oldResult, res[i]["RNA_id"]]);
        }
      })
      .catch((error) => {
        console.log("[RNA] Amplify API call error", error);
      });
  }
  return result;
}
