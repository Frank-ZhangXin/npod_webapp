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
    width: "95%",
    marginLeft: "5px",
    // marginTop: "15px",
    // marginBottom: "5px",
  },
  gridContainer: (props) => {
    return props.geneticEnable
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
    width: (props) => (props.geneticEnable ? "85%" : "75%"),
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
  title2: {
    marginTop: theme.spacing(1),
    // marginBottom: theme.spacing(1),
    fontWeight: "600",
    fontSize: "13px",
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

function FilterGenetic(props) {
  const classes = useStyles(props);
  const [expanded, setExpanded] = useState(false);
  const [newGrs1Min, setNewGrs1Min] = useState(props.grs1ScoreMin);
  const [newGrs1Max, setNewGrs1Max] = useState(props.grs1ScoreMax);
  const [newGrs2Min, setNewGrs2Min] = useState(props.grs2ScoreMin);
  const [newGrs2Max, setNewGrs2Max] = useState(props.grs2ScoreMax);
  const [newAagrsMin, setNewAagrsMin] = useState(props.aagrsScoreMin);
  const [newAagrsMax, setNewAagrsMax] = useState(props.aagrsScoreMax);
  const [showError, setShowError] = useState(false);

  const helpText = (
    <React.Fragment>
      <div className={classes.helpText}>
        Hint:
        <br />
        When the switch is off (
        <Switch color="primary" className={classes.helpIcon2} />) , the search
        will ignore GRS score.
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
    if (!props.geneticEnable) {
      setExpanded(false);
    }
  });

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleGrs1ScoreRangeSliderChange = (event, newGrs1ScoreRange) => {
    props.setGrs1ScoreRange(newGrs1ScoreRange);
  };

  const handleGrs2ScoreRangeSliderChange = (event, newGrs2ScoreRange) => {
    props.setGrs2ScoreRange(newGrs2ScoreRange);
  };

  const handleAagrsScoreRangeSliderChange = (event, newAagrsScoreRange) => {
    props.setAagrsScoreRange(newAagrsScoreRange);
  };

  const handleMinGrs1ScoreInputChange = (event) => {
    setNewGrs1Min(event.target.value);
  };

  const handleMinGrs2ScoreInputChange = (event) => {
    setNewGrs2Min(event.target.value);
  };

  const handleMinAagrsScoreInputChange = (event) => {
    setNewAagrsMin(event.target.value);
  };

  const handleMaxGrs1ScoreInputChange = (event) => {
    setNewGrs1Max(event.target.value);
  };

  const handleMaxGrs2ScoreInputChange = (event) => {
    setNewGrs2Max(event.target.value);
  };

  const handleMaxAagrsScoreInputChange = (event) => {
    setNewAagrsMax(event.target.value);
  };

  const handleGrs1ScoreSet = () => {
    const numMin = Number(newGrs1Min);
    const numMax = Number(newGrs1Max);
    if (
      numMin != null &&
      numMax != null &&
      numMin <= numMax &&
      numMin >= 0 &&
      numMax <= 0.5
    ) {
      props.setGrs1ScoreMin(numMin);
      props.setGrs1ScoreMax(numMax);
      setShowError(false);
    } else {
      console.log("Invalid input!");
      setShowError(true);
    }
  };

  const handleGrs2ScoreSet = () => {
    const numMin = Number(newGrs2Min);
    const numMax = Number(newGrs2Max);
    if (
      numMin != null &&
      numMax != null &&
      numMin <= numMax &&
      numMin >= 0 &&
      numMax <= 20
    ) {
      props.setGrs2ScoreMin(newGrs2Min);
      props.setGrs2ScoreMax(newGrs2Max);
      setShowError(false);
    } else {
      console.log("Invalid input!");
      setShowError(true);
    }
  };

  const handleAagrsScoreSet = () => {
    const numMin = Number(newAagrsMin);
    const numMax = Number(newAagrsMax);
    if (
      numMin != null &&
      numMax != null &&
      numMin <= numMax &&
      numMin >= 0 &&
      numMax <= 15
    ) {
      props.setAagrsScoreMin(newAagrsMin);
      props.setAagrsScoreMax(newAagrsMax);
      setShowError(false);
    } else {
      console.log("Invalid input!");
      setShowError(true);
    }
  };

  const handleSwitch = (event) => {
    props.setGeneticEnable(event.target.checked);
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
                Genetics{"  "}
                <FilterTooltip title={helpText} placement="right-start">
                  <HelpOutlineIcon className={classes.helpIcon} />
                </FilterTooltip>
              </Typography>
            </Box>
            <Box>
              <Switch
                checked={props.geneticEnable}
                onChange={handleSwitch}
                name="grs1ScoreEnableSwitch"
                className={classes.switch}
                color="primary"
              />
            </Box>
          </Box>
        </Grid>
        {/* GRS1 score slider */}
        {props.geneticEnable && (
          <Grid item xs={12} className={classes.gridItem}>
            <Box display="flex" flexDirection="column">
              <Box flexGrow={1}>
                <Typography variant="subtitle1" className={classes.title2}>
                  GRS1 Score{"  "}
                  <FilterTooltip title={helpText} placement="right-start">
                    <HelpOutlineIcon className={classes.helpIcon} />
                  </FilterTooltip>
                </Typography>
              </Box>
              <Box>
                <Slider
                  className={classes.slider}
                  value={props.grs1ScoreRange}
                  onChange={handleGrs1ScoreRangeSliderChange}
                  disabled={!props.geneticEnable}
                  valueLabelDisplay="auto"
                  min={0}
                  max={0.5}
                  step={0.05}
                  aria-labelledby="grs1-score-range-slider"
                />
              </Box>
            </Box>
          </Grid>
        )}

        {props.geneticEnable && (
          <Grid item xs={12} className={classes.gridItem}>
            <Grid container alignItems="center" justify="space-between">
              <Grid item>
                <Typography variant="body1" color="textPrimary">
                  {props.grs1ScoreMin}
                </Typography>
              </Grid>
              <Grid item>
                <IconButton
                  className={clsx(classes.expand, {
                    [classes.expandOpen]: expanded,
                  })}
                  onClick={handleExpandClick}
                  disabled={!props.geneticEnable}
                >
                  <ExpandMoreIcon />
                </IconButton>
              </Grid>
              <Grid item>
                <Typography variant="body1" color="textPrimary">
                  {props.grs1ScoreMax}
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
                defaultValue={props.grs1ScoreMin}
                size="small"
                onChange={handleMinGrs1ScoreInputChange}
                error={showError}
              />
              <TextField
                label="To"
                variant="outlined"
                className={classes.expendedTextfield}
                defaultValue={props.grs1ScoreMax}
                size="small"
                onChange={handleMaxGrs1ScoreInputChange}
                error={showError}
              />
              <Button
                variant="contained"
                color="primary"
                className={classes.expandedButton}
                onClick={handleGrs1ScoreSet}
              >
                SET
              </Button>
            </Box>
          </Collapse>
        </Grid>

        {/* GRS2 score slider */}
        {props.geneticEnable && (
          <Grid item xs={12} className={classes.gridItem}>
            <Box display="flex" flexDirection="column">
              <Box flexGrow={1}>
                <Typography variant="subtitle1" className={classes.title2}>
                  GRS2 Score{"  "}
                  <FilterTooltip title={helpText} placement="right-start">
                    <HelpOutlineIcon className={classes.helpIcon} />
                  </FilterTooltip>
                </Typography>
              </Box>
              <Box>
                <Slider
                  className={classes.slider}
                  value={props.grs2ScoreRange}
                  onChange={handleGrs2ScoreRangeSliderChange}
                  disabled={!props.geneticEnable}
                  valueLabelDisplay="auto"
                  min={0}
                  max={20}
                  step={1}
                  aria-labelledby="grs2-score-range-slider"
                />
              </Box>
            </Box>
          </Grid>
        )}

        {props.geneticEnable && (
          <Grid item xs={12} className={classes.gridItem}>
            <Grid container alignItems="center" justify="space-between">
              <Grid item>
                <Typography variant="body1" color="textPrimary">
                  {props.grs2ScoreMin}
                </Typography>
              </Grid>
              <Grid item>
                <IconButton
                  className={clsx(classes.expand, {
                    [classes.expandOpen]: expanded,
                  })}
                  onClick={handleExpandClick}
                  disabled={!props.geneticEnable}
                >
                  <ExpandMoreIcon />
                </IconButton>
              </Grid>
              <Grid item>
                <Typography variant="body1" color="textPrimary">
                  {props.grs2ScoreMax}
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
                defaultValue={props.grs2ScoreMin}
                size="small"
                onChange={handleMinGrs2ScoreInputChange}
                error={showError}
              />
              <TextField
                label="To"
                variant="outlined"
                className={classes.expendedTextfield}
                defaultValue={props.grs2ScoreMax}
                size="small"
                onChange={handleMaxGrs2ScoreInputChange}
                error={showError}
              />
              <Button
                variant="contained"
                color="primary"
                className={classes.expandedButton}
                onClick={handleGrs2ScoreSet}
              >
                SET
              </Button>
            </Box>
          </Collapse>
        </Grid>

        {/* AAGRS score slider */}
        {props.geneticEnable && (
          <Grid item xs={12} className={classes.gridItem}>
            <Box display="flex" flexDirection="column">
              <Box flexGrow={1}>
                <Typography variant="subtitle1" className={classes.title2}>
                  AAGRS Score{"  "}
                  <FilterTooltip title={helpText} placement="right-start">
                    <HelpOutlineIcon className={classes.helpIcon} />
                  </FilterTooltip>
                </Typography>
              </Box>
              <Box>
                <Slider
                  className={classes.slider}
                  value={props.aagrsScoreRange}
                  onChange={handleAagrsScoreRangeSliderChange}
                  disabled={!props.geneticEnable}
                  valueLabelDisplay="auto"
                  min={0}
                  max={15}
                  step={1}
                  aria-labelledby="aagrs-score-range-slider"
                />
              </Box>
            </Box>
          </Grid>
        )}

        {props.geneticEnable && (
          <Grid item xs={12} className={classes.gridItem}>
            <Grid container alignItems="center" justify="space-between">
              <Grid item>
                <Typography variant="body1" color="textPrimary">
                  {props.aagrsScoreMin}
                </Typography>
              </Grid>
              <Grid item>
                <IconButton
                  className={clsx(classes.expand, {
                    [classes.expandOpen]: expanded,
                  })}
                  onClick={handleExpandClick}
                  disabled={!props.geneticEnable}
                >
                  <ExpandMoreIcon />
                </IconButton>
              </Grid>
              <Grid item>
                <Typography variant="body1" color="textPrimary">
                  {props.aagrsScoreMax}
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
                defaultValue={props.aagrsScoreMin}
                size="small"
                onChange={handleMinAagrsScoreInputChange}
                error={showError}
              />
              <TextField
                label="To"
                variant="outlined"
                className={classes.expendedTextfield}
                defaultValue={props.aagrsScoreMax}
                size="small"
                onChange={handleMaxAagrsScoreInputChange}
                error={showError}
              />
              <Button
                variant="contained"
                color="primary"
                className={classes.expandedButton}
                onClick={handleAagrsScoreSet}
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
    geneticEnable: state.explore.geneticEnable,
    grs1ScoreMin: state.explore.grs1ScoreMin,
    grs1ScoreMax: state.explore.grs1ScoreMax,
    grs1ScoreRange: state.explore.grs1ScoreRange,
    grs2ScoreMin: state.explore.grs2ScoreMin,
    grs2ScoreMax: state.explore.grs2ScoreMax,
    grs2ScoreRange: state.explore.grs2ScoreRange,
    aagrsScoreMin: state.explore.aagrsScoreMin,
    aagrsScoreMax: state.explore.aagrsScoreMax,
    aagrsScoreRange: state.explore.aagrsScoreRange,
  };
};

// update
const mapDispatchToProps = (dispatch) => {
  return {
    setGeneticEnable: (newGeneticEnable) =>
      dispatch({ type: "SET_GENETIC_ENABLE", value: newGeneticEnable }),
    setGrs1ScoreMin: (newGrs1ScoreMin) =>
      dispatch({ type: "SET_GRS1_SCORE_MIN", value: newGrs1ScoreMin }),
    setGrs1ScoreMax: (newGrs1ScoreMax) =>
      dispatch({ type: "SET_GRS1_SCORE_MAX", value: newGrs1ScoreMax }),
    setGrs1ScoreRange: (newGrs1ScoreRange) =>
      dispatch({ type: "SET_GRS1_SCORE_RANGE", value: newGrs1ScoreRange }),
    setGrs2ScoreMin: (newGrs2ScoreMin) =>
      dispatch({ type: "SET_GRS2_SCORE_MIN", value: newGrs2ScoreMin }),
    setGrs2ScoreMax: (newGrs2ScoreMax) =>
      dispatch({ type: "SET_GRS2_SCORE_MAX", value: newGrs2ScoreMax }),
    setGrs2ScoreRange: (newGrs2ScoreRange) =>
      dispatch({ type: "SET_GRS2_SCORE_RANGE", value: newGrs2ScoreRange }),
    setAagrsScoreMin: (newAagrsScoreMin) =>
      dispatch({ type: "SET_AAGRS_SCORE_MIN", value: newAagrsScoreMin }),
    setAagrsScoreMax: (newAagrsScoreMax) =>
      dispatch({ type: "SET_AAGRS_SCORE_MAX", value: newAagrsScoreMax }),
    setAagrsScoreRange: (newAagrsScoreRange) =>
      dispatch({ type: "SET_AAGRS_SCORE_RANGE", value: newAagrsScoreRange }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterGenetic);
