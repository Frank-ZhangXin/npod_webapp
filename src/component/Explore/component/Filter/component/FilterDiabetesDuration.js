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
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
  },
}));

function FilterDiabetesDuration(props) {
  const classes = useStyles();

  const handleDDRangeSliderChange = (event, newDDRange) => {
    props.setDDRange(newDDRange);
  };

  const handleMinDDInputChange = (event) => {
    let newMinDD =
      typeof Number(event.target.value) === "number"
        ? Number(event.target.value)
        : 0;
    newMinDD = newMinDD >= props.DDMax ? props.DDMax : newMinDD;
    props.setDDMin(newMinDD);
  };

  const handleMaxDDInputChange = (event) => {
    let newMaxDD =
      typeof Number(event.target.value) === "number"
        ? Number(event.target.value)
        : 100;
    newMaxDD = newMaxDD <= props.DDMin ? props.DDMin : newMaxDD;
    props.setDDMax(newMaxDD);
  };

  return (
    <div>
      <Box display="flex" justifyContent="space-between">
        <Box>
          <Typography variant="h6" className={classes.title}>
            <Box fontWeight="fontWeightBold">Diabetes Duration</Box>
          </Typography>
        </Box>
        <Box>
          <Switch
            checked={props.DDEnable}
            onChange={(e) => props.setDDEnable(e.target.checked)}
            name="DDEnableSwitch"
            className={classes.title}
            color="primary"
          />
        </Box>
      </Box>

      <Slider
        className={classes.slider}
        value={props.DDRange}
        onChange={handleDDRangeSliderChange}
        valueLabelDisplay="auto"
        min={0}
        max={85}
        aria-labelledby="dd-range-slider"
        disabled={!props.DDEnable}
      />
      <Grid container spacing={10} alignItems="center" justify="space-around">
        <Grid item xs={4}>
          <TextField
            className={classes.textfield}
            id="min-dd-input"
            label="Start"
            disabled={!props.DDEnable}
            value={props.DDMin}
            margin="dense"
            onChange={handleMinDDInputChange}
            helperText="Years"
            inputProps={{
              step: 1,
              min: 0,
              max: 85,
              type: "number",
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            className={classes.textfield}
            id="min-dd-input"
            label="To"
            disabled={!props.DDEnable}
            value={props.DDMax}
            margin="dense"
            onChange={handleMaxDDInputChange}
            helperText="Years"
            inputProps={{
              step: 1,
              min: 0,
              max: 85,
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
    DDEnable: state.explore.DDEnable,
    DDRange: state.explore.DDRange,
    DDMin: state.explore.DDMin,
    DDMax: state.explore.DDMax,
  };
};

// update
const mapDispatchToProps = (dispatch) => {
  return {
    setDDEnable: (newDDEnable) =>
      dispatch({ type: "SET_DD_ENABLE", value: newDDEnable }),
    setDDRange: (newDDRange) =>
      dispatch({ type: "SET_DD_RANGE", value: newDDRange }),
    setDDMin: (newDDMin) => dispatch({ type: "SET_DD_MIN", value: newDDMin }),
    setDDMax: (newDDMax) => dispatch({ type: "SET_DD_MAX", value: newDDMax }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterDiabetesDuration);
