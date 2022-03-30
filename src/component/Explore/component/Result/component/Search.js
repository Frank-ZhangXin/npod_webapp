import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import ExportSpreadsheet from "./ExportSpreadSheet";
import { usePromiseTracker } from "react-promise-tracker";
import { HashLoader } from "react-spinners";

const useStyles = makeStyles((theme) => ({
  paper: {
    textAlign: "center",
    minHeight: "31px",
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
      cursor: "pointer",
    },
    numberOfResult: {
      marginBottom: theme.spacing(2),
    },
  },
  result_container: {
    position: "relative",
  },
  result_title: {
    // position: "fixed",
    // paddingTop: "5px",
    // backgroundColor: "#ffffff",
  },
  result: {
    // position: "fixed",
    // top: 0,
    paddingTop: "5px",
    paddingLeft: "3px",
    paddingRight: "5px",
    paddingBottom: "3px",
    maxHeight: "85vh",
    overflow: "auto",
    overflowX: "hidden",
  },
  progress: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    alignItems: "center",
  },
}));

function Search(props) {
  const classes = useStyles();
  const { promiseInProgress } = usePromiseTracker();
  const [filteredData, setFilteredData] = useState([]);

  const handleOpen = (e, donorCase) => {
    props.setCurrentCase(donorCase);
    props.setDialogue(true);
  };

  useEffect(() => {
    setFilteredData(filtering());
  }, [props]);

  const filtering = () =>
    props.rawData
      // const filteredData = testData
      .filter((donor) => donor.is_public === 1)
      // Case ID
      .filter((donor) => {
        if (props.selectedCaseId.length > 0 && props.caseIDEnable) {
          if (
            props.selectedCaseId
              .map((obj) => obj.value)
              .indexOf(donor.case_id) > -1
          ) {
            return true;
          } else {
            return false;
          }
        } else {
          return true;
        }
      })
      // Donor type
      .filter((donor) => {
        if (
          donor.donor_type_id !== null &&
          props.selectedDonorType.length > 0 &&
          props.donorTypeEnable
        ) {
          const typeName = props.donorTypesMap[donor.donor_type_id];
          if (
            props.selectedDonorType.map((obj) => obj.value).indexOf(typeName) >
            -1
          ) {
            return true;
          } else {
            return false;
          }
        }
        return true;
      })
      // Age
      .filter(
        (donor) =>
          (donor.age_years !== null &&
            donor.age_years >= props.ageMin &&
            donor.age_years <= props.ageMax) ||
          props.ageEnable === false
      )
      // Age Onset
      .filter(
        (donor) =>
          (donor.age_onset_years !== null &&
            donor.age_onset_years >= props.ageOnsetMin &&
            donor.age_onset_years <= props.ageOnsetMax) ||
          props.ageOnsetEnable === false
      )
      // Gender
      .filter(
        (donor) =>
          (donor.sex !== null &&
            ((donor.sex === "Female" && props.femaleChecked) ||
              (donor.sex != null &&
                donor.sex === "Male" &&
                props.maleChecked))) ||
          props.genderEnable === false
      )
      // Race
      .filter((donor) => {
        if (props.selectedRace.length > 0 && props.raceEnable) {
          if (donor.race_ethnicity !== null) {
            if (
              props.selectedRace
                .map((obj) => obj.value)
                .indexOf(donor.race_ethnicity) > -1
            ) {
              return true;
            } else {
              return false;
            }
          } else {
            return false;
          }
        }
        return true;
      })
      // BMI
      .filter(
        (donor) =>
          (donor.BMI !== null &&
            donor.BMI >= props.bmiMin &&
            donor.BMI <= props.bmiMax) ||
          props.bmiEnable === false
      )
      // C-Peptide
      .filter((donor) => {
        const cPeptide = donor.C_peptide_ng_mL;
        if (props.cPeptideEnable === false) {
          return true;
        } else if (cPeptide !== null) {
          if (cPeptide.slice(0, 1) === "<" && props.cPeptideNegative === true) {
            return true;
          } else if (
            Number(cPeptide) < 0.02 &&
            props.cPeptideNegative === true
          ) {
            return true;
          } else if (
            Number(cPeptide) >= 0.02 &&
            props.cPeptidePositive === true
          ) {
            return true;
          }
        }
        return false;
      })
      // Duration of Diabetes
      .filter((donor) => {
        if (props.DDEnable === false) {
          return true;
          // Donor type specified
        } else if (
          donor.donor_type_id !== null &&
          props.selectedDonorType.length > 0
        ) {
          const typeName = props.donorTypesMap[donor.donor_type_id];
          // Diabetes cases
          if (
            typeName.includes("Diabetes") &&
            !typeName.includes("No Diabetes")
          ) {
            return (
              donor.diabetes_hx_years !== null &&
              donor.diabetes_hx_years >= props.DDMin &&
              donor.diabetes_hx_years <= props.DDMax
            );
          } else {
            return true;
          }
          // Donor type not specified
        } else {
          return (
            donor.diabetes_hx_years !== null &&
            donor.diabetes_hx_years >= props.DDMin &&
            donor.diabetes_hx_years <= props.DDMax
          );
        }
      })
      // Hb1A1c
      .filter(
        (donor) =>
          (donor.HbA1c_percent !== null &&
            donor.HbA1c_percent >= props.hMin &&
            donor.HbA1c_percent <= props.hMax) ||
          props.hEnable === false
      )
      // AutoAntibody
      .filter(
        (donor) =>
          (((props.gadaP === true && donor.GADA_Result === "Positive") ||
            props.gadaP === false) &&
            ((props.ia2aP === true && donor.IA_2A_Result === "Positive") ||
              props.ia2aP === false) &&
            ((props.miaaP === true && donor.mIAA_Result === "Positive") ||
              props.miaaP === false) &&
            ((props.znt8aP === true && donor.ZnT8A_Result === "Positive") ||
              props.znt8aP === false)) ||
          props.aaEnable === false
      )
      // AutoAntibody number
      .filter(
        (donor) =>
          (props.zeroChecked === true && donor.AAbtally === 0) ||
          (props.oneChecked === true && donor.AAbtally === 1) ||
          (props.twoChecked === true && donor.AAbtally === 2) ||
          (props.threeChecked === true && donor.AAbtally === 3) ||
          (props.fourChecked === true && donor.AAbtally === 4) ||
          props.aaPositiveEnable === false
      )
      // Insulitis
      .filter(
        (donor) =>
          (props.insulitisPositiveChecked === true &&
            donor.histopathology !== null &&
            donor.histopathology.toLowerCase().indexOf("insulitis") !== -1) ||
          (props.insulitisNegativeChecked === true &&
            (donor.histopathology === null ||
              donor.histopathology.toLowerCase().indexOf("insulitis") ===
                -1)) ||
          props.insulitisEnable === false
      )
      // Dataset
      .filter(
        (donor) =>
          (props.functionalAssayChecked === true &&
            (donor.glucose_insulin || donor.KCL_insulin)) ||
          (props.electronMicroscopyChecked === true &&
            donor.electron_microscopy_images) ||
          (props.highResHLAChecked === true &&
            (donor.A_1 ||
              donor.A_2 ||
              donor.B_1 ||
              donor.B_2 ||
              donor.C_1 ||
              donor.C_2 ||
              donor.DRB1_1 ||
              donor.DRB1_2 ||
              donor.DQA1_1 ||
              donor.DQA1_2 ||
              donor.DQB1_1 ||
              donor.DQB1_2 ||
              donor.DPA1_1 ||
              donor.DPA1_2 ||
              donor.DPB1_1 ||
              donor.DPB1_2)) ||
          (props.immunophenotypingChecked === true && true) ||
          props.datasetEnable === false
      );
  console.log(filteredData);
  return (
    <div className={classes.result_container}>
      <div className={classes.result_title}>
        <div style={{ width: "100%" }}>
          <Box display="flex" justifyContent="space-between">
            <Box>
              <Typography variant="h4">SEARCH RESULT</Typography>
            </Box>
            <Box>
              <ExportSpreadsheet
                csvData={filteredData}
                fileName={
                  "nPOD_download_spreadsheet_" + Date().toLocaleString()
                }
              />
            </Box>
          </Box>
        </div>
        <div style={{ width: "100%" }}>
          <Box display="flex" justifyContent="flex-start">
            <Box mb={2}>
              {+(promiseInProgress === true) ? (
                <Typography variant="h6" color="secondary">
                  Loading data...
                </Typography>
              ) : (
                <Typography variant="h6" color="secondary">
                  {filteredData.length} cases are found
                </Typography>
              )}
            </Box>
          </Box>
        </div>
      </div>
      <div className={classes.result}>
        <Grid container spacing={1}>
          {filteredData.map((donorCase, index) => (
            <Grid item xs={12} sm={3} md={2} lg={1} xl={1} key={index}>
              <Paper
                elevation={3}
                onClick={(e) => handleOpen(e, donorCase)}
                className={classes.paper}
              >
                {donorCase.case_id.length <= 4 && (
                  <Typography variant="h6">{donorCase.case_id}</Typography>
                )}
                {donorCase.case_id.length > 4 && (
                  <Typography variant="subtitle1">
                    {donorCase.case_id}
                  </Typography>
                )}
              </Paper>
            </Grid>
          ))}
        </Grid>
      </div>
      <div className={classes.progress}>
        {+(promiseInProgress === true) ? (
          <HashLoader color="#4fc3f7" size={50} />
        ) : null}
      </div>
    </div>
  );
}

