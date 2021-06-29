import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Switch from "@material-ui/core/Switch";
import { connect } from "react-redux";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import clsx from "clsx";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  slider: {
    width: "97%",
    marginLeft: "5px",
    marginTop: "15px",
    marginBottom: "5px",
  },
  gridContainer: {
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
  switch: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  expandBox: {
    marginTop: "7px",
  },
  expendedTextfield: {
    width: "80px",
  },
  expandedButton: {
    height: "39px",
    width: "65px",
  },
}));

function FilterHbA1c(props) {
  const classes = useStyles();

  const [expanded, setExpanded] = useState(false);
  const [newMin, setNewMin] = useState(props.hMin);
  const [newMax, setNewMax] = useState(props.hMax);
  const [showError, setShowError] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleAgeRangeSliderChange = (event, newHRange) => {
    props.setHRange(newHRange);
  };

  const handleMinHInputChange = (event) => {
    setNewMin(event.target.value);
  };

  const handleMaxHInputChange = (event) => {
    setNewMax(event.target.value);
  };

  const handleSet = () => {
    const numMin = Number(newMin);
    const numMax = Number(newMax);
    if (
      numMin != null &&
      numMax != null &&
      numMin <= numMax &&
      numMin >= 2 &&
      numMax <= 20
    ) {
      props.setHMin(numMin);
      props.setHMax(numMax);
      setShowError(false);
    } else {
      console.log("Invalid input!");
      setShowError(true);
    }
  };

  const handleSwitch = (event) => {
    props.setHEnable(event.target.checked);
    if (!event.target.checked) {
      setExpanded(event.target.checked);
    }
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
                onChange={handleSwitch}
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
            alignItems="center"
            justify="space-between"
            className={classes.gridContainer}
          >
            <Grid item>
              <Typography variant="body1" color="textPrimary">
                {props.hMin}
              </Typography>
            </Grid>
            <Grid item>
              <IconButton
                className={clsx(classes.expand, {
                  [classes.expandOpen]: expanded,
                })}
                onClick={handleExpandClick}
                disabled={!props.hEnable}
              >
                <ExpandMoreIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <Typography variant="body1" color="textPrimary">
                {props.hMax}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} className={classes.gridItem}>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <Box
              display="flex"
              justifyContent="space-between"
              className={classes.expandBox}
            >
              <TextField
                label="From"
                variant="outlined"
                className={classes.expendedTextfield}
                defaultValue={props.hMin}
                size="small"
                onChange={handleMinHInputChange}
                error={showError}
              />
              <TextField
                label="To"
                variant="outlined"
                className={classes.expendedTextfield}
                defaultValue={props.hMax}
                size="small"
                onChange={handleMaxHInputChange}
                error={showError}
              />
              <Button
                variant="contained"
                color="primary"
                className={classes.expandedButton}
                onClick={handleSet}
              >
                SET
              </Button>
            </Box>
          </Collapse>
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
