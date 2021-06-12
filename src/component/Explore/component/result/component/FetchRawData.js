import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { API, Auth } from "aws-amplify";

function FetchRawData(props) {
  useEffect(() => {
    checkAuth();
    fetchCase();
    fetchDonorType();
    fetchCauseOfDeath();
    fetchHLA();
    //console.log("fetch data was called.");
  }, []);

  async function checkAuth() {
    try {
      const authRes = await Auth.currentAuthenticatedUser();
      console.log("auth result: ", authRes);
      props.setSignedIn(true);
    } catch (error) {
      props.setSignedIn(false);
    }
  }

  // fetch case Raw data
  async function fetchCase() {
    return await API.get("dbapi", "/db/case")
      .then((res) => {
        props.setRawData(res);
      })
      .catch((error) => console.log("Amplify API call error", error));
  }

  // fetch donor type and save as map
  async function fetchDonorType() {
    return await API.get("dbapi", "/db/donor_type")
      .then((res) => {
        // donor types map
        const dtMap = {};
        for (var i = 0, dType; i < res.length; i++) {
          dType = res[i];
          dtMap[dType.donor_type_id] = dType.name;
        }
        props.setDonorTypesMap(dtMap);
      })
      .catch((error) => console.log("Amplify API call error", error));
  }

  // fetch cause of death and save as map
  async function fetchCauseOfDeath() {
    return await API.get("dbapi", "/db/cause_of_death")
      .then((res) => {
        // cause of death map
        const cODMap = {};
        for (var i = 0, causeOfDeath; i < res.length; i++) {
          causeOfDeath = res[i];
          cODMap[causeOfDeath.cause_of_death_id] = causeOfDeath.description;
        }
        props.setCauseOfDeathMap(cODMap);
      })
      .catch((error) => console.log("Amplify API call error", error));
  }

  // fetch HLA and save as map
  async function fetchHLA() {
    return await API.get("dbapi", "/db/hla")
      .then((res) => {
        // hla
        props.setHLA(res);
        // HLAMap is dictionary, key is case_id, value is dictionary of all HLA value pairs.
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
          HLAMap[tempKey] = JSON.parse(JSON.stringify(tempMap)); // Deep copy
        }
        props.setHLAMap(HLAMap);
      })
      .catch((error) => console.log("Amplify API call error", error));
  }

  return <div></div>;
}

// Subscribe
const mapStateToProps = (state) => {
  return {
    signedIn: state.auth.signedIn,
    rawData: state.explore.rawData,
  };
};

// update
const mapDispatchToProps = (dispatch) => {
  return {
    setSignedIn: (newSignedIn) =>
      dispatch({ type: "SET_SIGNEDIN", value: newSignedIn }),
    setRawData: (newRawData) =>
      dispatch({ type: "SET_RAW_DATA", value: newRawData }),
    setDonorTypesMap: (newDonorTypes) =>
      dispatch({ type: "SET_DONOR_TYPES_MAP", value: newDonorTypes }),
    setCauseOfDeathMap: (newCauseOfDeath) =>
      dispatch({ type: "SET_CAUSE_OF_DEATH_MAP", value: newCauseOfDeath }),
    setHLA: (newHLA) => dispatch({ type: "SET_HLA", value: newHLA }),
    setHLAMap: (newHLAMap) =>
      dispatch({ type: "SET_HLA_MAP", value: newHLAMap }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FetchRawData);
