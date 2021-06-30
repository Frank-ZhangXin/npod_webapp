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

function FilterGender(props) {
  const classes = useStyles();

  const helpText = (
    <React.Fragment>
      <div className={classes.helpText}>
        Hint:
        <br />
        When the switch is off (
        <Switch color="primary" className={classes.helpIcon2} />) , the
        searching will ignore "Sex".
        <br />
        When the switch is on (
        <Switch checked="true" color="primary" className={classes.helpIcon2} />)
        , the searching will find cases matching the given "sex".
        <br />
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
                Sex{"  "}
                <FilterTooltip title={helpText} placement="right-start">
                  <HelpOutlineIcon className={classes.helpIcon} />
                </FilterTooltip>
              </Typography>
            </Box>
            <Box>
              <Switch
                checked={props.genderEnable}
                onChange={(e) => props.setGenderEnable(e.target.checked)}
                name="genderEnableSwitch"
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
                      checked={props.maleChecked}
                      onChange={(event) =>
                        props.setMaleChecked(event.target.checked)
                      }
                      name="maleChecked"
                      color="primary"
                      disabled={!props.genderEnable}
                    />
                  }
                  label="Male"
                />
              </Box>
              <Box>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={props.femaleChecked}
                      onChange={(event) =>
                        props.setFemaleChecked(event.target.checked)
                      }
                      name="femaleChecked"
                      color="secondary"
                      disabled={!props.genderEnable}
                    />
                  }
                  label="Female"
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
    genderEnable: state.explore.genderEnable,
    maleChecked: state.explore.maleChecked,
    femaleChecked: state.explore.femaleChecked,
  };
};

// update
const mapDispatchToProps = (dispatch) => {
  return {
    setGenderEnable: (newGenderEnable) =>
      dispatch({ type: "SET_GENDER_ENABLE", value: newGenderEnable }),
    setMaleChecked: (checked) =>
      dispatch({ type: "SET_MALE_CHECKED", value: checked }),
    setFemaleChecked: (checked) =>
      dispatch({ type: "SET_FEMALE_CHECKED", value: checked }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterGender);
