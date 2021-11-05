import React, { useState, useEffect } from "react";
import { API, Auth } from "aws-amplify";

export default function useRetrieveRNAColumns(caseId, columnList) {
  const [result, setResult] = useState(Array(columnList.length).fill(null));
  useEffect(() => {
    if (caseId !== "") {
      console.log("[RNA] Retrieving column values condition met.");
      retrieve(caseId, columnList);
    } else {
      console.log("Retreive RNA condition not met.");
    }
  }, [caseId]);
  async function retrieve(id, columns) {
    return await API.post("dbapi", "/db/get_one_RNA_all_column_values", {
      body: {
        case_id: id,
        columns: columns,
      },
    })
      .then((res) => {
        console.log("RNA retrieve result", res);
        let valueArray = [];
        for (let i = 0; i < columnList.length; i++) {
          valueArray.push(res[0][columnList[i]]);
        }
        console.log("[RNA] Retrieved existing case column values", valueArray);
        setResult(valueArray);
      })
      .catch((error) => {
        console.log("[RNA Retrieve] Retrieve case columns failed.");
        console.log("[RNA Retrieve] Failed case id", id);
        console.log("[RNA Retrieve] Failed columnList", columns);
        console.log("[RNA Retrieve] Amplify API call error", error);
      });
  }

  return result;
}
