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
    paddingBottom: theme.spacing(2),
  },
  container: {
    maxHeight: "56vh",
  },
  table: {
    paddingBottom: theme.spacing(2),
  },
  note: {
    maxHeight: "25vh",
    overflow: "auto",
  },
  noteText: {
    padding: "10px",
  },
}));

function GRS1Snps(props) {
  const classes = useStyles();
  const genetic = props.geneticMap[props.currentCase.case_id];

  function createData(name, value) {
    return { name, value };
  }

  const rows = [];

  const genRows = (snpsStr) => {
    const snpsArr = snpsStr.split(";");
    snpsArr.forEach((snpStr) => {
      let snpKey = snpStr.split(":")[0] ?? "Not Available";
      const snpValue = snpStr.split(":")[1] ?? "Not Available";
      const prefix = "GRS1_";
      snpKey = snpKey.replace(new RegExp("^" + prefix), "");
      rows.push(createData(snpKey, snpValue));
    });
  };

  try {
    genRows(genetic.GRS1_SNPs);
  } catch (err) {
    console.log("Fetching genetic SNPs data error", err);
    rows.push(createData("Unavailable", "Unavailable"));
  }

  return (
    <div>
      <div>
        <Typography variant="h5" className={classes.title}>
          GRS1 SNPs
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

    // Donor Types (map)
    donorTypesMap: state.explore.donorTypesMap,

    // genetic map
    geneticMap: state.explore.geneticMap,
  };
};

export default connect(mapStateToProps, null)(GRS1Snps);
