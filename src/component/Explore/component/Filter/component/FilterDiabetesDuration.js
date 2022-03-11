import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Switch from "@material-ui/core/Switch";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import clsx from "clsx";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import Tooltip from "@material-ui/core/Tooltip";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";

const useStyles = makeStyles((theme) => ({
  slider: {
    width: "97%",
    marginLeft: "5px",
    // marginTop: "15px",
    // marginBottom: "5px",
  },
  gridContainer: {
    marginTop: "-10px",
    width: "100%",
  },
  gridItem: {
    width: "75%",
  },
  title: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(1),
    fontWeight: "900",
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
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
  helpText2: {
    color: "#FF0000",
  },
}));

const FilterTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    color: "#000000",
    border: "1px solid #dadde9",
    maxWidth: "550px",
    fontSize: 15,
  },
}))(Tooltip);

function FilterDiabetesDuration(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [newMin, setNewMin] = useState(props.DDMin);
  const [newMax, setNewMax] = useState(props.DDMax);
  const [showError, setShowError] = useState(false);

  const helpText = (
    <React.Fragment>
      <div className={classes.helpText}>
        Hint:
        <br />
        When the switch is off (
        <Switch color="primary" className={classes.helpIcon2} />) , the search
        will ignore "Diabetes Duration".
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
          <span>) to input a specific number. </span>
        </div>
        <div className={classes.helpText2}>Notice</div>
        If the Donor Type filter IS NOT specified, all diabetes cases are shown.
        <br />
        If the Donor Type filter IS specified, only cases with the selected
        diabetes type are displayed.
      </div>
    </React.Fragment>
  );

  useEffect(() => {
    if (!props.DDEnable) {
      setExpanded(false);
    }
  });

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleDDRangeSliderChange = (event, newDDRange) => {
    props.setDDRange(newDDRange);
  };

  const handleMinDDInputChange = (event) => {
    setNewMin(event.target.value);
  };

  const handleMaxDDInputChange = (event) => {
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
      numMax <= 85
    ) {
      props.setDDMin(numMin);
      props.setDDMax(numMax);
      setShowError(false);
    } else {
      console.log("Invalid input!");
      setShowError(true);
    }
  };

  const handleSwitch = (event) => {
    props.setDDEnable(event.target.checked);
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
                Diabetes Duration (Yrs){"  "}
                <FilterTooltip title={helpText} placement="right-start">
                  <HelpOutlineIcon className={classes.helpIcon} />
                </FilterTooltip>
              </Typography>
            </Box>
            <Box>
              <Switch
                checked={props.DDEnable}
                onChange={handleSwitch}
                name="DDEnableSwitch"
                className={classes.switch}
                color="primary"
              />
            </Box>
          </Box>
        </Grid>
        {props.DDEnable && (
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
        )}
        {props.DDEnable && (
          <Grid item xs={12} className={classes.gridItem}>
            <Grid
              container
              alignItems="center"
              justify="space-between"
              className={classes.gridContainer}
            >
              <Grid item>
                <Typography variant="body1" color="textPrimary">
                  {props.DDMin}
                </Typography>
              </Grid>
              <Grid item>
                <IconButton
                  className={clsx(classes.expand, {
                    [classes.expandOpen]: expanded,
                  })}
                  onClick={handleExpandClick}
                  disabled={!props.DDEnable}
                >
                  <ExpandMoreIcon />
                </IconButton>
              </Grid>
              <Grid item>
                <Typography variant="body1" color="textPrimary">
                  {props.DDMax}
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
                defaultValue={props.DDMin}
                size="small"
                onChange={handleMinDDInputChange}
                error={showError}
              />
              <TextField
                label="To"
                variant="outlined"
                className={classes.expendedTextfield}
                defaultValue={props.DDMax}
                size="small"
                onChange={handleMaxDDInputChange}
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
