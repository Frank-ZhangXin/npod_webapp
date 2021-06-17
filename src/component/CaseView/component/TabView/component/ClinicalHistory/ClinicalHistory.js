import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import { connect } from "react-redux";
import ClinicalInformation from "./component/ClinicalInformation";
import FamilyHistory from "./component/FamilyHistory";
import Medication from "./component/Medication";
import Comment from "./component/Comment";

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

function ClinicalHistory(props) {
  const classes = useStyles();

  return (
    <div>
      <Grid container spacing={2} justify={"center"} alignItems={"stretch"}>
        <Grid item xs={12} sm={3}>
          <Paper elevation={3} className={classes.paper}>
            <ClinicalInformation />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Paper elevation={3} className={classes.paper}>
            <FamilyHistory />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Paper elevation={3} className={classes.paper}>
            <Medication />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Paper elevation={3} className={classes.paper}>
            <Comment />
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

export default connect(mapStateToProps, null)(ClinicalHistory);
