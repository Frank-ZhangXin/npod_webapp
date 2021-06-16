import React, { setState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Switch from "@material-ui/core/Switch";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  slider: {
    width: "75%",
  },
  textfield: {
    width: 45,
  },
  title: {
    margin: theme.spacing(3),
  },
}));

function FilterAge(props) {
  const classes = useStyles();

  const handleAgeRangeSliderChange = (event, newAgeRange) => {
    props.setAgeRange(newAgeRange);
  };

  const handleMinAgeInputChange = (event) => {
    let newMinAge =
      typeof Number(event.target.value) === "number"
        ? Number(event.target.value)
        : 0;
    newMinAge = newMinAge >= props.ageMax ? props.ageMax : newMinAge;
    props.setAgeMin(newMinAge);
  };

  const handleMaxAgeInputChange = (event) => {
    let newMaxAge =
      typeof Number(event.target.value) === "number"
        ? Number(event.target.value)
        : 100;
    newMaxAge = newMaxAge <= props.ageMin ? props.ageMin : newMaxAge;
    props.setAgeMax(newMaxAge);
  };

  return (
    <div>
      <Box display="flex" justifyContent="space-between">
        <Box>
          <Typography variant="h6" className={classes.title}>
            <Box fontWeight="fontWeightBold">Age</Box>
          </Typography>
        </Box>
        <Box>
          <Switch
            checked={props.ageEnable}
            onChange={(e) => props.setAgeEnable(e.target.checked)}
            name="ageEnableSwitch"
            className={classes.title}
            color="primary"
          />
        </Box>
      </Box>

      <Slider
        className={classes.slider}
        value={props.ageRange}
        onChange={handleAgeRangeSliderChange}
        disabled={!props.ageEnable}
        valueLabelDisplay="auto"
        min={0}
        max={95}
        aria-labelledby="age-range-slider"
      />
      <Grid container spacing={10} alignItems="center" justify="space-around">
        <Grid item xs={4}>
          <TextField
            className={classes.textfield}
            id="min-age-input"
            label="Start"
            disabled={!props.ageEnable}
            value={props.ageMin}
            margin="dense"
            onChange={handleMinAgeInputChange}
            inputProps={{
              step: 1,
              min: 0,
              max: 95,
              type: "number",
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            className={classes.textfield}
            id="min-age-input"
            label="To"
            disabled={!props.ageEnable}
            value={props.ageMax}
            margin="dense"
            onChange={handleMaxAgeInputChange}
            inputProps={{
              step: 1,
              min: 0,
              max: 95,
              type: "number",
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
}

// subscribe
const mapStateToProps = (state) => {
  return {
    ageEnable: state.explore.ageEnable,
    ageRange: state.explore.ageRange,
    ageMin: state.explore.ageMin,
    ageMax: state.explore.ageMax,
  };
};

// update
const mapDispatchToProps = (dispatch) => {
  return {
    setAgeEnable: (newAgeEnable) =>
      dispatch({ type: "SET_AGE_ENABLE", value: newAgeEnable }),
    setAgeRange: (newAgeRange) =>
      dispatch({ type: "SET_AGE_RANGE", value: newAgeRange }),
    setAgeMin: (newAgeMin) =>
      dispatch({ type: "SET_AGE_MIN", value: newAgeMin }),
    setAgeMax: (newAgeMax) =>
      dispatch({ type: "SET_AGE_MAX", value: newAgeMax }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterAge);
