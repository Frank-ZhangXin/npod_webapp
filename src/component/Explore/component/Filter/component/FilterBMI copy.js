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
    width: "97%",
    marginLeft: "5px",
  },
  textfield: {
    width: 45,
  },
  gridContainer: {
    width: "125%",
  },
  gridItem: {
    width: "75%",
  },
  title: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(1),
    fontWeight: "900",
  },
  switch: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
}));

function FilterBMI(props) {
  const classes = useStyles();

  const [bmiRange, setBmiRange] = React.useState([5.0, 60.0]);
  const [bmiMin, setBmiMin] = React.useState(5.0);
  const [bmiMax, setBmiMax] = React.useState(60.0);

  const handleBMIRangeSliderChange = (event, newBmiRange) => {
    props.setBmiRange(newBmiRange);
  };

  const handleMinBmiInputChange = (event) => {
    let newMinBmi =
      typeof Number(event.target.value) === "number"
        ? Number(event.target.value)
        : 5.0;
    newMinBmi = newMinBmi >= props.bmiMax ? props.bmiMax : newMinBmi;
    props.setBmiMin(newMinBmi);
  };

  const handleMaxBmiInputChange = (event) => {
    let newBmiAge =
      typeof Number(event.target.value) === "number"
        ? Number(event.target.value)
        : 60.0;
    newBmiAge = newBmiAge <= props.bmiMin ? props.bmiMin : newBmiAge;
    props.setBmiMax(newBmiAge);
  };

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
          <Box display="flex">
            <Box flexGrow={1}>
              <Typography variant="subtitle1" className={classes.title}>
                BMI
              </Typography>
            </Box>
            <Box>
              <Switch
                checked={props.bmiEnable}
                onChange={(e) => props.setBmiEnable(e.target.checked)}
                name="bmiEnableSwitch"
                className={classes.switch}
                color="primary"
              />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} className={classes.gridItem}>
          <Slider
            className={classes.slider}
            value={props.bmiRange}
            onChange={handleBMIRangeSliderChange}
            valueLabelDisplay="auto"
            min={5.0}
            max={60.0}
            step={0.1}
            aria-labelledby="bmi-range-slider"
            disabled={!props.bmiEnable}
          />
        </Grid>
        <Grid item xs={12} className={classes.gridItem}>
          <Grid
            container
            spacing={10}
            alignItems="center"
            justify="space-between"
            className={classes.gridContainer}
          >
            <Grid item xs={4}>
              <TextField
                className={classes.textfield}
                id="min-age-input"
                //label="Start"
                disabled={!props.bmiEnable}
                value={props.bmiMin}
                margin="dense"
                onChange={handleMinBmiInputChange}
                inputProps={{
                  step: 0.1,
                  min: 0.0,
                  max: 60.0,
                  type: "number",
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                className={classes.textfield}
                id="min-age-input"
                //label="To"
                disabled={!props.bmiEnable}
                value={props.bmiMax}
                margin="dense"
                onChange={handleMaxBmiInputChange}
                inputProps={{
                  step: 0.1,
                  min: 0.0,
                  max: 60.0,
                  type: "number",
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

// subscribe
const mapStateToProps = (state) => {
  return {
    bmiEnable: state.explore.bmiEnable,
    bmiRange: state.explore.bmiRange,
    bmiMin: state.explore.bmiMin,
    bmiMax: state.explore.bmiMax,
  };
};

// update
const mapDispatchToProps = (dispatch) => {
  return {
    setBmiEnable: (newBmiEnable) =>
      dispatch({ type: "SET_BMI_ENABLE", value: newBmiEnable }),
    setBmiRange: (newRange) =>
      dispatch({ type: "SET_BMI_RANGE", value: newRange }),
    setBmiMin: (newBmiMin) =>
      dispatch({ type: "SET_BMI_MIN", value: newBmiMin }),
    setBmiMax: (newBmiMax) =>
      dispatch({ type: "SET_BMI_MAX", value: newBmiMax }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterBMI);
