import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Select from "react-select";
import Box from "@material-ui/core/Box";
import Tooltip from "@material-ui/core/Tooltip";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import FileSaver from "file-saver";
import XLSX from "xlsx";
import { makeStyles, withStyles } from "@material-ui/core/styles";
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
  helpIcon: {
    fontSize: 18,
    marginTop: "10px",
    marginRight: "10px",
    color: "#0292FF",
  },
  helpText: {
    padding: "10px",
    textShadow: "0 0 20px white",
  },
}));

const DownloadTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    color: "#000000",
    border: "1px solid #dadde9",
    maxWidth: "420px",
    fontSize: 15,
  },
}))(Tooltip);

const options = [
  { value: "All", label: "All" },
  { value: "Functional Assay", label: "Functional Assay" },
  { value: "High Res HLA", label: "High Res HLA" },
  { value: "Immunophenotyping", label: "Immunophenotyping" },
  { value: "Genetic", label: "Genetics" },
  { value: "SNPs-genes", label: "SNPs-genes" },
];

function ExportSpreadsheet(props) {
  const classes = useStyles();

  const helpText = (
    <React.Fragment>
      <div className={classes.helpText}>
        Hint:
        <br />
        Download all cases data from search result into one .xlsx spreadsheet
        file.
        <br />
        Selecting "All" category from the dropbox gives the most summarized case
        data. You can download the specific category full data by selecting
        others.
      </div>
    </React.Fragment>
  );

  const [selectedDownloadType, setSelectedDownloadType] = useState({
    value: "All",
    label: "All",
  });

  function filterJSON(
    raw,
    donorTypesMap,
    causeOfDeathMap,
    emiMap,
    immunMap,
    geneticMap
  ) {
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
      "electron_microscopy",
      "immunophenotyping",
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
    const allowedColumns4 = ["case_id"];
    const allowedColumns5 = ["case_id"];
    const allowedColumns6 = [];
    var newData = [];
    raw.forEach((donor) => {
      const filteredDonor = Object.keys(donor)
        .filter((key) => {
          if (selectedDownloadType.value === "High Res HLA") {
            return allowedColumns2.includes(key);
          } else if (selectedDownloadType.value === "Functional Assay") {
            return allowedColumns3.includes(key);
          } else if (selectedDownloadType.value === "Immunophenotyping") {
            return allowedColumns4.includes(key);
          } else if (selectedDownloadType.value === "Genetic") {
            return allowedColumns5.includes(key);
          } else if (selectedDownloadType.value === "SNPs-genes") {
            return allowedColumns6.includes(key);
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

      if (selectedDownloadType.value === "All") {
        filteredDonor["electron_microscopy"] = emiMap[donor["case_id"]]
          ? "Yes"
          : "No";
        filteredDonor["immunophenotyping"] = immunMap[donor["case_id"]]
          ? "Yes"
          : "No";
      }
      newData.push(filteredDonor);
    });

    if (selectedDownloadType.value === "Immunophenotyping") {
      var immunData = [];
      newData.forEach((nData) => {
        var theCaseId = nData.case_id;
        if (theCaseId in props.immunMap) {
          Object.keys(props.immunMap[theCaseId]).forEach((sampleType) => {
            var immunObj = {};
            immunObj["case_id"] = nData.case_id;
            immunObj["sample_type"] = sampleType;
            var immunObjMap = props.immunMap[nData.case_id][sampleType];
            Object.keys(immunObjMap).forEach((attr) => {
              immunObj[attr] = immunObjMap[attr];
              if (attr === "acquisition_date") {
                immunObj[attr] = immunObj[attr].slice(0, 10);
              }
            });
            immunData.push(immunObj);
          });
        }
      });
      newData = immunData;
    }

    if (selectedDownloadType.value === "Genetic") {
      let geneticData = [];
      newData.forEach((nData) => {
        let theCaseId = nData.case_id;
        if (theCaseId in props.geneticMap) {
          let geneticObj = {};
          geneticObj["case_id"] = theCaseId;
          Object.keys(props.geneticMap[theCaseId]).forEach(
            (geneticAttrName) => {
              let geneticAttrValue =
                props.geneticMap[theCaseId][geneticAttrName];
              geneticObj[geneticAttrName] = geneticAttrValue;
              if (
                geneticAttrName === "GRS1_SNPs" ||
                geneticAttrName === "GRS2_SNPs" ||
                geneticAttrName === "AA_GRS_SNPs"
              ) {
                if (geneticAttrValue) {
                  const snpsArr = geneticAttrValue.split(";");
                  snpsArr.forEach((snpStr) => {
                    const snpKey = snpStr.split(":")[0] ?? "Not Available";
                    const snpValue = snpStr.split(":")[1] ?? "Not Available";
                    geneticObj[snpKey] = snpValue;
                  });
                }
              }
            }
          );
          geneticData.push(geneticObj);
        }
      });
      newData = geneticData;
    }

    if (selectedDownloadType.value === "SNPs-genes") {
      let SNPData = [];
      if (props.SNP) {
        Object.keys(props.SNP).forEach((snp_id) => {
          let SNPObj = props.SNP[snp_id];
          let tempObj = { SNP_id: snp_id };
          for (let key in SNPObj) {
            tempObj[key] = SNPObj[key];
          }
          console.log("SNP obj", tempObj);
          SNPData.push(tempObj);
        });
        newData = SNPData;
      }
    }

    return newData;
  }

  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const fileName = selectedDownloadType.value + "-" + props.fileName;

  const exportToCSV = (csvData, fileName) => {
    // workbook sheet
    const ws = XLSX.utils.json_to_sheet(
      filterJSON(
        csvData,
        props.donorTypesMap,
        props.causeOfDeathMap,
        props.emiMap,
        props.immunMap,
        props.geneticMap
      )
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
          <DownloadTooltip title={helpText} placement="left-start">
            <HelpOutlineIcon className={classes.helpIcon} />
          </DownloadTooltip>
        </Box>
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
    emiMap: state.explore.emiMap,
    hlaMap: state.explore.hlaMap,
    immunMap: state.explore.immunMap,
    geneticMap: state.explore.geneticMap,
    SNP: state.explore.SNP,
  };
};

export default connect(mapStateToProps, null)(ExportSpreadsheet);
