import React, { useEffect } from "react";
import { Storage } from "aws-amplify";

export default function useRetrieveDataFilePath(setDataFilePath, dataFileKey) {
  useEffect(() => {
    if (dataFileKey !== null) {
      getDataFilePath();
    }
  }, [dataFileKey]);

  async function getDataFilePath() {
    try {
      await Storage.get(dataFileKey).then((fileUrl) => {
        setDataFilePath(fileUrl);
      });
    } catch (error) {
      console.error("[S3] Get file error", error);
    }
  }
}
