import React, { setState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
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

function FilterAutoAntibodyPositiveNumber(props) {
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
                Auto Antibody Positive
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
                      onChange={(event) =>
                        props.setOneChecked(event.target.checked)
                      }
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
                      onChange={(event) =>
                        props.setTwoChecked(event.target.checked)
                      }
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
                      onChange={(event) =>
                        props.setFourChecked(event.target.checked)
                      }
                      name="fourChecked"
                      color="default"
                      disabled={!props.aaPositiveEnable}
                    />
                  }
                  label="4"
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
