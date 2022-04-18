import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import { connect } from "react-redux";
import HistopathologyInfo from "./component/HistopathologyInfo";
import ImageLink from "./component/ImageLink";

const useStyles = makeStyles((theme) => ({
  title: {
    paddingBottom: theme.spacing(2),
  },
  content: {
    paddingTop: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.primary,
    height: "70vh",
    maxHeight: "75vh",
    overflow: "auto",
  },
}));

function Histopathology(props) {
  const classes = useStyles();

  return (
    <div>
      <Grid container spacing={1} justify={"center"} alignItems={"stretch"}>
        <Grid item xs={12} sm={3}>
          <Paper elevation={3} className={classes.paper}>
            <HistopathologyInfo />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper elevation={3} className={classes.paper}>
            <ImageLink
              type="Immunohistochemistry"
              exist={props.currentCase.Aperio_id}
              urlLinks={[
                "https://aperioeslide.ahc.ufl.edu/eSlideTray.php?DisplayHeader=true&TableName=Case&Id=" +
                  props.currentCase.Aperio_id,
              ]}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper elevation={3} className={classes.paper}>
            <ImageLink
              type="Electron_Microscope"
              exist={props.emiMap[props.currentCase.case_id]}
              urlLinks={props.emiMap[props.currentCase.case_id]}
            />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

// Subscribe
const mapStateToProps = (state) => {
  return {
    // Filtered Data
    currentCase: state.explore.currentCase,
    emiMap: state.explore.emiMap,
  };
};

export default connect(mapStateToProps, null)(Histopathology);
