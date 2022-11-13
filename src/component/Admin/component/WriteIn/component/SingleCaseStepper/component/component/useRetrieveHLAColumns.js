import React, { useState, useEffect } from "react";
import { API, Auth } from "aws-amplify";

export default function useRetrieveHLAColumns(caseId, columnList) {
  const [result, setResult] = useState(Array(columnList.length).fill(null));
  useEffect(() => {
    if (caseId !== "") {
      console.log("[HLA] Retrieving column values condition met.");
      retrieve(caseId, columnList);
    } else {
      console.log("Retreive HLA condition not met.");
    }
  }, [caseId]);
  async function retrieve(id, columns) {
    return await API.post("dbapi", "/db/get_one_HLA_all_column_values", {
      body: {
        case_id: id,
        columns: columns,
      },
    })
      .then((res) => {
        console.log("HLA retrieve result", res);
        let valueArray = [];
        for (let i = 0; i < columnList.length; i++) {
          valueArray.push(res[0][columnList[i]]);
        }
        console.log("[HLA] Retrieved existing case column values", valueArray);
        setResult(valueArray);
      })
      .catch((error) => {
        console.log("[HLA] Retrieve case columns failed.");
        console.log("[HLA] Failed case id", id);
        console.log("[HLA] Failed columnList", columns);
        console.log("[HLA] Amplify API call error", error);
      });
  }

  return result;
}
