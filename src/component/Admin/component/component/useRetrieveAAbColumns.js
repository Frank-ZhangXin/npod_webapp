import React, { useState, useEffect } from "react";
import { API, Auth } from "aws-amplify";

export default function useRetrieveAAbColumns(caseId, AAbIdValue, columnList) {
  const [result, setResult] = useState(Array(columnList.length).fill(null));
  useEffect(() => {
    if (caseId !== "") {
      console.log("[AAb] Retrieving column values condition met.");
      retrieve(caseId, AAbIdValue, columnList);
    } else {
      console.log("Retreive AAb condition not met.");
    }
  }, [caseId, AAbIdValue]);
  async function retrieve(the_case_id, the_AAb_id, columns) {
    return await API.post("dbapi", "/db/get_one_AAb_all_column_values", {
      body: {
        case_id: the_case_id,
        AAb_id: the_AAb_id,
        columns: columns,
      },
    })
      .then((res) => {
        console.log("AAb retrieve result", res);
        if (res.length !== 0) {
          let valueArray = [];
          for (let i = 0; i < columnList.length; i++) {
            valueArray.push(res[0][columnList[i]]);
          }
          console.log(
            "[AAb] Retrieved existing case column values",
            valueArray
          );
          setResult(valueArray);
        } else {
          setResult(Array(columnList.length).fill(null)); // set default result
        }
      })
      .catch((error) => {
        console.log("[AAb] Retrieve case columns failed.");
        console.log("[AAb] Failed case id", the_case_id);
        console.log("[AAb] Failed AAb id", the_AAb_id);
        console.log("[AAb] Failed columnList", columns);
        console.log("[AAb] Amplify API call error", error);
      });
  }

  return result;
}
