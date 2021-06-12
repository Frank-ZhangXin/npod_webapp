import React, { setState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Switch from "@material-ui/core/Switch";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  formGroup: {
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    margin: theme.spacing(3),
  },
}));

function FilterCPeptide(props) {
  const classes = useStyles();

  return (
    <div>
      <Box display="flex" justifyContent="space-between">
        <Box>
          <Typography variant="h6" className={classes.title}>
            <Box fontWeight="fontWeightBold">C-Peptide Detectable</Box>
          </Typography>
        </Box>
        <Box>
          <Switch
            checked={props.cPeptideEnable}
            onChange={(e) => props.setCPeptideEnable(e.target.checked)}
            name="CPeptideEnableSwitch"
            className={classes.title}
          />
        </Box>
      </Box>

      <FormGroup row className={classes.formGroup}>
        <Box mx={2}>
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
            label="+"
          />
        </Box>
        <Box mx={2}>
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
            label="-"
          />
        </Box>
      </FormGroup>
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
