import React, { useState, useEffect } from "react";
import { API, Auth } from "aws-amplify";

export default function useRetrieveAAbColumns(caseId, columnList) {
  const [result, setResult] = useState(Array(columnList.length).fill(null));
  useEffect(() => {
    if (caseId !== "") {
      console.log("[AAb] Retrieving column values condition met.");
      retrieve(caseId, columnList);
    } else {
      console.log("Retreive AAb condition not met.");
    }
  }, [caseId]);
  async function retrieve(id, columns) {
    return await API.post("dbapi", "/db/get_one_AAb_all_column_values", {
      body: {
        case_id: id,
        columns: columns,
      },
    })
      .then((res) => {
        console.log("AAb retrieve result", res);
        let valueArray = [];
        for (let i = 0; i < columnList.length; i++) {
          valueArray.push(res[0][columnList[i]]);
        }
        console.log("[AAb] Retrieved existing case column values", valueArray);
        setResult(valueArray);
      })
      .catch((error) => {
        console.log("[AAb] Retrieve case columns failed.");
        console.log("[AAb] Failed case id", id);
        console.log("[AAb] Failed columnList", columns);
        console.log("[AAb] Amplify API call error", error);
      });
  }

  return result;
}
