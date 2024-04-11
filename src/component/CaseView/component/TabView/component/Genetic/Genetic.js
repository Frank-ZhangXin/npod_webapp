import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import { connect } from "react-redux";
import Score from "./component/Score";
import Percentile from "./component/Percentile";
import ScoreAndPercentile from "./component/ScoreAndPercentile";
import Availability from "./component/Availability";
import Admixture from "./component/Admixture";
import GRS1Snps from "./component/GRS1Snps";
import GRS2Snps from "./component/GRS2Snps";
import AAGRSSnps from "./component/AAGRSSnps";
import Reference from "./component/Reference";

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

function Genetic(props) {
  const classes = useStyles();

  return (
    <div>
      <Grid container spacing={2} justify={"center"} alignItems={"stretch"}>
        <Grid item xs={12} md={6} lg={4} xl={3}>
          <Paper elevation={3} className={classes.paper}>
            <ScoreAndPercentile />
            {/* <Score />
            <Percentile /> */}
            <Availability />
            <Admixture />
            <Reference />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={2} xl={3}>
          <Paper elevation={3} className={classes.paper}>
            <GRS1Snps />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={2} xl={3}>
          <Paper elevation={3} className={classes.paper}>
            <GRS2Snps />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={2} xl={3}>
          <Paper elevation={3} className={classes.paper}>
            <AAGRSSnps />
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
  };
};

export default connect(mapStateToProps, null)(Genetic);
