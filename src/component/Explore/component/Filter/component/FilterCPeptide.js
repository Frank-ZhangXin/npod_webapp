import React, { setState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";

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
  },
  switch: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  boxContainer: {
    width: "100%",
  },
}));

function FilterCPeptide(props) {
  const classes = useStyles();

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
                C-Peptide
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
