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

function FilterGender(props) {
  const classes = useStyles();
  return (
    <div>
      <Box display="flex" justifyContent="space-between">
        <Box>
          <Typography variant="h6" className={classes.title}>
            <Box fontWeight="fontWeightBold">Sex</Box>
          </Typography>
        </Box>
        <Box>
          <Switch
            checked={props.genderEnable}
            onChange={(e) => props.setGenderEnable(e.target.checked)}
            name="genderEnableSwitch"
            className={classes.title}
            color="primary"
          />
        </Box>
      </Box>

      <FormGroup row className={classes.formGroup}>
        <Box mx={2}>
          <FormControlLabel
            control={
              <Checkbox
                checked={props.maleChecked}
                onChange={(event) => props.setMaleChecked(event.target.checked)}
                name="maleChecked"
                color="primary"
                disabled={!props.genderEnable}
              />
            }
            label="Male"
          />
        </Box>
        <Box mx={2}>
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
      </FormGroup>
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
