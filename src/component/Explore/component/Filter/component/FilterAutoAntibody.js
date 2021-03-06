import React, { setState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Switch from "@material-ui/core/Switch";
import { connect } from "react-redux";
import Tooltip from "@material-ui/core/Tooltip";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";

const useStyles = makeStyles((theme) => ({
  formGroup: {
    alignItems: "center",
    justifyContent: "center",
  },
  gridContainer: (props) => {
    return props.aaEnable
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
    width: (props) => (props.aaEnable ? "85%" : "75%"),
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

function FilterAutoAntiboy(props) {
  const classes = useStyles(props);

  const helpText = (
    <React.Fragment>
      <div className={classes.helpText}>
        Hint:
        <br />
        When the switch is off (
        <Switch color="primary" className={classes.helpIcon2} />) , the search
        will ignore autoantibody status.
        <br />
        When the switch is on (
        <Switch checked="true" color="primary" className={classes.helpIcon2} />)
        , the search will find cases that match the selection.
        <br />
        <div className={classes.helpText2}>Notice</div>
        The search will IGNORE unchecked Aab options rather than excluding them.
      </div>
    </React.Fragment>
  );

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
                Autoantibody{"  "}
                <FilterTooltip title={helpText} placement="right-start">
                  <HelpOutlineIcon className={classes.helpIcon} />
                </FilterTooltip>
              </Typography>
            </Box>
            <Box>
              <Switch
                checked={props.aaEnable}
                onChange={(e) => props.setAAEnable(e.target.checked)}
                name="autoAntibodyEnableSwitch"
                className={classes.title}
                color="primary"
              />
            </Box>
          </Box>
        </Grid>
        {props.aaEnable && (
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
                        checked={props.gadaP}
                        onChange={(event) =>
                          props.setGadaP(event.target.checked)
                        }
                        name="gadaP"
                        color="primary"
                        disabled={!props.aaEnable}
                      />
                    }
                    label="GADA +"
                  />
                </Box>
                <Box>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={props.ia2aP}
                        onChange={(event) =>
                          props.setIa2aP(event.target.checked)
                        }
                        name="ia2aP"
                        color="primary"
                        disabled={!props.aaEnable}
                      />
                    }
                    label="IA2A +"
                  />
                </Box>
                <Box>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={props.miaaP}
                        onChange={(event) =>
                          props.setMiaaP(event.target.checked)
                        }
                        name="miaaP"
                        color="primary"
                        disabled={!props.aaEnable}
                      />
                    }
                    label="mIAA +"
                  />
                </Box>
                <Box>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={props.znt8aP}
                        onChange={(event) =>
                          props.setZnt8aP(event.target.checked)
                        }
                        name="znt8aP"
                        color="primary"
                        disabled={!props.aaEnable}
                      />
                    }
                    label="ZnT8A +"
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
    aaEnable: state.explore.aaEnable,
    gadaP: state.explore.gadaP,
    gadaN: state.explore.gadaN,
    ia2aP: state.explore.ia2aP,
    ia2aN: state.explore.ia2aN,
    miaaP: state.explore.miaaP,
    miaaN: state.explore.miaaN,
    znt8aP: state.explore.znt8aP,
    znt8aN: state.explore.znt8aN,
  };
};

// update
const mapDispatchToProps = (dispatch) => {
  return {
    setAAEnable: (newEnable) =>
      dispatch({ type: "SET_AA_ENABLE", value: newEnable }),
    setGadaP: (checked) => dispatch({ type: "SET_GADAP", value: checked }),
    setGadaN: (checked) => dispatch({ type: "SET_GADAN", value: checked }),
    setIa2aP: (checked) => dispatch({ type: "SET_IA2AP", value: checked }),
    setIa2aN: (checked) => dispatch({ type: "SET_IA2AN", value: checked }),
    setMiaaP: (checked) => dispatch({ type: "SET_MIAAP", value: checked }),
    setMiaaN: (checked) => dispatch({ type: "SET_MIAAN", value: checked }),
    setZnt8aP: (checked) => dispatch({ type: "SET_ZNT8AP", value: checked }),
    setZnt8aN: (checked) => dispatch({ type: "SET_ZNT8AN", value: checked }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterAutoAntiboy);
