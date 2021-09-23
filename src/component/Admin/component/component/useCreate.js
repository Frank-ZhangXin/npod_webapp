import React, { useState, useEffect } from "react";
import { API, Auth } from "aws-amplify";

export default function useCreate(
  caseId,
  isExist,
  create,
  changed,
  setAccept,
  setExist,
  setCreateMsg,
  setCreateSuccess
) {
  const [result, setResult] = useState(false);
  useEffect(() => {
    if (!isExist && create && !changed) {
      createCase(caseId);
      console.log("New case has been created!");
    } else {
      console.log("Case create condition is not met.");
    }
  }, [caseId, isExist, create, changed]);

  async function createCase(id) {
    console.log("creating new case");
    return await API.post("dbapi", "/db/create_case", {
      body: {
        case_id: id,
      },
    })
      .then((res) => {
        console.log(res);
        setResult(true);
        setExist(true);
        setCreateSuccess(true);
        setCreateMsg(`case ${id} was created successfully.`);
        console.log(`case ${id} was created successfully.`);
      })
      .catch((error) => {
        console.log("Amplify API call error", error);
        setCreateSuccess(false);
        setResult(false);
        setAccept(false);
      });
  }
  return result;
}
