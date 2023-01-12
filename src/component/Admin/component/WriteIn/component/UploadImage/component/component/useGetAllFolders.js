import React, { useState, useEffect } from "react";
import { Storage } from "aws-amplify";

export default function useGetAllFolders(caseId, setCurrCaseFolders) {
  useEffect(() => {
    getFolderList(caseId);
  }, [caseId]);

  async function getFolderList(caseId) {
    try {
      await Storage.list("cases/" + caseId).then((allFiles) => {
        if (allFiles.length !== 0) {
          let caseFolder = new Set();
          allFiles.forEach((file) => {
            let caseFolderName = file.key.split("/").slice(2, 3).join();
            if (caseFolderName.length !== 0) {
              caseFolder.add(caseFolderName);
            }
          });
          setCurrCaseFolders(
            Array.from(caseFolder).map((f) => {
              return { folderName: f };
            })
          );
        }
      });
    } catch (error) {
      console.error("[S3] Get case folder error", error);
    }
  }
}
