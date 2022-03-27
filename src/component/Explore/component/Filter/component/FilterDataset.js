import React, { setState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import Tooltip from "@material-ui/core/Tooltip";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";

const useStyles = makeStyles((theme) => ({
  formGroup: {
    alignItems: "center",
    justifyContent: "center",
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
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
  },
  switch: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  boxContainer: {
    width: "100%",
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

function FilterDataset(props) {
  const classes = useStyles();

  const helpText = (
    <React.Fragment>
      <div className={classes.helpText}>
        Hint:
        <br />
        When the switch is off (
        <Switch color="primary" className={classes.helpIcon2} />) , the search
        will ignore dataset.
        <br />
        When the switch is on (
        <Switch checked="true" color="primary" className={classes.helpIcon2} />)
        , the search will find cases that match the selection.
        <br />
      </div>
    </React.Fragment>
  );

  return (
    <div>
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid item xs={12} className={classes.gridItem}>
          <Box display="flex">
            <Box flexGrow={1}>
              <Typography variant="subtitle1" className={classes.title}>
                Available Datasets{"  "}
                <FilterTooltip title={helpText} placement="right-start">
                  <HelpOutlineIcon className={classes.helpIcon} />
                </FilterTooltip>
              </Typography>
            </Box>
            <Box>
              <Switch
                checked={props.datasetEnable}
                onChange={(e) => props.setDatasetEnable(e.target.checked)}
                name="datasetEnableSwitch"
                className={classes.switch}
                color="primary"
              />
            </Box>
          </Box>
        </Grid>
        {props.datasetEnable && (
          <Grid item xs={12} className={classes.gridItem}>
            <FormGroup row className={classes.formGroup}>
              <Box
                display="flex"
                //justifyContent={"space-between"}
                flexDirection="column"
                className={classes.boxContainer}
              >
                <Box>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={props.functionalAssayChecked}
                        onChange={(event) =>
                          props.setFunctionalAssayChecked(event.target.checked)
                        }
                        name="functionalAssayChecked"
                        color="primary"
                        disabled={!props.datasetEnable}
                      />
                    }
                    label="Functional Assay"
                  />
                </Box>
                <Box>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={props.electronMicroscopyChecked}
                        onChange={(event) =>
                          props.setElectronMicroscopyChecked(
                            event.target.checked
                          )
                        }
                        name="electronMicroscopyChecked"
                        color="primary"
                        disabled={!props.datasetEnable}
                      />
                    }
                    label="Electron Microscopy"
                  />
                </Box>
                <Box>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={props.highResHLAChecked}
                        onChange={(event) =>
                          props.setHighResHLAChecked(event.target.checked)
                        }
                        name="highResHLAChecked"
                        color="primary"
                        disabled={!props.datasetEnable}
                      />
                    }
                    label="High Resolution HLA"
                  />
                </Box>
                <Box>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={props.immunophenotypingChecked}
                        onChange={(event) =>
                          props.setImmunophenotypingChecked(
                            event.target.checked
                          )
                        }
                        name="immunophenotypingChecked"
                        color="primary"
                        disabled={!props.datasetEnable}
                      />
                    }
                    label="Immunophenotyping"
                  />
                </Box>
              </Box>
            </FormGroup>
          </Grid>
        )}
      </Grid>
    </div>
  );
}

// subscribe
const mapStateToProps = (state) => {
  return {
    datasetEnable: state.explore.datasetEnable,
    functionalAssayChecked: state.explore.functionalAssayChecked,
    electronMicroscopyChecked: state.explore.electronMicroscopyChecked,
    highResHLAChecked: state.explore.highResHLAChecked,
    immunophenotypingChecked: state.explore.immunophenotypingChecked,
  };
};

// update
const mapDispatchToProps = (dispatch) => {
  return {
    setDatasetEnable: (newDatasetEnable) =>
      dispatch({ type: "SET_DATASET_ENABLE", value: newDatasetEnable }),
    setFunctionalAssayChecked: (checked) =>
      dispatch({ type: "SET_FUNCTIONALASSAY_CHECKED_ENABLE", value: checked }),
    setElectronMicroscopyChecked: (checked) =>
      dispatch({
        type: "SET_ELECTRONMICROSCOPY_CHECKED_ENABLE",
        value: checked,
      }),
    setHighResHLAChecked: (checked) =>
      dispatch({
        type: "SET_HIGHRESHLA_CHECKED_ENABLE",
        value: checked,
      }),
    setImmunophenotypingChecked: (checked) =>
      dispatch({
        type: "SET_IMMUNOPHENOTYPING_CHECKED_ENABLE",
        value: checked,
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterDataset);
