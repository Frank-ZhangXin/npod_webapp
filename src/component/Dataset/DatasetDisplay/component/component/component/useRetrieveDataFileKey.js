import React, { useEffect } from "react";
import { Storage } from "aws-amplify";

export default function useRetrieveDataFileKey(setDataFileKey, datasetId) {
  useEffect(() => {
    getDataFileKey();
  }, []);

  async function getDataFileKey() {
    try {
      await Storage.list(`datasets/${datasetId}/`).then((fileKeyList) => {
        console.log("file list", fileKeyList);
        if (fileKeyList.length >= 1) {
          for (let i = 0; i < fileKeyList.length; i++) {
            if (fileKeyList[i].size) {
              setDataFileKey(fileKeyList[i].key);
              break;
            }
          }
        }
      });
    } catch (error) {
      console.error("[S3] Get file error", error);
    }
  }
}
