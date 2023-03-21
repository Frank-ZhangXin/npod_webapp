import React, { useState, useEffect } from "react";
import { API, Auth, Storage } from "aws-amplify";

export default function useCreateDataset(
  values,
  submitButtonClicked,
  setDatasetCreateSuccess,
  setDatasetCreateFail,
  caseIdentifierData,
  exampleDataFile
) {
  const [latestDatasetId, setLatestDatasetId] = useState(null);
  useEffect(() => {
    if (values !== null && submitButtonClicked !== 0) {
      createDataset(values, caseIdentifierData.length);
    }
  }, [submitButtonClicked]);

  useEffect(() => {
    if (latestDatasetId !== null) {
      createCaseIdentifier(caseIdentifierData, latestDatasetId);
      if (exampleDataFile !== null) {
        createExampleDataFile(exampleDataFile, latestDatasetId);
      }
    }
  }, [latestDatasetId]);

  console.log("the latest dataset id", latestDatasetId);

  async function createDataset(allValues, uniqueCaseNum) {
    const nowTime = new Date().toISOString().slice(0, 19).replace("T", " ");
    console.log("Creating new dataset...");
    return await API.post("dbapi", "/db/create_dataset", {
      body: {
        datasetObj: {
          author: allValues.author,
          pi: allValues.pi,
          pi_email: allValues.piEmail,
          poc: allValues.poc,
          poc_email: allValues.pocEmail,
          dataset_name: allValues.datasetName,
          description: allValues.description,
          number_of_analyses: allValues.numberOfAnalyses,
          published: allValues.published,
          publication_link: allValues.publicationLink,
          pm_id: allValues.pmId,
          dataset_type: allValues.datasetType,
          raw_data_file_link: allValues.rawDataFileLink,
          number_of_unique_cases: uniqueCaseNum,
          created_time: nowTime,
          updated_time: nowTime,
        },
      },
    })
      .then((res) => {
        console.log("New Dataset create success!", res);
        try {
          setLatestDatasetId(res[1][0]["LAST_INSERT_ID()"]);
        } catch (err) {
          console.log("setting latest dataset ID error", err);
        }
        setDatasetCreateSuccess("New Dataset create success!");
        setDatasetCreateFail(null);
      })
      .catch((error) => {
        console.log("New Dataset Create fail", error);
        setDatasetCreateSuccess(null);
        setDatasetCreateFail("New Dataset Create fail" + error);
      });
  }

  async function createCaseIdentifier(caseIdObjList, currCaseId) {
    console.log("Creating new case identifier...");
    let dciObjList = [];
    for (let i = 0; i < caseIdObjList.length; i++) {
      let newObj = {};
      try {
        newObj["dataset_id"] = currCaseId;
        newObj["case_id"] = caseIdObjList[i]["Case_ID"];
        newObj["data_file_id"] = caseIdObjList[i]["Data_File_ID"];
        newObj["sample_type"] = caseIdObjList[i]["Sample_Type"];
        dciObjList.push(newObj);
      } catch (err) {
        console.log("[Error] Imported case identifier file", err);
        return;
      }
    }
    console.log("dciObjList waiting to post", dciObjList);
    return await API.post("dbapi", "/db/create_dataset_case_identifier", {
      body: {
        datasetCaseIdentifierObjList: dciObjList,
      },
    })
      .then((res) => {
        console.log("New case identifier create success!", res);
        setDatasetCreateSuccess("New case identifer create success!");
        setDatasetCreateFail(null);
      })
      .catch((error) => {
        console.log("New case identifer Create fail", error);
        setDatasetCreateSuccess(null);
        setDatasetCreateFail("New Dataset Create fail" + error);
      });
  }

  async function createExampleDataFile(theFile, theDatasetId) {
    try {
      const filePath = "public/datasets/" + theDatasetId + "/";
      await Storage.put(theFile.name, theFile, {
        level: "public",
        contentType: "text/csv",
        customPrefix: {
          public: filePath,
        },
      }).then((result) => {
        console.log("Upload file result:", result);
        setDatasetCreateSuccess(
          "Example data file has been successfully uploaded."
        );
        setDatasetCreateFail(null);
      });
    } catch (error) {
      console.log("Error uploading file when creating dataset", error);
      setDatasetCreateSuccess(null);
      setDatasetCreateFail("Error uploading file when creating dataset");
    }
  }
}