// Subscribe
const mapStateToProps = (state) => {
  return {
    // Age
    ageEnable: state.explore.ageEnable,
    ageRange: state.explore.ageRange,
    ageMin: state.explore.ageMin,
    ageMax: state.explore.ageMax,

    // Age Onset
    ageOnsetEnable: state.explore.ageOnsetEnable,
    ageOnsetRange: state.explore.ageOnsetRange,
    ageOnsetMin: state.explore.ageOnsetMin,
    ageOnsetMax: state.explore.ageOnsetMax,

    // Autoantibody type
    aaEnable: state.explore.aaEnable,
    gadaP: state.explore.gadaP,
    gadaN: state.explore.gadaN,
    ia2aP: state.explore.ia2aP,
    ia2aN: state.explore.ia2aN,
    miaaP: state.explore.miaaP,
    miaaN: state.explore.miaaN,
    znt8aP: state.explore.znt8aP,
    znt8aN: state.explore.znt8aN,

    // Antibody Positive
    aaPositiveEnable: state.explore.aaPositiveEnable,
    zeroChecked: state.explore.zeroChecked,
    oneChecked: state.explore.oneChecked,
    twoChecked: state.explore.twoChecked,
    threeChecked: state.explore.threeChecked,
    fourChecked: state.explore.fourChecked,

    // BMI
    bmiEnable: state.explore.bmiEnable,
    bmiRange: state.explore.bmiRange,
    bmiMin: state.explore.bmiMin,
    bmiMax: state.explore.bmiMax,

    // Diabetes Duration
    DDEnable: state.explore.DDEnable,
    DDRange: state.explore.DDRange,
    DDMin: state.explore.DDMin,
    DDMax: state.explore.DDMax,

    // Donor Type (object array)
    donorTypeEnable: state.explore.donorTypeEnable,
    selectedDonorType: state.explore.selectedDonorType,

    // Gender
    genderEnable: state.explore.genderEnable,
    maleChecked: state.explore.maleChecked,
    femaleChecked: state.explore.femaleChecked,

    // Hb1A1c
    hEnable: state.explore.hEnable,
    hRange: state.explore.hRange,
    hMin: state.explore.hMin,
    hMax: state.explore.hMax,

    // Insulitis
    insulitisEnable: state.explore.insulitisEnable,
    insulitisPositiveChecked: state.explore.insulitisPositiveChecked,
    insulitisNegativeChecked: state.explore.insulitisNegativeChecked,

    // Race
    raceEnable: state.explore.raceEnable,
    selectedRace: state.explore.selectedRace,

    // C-Peptide
    cPeptideEnable: state.explore.cPeptideEnable,
    cPeptidePositive: state.explore.cPeptidePositive,
    cPeptideNegative: state.explore.cPeptideNegative,

    // Raw Data
    rawData: state.explore.rawData,

    // Filtered Data
    filteredData: state.explore.filteredData,

    // Donor Types (map)
    donorTypesMap: state.explore.donorTypesMap,

    // Case Id
    caseIDEnable: state.explore.caseIDEnable,
    selectedCaseId: state.explore.selectedCaseId,

    // Dataset
    datasetEnable: state.explore.datasetEnable,
    functionalAssayChecked: state.explore.functionalAssayChecked,
    electronMicroscopyChecked: state.explore.electronMicroscopyChecked,
    highResHLAChecked: state.explore.highResHLAChecked,
    immunophenotypingChecked: state.explore.immunophenotypingChecked,
  };
};

// update
const mapDispatchToProps = (dispatch) => {
  return {
    setRawData: (newRawData) =>
      dispatch({ type: "SET_RAW_DATA", value: newRawData }),
    setFilteredData: (newFilteredData) =>
      dispatch({ type: "SET_FILTERED_DATA", value: newFilteredData }),
    setCurrentCase: (newCase) =>
      dispatch({ type: "SET_CURRENT_CASE", value: newCase }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
