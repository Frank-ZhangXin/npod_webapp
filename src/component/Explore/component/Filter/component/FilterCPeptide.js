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

function FilterCPeptide(props) {
  const classes = useStyles();

  const helpText = (
    <React.Fragment>
      <div className={classes.helpText}>
        Hint:
        <br />
        When the switch is off (
        <Switch color="primary" className={classes.helpIcon2} />) , the search
        will ignore c-peptide.
        <br />
        Switch on (
        <Switch checked="true" color="primary" className={classes.helpIcon2} />)
        , the search will find cases that match the selection.
        <br />
        <div className={classes.helpText2}>Notice</div>
        Detectable indicates that a measureable amount of <br />
        c-peptide was found in the donor’s serum. Undetectable indicates that
        the c-peptide result was below the limit of detection for the assay.
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
                C-Peptide{"  "}
                <FilterTooltip title={helpText} placement="right-start">
                  <HelpOutlineIcon className={classes.helpIcon} />
                </FilterTooltip>
              </Typography>
            </Box>
            <Box>
              <Switch
                checked={props.cPeptideEnable}
                onChange={(e) => props.setCPeptideEnable(e.target.checked)}
                name="CPeptideEnableSwitch"
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
                      checked={props.cPeptidePositive}
                      onChange={(event) =>
                        props.setCPeptidePositiveChecked(event.target.checked)
                      }
                      name="cPeptidePositive"
                      color="primary"
                      disabled={!props.cPeptideEnable}
                    />
                  }
                  label="+ Detectable"
                />
              </Box>
              <Box>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={props.cPeptideNegative}
                      onChange={(event) =>
                        props.setCPeptideNegativeChecked(event.target.checked)
                      }
                      name="cPeptideNegative"
                      color="secondary"
                      disabled={!props.cPeptideEnable}
                    />
                  }
                  label="- Undetectable"
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
    cPeptideEnable: state.explore.cPeptideEnable,
    cPeptidePositive: state.explore.cPeptidePositive,
    cPeptideNegative: state.explore.cPeptideNegative,
  };
};

// update
const mapDispatchToProps = (dispatch) => {
  return {
    setCPeptideEnable: (newEnable) =>
      dispatch({ type: "SET_CPEPTIDE_ENABLE", value: newEnable }),
    setCPeptidePositiveChecked: (checked) =>
      dispatch({ type: "SET_CPEPTIDE_POSITIVE", value: checked }),
    setCPeptideNegativeChecked: (checked) =>
      dispatch({ type: "SET_CPEPTIDE_NEGATIVE", value: checked }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterCPeptide);
