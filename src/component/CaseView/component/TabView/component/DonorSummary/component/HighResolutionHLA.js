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
    maxHeight: "55vh",
  },
  table: {
    paddingBottom: theme.spacing(2),
    //minWidth: 650,
  },
}));

function HighResolutionHLA(props) {
  const classes = useStyles();

  const data = props.hlaMap[props.currentCase.case_id];

  function createData(name, value) {
    return { name, value };
  }

  const rows = [
    createData("A", props.currentCase["HLA_A"] || "Unavailable"),
    createData("B", props.currentCase["HLA_B"] || "Unavailable"),
    createData("C", props.currentCase["HLA_C"] || "Unavailable"),
    createData("DRB1", props.currentCase["HLA_DRB1"] || "Unavailable"),
    createData("DQA1", props.currentCase["HLA_DQA1"] || "Unavailable"),
    createData("DQB1", props.currentCase["HLA_DQB1"] || "Unavailable"),
    createData("DPA1", props.currentCase["HLA_DPA1"] || "Unavailable"),
    createData("DPB1", props.currentCase["HLA_DPB1"] || "Unavailable"),
  ];

  return (
    <div>
      <div>
        <Typography variant="h5" className={classes.title}>
          High-Resolution HLA
        </Typography>
      </div>
      <div>
        <TableContainer component={Paper} className={classes.container}>
          <Table className={classes.table} size="small" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Allele 1, Allele 2</TableCell>
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

export default connect(mapStateToProps, null)(HighResolutionHLA);
