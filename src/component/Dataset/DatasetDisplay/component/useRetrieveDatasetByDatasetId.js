import React, { useState, useEffect } from "react";
import { API, Auth } from "aws-amplify";

export default function useRetrieveDatasetByDatasetId(
  datasetId,
  setDatasetObj,
  setDatasetRetrieveSuccess,
  setDatasetRetrieveFail,
  currUser,
  setCanEdit
) {
  useEffect(() => {
    if (datasetId !== null) {
      getDatasetByDatasetId(datasetId);
    }
  }, []);

  async function getDatasetByDatasetId(theDatasetId) {
    const nowTime = new Date().toLocaleString().replace(",", "");
    console.log("Retrieving dataset...");
    return await API.get("dbapi", "/db/dataset_by_datasetId", {
      queryStringParameters: {
        dataset_id: theDatasetId,
      },
    })
      .then((res) => {
        console.log("Retrieve the dataset success!", res[0]);
        setDatasetObj(res[0]);
        if (res[0].author === currUser) {
          setCanEdit(true);
        }
        setDatasetRetrieveSuccess("Retrieve Dataset create success!");
        setDatasetRetrieveFail(null);
      })
      .catch((error) => {
        console.log("New Dataset Create fail", error);
        setDatasetRetrieveSuccess(null);
        setDatasetRetrieveFail("Retrieve Dataset Create fail" + error);
      });
  }
}
