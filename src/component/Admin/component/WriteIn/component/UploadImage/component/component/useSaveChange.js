import React, { useState, useEffect } from "react";
import { Storage } from "aws-amplify";

export default function useSaveChange(
  filesToAdd,
  filesToRemove,
  removeFolder,
  setRemoveFolder,
  caseId,
  selectedFolder,
  saveButtonClicked,
  setUploadProgress,
  setCurrUploadFile,
  setUpdateError,
  setUpdateSuccess,
  handleReset
) {
  useEffect(() => {
    if (filesToAdd !== null && filesToAdd.length !== 0) {
      addFiles(filesToAdd, caseId, selectedFolder);
    }
    if (filesToRemove !== null && filesToRemove.length !== 0) {
      removeFiles(filesToRemove);
    }
    if (selectedFolder !== null && removeFolder === true) {
      console.log("folder is going be removed.");
      removeWholeFolder(selectedFolder, caseId);
    }
    handleReset();
  }, [saveButtonClicked]);

  async function addFiles(fileList, case_id, folder) {
    const nowTime = new Date().toLocaleString().replace(",", "");
    for (const file of fileList) {
      try {
        setCurrUploadFile(file.name);
        const filePath = "public/cases/" + case_id + "/" + folder + "/";
        await Storage.put(file.name, file, {
          level: "public",
          contentType: "image/*",
          customPrefix: {
            public: filePath,
          },
          progressCallback: (progress) => {
            console.log(`Uploaded: ${progress.loaded}/${progress.total}`);
            setUploadProgress((progress.loaded / progress.total) * 100);
          },
          completeCallback: (event) => {
            console.log(`Successfully uploaded ${event.key}`);
            setUploadProgress(0);
          },
        }).then((result) => {
          console.log("Upload file result: ", result);
          setCurrUploadFile(null);
          setUploadProgress(0);
        });
      } catch (error) {
        console.log("Error uploading file: ", error);
        setUpdateError(
          `S3 Upload File "${file.name}" Finish time: " + ${nowTime}, Error: `,
          error
        );
      }
      setUpdateSuccess("All uploadings are done! Finish time: " + nowTime);
    }
  }

  async function removeFiles(filesList) {
    const nowTime = new Date().toLocaleString().replace(",", "");
    for (const file of filesList) {
      try {
        await Storage.remove(file).then((result) => {
          console.log("Successfully removed file " + file);
          setUpdateSuccess("All removings are done! Finish time: " + nowTime);
        });
      } catch (error) {
        console.log("Error removing file: ", error);
        setUpdateError(
          `S3 Remove File "${file}" Finish time: " + ${nowTime}, Error: `,
          error
        );
      }
    }
  }

  async function removeWholeFolder(selectedFolder, case_id) {
    const folderPath = "cases/" + case_id + "/" + selectedFolder;
    const nowTime = new Date().toLocaleString().replace(",", "");
    try {
      await Storage.list(folderPath).then((response) =>
        response.forEach((file) => {
          console.log(`File ${file.key} is going to be removed`, file);
          Storage.remove(file.key).then((res) => {
            console.log(`File ${file.key} is removed successfully`);
          });
        })
      );
      setUpdateSuccess(
        `Case ${case_id} folder ${selectedFolder} and all files in it are removed successfully`
      );
    } catch (error) {
      console.log(
        `Error happened in removing Case ${case_id} folder ${selectedFolder}`,
        error
      );
      setUpdateError(
        `Error happened in removing Case ${case_id} folder ${selectedFolder}`,
        error
      );
    }
    setRemoveFolder(false);
  }
}
