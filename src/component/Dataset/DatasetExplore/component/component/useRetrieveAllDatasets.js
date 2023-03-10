import React, { useState, useEffect } from "react";
import { API, Auth } from "aws-amplify";

export default function useRetrieveAllDatasets(
  setDatasetObj,
  setDatasetRetrieveSuccess,
  setDatasetRetrieveFail
) {
  useEffect(() => {
    getAllDatasets();
  }, []);

  async function getAllDatasets() {
    const nowTime = new Date().toLocaleString().replace(",", "");
    console.log("Retrieving all datasets...");
    return await API.get("dbapi", "/db/datasets", {})
      .then((res) => {
        console.log("Retrieve all dataset success!", res);
        setDatasetObj(res);
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
