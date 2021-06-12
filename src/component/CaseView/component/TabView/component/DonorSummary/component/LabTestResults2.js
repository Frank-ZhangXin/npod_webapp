import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  title: {
    paddingBottom: theme.spacing(2),
  },
  container: {
    maxHeight: "65vh",
  },
  table: {
    paddingBottom: theme.spacing(2),
    //minWidth: 650,
  },
}));

function LabTestResults2(props) {
  const classes = useStyles();

  function createData(name, value) {
    return { name, value };
  }

  const rows = [
    createData(
      "AAB Positive Number",
      props.currentCase.AABtally === null
        ? "Unavailable"
        : props.currentCase.AABtally
    ),
    createData(
      "GADA",
      props.currentCase.GADA_Result === null
        ? "Unavailable"
        : props.currentCase.GADA_Result
    ),
    createData(
      "IA2A",
      props.currentCase.IA_2A_Result === null
        ? "Unavailable"
        : props.currentCase.IA_2A_Result
    ),
    createData(
      "mIAA",
      props.currentCase.mIAA_Result === null
        ? "Unavailable"
        : props.currentCase.mIAA_Result
    ),
    createData(
      "ZnT8A",
      props.currentCase.ZnT8A_Result === null
        ? "Unavailable"
        : props.currentCase.ZnT8A_Result
    ),
    createData("Race/Ethnicity", props.currentCase.race_ethnicity),
    createData(
      "C-PEPTIDE (ng/mL)",
      props.currentCase.C_peptide_ng_mL === null
        ? "Unavailable"
        : props.currentCase.C_peptide_ng_mL
    ),
    createData(
      "HbA1C Hospital (%)",
      props.currentCase.HbA1c_percent === null
        ? "Unavailable"
        : props.currentCase.HbA1c_percent
    ),
    createData(
      "HbA1C Lab (%)",
      props.currentCase.BMI === null ? "Unavailable" : props.currentCase.BMI
    ),
    createData(
      "Serologies",
      props.currentCase.serologies === null
        ? "Unavailable"
        : props.currentCase.serologies
    ),
    createData(
      "Total Pancrea Weight (g)",
      props.currentCase.pancreas_weight_grams === null
        ? "Unavailable"
        : props.currentCase.pancreas_weight_grams
    ),
    createData(
      "Pancrea Head (g)",
      props.currentCase.pancreas_head_grams === null
        ? "Unavailable"
        : props.currentCase.pancreas_head_grams
    ),
    createData(
      "Pancrea Body (g)",
      props.currentCase.pancreas_body_grams === null
        ? "Unavailable"
        : props.currentCase.pancreas_body_grams
    ),
    createData(
      "Pancrea Tail (g)",
      props.currentCase.pancreas_tail_grams === null
        ? "Unavailable"
        : props.currentCase.pancreas_tail_grams
    ),
  ];

  return (
    <div>
      <div>
        <Typography variant="h5" className={classes.title}>
          LAB RESULTS
        </Typography>
      </div>
      <div>
        <TableContainer component={Paper} className={classes.container}>
          <Table className={classes.table} size="small" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Value</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

// Subscribe
const mapStateToProps = (state) => {
  return {
    // Filtered Data
    currentCase: state.explore.currentCase,
  };
};

export default connect(mapStateToProps, null)(LabTestResults2);
