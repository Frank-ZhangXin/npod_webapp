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

  const data = props.hlaMap[props.currentCase.case_id];

  function createData(name, value) {
    return { name, value };
  }

  const rows = [
    createData("A1 Transplant", (data && data["T_A_1"]) || "Unavailable"),
    createData("A2 Transplant", (data && data["T_A_2"]) || "Unavailable"),
    createData("B1 Transplant", (data && data["T_B_1"]) || "Unavailable"),
    createData("B2 Transplant", (data && data["T_B_2"]) || "Unavailable"),
    createData("DR1 Transplant", (data && data["T_DR_1"]) || "Unavailable"),
    createData("DR2 Transplant", (data && data["T_DR_2"]) || "Unavailable"),
    createData("DQB1 Transplant", (data && data["T_DQB_1"]) || "Unavailable"),
    createData("DQB2 Transplant", (data && data["T_DQB_2"]) || "Unavailable"),
    createData("A1", (data && data["A_1"]) || "Unavailable"),
    createData("A2", (data && data["A_2"]) || "Unavailable"),
    createData("B1", (data && data["B_1"]) || "Unavailable"),
    createData("B2", (data && data["B_2"]) || "Unavailable"),
    createData("C1", (data && data["C_1"]) || "Unavailable"),
    createData("C2", (data && data["C_2"]) || "Unavailable"),
  ];

  return (
    <div>
      <div>
        <Typography variant="h5" className={classes.title}>
          HLA INFORMATION
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
    hlaMap: state.explore.hlaMap,
  };
};

export default connect(mapStateToProps, null)(LabTestResults2);
