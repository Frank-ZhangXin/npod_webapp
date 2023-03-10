import React, { useState, useEffect } from "react";
import { Storage, API } from "aws-amplify";

export default function useGetAllExistingCaseIds(
  setAllCaseIds,
  resetButtongClicked
) {
  useEffect(() => {
    //getCaseListFromStorage();
    getCaseListFromDb();
  }, [resetButtongClicked]);
  async function getCaseListFromStorage() {
    try {
      await Storage.list("cases/").then((allFiles) => {
        if (allFiles.length !== 0) {
          let folders = new Set();
          allFiles.forEach((file) => {
            let caseFolderName = file.key.split("/").slice(1, 2).join();
            if (caseFolderName.length !== 0) {
              folders.add(caseFolderName);
            }
          });
          setAllCaseIds(
            Array.from(folders).map((f) => {
              return { caseId: f };
            })
          );
        }
      });
    } catch (error) {
      console.error("[S3]Get case list error", error);
    }
  }

  async function getCaseListFromDb() {
    const nowTime = new Date().toLocaleString().replace(",", "");
    console.log("Retrieving cases by case id list...");
    return await API.get("dbapi", "/db/all_case_ids")
      .then((res) => {
        console.log("Retrieve case id list in image upload success!", res);
        const convertFunc = (item) => ({ caseId: item.case_id });
        const caseIdListTemp = res.map(convertFunc);
        setAllCaseIds(caseIdListTemp);
      })
      .catch((error) => {
        console.log("Get case id list in image upload  fail", error);
      });
  }
}
