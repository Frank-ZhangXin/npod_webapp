import React, { useState, useEffect } from "react";
import { API, Auth } from "aws-amplify";

export default function useRetrieveAllDatasets(
  setDatasetObj,
  setDatasetRetrieveSuccess,
  setDatasetRetrieveFail
) {
  useEffect(() => {
    const customizedCond = parseUrlParamsToApiCondObj();
    if (
      customizedCond.hasOwnProperty("value") &&
      Array.isArray(customizedCond.value) &&
      customizedCond.value.length !== 0
    ) {
      getDatasetsByConditions(customizedCond);
    } else {
      getAllDatasets();
    }
  }, []);

  function parseUrlParamsToApiCondObj() {
    let apiCondObj = { ...templateParentAndCondition };
    const url = new URL(window.location.href);
    const searchParameters = new URLSearchParams(url.search);
    for (const [name, value] of searchParameters.entries()) {
      const filterValueArr = JSON.parse(value);
      if (name === "type") {
        const typeFilterObj = JSON.parse(
          JSON.stringify(templateParentOrCondition)
        );
        filterValueArr.forEach((filterValue) => {
          if (filterValue === "other") {
            const currFilterObj = { ...templateChildNotInCondition };
            currFilterObj.name = "dataset_type";
            currFilterObj.value =
              "('genetics', 'transcriptomics', 'metabolomics', 'proteomics')";
            typeFilterObj.value.push(currFilterObj);
          } else {
            const currFilterObj = { ...templateChildEqualCondition };
            currFilterObj.name = "dataset_type";
            currFilterObj.value = filterValue;
            typeFilterObj.value.push(currFilterObj);
          }
        });
        apiCondObj.value.push(typeFilterObj);
      }
      if (name === "category") {
        const categoryFilterObj = JSON.parse(
          JSON.stringify(templateParentOrCondition)
        );
        filterValueArr.forEach((filterValue) => {
          const currFilterObj = { ...templateChildEqualCondition };
          currFilterObj.name = name;
          currFilterObj.value = filterValue;
          categoryFilterObj.value.push(currFilterObj);
        });
        apiCondObj.value.push(categoryFilterObj);
      }

      if (name === "published") {
        const publishedFilterObj = JSON.parse(
          JSON.stringify(templateParentOrCondition)
        );
        filterValueArr.forEach((filterValue) => {
          const currFilterObj = { ...templateChildEqualCondition };
          currFilterObj.name = name;
          currFilterObj.value = filterValue === "yes" ? "1" : "0";
          publishedFilterObj.value.push(currFilterObj);
        });
        apiCondObj.value.push(publishedFilterObj);
      }
    }
    console.log("api condition object", apiCondObj);
    return apiCondObj;
  }

  const templateParentAndCondition = {
    name: "LOGIC_CONNECT",
    operator: "AND",
    value: [],
  };

  const templateParentOrCondition = {
    name: "LOGIC_CONNECT",
    operator: "OR",
    value: [],
  };

  const templateChildEqualCondition = {
    name: "",
    operator: "=",
    value: null,
  };

  const templateChildNotInCondition = {
    name: "",
    operator: "NOT IN",
    value: "",
  };

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

  async function getDatasetsByConditions(theConditions) {
    const nowTime = new Date().toLocaleString().replace(",", "");
    console.log("Retrieving datasets by conditions...");
    return await API.put("dbapi", "/db/get_data_by_conditions", {
      body: {
        table_name: "dataset",
        conditions: theConditions,
      },
    })
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
