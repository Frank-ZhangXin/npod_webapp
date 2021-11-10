import React, { useState, useEffect } from "react";
import { API, Auth } from "aws-amplify";

export default function useCreateAAb(
  caseId,
  isExist,
  create,
  changed,
  setAccept,
  setExist,
  setCreateMsg,
  setCreateSuccess,
  columnList,
  valueList
) {
  const [result, setResult] = useState(false);
  useEffect(() => {
    if (!isExist && create && !changed) {
      createAAb(caseId, columnList, valueList);
      console.log("New AAb has been created!");
      console.log("column list", columnList);
      console.log("value list", valueList);
    } else {
      console.log("AAb create condition is not met.");
    }
  }, [caseId, isExist, create, changed]);

  async function createAAb(id, columnNames, columnValues) {
    console.log("Creating new AAb");
    let columns = { case_id: id };
    for (let i = 0; i < columnNames.length; i++) {
      columns[columnNames[i]] = columnValues[i];
    }
    return await API.post("dbapi", "/db/create_AAb", {
      body: {
        columns: columns,
      },
    })
      .then((res) => {
        console.log(res);
        setResult(true);
        setExist(true);
        setCreateSuccess(true);
        setCreateMsg(`AAb case ${id} was created successfully.`);
        console.log(`AAb case ${id} was created successfully.`);
      })
      .catch((error) => {
        console.log("[AAb] Amplify API call error", error);
        setCreateSuccess(false);
        setResult(false);
        setAccept(false);
      });
  }
  return result;
}
