import React, { useState, useEffect } from "react";
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
import { API } from "aws-amplify";

const useStyles = makeStyles((theme) => ({
  title: {
    paddingBottom: theme.spacing(2),
  },
  title2: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  container: {
    maxHeight: "56vh",
  },
  table: {
    paddingBottom: theme.spacing(2),
    //minWidth: 650,
  },
}));

function PeakInsulinSecretionDuringStimulation(props) {
  const classes = useStyles();
  // const [glucoseStimulation, setGlucoseStimulation] = useState(null);
  // const [highKCLStimulation, setHighKCLStimulation] = useState(null);

  // useEffect(() => {
  //   if (props.currentCase.case_id === "6430") {
  //     GetMaxInsulin(props.currentCase.case_id, 95, 64, "KCL");
  //   } else if (props.currentCase.case_id === "6431") {
  //     GetMaxInsulin(props.currentCase.case_id, 100, 64, "KCL");
  //   } else {
  //     GetMaxInsulin(props.currentCase.case_id, 80, 64, "KCL");
  //   }
  //   GetMaxInsulin(props.currentCase.case_id, 35, 15, "glucose");
  // }, [props.currentCase.case_id]);

  // async function GetMaxInsulin(caseId, highTime, lowTime, stiName) {
  //   return await API.get("dbapi", "/db/max_insulin", {
  //     queryStringParameters: {
  //       case_id: caseId,
  //       high_time: highTime,
  //       low_time: lowTime,
  //     },
  //   })
  //     .then((res) => {
  //       if (stiName === "glucose") {
  //         setGlucoseStimulation(res[0]["MAX(insulin_mU_L)"]);
  //       } else if (stiName === "KCL") {
  //         setHighKCLStimulation(res[0]["MAX(insulin_mU_L)"]);
  //       }
  //     })
  //     .catch((err) => {
  //       console.error("Get Max Insulin Error", err);
  //     });
  // }

  function createData(name, value) {
    return { name, value };
  }

  const rows = [
    createData(
      "16.7mM Glucose Stimulation",
      props.currentCase.glucose_insulin === null
        ? "Unavailable"
        : props.currentCase.glucose_insulin
    ),
    createData(
      "High KCl Stimulation",
      props.currentCase.KCL_insulin === null
        ? "Unavailable"
        : props.currentCase.KCL_insulin
    ),
  ];

  return (
    <div>
      <div>
        <Typography variant="h5" className={classes.title}>
          Peak Insulin Secretion During Stimulation (mU/L)
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
    </div>
  );
}

// Subscribe
const mapStateToProps = (state) => {
  return {
    // Filtered Data
    currentCase: state.explore.currentCase,

    // Sample Types (map)
    sampleTypesMap: state.explore.sampleTypesMap,

    // Cause of Deaht map
    causeOfDeathMap: state.explore.causeOfDeathMap,
  };
};

export default connect(
  mapStateToProps,
  null
)(PeakInsulinSecretionDuringStimulation);
