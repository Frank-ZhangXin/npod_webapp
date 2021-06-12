import React, { setState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
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

function FilterAutoAntiboy(props) {
  const classes = useStyles();

  return (
    <div>
      <Box display="flex" justifyContent="space-between">
        <Box>
          <Typography variant="h6" className={classes.title}>
            <Box fontWeight="fontWeightBold">Auto Antibody</Box>
          </Typography>
        </Box>
        <Box>
          <Switch
            checked={props.aaEnable}
            onChange={(e) => props.setAAEnable(e.target.checked)}
            name="autoAntibodyEnableSwitch"
            className={classes.title}
          />
        </Box>
      </Box>

      <FormGroup className={classes.formGroup}>
        {/* GADA Positive and Negative */}
        <Grid container spacing={0} alignItems="center" justify="space-evenly">
          <Grid item>
            <h5>GADA</h5>
          </Grid>
          <Grid item>
            <FormControlLabel
              control={
                <Checkbox
                  checked={props.gadaP}
                  onChange={(event) => props.setGadaP(event.target.checked)}
                  name="gadaP"
                  color="primary"
                  disabled={!props.aaEnable}
                />
              }
              label="+"
            />
          </Grid>
          {/* <Grid item>
            <FormControlLabel
              control={
                <Checkbox
                  checked={props.gadaN}
                  onChange={(event) => props.setGadaN(event.target.checked)}
                  name="gadaN"
                  color="secondary"
                />
              }
              label="-"
            />
          </Grid> */}
        </Grid>
        {/* IA2A Positive and Negative */}
        <Grid container spacing={0} alignItems="center" justify="space-evenly">
          <Grid item>
            <h5>IA2A</h5>
          </Grid>
          <Grid item>
            <FormControlLabel
              control={
                <Checkbox
                  checked={props.ia2aP}
                  onChange={(event) => props.setIa2aP(event.target.checked)}
                  name="ia2aP"
                  color="primary"
                  disabled={!props.aaEnable}
                />
              }
              label="+"
            />
          </Grid>
          {/* <Grid item>
            <FormControlLabel
              control={
                <Checkbox
                  checked={props.ia2aN}
                  onChange={(event) => props.setIa2aN(event.target.checked)}
                  name="ia2aN"
                  color="secondary"
                />
              }
              label="-"
            />
          </Grid> */}
        </Grid>
        {/* mIAA Positive and Negative */}
        <Grid container spacing={0} alignItems="center" justify="space-evenly">
          <Grid item>
            <h5>mIAA</h5>
          </Grid>
          <Grid item>
            <FormControlLabel
              control={
                <Checkbox
                  checked={props.miaaP}
                  onChange={(event) => props.setMiaaP(event.target.checked)}
                  name="miaaP"
                  color="primary"
                  disabled={!props.aaEnable}
                />
              }
              label="+"
            />
          </Grid>
          {/* <Grid item>
            <FormControlLabel
              control={
                <Checkbox
                  checked={props.miaaN}
                  onChange={(event) => props.setMiaaN(event.target.checked)}
                  name="miaaN"
                  color="secondary"
                />
              }
              label="-"
            />
          </Grid> */}
        </Grid>
        {/* ZnT8A Positive and Negative */}
        <Grid container spacing={0} alignItems="center" justify="space-evenly">
          <Grid item>
            <h5>ZnT8A</h5>
          </Grid>
          <Grid item>
            <FormControlLabel
              control={
                <Checkbox
                  checked={props.znt8aP}
                  onChange={(event) => props.setZnt8aP(event.target.checked)}
                  name="znt8aP"
                  color="primary"
                  disabled={!props.aaEnable}
                />
              }
              label="+"
            />
          </Grid>
          {/* <Grid item>
            <FormControlLabel
              control={
                <Checkbox
                  checked={props.znt8aN}
                  onChange={(event) => props.setZnt8aN(event.target.checked)}
                  name="znt8aN"
                  color="secondary"
                />
              }
              label="-"
            />
          </Grid> */}
        </Grid>
      </FormGroup>
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
