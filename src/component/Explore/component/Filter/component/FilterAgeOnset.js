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
    return props.ageOnsetEnable
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
    width: (props) => (props.ageOnsetEnable ? "85%" : "75%"),
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
  activateGridContainer: {
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
  },
  activateGridItem: {
    width: "85%",
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

const AntSwitch = withStyles((theme) => ({
  root: {
    width: 30,
    height: 16,
    padding: 0,
    display: "flex",
  },
  switchBase: {
    padding: 3,
    color: theme.palette.grey[500],
    "&$checked": {
      transform: "translateX(12px)",
      color: theme.palette.common.white,
      "& + $track": {
        opacity: 1,
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.primary.main,
      },
    },
  },
  thumb: {
    width: 12,
    height: 12,
    boxShadow: "none",
  },
  track: {
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: theme.palette.common.white,
  },
  checked: {},
}))(Switch);

function FilterAge(props) {
  const classes = useStyles(props);
  const [expanded, setExpanded] = useState(false);
  const [newMin, setNewMin] = useState(props.ageOnsetMin);
  const [newMax, setNewMax] = useState(props.ageOnsetMax);
  const [showError, setShowError] = useState(false);

  const helpText = (
    <React.Fragment>
      <div className={classes.helpText}>
        Hint:
        <br />
        When the switch is off (
        <Switch color="primary" className={classes.helpIcon2} />) , the search
        will ignore age onset.
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
    if (!props.ageOnsetEnable) {
      setExpanded(false);
    }
  });

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleAgeOnsetRangeSliderChange = (event, newAgeOnsetRange) => {
    props.setAgeOnsetRange(newAgeOnsetRange);
  };

  const handleMinAgeOnsetInputChange = (event) => {
    setNewMin(event.target.value);
  };

  const handleMaxAgeOnsetInputChange = (event) => {
    setNewMax(event.target.value);
  };

  const handleSet = () => {
    const numMin = Number(newMin);
    const numMax = Number(newMax);
    if (
      numMin != null &&
      numMax != null &&
      numMin <= numMax &&
      numMin >= 0 &&
      numMax <= 95
    ) {
      props.setAgeOnsetMin(numMin);
      props.setAgeOnsetMax(numMax);
      setShowError(false);
    } else {
      console.log("Invalid input!");
      setShowError(true);
    }
  };

  const handleSwitch = (event) => {
    props.setAgeOnsetEnable(event.target.checked);
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
                Age Onset
                <FilterTooltip title={helpText} placement="right-start">
                  <HelpOutlineIcon className={classes.helpIcon} />
                </FilterTooltip>
              </Typography>
            </Box>
            <Box>
              <Switch
                checked={props.ageOnsetEnable}
                onChange={handleSwitch}
                name="ageOnsetEnableSwitch"
                className={classes.switch}
                color="primary"
              />
            </Box>
          </Box>
        </Grid>
        {props.ageOnsetEnable && (
          <Grid item xs={12} className={classes.gridItem}>
            <Slider
              className={classes.slider}
              value={props.ageOnsetRange}
              onChange={handleAgeOnsetRangeSliderChange}
              disabled={!props.ageOnsetEnable}
              valueLabelDisplay="auto"
              min={0}
              max={95}
              aria-labelledby="age-onset-range-slider"
            />
          </Grid>
        )}

        {props.ageOnsetEnable && (
          <Grid item xs={12} className={classes.gridItem}>
            <Grid container alignItems="center" justify="space-between">
              <Grid item>
                <Typography variant="body1" color="textPrimary">
                  {props.ageOnsetMin}
                </Typography>
              </Grid>
              <Grid item>
                <IconButton
                  className={clsx(classes.expand, {
                    [classes.expandOpen]: expanded,
                  })}
                  onClick={handleExpandClick}
                  disabled={!props.ageOnsetEnable}
                >
                  <ExpandMoreIcon />
                </IconButton>
              </Grid>
              <Grid item>
                <Typography variant="body1" color="textPrimary">
                  {props.ageOnsetMax}
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
                defaultValue={props.ageMin}
                size="small"
                onChange={handleMinAgeOnsetInputChange}
                error={showError}
              />
              <TextField
                label="To"
                variant="outlined"
                className={classes.expendedTextfield}
                defaultValue={props.ageMax}
                size="small"
                onChange={handleMaxAgeOnsetInputChange}
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
    ageOnsetEnable: state.explore.ageOnsetEnable,
    ageOnsetRange: state.explore.ageOnsetRange,
    ageOnsetMin: state.explore.ageOnsetMin,
    ageOnsetMax: state.explore.ageOnsetMax,
  };
};

// update
const mapDispatchToProps = (dispatch) => {
  return {
    setAgeOnsetEnable: (newAgeOnsetEnable) =>
      dispatch({ type: "SET_AGE_ONSET_ENABLE", value: newAgeOnsetEnable }),
    setAgeOnsetRange: (newAgeOnsetRange) =>
      dispatch({ type: "SET_AGE_ONSET_RANGE", value: newAgeOnsetRange }),
    setAgeOnsetMin: (newAgeOnsetMin) =>
      dispatch({ type: "SET_AGE_ONSET_MIN", value: newAgeOnsetMin }),
    setAgeOnsetMax: (newAgeOnsetMax) =>
      dispatch({ type: "SET_AGE_ONSET_MAX", value: newAgeOnsetMax }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterAge);
