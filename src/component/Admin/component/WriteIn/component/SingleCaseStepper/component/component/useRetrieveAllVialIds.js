import React, { useState, useEffect } from "react";
import { API, Auth } from "aws-amplify";

export default function useRetrieveAllVialIds(caseId) {
  const [result, setResult] = useState([]);
  useEffect(() => {
    if (caseId !== "") {
      getVialId(caseId);
    }
  }, [caseId]);

  async function getVialId(id) {
    return await API.post("dbapi", "/db/get_all_vial_id", {
      body: {
        case_id: id,
      },
    })
      .then((res) => {
        console.log("Vial id list fetch result", res);
        for (let i = 0; i < res.length; i++) {
          setResult((oldResult) => [...oldResult, res[i]["vial_id"]]);
        }
      })
      .catch((error) => {
        console.log("[Sample] Amplify API call error", error);
      });
  }
  return result;
}
