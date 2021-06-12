import React from "react";
import Button from "@material-ui/core/Button";
import FileSaver from "file-saver";
import XLSX from "xlsx";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  button: {
    marginBottom: theme.spacing(2),
  },
}));

function ExportSpreadsheet(props) {
  const classes = useStyles();

  function filterJSON(raw, donorTypesMap, causeOfDeathMap) {
    const allowedColumns = [
      "case_id",
      "RR_id",
      "donor_type_comments",
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
      "serologies",
      "SARS_COV_2_results",
      "hemodiluted_status",
      "ABO_blood_type",
      "case_recovery_type",
      "histopathology",
      "RIN_value",
      "donor_type_id",
      "cause_of_death_id",
      "GADA_Result",
      "IA_2A_Result",
      "mIAA_Result",
      "ZnT8A_Result",
    ];
    const extraColumns = ["donor_type_id", "cause_of_death_id"];
    const extraColumns2 = [
      "HLA_transplant",
      "ICU_time_days",
      "Transit_time_minutes",
      "HLA_high_resolution",
    ];
    var newData = [];
    console.log(donorTypesMap);
    raw.forEach((donor) => {
      const filtered = Object.keys(donor)
        .filter((key) => allowedColumns.includes(key))
        .reduce((obj, key) => {
          obj[key] = donor[key];
          if (key === "donor_type_id") {
            obj["donor_type"] = donorTypesMap[donor[key]];
          }
          if (key === "cause_of_death_id") {
            obj["cause_of_death"] = causeOfDeathMap[donor[key]];
          }
          // AutoAntibody Results
          var aabRes = "";
          if ("autoantibody_results" in obj) {
            aabRes = obj["autoantibody_results"];
          }
          if (key === "GADA_Result") {
            if (donor[key] === "Positive") {
              aabRes = aabRes + " " + "GADA: Positive;";
            } else if (donor[key] === "Negative") {
              aabRes = aabRes + " " + "GADA: Negative;";
            } else {
              aabRes = aabRes + " " + "GADA: Not tested;";
            }
          }
          if (key === "IA_2A_Result") {
            if (donor[key] === "Positive") {
              aabRes = aabRes + " " + "IA_2A: Positive;";
            } else if (donor[key] === "Negative") {
              aabRes = aabRes + " " + "IA_2A: Negative;";
            } else {
              aabRes = aabRes + " " + "IA_2A: Not tested;";
            }
          }
          if (key === "mIAA_Result") {
            if (donor[key] === "Positive") {
              aabRes = aabRes + " " + "mIAA: Positive;";
            } else if (donor[key] === "Negative") {
              aabRes = aabRes + " " + "mIAA: Negative;";
            } else {
              aabRes = aabRes + " " + "mIAA: Not tested;";
            }
          }
          if (key === "ZnT8A_Result") {
            if (donor[key] === "Positive") {
              aabRes = aabRes + " " + "ZnT8A: Positive;";
            } else if (donor[key] === "Negative") {
              aabRes = aabRes + " " + "ZnT8A: Negative;";
            } else {
              aabRes = aabRes + " " + "ZnT8A: Not tested;";
            }
          }
          obj["autoantibody_results"] = aabRes;
          return obj;
        }, {});
      newData.push(filtered);
    });
    console.log(newData);
    return newData;
  }

  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";
  const csvData = props.csvData;
  const fileName = props.fileName;
  const exportToCSV = (csvData, fileName) => {
    const ws = XLSX.utils.json_to_sheet(
      filterJSON(csvData, props.donorTypesMap, props.causeOfDeathMap)
    );
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };
  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={(e) => exportToCSV(props.csvData, fileName)}
      >
        Download All
      </Button>
    </div>
  );
}

// Subscribe
const mapStateToProps = (state, ownProps) => {
  return {
    donorTypesMap: state.explore.donorTypesMap,
    causeOfDeathMap: state.explore.causeOfDeathMap,
  };
};

export default connect(mapStateToProps, null)(ExportSpreadsheet);
