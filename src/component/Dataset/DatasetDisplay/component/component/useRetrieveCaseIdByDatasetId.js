import React, { useState, useEffect } from "react";
import { API, Auth } from "aws-amplify";

export default function useRetrieveCaseIdByDatasetId(
  datasetId,
  setCaseIdList,
  setCaseIdRetrieveSuccess,
  setCaseIdRetrieveFail
) {
  useEffect(() => {
    if (datasetId !== null) {
      getCaseIdByDatasetId(datasetId);
    }
  }, [datasetId]);

  async function getCaseIdByDatasetId(theDatasetId) {
    const nowTime = new Date().toLocaleString().replace(",", "");
    console.log("Retrieving caseId by datasetId...");
    return await API.get("dbapi", "/db/caseId_by_datasetId", {
      queryStringParameters: {
        dataset_id: theDatasetId,
      },
    })
      .then((res) => {
        console.log(
          "Retrieve the unique cases Ids of the dataset success!",
          res
        );
        let caseIdListTemp = [];
        res.forEach((element) => {
          caseIdListTemp.push(element.case_id);
        });
        setCaseIdList(caseIdListTemp);
        setCaseIdRetrieveSuccess(
          "Retrieve the unique cases Ids of the Dataset create success!"
        );
        setCaseIdRetrieveFail(null);
      })
      .catch((error) => {
        console.log("Get unique case Ids of the dataset fail", error);
        setCaseIdRetrieveSuccess(null);
        setCaseIdRetrieveFail(
          "Get unique case Ids of the dataset fail" + error
        );
      });
  }
}
