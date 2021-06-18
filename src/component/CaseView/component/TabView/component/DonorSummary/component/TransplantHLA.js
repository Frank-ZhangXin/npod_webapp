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
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
  title: {
    paddingBottom: theme.spacing(2),
  },
  title2: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  container: {
    maxHeight: "55vh",
  },
  table: {
    paddingBottom: theme.spacing(2),
    //minWidth: 650,
  },
}));

function TransplantHLA(props) {
  const classes = useStyles();

  const data = props.hlaMap[props.currentCase.case_id];

  function createData(name, value) {
    return { name, value };
  }

  const rows = [
    createData("A", props.currentCase["HLA_T_A"] || "Unavailable"),
    createData("B", props.currentCase["HLA_T_B"] || "Unavailable"),
    createData("DR", props.currentCase["HLA_T_DR"] || "Unavailable"),
    createData("DQB", props.currentCase["HLA_T_DQB"] || "Unavailable"),
  ];

  const dtComent = props.currentCase["donor_type_comments"];
  const pwComent = props.currentCase["pancreas_weight_comments"];
  const rows2 = [
    createData(
      "Donor Type",
      dtComent !== null && dtComent !== "0" ? dtComent : "Unavailable"
    ),
    createData(
      "Pancreas Weight",
      pwComent !== null && pwComent !== "0" ? pwComent : "Unavailable"
    ),
  ];

  return (
    <div>
      <div>
        <Typography variant="h5" className={classes.title}>
          Transplant HLA
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

export default connect(mapStateToProps, null)(TransplantHLA);
