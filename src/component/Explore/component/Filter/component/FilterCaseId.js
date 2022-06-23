import React, { useState, useEffect } from "react";
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
    paddingBottom: "10px",
  },
  gridContainer: (props) => {
    return props.caseIDEnable
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
    width: (props) => (props.caseIDEnable ? "85%" : "75%"),
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
  helpIcon: {
    fontSize: 18,
    marginLeft: "3px",
    color: "#0292FF",
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
    maxWidth: "300px",
    fontSize: 15,
  },
}))(Tooltip);

function FilterCaseId(props) {
  const classes = useStyles(props);
  const options = [];
  for (let i = 0; i < props.allCaseId.length; i++) {
    options.push({ value: props.allCaseId[i], label: props.allCaseId[i] });
  }

  const helpText = (
    <React.Fragment>
      <div className={classes.helpText}>
        Hint:
        <br />
        Make a customized case group by selecting donor case IDs.
      </div>
    </React.Fragment>
  );

  const handleSwitch = (event) => {
    props.setCaseIDEnable(event.target.checked);
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
                Case ID{"  "}
                <FilterTooltip title={helpText} placement="right-start">
                  <HelpOutlineIcon className={classes.helpIcon} />
                </FilterTooltip>
              </Typography>
            </Box>
            <Box>
              <Switch
                checked={props.caseIDEnable}
                onChange={handleSwitch}
                name="CaseIDEnableSwitch"
                className={classes.switch}
                color="primary"
              />
            </Box>
          </Box>
        </Grid>
        {props.caseIDEnable && (
          <Grid item xs={12} className={classes.gridItem}>
            <Select
              className={classes.multiSelect}
              value={props.selectedDonorType}
              onChange={(value) => props.setSelectedCaseId(value)}
              options={options}
              isMulti
              closeMenuOnSelect={false}
              isDisabled={!props.caseIDEnable}
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
    caseIDEnable: state.explore.caseIDEnable,
    selectedCaseId: state.explore.selectedCaseId,
    allCaseId: state.explore.allCaseId,
  };
};

// update
const mapDispatchToProps = (dispatch) => {
  return {
    setCaseIDEnable: (newCaseIDEnable) =>
      dispatch({ type: "SET_CASE_ID_ENABLE", value: newCaseIDEnable }),
    setSelectedCaseId: (newType) =>
      dispatch({ type: "SET_SELECTED_CASE_ID", value: newType }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterCaseId);
