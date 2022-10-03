import React, { useState, useEffect } from "react";
import { API, Auth } from "aws-amplify";

export default function useRetrieveSampleColumns(
  caseId,
  vialIdValue,
  columnList
) {
  const [result, setResult] = useState(Array(columnList.length).fill(null));
  useEffect(() => {
    if (caseId !== "") {
      console.log("[Sample] Retrieving column values condition met.");
      retrieve(caseId, vialIdValue, columnList);
    } else {
      console.log("Retreive sample condition not met.");
    }
  }, [caseId, vialIdValue]);
  async function retrieve(the_case_id, the_vial_id, columns) {
    return await API.post("dbapi", "/db/get_one_sample_all_column_values", {
      body: {
        case_id: the_case_id,
        vial_id: the_vial_id,
        columns: columns,
      },
    })
      .then((res) => {
        console.log("Sample retrieve result", res);
        let valueArray = [];
        for (let i = 0; i < columnList.length; i++) {
          valueArray.push(res[0][columnList[i]]);
        }
        console.log(
          "[Sample] Retrieved existing sample column values",
          valueArray
        );
        setResult(valueArray);
      })
      .catch((error) => {
        console.log("[Sample Retrieve] Retrieve sample columns failed.");
        console.log("[Sample Retrieve] Failed case id", the_case_id);
        console.log("[Sample] Failed vial id", the_vial_id);
        console.log("[Sample Retrieve] Failed columnList", columns);
        console.log("[Sample Retrieve] Amplify API call error", error);
      });
  }

  return result;
}
