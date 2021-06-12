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

function FilterInsulitis(props) {
  const classes = useStyles();

  return (
    <div>
      <Box display="flex" justifyContent="space-between">
        <Box>
          <Typography variant="h6" className={classes.title}>
            <Box fontWeight="fontWeightBold">Insulitis</Box>
          </Typography>
        </Box>
        <Box>
          <Switch
            checked={props.insulitisEnable}
            onChange={(e) => props.setInsulitisEnable(e.target.checked)}
            name="insulitisEnableSwitch"
            className={classes.title}
          />
        </Box>
      </Box>
      <FormGroup row className={classes.formGroup}>
        <Box mx={2}>
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
        <Box mx={2}>
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
      </FormGroup>
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
