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
import Card from "@material-ui/core/Card";

const useStyles = makeStyles((theme) => ({
  title: {
    paddingBottom: theme.spacing(2),
  },
  title2: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(1),
  },
  container: {
    maxHeight: "55vh",
  },
  table: {
    paddingBottom: theme.spacing(2),
    //minWidth: 650,
  },
  note: {
    maxHeight: "25vh",
    overflow: "auto",
  },
  noteText: {
    padding: "10px",
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
      <div>
        <Typography variant="h5" className={classes.title2}>
          HLA Alleles Note
        </Typography>
        <Card variant="outlined" className={classes.note}>
          <Typography
            variant="body2"
            component="p"
            className={classes.noteText}
          >
            Starting in September 2025, HLA ambiguous results from sequencing
            will be reported using P-groups. The “P” group includes HLA alleles
            that encode identical protein sequences for the peptide-binding
            domains. Reporting results in this way highlights functional
            equivalence rather than minor genetic variations. These results will
            be displayed with a “P” following the HLA result. For more
            information, please visit the{" "}
            <a
              target="_blank"
              href="https://hla.alleles.org/pages/wmda/p_groups/"
            >
              HLA nomenclature
            </a>{" "}
            resource or{" "}
            <a target="_blank" href="https://portal.jdrfnpod.org/contact">
              contact us
            </a>
            .
          </Typography>
        </Card>
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
