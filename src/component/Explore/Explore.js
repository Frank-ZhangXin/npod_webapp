import React, { setState } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Filter from "./component/Filter/Filter";
import Result from "./component/Result/Result";
import FetchRawData from "./component/Result/component/FetchRawData";
import "../../App.css";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    backgroundImage: `url(${
      process.env.PUBLIC_URL + "/assets/caseExplorePage.jpg"
    })`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    textAlign: "center",
    minHeight: "100vh",
    backgroundColor: "#282c34",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
  },
  paper: {
    padding: theme.spacing(2),
  },
  banner: {
    minHeight: "15vh",
    paddingTop: "15px",
  },
}));

export default function Explore() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div>
        {/* <FetchRawData /> */}
        <div className={classes.banner}>
          <Typography variant="h1">CASE EXPLORE</Typography>
        </div>
        <Grid container spacing={2} justify={"center"} alignItems={"stretch"}>
          <Grid item xs={12} md={4} lg={3} xl={2}>
            <Paper
              elevation={3}
              style={{
                width: "100%",
              }}
            >
              <Filter />
            </Paper>
          </Grid>
          <Grid item xs={12} md={7} lg={7} xl={7}>
            <Paper
              elevation={3}
              style={{
                width: "100%",
              }}
              className={classes.paper}
            >
              <Result />
            </Paper>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
