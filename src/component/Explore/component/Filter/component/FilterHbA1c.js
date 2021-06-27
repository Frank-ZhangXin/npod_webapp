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

function FilterHbA1c(props) {
  const classes = useStyles();

  const handleAgeRangeSliderChange = (event, newHRange) => {
    props.setHRange(newHRange);
    props.setHMin(newHRange[0]);
    props.setHMax(newHRange[1]);
  };

  const handleMinHInputChange = (event) => {
    let newMinH =
      typeof Number(event.target.value) === "number"
        ? Number(event.target.value)
        : 0;
    newMinH = newMinH >= props.hMax ? props.hMax : newMinH;
    props.setHMin(newMinH);
  };

  const handleMaxHInputChange = (event) => {
    let newMaxH =
      typeof Number(event.target.value) === "number"
        ? Number(event.target.value)
        : 100;
    newMaxH = newMaxH <= props.hMin ? props.hMin : newMaxH;
    props.setHMax(newMaxH);
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
                HbA1c
              </Typography>
            </Box>
            <Box>
              <Switch
                checked={props.hEnable}
                onChange={(e) => props.setHEnable(e.target.checked)}
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
            value={props.hRange}
            onChange={handleAgeRangeSliderChange}
            disabled={!props.hEnable}
            valueLabelDisplay="auto"
            min={2.0}
            max={20.0}
            step={0.1}
            aria-labelledby="h-range-slider"
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
                id="min-h-input"
                //label="Start"
                disabled={!props.hEnable}
                value={props.hMin}
                margin="dense"
                onChange={handleMinHInputChange}
                inputProps={{
                  step: 0.1,
                  min: 2.0,
                  max: 20.0,
                  type: "number",
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                className={classes.textfield}
                id="min-h-input"
                //label="To"
                disabled={!props.hEnable}
                value={props.hMax}
                margin="dense"
                onChange={handleMaxHInputChange}
                inputProps={{
                  step: 0.1,
                  min: 2.0,
                  max: 20.0,
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
    hEnable: state.explore.hEnable,
    hRange: state.explore.hRange,
    hMin: state.explore.hMin,
    hMax: state.explore.hMax,
  };
};

// update
const mapDispatchToProps = (dispatch) => {
  return {
    setHEnable: (newHEnable) =>
      dispatch({ type: "SET_H_ENABLE", value: newHEnable }),
    setHRange: (newHRange) =>
      dispatch({ type: "SET_H_RANGE", value: newHRange }),
    setHMin: (newHMin) => dispatch({ type: "SET_H_MIN", value: newHMin }),
    setHMax: (newHMax) => dispatch({ type: "SET_H_MAX", value: newHMax }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterHbA1c);
