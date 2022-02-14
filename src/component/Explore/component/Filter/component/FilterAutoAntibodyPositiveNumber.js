import React, { setState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
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
  helpText2: {
    color: "#FF0000",
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

function FilterAutoAntibodyPositiveNumber(props) {
  const classes = useStyles();

  const helpText = (
    <React.Fragment>
      <div className={classes.helpText}>
        Hint:
        <br />
        When the switch is off (
        <Switch color="primary" className={classes.helpIcon2} />) , the search
        will ignore autoantibody positive status.
        <br />
        When the switch is on (
        <Switch checked="true" color="primary" className={classes.helpIcon2} />)
        , the search will find cases that match the selection.
        <br />
        <div className={classes.helpText2}>Notice</div>
        Each option represents the total count of positive autoantibodies. Ex.
        If 2 and 3 are checked, all cases in the search result will have either
        2 or 3 positive autoantibodies.
      </div>
    </React.Fragment>
  );

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
                Autoantibody Positive{"  "}
                <FilterTooltip title={helpText} placement="right-start">
                  <HelpOutlineIcon className={classes.helpIcon} />
                </FilterTooltip>
              </Typography>
            </Box>
            <Box>
              <Switch
                checked={props.aaPositiveEnable}
                onChange={(e) => props.setAAPositiveEnable(e.target.checked)}
                name="aaPositiveEnableSwitch"
                className={classes.switch}
                color="primary"
              />
            </Box>
          </Box>
        </Grid>
        {props.aaPositiveEnable && (
          <Grid item xs={12} className={classes.gridItem}>
            <FormGroup row className={classes.formGroup}>
              <Box
                display="flex"
                flexDirection="column"
                className={classes.boxContainer}
              >
                <Box>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={props.zeroChecked}
                        onChange={(event) =>
                          props.setZeroChecked(event.target.checked)
                        }
                        name="zeroChecked"
                        color="primary"
                        disabled={!props.aaPositiveEnable}
                      />
                    }
                    label="0"
                  />
                </Box>

                <Box>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={props.oneChecked}
                        onChange={(event) =>
                          props.setOneChecked(event.target.checked)
                        }
                        name="oneChecked"
                        color="primary"
                        disabled={!props.aaPositiveEnable}
                      />
                    }
                    label="1"
                  />
                </Box>

                <Box>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={props.twoChecked}
                        onChange={(event) =>
                          props.setTwoChecked(event.target.checked)
                        }
                        name="twoChecked"
                        color="primary"
                        disabled={!props.aaPositiveEnable}
                      />
                    }
                    label="2"
                  />
                </Box>

                <Box>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={props.threeChecked}
                        onChange={(event) =>
                          props.setThreeChecked(event.target.checked)
                        }
                        name="threeChecked"
                        color="primary"
                        disabled={!props.aaPositiveEnable}
                      />
                    }
                    label="3"
                  />
                </Box>

                <Box>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={props.fourChecked}
                        onChange={(event) =>
                          props.setFourChecked(event.target.checked)
                        }
                        name="fourChecked"
                        color="primary"
                        disabled={!props.aaPositiveEnable}
                      />
                    }
                    label="4"
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
    aaPositiveEnable: state.explore.aaPositiveEnable,
    zeroChecked: state.explore.zeroChecked,
    oneChecked: state.explore.oneChecked,
    twoChecked: state.explore.twoChecked,
    threeChecked: state.explore.threeChecked,
    fourChecked: state.explore.fourChecked,
  };
};

// update
const mapDispatchToProps = (dispatch) => {
  return {
    setAAPositiveEnable: (newEnable) =>
      dispatch({ type: "SET_AA_POSITIVE_ENABLE", value: newEnable }),
    setZeroChecked: (checked) =>
      dispatch({ type: "SET_ZERO_CHECKED", value: checked }),
    setOneChecked: (checked) =>
      dispatch({ type: "SET_ONE_CHECKED", value: checked }),
    setTwoChecked: (checked) =>
      dispatch({ type: "SET_TWO_CHECKED", value: checked }),
    setThreeChecked: (checked) =>
      dispatch({ type: "SET_THREE_CHECKED", value: checked }),
    setFourChecked: (checked) =>
      dispatch({ type: "SET_FOUR_CHECKED", value: checked }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterAutoAntibodyPositiveNumber);
