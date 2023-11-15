import React, { useState, useEffect } from "react";
import { Storage } from "aws-amplify";

export default function useDownloadFile(
  setCaseIdentifierExampleUrl,
  setDownloadSuccess,
  setDownloadError,
  downloadButtonClicked,
  handleButtonReset
) {
  useEffect(() => {
    if (downloadButtonClicked === true) {
      const fileKey = "documents/Case_Identifier_Example.csv";
      downloadFile(fileKey);
    }
  }, [downloadButtonClicked]);

  async function downloadFile(theFileKey) {
    const nowTime = new Date().toLocaleString().replace(",", "");
    try {
      await Storage.get(theFileKey, { expires: 60 }).then((url) => {
        setCaseIdentifierExampleUrl(url);
      });
      setDownloadSuccess("File download is successful");
    } catch (error) {
      setDownloadError("File download is failed", error);
    }
    handleButtonReset();
  }
}
