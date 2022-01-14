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

function FilterInsulitis(props) {
  const classes = useStyles();

  const helpText = (
    <React.Fragment>
      <div className={classes.helpText}>
        Hint:
        <br />
        When the switch is off (
        <Switch color="primary" className={classes.helpIcon2} />) , the search
        will ignore insulitis.
        <br />
        When the switch is on (
        <Switch checked="true" color="primary" className={classes.helpIcon2} />)
        , the search will find cases that match the selection.
        <br />
        <div className={classes.helpText2}>Notice</div>
        <span className={classes.helpText2}>+</span> symbol indicates that
        insulitis was identified in pancreas sections during histopathological
        review.
        <br />
        <span className={classes.helpText2}>-</span> symbol indicates that
        insulitis was NOT identified in pancreas sections during
        histopathological review.
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
                Insulitis{"  "}
                <FilterTooltip title={helpText} placement="top">
                  <HelpOutlineIcon className={classes.helpIcon} />
                </FilterTooltip>
              </Typography>
            </Box>
            <Box>
              <Switch
                checked={props.insulitisEnable}
                onChange={(e) => props.setInsulitisEnable(e.target.checked)}
                name="insulitisEnableSwitch"
                className={classes.switch}
                color="primary"
              />
            </Box>
          </Box>
        </Grid>
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
                      checked={props.insulitisPositiveChecked}
                      onChange={(event) =>
                        props.setInsulitisPositiveChecked(event.target.checked)
                      }
                      name="positiveChecked"
                      color="primary"
                      disabled={!props.insulitisEnable}
                    />
                  }
                  label="+"
                />
              </Box>
              <Box>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={props.insulitisNegativeChecked}
                      onChange={(event) =>
                        props.setInsulitisNegativeChecked(event.target.checked)
                      }
                      name="negativeChecked"
                      color="secondary"
                      disabled={!props.insulitisEnable}
                    />
                  }
                  label="-"
                />
              </Box>
            </Box>
          </FormGroup>
        </Grid>
      </Grid>
    </div>
  );
}

// subscribe
const mapStateToProps = (state) => {
  return {
    insulitisEnable: state.explore.insulitisEnable,
    insulitisPositiveChecked: state.explore.insulitisPositiveChecked,
    insulitisNegativeChecked: state.explore.insulitisNegativeChecked,
  };
};

// update
const mapDispatchToProps = (dispatch) => {
  return {
    setInsulitisEnable: (newEnable) =>
      dispatch({ type: "SET_INSULITIS_ENABLE", value: newEnable }),
    setInsulitisPositiveChecked: (checked) =>
      dispatch({ type: "SET_INSULITIS_POSITIVE_CHECKED", value: checked }),
    setInsulitisNegativeChecked: (checked) =>
      dispatch({ type: "SET_INSULITIS_NEGATIVE_CHECKED", value: checked }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterInsulitis);
