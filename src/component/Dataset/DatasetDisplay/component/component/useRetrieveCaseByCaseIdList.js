import React, { useState, useEffect } from "react";
import { API, Auth } from "aws-amplify";

export default function useRetrieveCaseIdList(
  caseIdList,
  setRequestedCases,
  setRequestedCasesRetrieveSuccess,
  setRequestedCasesMapRetrieveFail
) {
  useEffect(() => {
    getCasesByCaseIdList(caseIdList);
  }, [caseIdList]);

  async function getCasesByCaseIdList(theCaseIdList) {
    const nowTime = new Date().toLocaleString().replace(",", "");
    console.log("Retrieving cases by case id list...");
    const cilString = theCaseIdList.toString();
    return await API.get("dbapi", "/db/case", {
      queryStringParameters: {
        caseIdList: cilString,
      },
    })
      .then((res) => {
        console.log("Retrieve cases by caseIdList success!", res);
        setRequestedCases(res);
        setRequestedCasesRetrieveSuccess(
          "Retrieve cases by caseIdList success!"
        );
        setRequestedCasesMapRetrieveFail(null);
      })
      .catch((error) => {
        console.log("Get cases by caseIdList fail", error);
        setRequestedCasesRetrieveSuccess(null);
        setRequestedCasesMapRetrieveFail("Get Donor Type Map fail" + error);
      });
  }
}
