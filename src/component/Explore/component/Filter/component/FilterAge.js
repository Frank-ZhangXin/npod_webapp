import React, { useState, useEffect } from "react";
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

function FilterAge(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [newMin, setNewMin] = useState(props.ageMin);
  const [newMax, setNewMax] = useState(props.ageMax);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (!props.ageEnable) {
      setExpanded(false);
    }
  });

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleAgeRangeSliderChange = (event, newAgeRange) => {
    props.setAgeRange(newAgeRange);
  };

  const handleMinAgeInputChange = (event) => {
    setNewMin(event.target.value);
  };

  const handleMaxAgeInputChange = (event) => {
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
      props.setAgeMin(numMin);
      props.setAgeMax(numMax);
      setShowError(false);
    } else {
      console.log("Invalid input!");
      setShowError(true);
    }
  };

  const handleSwitch = (event) => {
    props.setAgeEnable(event.target.checked);
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
                Age
              </Typography>
            </Box>
            <Box>
              <Switch
                checked={props.ageEnable}
                onChange={handleSwitch}
                name="ageEnableSwitch"
                className={classes.switch}
                color="primary"
              />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} className={classes.gridItem}>
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
                {props.ageMin}
              </Typography>
            </Grid>
            <Grid item>
              <IconButton
                className={clsx(classes.expand, {
                  [classes.expandOpen]: expanded,
                })}
                onClick={handleExpandClick}
                disabled={!props.ageEnable}
              >
                <ExpandMoreIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <Typography variant="body1" color="textPrimary">
                {props.ageMax}
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
                defaultValue={props.ageMin}
                size="small"
                onChange={handleMinAgeInputChange}
                error={showError}
              />
              <TextField
                label="To"
                variant="outlined"
                className={classes.expendedTextfield}
                defaultValue={props.ageMax}
                size="small"
                onChange={handleMaxAgeInputChange}
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
