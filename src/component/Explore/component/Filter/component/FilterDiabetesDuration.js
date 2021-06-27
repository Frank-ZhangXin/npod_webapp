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
                Diabetes Duration(Years)
              </Typography>
            </Box>
            <Box>
              <Switch
                checked={props.DDEnable}
                onChange={(e) => props.setDDEnable(e.target.checked)}
                name="DDEnableSwitch"
                className={classes.switch}
                color="primary"
              />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} className={classes.gridItem}>
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
                id="min-dd-input"
                //label="Start"
                disabled={!props.DDEnable}
                value={props.DDMin}
                margin="dense"
                onChange={handleMinDDInputChange}
                //helperText="Years"
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
                //label="To"
                disabled={!props.DDEnable}
                value={props.DDMax}
                margin="dense"
                onChange={handleMaxDDInputChange}
                //helperText="Years"
                inputProps={{
                  step: 1,
                  min: 0,
                  max: 85,
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
