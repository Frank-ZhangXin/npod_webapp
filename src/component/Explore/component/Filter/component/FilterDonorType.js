import React, { useState } from "react";
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
  { value: "No Diabetes", label: "No Diabetes" },
  { value: "Type 1 Diabetes", label: "Type 1 Diabetes" },
  { value: "Autoantibody Positive", label: "Autoantibody Positive" },
  { value: "Type 2 Diabetes", label: "Type 2 Diabetes" },
  { value: "Other - No Diabetes", label: "Other - No Diabetes" },
  { value: "Other - Diabetes", label: "Other - Diabetes" },
  {
    value: "Type 1 Diabetes Joslin Medalist",
    label: "Type 1 Diabetes Joslin Medalist",
  },
  {
    value: "Transplant",
    label: "Transplant",
  },
  {
    value: "Cystic Fibrosis",
    label: "Cystic Fibrosis",
  },
  {
    value: "Monogenic Diabetes",
    label: "Monogenic Diabetes",
  },
  {
    value: "Gestational Diabetes",
    label: "Gestational Diabetes",
  },
  { value: "Pregnancy", label: "Pregnancy" },
  {
    value: "Gastric Bypass",
    label: "Gastric Bypass",
  },
  { value: "Ketosis-Prone Diabetes", label: "Ketosis-Prone Diabetes" },
  { value: "Pending", label: "Pending" },
];

function FilterDonorType(props) {
  const classes = useStyles();

  const helpText = (
    <React.Fragment>
      <div className={classes.helpText}>
        Hint:
        <br />
        Select one or more donor types to display in search result. When
        unselected, the filter will ignore donor type.
      </div>
    </React.Fragment>
  );

  const handleSwitch = (event) => {
    props.setDonorTypeEnable(event.target.checked);
  };

  return (
    <div>
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid item xs={12} className={classes.gridItem}>
          <Box display="flex">
            <Box flexGrow={1}>
              <Typography variant="subtitle1" className={classes.title}>
                Donor Type{"  "}
                <FilterTooltip title={helpText} placement="right-start">
                  <HelpOutlineIcon className={classes.helpIcon} />
                </FilterTooltip>
              </Typography>
            </Box>
            <Box>
              <Switch
                checked={props.donorTypeEnable}
                onChange={handleSwitch}
                name="donorTypeEnableSwitch"
                className={classes.switch}
                color="primary"
              />
            </Box>
          </Box>
        </Grid>
        {props.donorTypeEnable && (
          <Grid item xs={12} className={classes.gridItem}>
            <Select
              className={classes.multiSelect}
              value={props.selectedDonorType}
              onChange={(value) => props.setSelectedDonorType(value)}
              options={options}
              isMulti
              closeMenuOnSelect={false}
              isDisabled={!props.donorTypeEnable}
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
    donorTypeEnable: state.explore.donorTypeEnable,
    selectedDonorType: state.explore.selectedDonorType,
  };
};

// update
const mapDispatchToProps = (dispatch) => {
  return {
    setDonorTypeEnable: (newDonorTypeEnable) =>
      dispatch({ type: "SET_DONOR_TYPE_ENABLE", value: newDonorTypeEnable }),
    setSelectedDonorType: (newType) =>
      dispatch({ type: "SET_SELECTED_TYPE", value: newType }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterDonorType);
