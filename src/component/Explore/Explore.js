import React, { setState } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Filter from "./component/Filter/Filter";
import Result from "./component/Result/Result";
import FetchRawData from "./component/Result/component/FetchRawData";
import "../../App.css";
import { CssBaseline } from "@material-ui/core";
import Header from "../Header";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    backgroundImage: `url(${
      process.env.PUBLIC_URL + "/assets/caseExplorePage.jpg"
    })`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    //textAlign: "center",
    //backgroundColor: "#282c34",
    //flexDirection: "column",
    //alignItems: "center",
    //justifyContent: "center",
    //color: "white",
    paddingTop: "130px",
  },
  filter_paper: {
    marginBottom: "30px",
  },
  result_paper: {
    padding: theme.spacing(2),
    position: "sticky",
    top: 0,
  },
  grid: {
    width: "100%",
    justifyContent: "center",
  },
  box: {
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  box2: {
    height: "20vh",
    width: "20vh",
    backgroundColor: "#000000",
  },
}));

export default function Explore() {
  const classes = useStyles();
  return (
    <div>
      <Header location="Case Explore" />

      <div className={classes.root}>
        <Grid container spacing={1} justify={"center"} className={classes.grid}>
          <Grid item xs={12} md={3} lg={3} xl={2}>
            <Paper
              elevation={3}
              style={{
                width: "100%",
              }}
              className={classes.filter_paper}
            >
              <Filter />
            </Paper>
          </Grid>
          <Grid item xs={12} md={7} lg={8} xl={8}>
            <Paper
              elevation={3}
              style={{
                width: "100%",
              }}
              className={classes.result_paper}
            >
              <Result />
            </Paper>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
