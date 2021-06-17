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

function ClinicalInformation(props) {
  const classes = useStyles();
  const donorType = props.donorTypesMap[props.currentCase.donor_type_id];

  function createData(name, value) {
    return { name, value };
  }

  const rows = [
    createData(
      "Cause of Death",
      props.currentCase.cause_of_death_id === null
        ? "Unavailable"
        : props.causeOfDeathMap[props.currentCase.cause_of_death_id]
    ),
    createData(
      "Down Time",
      props.currentCase.downtime_minutes === null
        ? "Unavailable"
        : props.currentCase.downtime_minutes
    ),
    createData("Diabetes Type", donorType === null ? "Unavailable" : donorType),
    createData("Autoimmune Disease", "Unavailable"),
    createData("Hypertension", "Unavailable"),
    createData(
      "Heavy Alcohol Use",
      props.currentCase.alcohol_use === null
        ? "Unavailable"
        : props.currentCase.alcohol_use
    ),
    createData(
      "Smoking/Drug Use",
      props.currentCase.drug_use === null
        ? "Unavailable"
        : props.currentCase.drug_use
    ),
    createData(
      "Allergies",
      props.currentCase.allergies === null
        ? "Unavailable"
        : props.currentCase.allergies
    ),
  ];

  return (
    <div>
      <div>
        <Typography variant="h5" className={classes.title}>
          Clinical Information
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

    // Donor Types (map)
    donorTypesMap: state.explore.donorTypesMap,

    // Cause of Deaht map
    causeOfDeathMap: state.explore.causeOfDeathMap,
  };
};

export default connect(mapStateToProps, null)(ClinicalInformation);