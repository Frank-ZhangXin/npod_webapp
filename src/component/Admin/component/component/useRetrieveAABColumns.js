import React, { useState, useEffect } from "react";
import { API, Auth } from "aws-amplify";

export default function useRetrieveAABColumns(caseId, columnList) {
  const [result, setResult] = useState(Array(columnList.length).fill(null));
  useEffect(() => {
    if (caseId !== "") {
      console.log("retrieving column values condition met.");
      retrieve(caseId, columnList);
    } else {
      console.log("Retreive AAB condition not met.");
    }
  }, [caseId]);
  async function retrieve(id, columns) {
    return await API.post("dbapi", "/db/get_one_AAB_all_column_values", {
      body: {
        case_id: id,
        columns: columns,
      },
    })
      .then((res) => {
        console.log("aab retrieve result", res);
        let valueArray = [];
        for (let i = 0; i < columnList.length; i++) {
          valueArray.push(res[0][columnList[i]]);
        }
        console.log("Retrieved existing case column values", valueArray);
        setResult(valueArray);
      })
      .catch((error) => {
        console.log("Retrieve case columns failed.");
        console.log("Failed case id", id);
        console.log("Failed columnList", columns);
        console.log("Amplify API call error", error);
      });
  }

  return result;
}
