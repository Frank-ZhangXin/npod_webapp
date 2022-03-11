import React, { setState } from "react";
import Select from "react-select";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Tooltip from "@material-ui/core/Tooltip";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import Switch from "@material-ui/core/Switch";

const useStyles = makeStyles((theme) => ({
  multiSelect: {
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
  helpIcon: {
    fontSize: 18,
    marginLeft: "3px",
    color: "#0292FF",
  },
  helpText: {
    padding: "10px",
    textShadow: "0 0 20px white",
  },
  switch: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
}));

const FilterTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    color: "#000000",
    border: "1px solid #dadde9",
    maxWidth: "300px",
    fontSize: 15,
  },
}))(Tooltip);

const options = [
  { value: "African American", label: "African American" },
  {
    value: "American Indian/Alaska Native",
    label: "American Indian/Alaska Native",
  },
  { value: "Arab/Middle Eastern", label: "Arab/Middle Eastern" },
  { value: "Asian", label: "Asian" },
  { value: "Caucasian", label: "Caucasian" },
  {
    value: "Hawaiian/Other Pacific Islander",
    label: "Hawaiian/Other Pacific Islander",
  },
  { value: "Hispanic/Latino", label: "Hispanic/Latino" },
  { value: "Multiracial", label: "Multiracial" },
];

function FilterRace(props) {
  const classes = useStyles();

  const helpText = (
    <React.Fragment>
      <div className={classes.helpText}>
        Hint:
        <br />
        Select one or more race/ethnicity to display in search result. When
        unselected, the filter will ignore race/ethnicity.
      </div>
    </React.Fragment>
  );

  const handleSwitch = (event) => {
    props.setRaceEnable(event.target.checked);
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
                Race/Ethnicity{"  "}
                <FilterTooltip title={helpText} placement="right-start">
                  <HelpOutlineIcon className={classes.helpIcon} />
                </FilterTooltip>
              </Typography>
            </Box>
            <Box>
              <Switch
                checked={props.raceEnable}
                onChange={handleSwitch}
                name="donorTypeEnableSwitch"
                className={classes.switch}
                color="primary"
              />
            </Box>
          </Box>
        </Grid>
        {props.raceEnable && (
          <Grid item xs={12} className={classes.gridItem}>
            <Select
              className={classes.multiSelect}
              value={props.selectedRace}
              onChange={(value) => props.setSelectedRace(value)}
              options={options}
              isMulti
              closeMenuOnSelect={false}
              isDisabled={!props.raceEnable}
            />
          </Grid>
        )}
      </Grid>
    </div>
  );
}

// subscribe
const mapStateToProps = (state) => {
  return {
    raceEnable: state.explore.raceEnable,
    selectedRace: state.explore.selectedRace,
  };
};

// update
const mapDispatchToProps = (dispatch) => {
  return {
    setRaceEnable: (newRaceEnable) =>
      dispatch({ type: "SET_RACE_ENABLE", value: newRaceEnable }),
    setSelectedRace: (newRace) =>
      dispatch({ type: "SET_SELECTED_RACE", value: newRace }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterRace);
