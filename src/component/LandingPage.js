import React, { useEffect, useState } from "react";
import { API, Auth } from "aws-amplify";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { CssBaseline } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import Header from "./Header";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    backgroundImage: `url(${
      process.env.PUBLIC_URL + "/assets/landingPage.jpg"
    })`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
  centerBox: {
    height: "100vh",
  },
  centerTitle: {
    color: "#fff",
    fontSize: "4.5rem",
    textShadow: "0 0 20px black",
  },
  centerContent: {
    color: "#fff",
    fontSize: "2rem",
    textShadow: "0 0 20px black",
  },
  centerButton: {
    border: "2px solid",
    borderColor: "#fff",
    color: "#fff",
    fontSize: "2rem",
    textShadow: "0 0 20px black",
  },
  colorText: {
    color: "#5AFF3D",
  },
}));

function LandingPage(props) {
  const classes = useStyles();
  const [caseDataNum, setCaseDataNum] = useState(0);
  const [authed, setAuthed] = useState(false);
  const history = useHistory();
  // useEffect(() => {
  //
  //   }
  // }, []);
  const handleExploreCase = () => {
    history.push("/explore");
  };

  return (
    <div>
      <Header location="Home" />
      <div className={classes.root}>
        <CssBaseline />
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          className={classes.centerBox}
        >
          <Grid item>
            <h1 className={classes.centerTitle}>WELCOME TO NPOD!</h1>
          </Grid>
          <Grid item>
            {props.signedIn ? (
              <Button
                variant="outlined"
                size="large"
                className={classes.centerButton}
                onClick={handleExploreCase}
              >
                EXPLORE CASES
              </Button>
            ) : null}
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

// Subscribe
const mapStateToProps = (state) => {
  return {
    signedIn: state.auth.signedIn,
  };
};

// Update
const mapDispatchToProps = (dispatch) => {
  return {
    setSignedIn: (newSignedIn) =>
      dispatch({ type: "SET_SIGNEDIN", value: newSignedIn }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
