import React, { setState } from "react";
import Select from "react-select";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  multiSelect: {
    width: "100%",
  },
  gridItem: {
    width: "75%",
  },
  title: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(1),
    fontWeight: "900",
  },
}));

const options = [
  { value: "African American", label: "African American" },
  {
    value: "American Indian/Alaska Native",
    label: "American Indian/Alaska Native",
  },
  { value: "Arab/Middle Eastern", label: "Arab/Middle Eastern" },
  { value: "Asian", label: "Asian" },
  { value: "Caucasian", label: "Caucasian" },
  {
    value: "Hawaiian/Other Pacific Islander",
    label: "Hawaiian/Other Pacific Islander",
  },
  { value: "Hispanic/Latino", label: "Hispanic/Latino" },
  { value: "Multiracial", label: "Multiracial" },
];

function FilterRace(props) {
  const classes = useStyles();

  return (
    <div>
      <Grid
        container
        direction="column"
        direction="column"
        justify="center"
        alignItems="center"
      >
        <Grid item xs={12} className={classes.gridItem}>
          <Typography variant="subtitle1" className={classes.title}>
            Race/Ethnicity
          </Typography>
        </Grid>
        <Grid item xs={12} className={classes.gridItem}>
          <Select
            className={classes.multiSelect}
            value={props.selectedRace}
            onChange={(value) => props.setSelectedRace(value)}
            options={options}
            isMulti
            closeMenuOnSelect={false}
          />
        </Grid>
      </Grid>
    </div>
  );
}

// subscribe
const mapStateToProps = (state) => {
  return {
    selectedRace: state.explore.selectedRace,
  };
};

// update
const mapDispatchToProps = (dispatch) => {
  return {
    setSelectedRace: (newRace) =>
      dispatch({ type: "SET_SELECTED_RACE", value: newRace }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterRace);
