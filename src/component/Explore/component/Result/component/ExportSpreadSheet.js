import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Select from "react-select";
import Box from "@material-ui/core/Box";
import FileSaver from "file-saver";
import XLSX from "xlsx";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: "16vw",
  },
  button: {
    marginBottom: theme.spacing(2),
    marginLeft: "1vw",
  },
  multiSelect: {
    minWidth: "10vw",
  },
}));

const options = [
  { value: "All", label: "All" },
  { value: "Functional Assay", label: "Functional Assay" },
  { value: "High Res HLA", label: "High Res HLA" },
];

function ExportSpreadsheet(props) {
  const classes = useStyles();
  const [selectedDownloadType, setSelectedDownloadType] = useState({
    value: "All",
    label: "All",
  });

  function filterJSON(raw, donorTypesMap, causeOfDeathMap) {
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
    const allowedColumns2 = [
      "case_id",
      "donor_type_id",
      "diabetes_hx_years",
      "age_years",
      "gestational_age_weeks",
      "sex",
      "race_ethinicity",
      "A_1",
      "A_2",
      "B_1",
      "B_2",
      "C_1",
      "C_2",
      "DRB1_1",
      "DRB1_2",
      "DQA1_1",
      "DQA1_2",
      "DQB1_1",
      "DQB1_2",
      "DPA1_1",
      "DPA1_2",
      "DPB1_1",
      "DPB1_2",
    ];
    const allowedColumns3 = [
      "case_id",
      "donor_type_id",
      "diabetes_hx_years",
      "age_years",
      "gestational_age_weeks",
      "sex",
      "race_ethinicity",
      "glucose_insulin",
      "KCL_insulin",
    ];
    var newData = [];
    raw.forEach((donor) => {
      const filteredDonor = Object.keys(donor)
        .filter((key) => {
          if (selectedDownloadType.value === "High Res HLA") {
            return allowedColumns2.includes(key);
          } else if (selectedDownloadType.value === "Functional Assay") {
            return allowedColumns3.includes(key);
          } else {
            return allowedColumns.includes(key);
          }
        })
        .reduce((obj, key) => {
          if (key === "donor_type_id") {
            obj["donor_type"] = donorTypesMap[donor["donor_type_id"]];
          } else if (key === "cause_of_death_id") {
            obj["cause_of_death"] = causeOfDeathMap[donor["cause_of_death_id"]];
          } else if (key === "glucose_insulin") {
            obj["16.7mM Glucose Stimulation"] = donor["glucose_insulin"];
          } else if (key === "KCL_insulin") {
            obj["High KCl Stimulation"] = donor["KCL_insulin"];
          } else {
            obj[key] = donor[key];
          }
          return obj;
        }, {});
      newData.push(filteredDonor);
    });
    return newData;
  }

  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";
  const csvData = props.csvData;
  const fileName = props.fileName;
  const exportToCSV = (csvData, fileName) => {
    // workbook sheet
    const ws = XLSX.utils.json_to_sheet(
      filterJSON(csvData, props.donorTypesMap, props.causeOfDeathMap)
    );
    // workbook
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <div className={classes.root}>
      <Box display="flex" justifyContent="space-between">
        <Box>
          <Select
            className={classes.multiSelect}
            value={props.selectedDownloadType}
            onChange={(value) => setSelectedDownloadType(value)}
            options={options}
            placeholder="All by default"
            //isMulti
            closeMenuOnSelect={true}
            //isDisabled={!props.donorTypeEnable}
          />
        </Box>
        <Box>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={(e) => exportToCSV(props.csvData, fileName)}
          >
            Download
          </Button>
        </Box>
      </Box>
    </div>
  );
}

// Subscribe
const mapStateToProps = (state, ownProps) => {
  return {
    donorTypesMap: state.explore.donorTypesMap,
    causeOfDeathMap: state.explore.causeOfDeathMap,
    hlaMap: state.explore.hlaMap,
  };
};

export default connect(mapStateToProps, null)(ExportSpreadsheet);
