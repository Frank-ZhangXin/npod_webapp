import { connect } from "react-redux";

function DataPreProcess(props) {
  const tempData = props.rawData;
  for (const row in tempData) {
    const thisCase = tempData[row];
    for (const col in thisCase) {
      if (col === "case_id") {
        const thisCaseId = thisCase[col];
        const HLA_transplant = null;
        const HLA_high_resolution = null;
        const thisHLA = props.hlaMap[thisCaseId];
        if (thisHLA) {
          // Transplant
          const thisAt = thisHLA["T_A_1"] + "/" + thisHLA["T_A_2"];
          const thisBt = thisHLA["T_B_1"] + "/" + thisHLA["T_B_2"];
          const thisDRt = thisHLA["T_DR_1"] + "/" + thisHLA["T_DR_2"];
          const thisDQBt = thisHLA["T_DQB_1"] + "/" + thisHLA["T_DQB_2"];
          thisCase["HLA_transplant"] =
            "A*" +
            thisAt +
            ", " +
            "B*" +
            thisBt +
            ", " +
            "DR*" +
            thisDRt +
            ", " +
            "DQB*" +
            thisDQBt;
          thisCase["HLA_T_A"] = thisAt;
          thisCase["HLA_T_B"] = thisBt;
          thisCase["HLA_T_DR"] = thisDRt;
          thisCase["HLA_T_DQB"] = thisDQBt;
          // High Resolution
          const thisA = highResHLAGenerator(thisHLA["A_1"], thisHLA["A_2"]);
          const thisB = highResHLAGenerator(thisHLA["B_1"], thisHLA["B_2"]);
          const thisC = highResHLAGenerator(thisHLA["C_1"], thisHLA["C_2"]);
          const thisDRB1 = highResHLAGenerator(
            thisHLA["DRB1_1"],
            thisHLA["DRB1_2"]
          );
          const thisDQA1 = highResHLAGenerator(
            thisHLA["DQA1_1"],
            thisHLA["DQA1_2"]
          );
          const thisDQB1 = highResHLAGenerator(
            thisHLA["DQB1_1"],
            thisHLA["DQB1_2"]
          );
          const thisDPA1 = highResHLAGenerator(
            thisHLA["DPA1_1"],
            thisHLA["DPA1_2"]
          );
          const thisDPB1 = highResHLAGenerator(
            thisHLA["DPB1_1"],
            thisHLA["DPB1_2"]
          );
          thisCase["HLA_high_resolution"] =
            "A*" +
            thisA +
            ", " +
            "B*" +
            thisB +
            ", " +
            "C*" +
            thisC +
            ", " +
            "DRB1*" +
            thisDRB1 +
            ", " +
            "DQA1*" +
            thisDQA1 +
            ", " +
            "DQB1*" +
            thisDQB1 +
            ", " +
            "DPA1*" +
            thisDPA1 +
            ", " +
            "DPB1*" +
            thisDPB1;
          thisCase["HLA_A"] = thisA;
          thisCase["HLA_B"] = thisB;
          thisCase["HLA_C"] = thisC;
          thisCase["HLA_DRB1"] = thisDRB1;
          thisCase["HLA_DQA1"] = thisDQA1;
          thisCase["HLA_DQB1"] = thisDQB1;
          thisCase["HLA_DPA1"] = thisDPA1;
          thisCase["HLA_DPB1"] = thisDPB1;
          thisCase["A_1"] =
            thisA.split(",")[0] === "null" ? null : thisA.split(",")[0];
          thisCase["A_2"] =
            thisA.split(",")[1] === "null" ? null : thisA.split(",")[1];
          thisCase["B_1"] =
            thisB.split(",")[0] === "null" ? null : thisB.split(",")[0];
          thisCase["B_2"] =
            thisB.split(",")[1] === "null" ? null : thisB.split(",")[1];
          thisCase["C_1"] =
            thisC.split(",")[0] === "null" ? null : thisC.split(",")[0];
          thisCase["C_2"] =
            thisC.split(",")[1] === "null" ? null : thisC.split(",")[1];
          thisCase["DRB1_1"] =
            thisDRB1.split(",")[0] === "null" ? null : thisDRB1.split(",")[0];
          thisCase["DRB1_2"] =
            thisDRB1.split(",")[1] === "null" ? null : thisDRB1.split(",")[1];
          thisCase["DQA1_1"] =
            thisDQA1.split(",")[0] === "null" ? null : thisDQA1.split(",")[0];
          thisCase["DQA1_2"] =
            thisDQA1.split(",")[1] === "null" ? null : thisDQA1.split(",")[1];
          thisCase["DQB1_1"] =
            thisDQB1.split(",")[0] === "null" ? null : thisDQB1.split(",")[0];
          thisCase["DQB1_2"] =
            thisDQB1.split(",")[1] === "null" ? null : thisDQB1.split(",")[1];
          thisCase["DPA1_1"] =
            thisDPA1.split(",")[0] === "null" ? null : thisDPA1.split(",")[0];
          thisCase["DPA1_2"] =
            thisDPA1.split(",")[1] === "null" ? null : thisDPA1.split(",")[1];
          thisCase["DPB1_1"] =
            thisDPB1.split(",")[0] === "null" ? null : thisDPB1.split(",")[0];
          thisCase["DPB1_2"] =
            thisDPB1.split(",")[1] === "null" ? null : thisDPB1.split(",")[1];
        } else {
          thisCase["HLA_transplant"] = null;
          thisCase["HLA_T_A"] = null;
          thisCase["HLA_T_B"] = null;
          thisCase["HLA_T_DR"] = null;
          thisCase["HLA_T_DQB"] = null;
          thisCase["HLA_A"] = null;
          thisCase["HLA_B"] = null;
          thisCase["HLA_C"] = null;
          thisCase["HLA_DRB1"] = null;
          thisCase["HLA_DQA1"] = null;
          thisCase["HLA_DQB1"] = null;
          thisCase["HLA_DPA1"] = null;
          thisCase["HLA_DPB1"] = null;
          thisCase["A_1"] = null;
          thisCase["A_2"] = null;
          thisCase["B_1"] = null;
          thisCase["B_2"] = null;
          thisCase["C_1"] = null;
          thisCase["C_2"] = null;
          thisCase["DRB1_1"] = null;
          thisCase["DRB1_2"] = null;
          thisCase["DQA1_1"] = null;
          thisCase["DQA1_2"] = null;
          thisCase["DQB1_1"] = null;
          thisCase["DQB1_2"] = null;
          thisCase["DPA1_1"] = null;
          thisCase["DPA1_2"] = null;
          thisCase["DPB1_1"] = null;
          thisCase["DPB1_2"] = null;
        }
      }
    }
    tempData[row] = thisCase;
  }
  props.setRawData(tempData);
  return <div></div>;
}

function highResHLAGenerator(lowVal, highVal) {
  if (lowVal && !lowVal.includes(":") && lowVal.length === 4) {
    lowVal = lowVal.substring(0, 2) + ":" + lowVal.substring(2, 4);
  }
  if (highVal && !highVal.includes(":") && highVal.length === 4) {
    highVal = highVal.substring(0, 2) + ":" + highVal.substring(2, 4);
  }
  return lowVal + "," + highVal;
}

// Subscribe
const mapStateToProps = (state) => {
  return {
    signedIn: state.auth.signedIn,
    rawData: state.explore.rawData,
    hlaMap: state.explore.hlaMap,
  };
};

// update
const mapDispatchToProps = (dispatch) => {
  return {
    setRawData: (newRawData) =>
      dispatch({ type: "SET_RAW_DATA", value: newRawData }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DataPreProcess);
