import React, { useState, useEffect } from "react";
import { API, Auth } from "aws-amplify";

export default function useRetrieve(caseId, columnList) {
  const [result, setResult] = useState([]);
  useEffect(() => {
    if (caseId !== "") {
      retrieve(caseId, columnList);
    }
  }, [caseId]);
  async function retrieve(id, columns) {
    return await API.post("dbapi", "/db/get_object_case_column", {
      body: {
        case_id: id,
        columns: columns,
      },
    })
      .then((res) => {
        let valueArray = [];
        for (let i = 0; i < columnList.length; i++) {
          valueArray.push(res[0][columnList[i]]);
        }
        console.log("Retrieved existing case column values", valueArray);
        setResult(valueArray);
      })
      .catch((error) => {
        console.log("Amplify API call error", error);
      });
  }

  return result;
}
