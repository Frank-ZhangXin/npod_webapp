import React, { useState, useEffect } from "react";
import { API, Auth } from "aws-amplify";

export default function useRetrieveDonorTypeMap(
  setDonorTypeMap,
  setDonorTypeMapRetrieveSuccess,
  setDonorTypeMapRetrieveFail
) {
  useEffect(() => {
    getDonorTypeMap();
  }, []);

  async function getDonorTypeMap() {
    const nowTime = new Date().toLocaleString().replace(",", "");
    console.log("Retrieving Donor Type Map...");
    return await API.get("dbapi", "/db/donor_type")
      .then((res) => {
        console.log("Retrieve Donor Type Map success!", res);
        const dtMap = {};
        for (var i = 0, dType; i < res.length; i++) {
          dType = res[i];
          dtMap[dType.donor_type_id] = dType.name;
        }
        setDonorTypeMap(dtMap);
        setDonorTypeMapRetrieveSuccess("Retrieve Donor Type Map success!");
        setDonorTypeMapRetrieveFail(null);
      })
      .catch((error) => {
        console.log("Get Donor Type Map fail", error);
        setDonorTypeMapRetrieveSuccess(null);
        setDonorTypeMapRetrieveFail("Get Donor Type Map fail" + error);
      });
  }
}
