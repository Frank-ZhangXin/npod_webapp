import React, { useState, useEffect } from "react";
import { API, Auth } from "aws-amplify";

export default function useRetrieveDatasetsByAuthor(
  author,
  setDatasetObj,
  setDatasetRetrieveSuccess,
  setDatasetRetrieveFail
) {
  useEffect(() => {
    if (author !== null) {
      getDatasetsByAuthor(author);
    }
  }, [author]);

  async function getDatasetsByAuthor(theAuthor) {
    const nowTime = new Date().toLocaleString().replace(",", "");
    console.log("Retrieving datasets...");
    return await API.get("dbapi", "/db/datasets_by_author", {
      queryStringParameters: {
        author: theAuthor,
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
