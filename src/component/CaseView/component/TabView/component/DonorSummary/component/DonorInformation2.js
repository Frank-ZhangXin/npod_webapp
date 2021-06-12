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
    maxHeight: "56vh",
  },
  table: {
    paddingBottom: theme.spacing(2),
    //minWidth: 650,
  },
}));

function DonorInformation2(props) {
  const classes = useStyles();
  const donorType = props.donorTypesMap[props.currentCase.donor_type_id];

  function createData(name, value) {
    return { name, value };
  }

  const rows = [
    createData("Donor Type", donorType === null ? "Unavailable" : donorType),
    createData(
      "Diabetes Duration (years)",
      props.currentCase.diabetes_hx_years === null
        ? "Unavailable"
        : props.currentCase.diabetes_hx_years
    ),
    createData(
      "Age",
      props.currentCase.age_years === null
        ? "Unavailable"
        : props.currentCase.age_years
    ),
    createData(
      "Gestational Age (weeks)",
      props.currentCase.gestational_age_weeks === null
        ? "Unavailable"
        : props.currentCase.gestational_age_weeks
    ),
    createData("Sex", props.currentCase.sex),
    createData("Race/Ethnicity", props.currentCase.race_ethnicity),
    createData(
      "Height (cm)",
      props.currentCase.height_cm === null
        ? "Unavailable"
        : props.currentCase.height_cm
    ),
    createData(
      "Weight (kg)",
      props.currentCase.weight_kg === null
        ? "Unavailable"
        : props.currentCase.weight_kg
    ),
    createData(
      "BMI",
      props.currentCase.BMI === null ? "Unavailable" : props.currentCase.BMI
    ),
    createData(
      "Cause of Death",
      props.currentCase.cause_of_death_id === null
        ? "Unavailable"
        : props.causeOfDeathMap[props.currentCase.cause_of_death_id]
    ),
    createData(
      "ABO Group",
      props.currentCase.ABO_blood_type === null
        ? "Unavailable"
        : props.currentCase.ABO_blood_type
    ),
  ];

  return (
    <div>
      <div>
        <Typography variant="h5" className={classes.title}>
          DONOR INFORMATION
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

export default connect(mapStateToProps, null)(DonorInformation2);
