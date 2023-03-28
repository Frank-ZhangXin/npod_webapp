import React, { useState, useEffect } from "react";
import { API, Auth } from "aws-amplify";

export default function useRetrieveHLAMap(
  setHLAMap,
  setHLAMapRetrieveSuccess,
  setHLAMapRetrieveFail
) {
  useEffect(() => {
    getHLAMap();
  }, []);

  async function getHLAMap() {
    const nowTime = new Date().toLocaleString().replace(",", "");
    console.log("Retrieving HLA Map...");
    return await API.get("dbapi", "/db/hla")
      .then((res) => {
        console.log("Retrieve HLA Map success!", res);
        const HLAMap = {};
        for (var i = 0, tempData, tempKey, tempMap = {}; i < res.length; i++) {
          tempData = res[i];
          Object.keys(tempData).map((key) => {
            if (key === "case_id") {
              tempKey = tempData[key];
            } else {
              tempMap[key] = tempData[key];
            }
          });
          HLAMap[tempKey] = JSON.parse(JSON.stringify(tempMap));
        }
        setHLAMap(HLAMap);
        setHLAMapRetrieveSuccess("Retrieve HLA Map success!");
        setHLAMapRetrieveFail(null);
      })
      .catch((error) => {
        console.log("Get HLA Map fail", error);
        setHLAMapRetrieveSuccess(null);
        setHLAMapRetrieveFail("Get HLA Map fail" + error);
      });
  }
}
