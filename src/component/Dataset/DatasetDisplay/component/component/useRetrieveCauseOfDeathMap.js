import React, { useState, useEffect } from "react";
import { API, Auth } from "aws-amplify";

export default function useRetrieveCauseOfDeathMap(
  setCauseOfDeathMap,
  setCauseOfDeathMapRetrieveSuccess,
  setCauseOfDeathMapRetrieveFail
) {
  useEffect(() => {
    getCauseOfDeathMap();
  }, []);

  async function getCauseOfDeathMap() {
    const nowTime = new Date().toLocaleString().replace(",", "");
    console.log("Retrieving Cause of Death Map...");
    return await API.get("dbapi", "/db/cause_of_death")
      .then((res) => {
        console.log("Retrieve Cause of Death Map success!", res);
        const cODMap = {};
        for (var i = 0, causeOfDeath; i < res.length; i++) {
          causeOfDeath = res[i];
          cODMap[causeOfDeath.cause_of_death_id] = causeOfDeath.description;
        }
        setCauseOfDeathMap(cODMap);
        setCauseOfDeathMapRetrieveSuccess("Retrieve Donor Type Map success!");
        setCauseOfDeathMapRetrieveFail(null);
      })
      .catch((error) => {
        console.log("Get Cause of Death Map fail", error);
        setCauseOfDeathMapRetrieveSuccess(null);
        setCauseOfDeathMapRetrieveFail("Get Cause of Death Map fail" + error);
      });
  }
}
