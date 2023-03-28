import React, { useState, useEffect } from "react";

export default function usePreprocessCaseData(
  requestedCases,
  donorTypeMap,
  causeOfDeathMap,
  HLAMap,
  setDonorTypeChartData,
  setSexChartData,
  setRaceChartData,
  setFilteredRequestedCases
) {
  useEffect(() => {
    if (
      requestedCases.length !== 0 &&
      donorTypeMap !== null &&
      causeOfDeathMap !== null &&
      HLAMap !== null
    ) {
      let tempCases = hlaDataPreprocess(requestedCases, HLAMap);
      setFilteredRequestedCases(
        filterJSON(tempCases, donorTypeMap, causeOfDeathMap)
      );
    }

    if (requestedCases.length !== 0 && donorTypeMap !== null) {
      let donorTypeCount = {};
      for (let i = 0; i < requestedCases.length; i++) {
        const currDonorTypeId = requestedCases[i]["donor_type_id"];
        const currDonorType = donorTypeMap[currDonorTypeId];
        if (!donorTypeCount.hasOwnProperty(currDonorType)) {
          donorTypeCount[currDonorType] = 0;
        }
        donorTypeCount[currDonorType] += 1;
      }
      console.log("donor type count", donorTypeCount);
      chartDataGen(donorTypeCount, "donor type");
    }

    if (requestedCases.length !== 0) {
      let sexCount = {};
      for (let i = 0; i < requestedCases.length; i++) {
        const currSex = requestedCases[i]["sex"];
        if (!sexCount.hasOwnProperty(currSex)) {
          sexCount[currSex] = 0;
        }
        sexCount[currSex] += 1;
      }
      console.log("sex count map", sexCount);
      chartDataGen(sexCount, "sex");
    }

    if (requestedCases.length !== 0) {
      let raceCount = {};
      for (let i = 0; i < requestedCases.length; i++) {
        const currRace = requestedCases[i]["race_ethnicity"];
        if (!raceCount.hasOwnProperty(currRace)) {
          raceCount[currRace] = 0;
        }
        raceCount[currRace] += 1;
      }
      console.log("sex count map", raceCount);
      chartDataGen(raceCount, "race");
    }
  }, [requestedCases, donorTypeMap, causeOfDeathMap, HLAMap]);

  const chartDataGen = (chartObj, name) => {
    let tempChartData = [["Key", "Value"]];

    if (name === "donor type") {
      for (let [key, value] of Object.entries(chartObj)) {
        tempChartData.push([key, value]);
      }
      setDonorTypeChartData(tempChartData);
    } else if (name === "sex") {
      let tempChartData = [["Sex", "Percentage", { role: "style" }]];
      const sumValues = (obj) => Object.values(obj).reduce((a, b) => a + b, 0);
      let totcalCount = sumValues(chartObj);
      Object.keys(chartObj).forEach((item) => {
        chartObj[item] = (chartObj[item] * 100) / totcalCount;
      });
      // for (let [key, value] of Object.entries(chartObj)) {
      //   tempChartData.push([key, value]);
      // }
      tempChartData.push(["Male", chartObj["Male"], "#454545"]);
      tempChartData.push(["Female", chartObj["Female"], "#adadad"]);
      setSexChartData(tempChartData);
    } else if (name === "race") {
      for (let [key, value] of Object.entries(chartObj)) {
        tempChartData.push([key, value]);
      }
      setRaceChartData(tempChartData);
    }
  };

  function filterJSON(raw, dtMap, cODMap) {
    const allowedColumns = [
      "case_id",
      "RR_id",
      "donor_type_id",
      "donor_type_comments",
      "GADA_Result",
      "IA_2A_Result",
      "mIAA_Result",
      "ZnT8A_Result",
      "slices_shipping_status",
      "islet_isolation_status",
      "pancreas_weight_grams",
      "pancreas_weight_comments",
      "admission_course",
      "clinical_history",
      "downtime_minutes",
      "age_years",
      "gestational_age_weeks",
      "diabetes_hx_years",
      "sex",
      "race_ethnicity",
      "height_cm",
      "weight_kg",
      "BMI",
      "BMI_percentile",
      "HbA1c_percent",
      "C_peptide_ng_mL",
      "admission_glucose_mg_dL",
      "peak_glucose_mg_dL",
      "meds_diabetes",
      "meds_home",
      "meds_hospital",
      "infections",
      "allergies",
      "HLA_transplant",
      "serologies",
      "SARS_COV_2_results",
      "hemodiluted_status",
      "ABO_blood_type",
      "cause_of_death_id",
      "ICU_time_days",
      "transit_time_minutes",
      "case_recovery_type",
      "HLA_high_resolution",
      "histopathology",
      "RIN",
    ];
    var newData = [];
    console.log("donor type map", dtMap);
    console.log("cause of death map", cODMap);
    raw.forEach((donor) => {
      const filteredDonor = Object.keys(donor)
        .filter((key) => {
          return allowedColumns.includes(key);
        })
        .reduce((obj, key) => {
          if (key === "donor_type_id") {
            obj["donor_type"] = dtMap[donor["donor_type_id"]];
          } else if (key === "cause_of_death_id") {
            obj["cause_of_death"] = cODMap[donor["cause_of_death_id"]];
          } else {
            obj[key] = donor[key];
          }

          return obj;
        }, {});

      newData.push(filteredDonor);
    });
    return newData;
  }

  function hlaDataPreprocess(rawData, hlaMap) {
    const tempData = rawData;
    for (const row in tempData) {
      const thisCase = tempData[row];
      for (const col in thisCase) {
        if (col === "case_id") {
          const thisCaseId = thisCase[col];
          const HLA_transplant = null;
          const HLA_high_resolution = null;
          const thisHLA = hlaMap[thisCaseId];
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
    return tempData;
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
}
