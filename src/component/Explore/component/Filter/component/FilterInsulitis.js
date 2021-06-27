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

function FilterInsulitis(props) {
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
                Insulitis
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
