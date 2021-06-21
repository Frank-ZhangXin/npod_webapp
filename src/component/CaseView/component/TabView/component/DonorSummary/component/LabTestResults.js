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
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  title: {
    paddingBottom: theme.spacing(2),
  },
  title2: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(1),
  },
  container: {
    maxHeight: "60vh",
  },
  table: {
    paddingBottom: theme.spacing(2),
    //minWidth: 650,
  },
  note: {
    maxHeight: "15vh",
    overflow: "auto",
  },
  noteText: {
    padding: "10px",
  },
}));

function LabTestResults(props) {
  const classes = useStyles();

  const donorType = props.donorTypesMap[props.currentCase.donor_type_id];
  const showNote =
    donorType === "Type 1 Diabetes" &&
    props.currentCase.mIAA_Result === "Positive";

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
    createData(
      "C-PEPTIDE (ng/mL)",
      props.currentCase.C_peptide_ng_mL === null
        ? "Unavailable"
        : props.currentCase.C_peptide_ng_mL
    ),
    createData(
      "HbA1C (%)",
      props.currentCase.HbA1c_percent === null
        ? "Unavailable"
        : props.currentCase.HbA1c_percent
    ),
    createData(
      "Serologies",
      props.currentCase.serologies === null
        ? "Unavailable"
        : props.currentCase.serologies
    ),
    createData(
      "Total Pancreas Weight (g)",
      props.currentCase.pancreas_weight_grams === null
        ? "Unavailable"
        : props.currentCase.pancreas_weight_grams
    ),
    createData(
      "Pancreas Head (g)",
      props.currentCase.pancreas_head_grams === null
        ? "Unavailable"
        : props.currentCase.pancreas_head_grams
    ),
    createData(
      "Pancreas Body (g)",
      props.currentCase.pancreas_body_grams === null
        ? "Unavailable"
        : props.currentCase.pancreas_body_grams
    ),
    createData(
      "Pancreas Tail (g)",
      props.currentCase.pancreas_tail_grams === null
        ? "Unavailable"
        : props.currentCase.pancreas_tail_grams
    ),
  ];

  return (
    <div>
      <div>
        <Typography variant="h5" className={classes.title}>
          Lab Results
        </Typography>
      </div>
      <div>
        <TableContainer component={Paper} className={classes.container}>
          <Table className={classes.table} size="small" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Value</TableCell>
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
      {showNote ? (
        <div>
          <Typography variant="h5" className={classes.title2}>
            Note
          </Typography>
          <Card variant="outlined" className={classes.note}>
            <Typography
              variant="body2"
              component="p"
              className={classes.noteText}
            >
              Insulin autoantibody (mIAA) is an important marker of islet
              autoimmunity and is utilized in confirmation of type 1 diabetes
              diagnosis. However, assay specificity, after a person has been on
              exogenous insulin for more than 10 days, is no longer able to
              distinguish insulin autoantibodies from insulin antibodies which
              form in over 40% of patients treated with subcutaneous insulin
              (S.E. Fineberg et al. Immunogenicity of Human Insulin.
              Diabetologia (1983) 25:465-469). mIAA is not a reliable marker of
              autoimmunity after a donor has been on insulin therapy for more
              than 10 days.
            </Typography>
          </Card>
        </div>
      ) : null}
    </div>
  );
}

// Subscribe
const mapStateToProps = (state) => {
  return {
    // Filtered Data
    currentCase: state.explore.currentCase,
    // Donor Types (map)
    donorTypesMap: state.explore.donorTypesMap,
  };
};

export default connect(mapStateToProps, null)(LabTestResults);
