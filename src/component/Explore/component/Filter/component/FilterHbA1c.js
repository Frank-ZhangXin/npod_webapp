import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
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
import Tooltip from "@material-ui/core/Tooltip";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";

const useStyles = makeStyles((theme) => ({
  slider: {
    width: "97%",
    marginLeft: "5px",
    // marginTop: "15px",
    // marginBottom: "5px",
  },
  gridContainer: (props) => {
    return props.hEnable
      ? {
          maxWidth: "90%",
          marginLeft: "auto",
          marginRight: "auto",
          paddingTop: "5px",
          paddingBottom: "5px",
          borderTop: "1px solid #ccc",
          borderLeft: "1px solid #ccc",
          borderRight: "3px solid #b8b8b8",
          borderBottom: "4px solid #b8b8b8",
          borderRadius: "5px",
          marginBottom: "5px",
        }
      : {};
  },
  gridItem: {
    width: (props) => (props.hEnable ? "85%" : "75%"),
  },
  title: {
    marginTop: theme.spacing(1),
    // marginBottom: theme.spacing(1),
    fontWeight: "600",
    fontSize: "15px",
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
  },
  switch: {
    // marginTop: theme.spacing(2),
    // marginBottom: theme.spacing(1),
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
  helpIcon: {
    fontSize: 18,
    marginLeft: "3px",
    color: "#0292FF",
  },
  helpIcon2: {
    marginTop: "-10px",
    marginBottom: "-10px",
  },
  helpText: {
    padding: "10px",
    textShadow: "0 0 20px white",
  },
}));

const FilterTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    color: "#000000",
    border: "1px solid #dadde9",
    maxWidth: "420px",
    fontSize: 15,
  },
}))(Tooltip);

function FilterHbA1c(props) {
  const classes = useStyles(props);

  const [expanded, setExpanded] = useState(false);
  const [newMin, setNewMin] = useState(props.hMin);
  const [newMax, setNewMax] = useState(props.hMax);
  const [showError, setShowError] = useState(false);

  const helpText = (
    <React.Fragment>
      <div className={classes.helpText}>
        Hint:
        <br />
        When the switch is off (
        <Switch color="primary" className={classes.helpIcon2} />) , the
        searching will ignore HbA1c.
        <br />
        When the switch is on (
        <Switch checked="true" color="primary" className={classes.helpIcon2} />)
        , the search will find cases that match the given range.
        <br />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <span>Click the expand button (</span> <ExpandMoreIcon />
          <span>) to input a specific number.</span>
        </div>
      </div>
    </React.Fragment>
  );

  useEffect(() => {
    if (!props.hEnable) {
      setExpanded(false);
    }
  });

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
        justify="center"
        alignItems="center"
        className={classes.gridContainer}
      >
        <Grid item xs={12} className={classes.gridItem}>
          <Box display="flex">
            <Box flexGrow={1}>
              <Typography variant="subtitle1" className={classes.title}>
                HbA1c{"  "}
                <FilterTooltip title={helpText} placement="right-start">
                  <HelpOutlineIcon className={classes.helpIcon} />
                </FilterTooltip>
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
        {props.hEnable && (
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
        )}

        {props.hEnable && (
          <Grid item xs={12} className={classes.gridItem}>
            <Grid container alignItems="center" justify="space-between">
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
        )}

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
