import React, { setState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Switch from "@material-ui/core/Switch";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  formGroup: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    margin: theme.spacing(3),
  },
}));

function FilterAutoAntibodyPositiveNumber(props) {
  const classes = useStyles();

  return (
    <div>
      <Box display="flex" justifyContent="space-between">
        <Box>
          <Typography variant="h6" className={classes.title}>
            <Box fontWeight="fontWeightBold">Auto Antibody Positive</Box>
          </Typography>
        </Box>
        <Box>
          <Switch
            checked={props.aaPositiveEnable}
            onChange={(e) => props.setAAPositiveEnable(e.target.checked)}
            name="aaPositiveEnableSwitch"
            className={classes.title}
          />
        </Box>
      </Box>

      <FormGroup row className={classes.formGroup}>
        <Box>
          <FormControlLabel
            control={
              <Checkbox
                checked={props.zeroChecked}
                onChange={(event) => props.setZeroChecked(event.target.checked)}
                name="zeroChecked"
                color="default"
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
                onChange={(event) => props.setOneChecked(event.target.checked)}
                name="oneChecked"
                color="default"
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
                onChange={(event) => props.setTwoChecked(event.target.checked)}
                name="twoChecked"
                color="default"
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
                color="default"
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
                onChange={(event) => props.setFourChecked(event.target.checked)}
                name="fourChecked"
                color="default"
                disabled={!props.aaPositiveEnable}
              />
            }
            label="4"
          />
        </Box>
      </FormGroup>
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
