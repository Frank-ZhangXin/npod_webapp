import React, { useState, useEffect } from "react";
import { Storage } from "aws-amplify";

export default function useGetAllExistingCaseIds(
  setAllCaseIds,
  resetButtongClicked
) {
  useEffect(() => {
    getCaseList();
  }, [resetButtongClicked]);
  async function getCaseList() {
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
}
