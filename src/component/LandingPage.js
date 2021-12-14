import React, { useEffect, useState } from "react";
import { API, Auth } from "aws-amplify";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { CssBaseline, Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import Header from "./Header";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    backgroundImage: `url(${
      process.env.PUBLIC_URL + "/assets/landingPage.jpg"
    })`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    overflow: "hidden",
  },
  centerBox: {
    height: "84vh",
  },
  centerTitle: {
    color: "#fff",
    fontSize: "6.5rem",
    textShadow: "0 0 20px black",
    color: "#a9c24a",
    fontFamily: "Open Sans",
  },
  centerTitle2: {
    marginTop: "-70px",
    color: "#fff",
    fontSize: "3rem",
    textShadow: "0 0 20px black",
    fontFamily: "Open Sans",
  },
  centerTitle3: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "-20px",
    marginRight: "50px",
    color: "#fff",
    fontSize: "1.5rem",
    fontWeight: "600",
    textShadow: "0 0 20px black",
    fontFamily: "Open Sans",
  },
  centerContent: {
    color: "#fff",
    fontSize: "2rem",
    textShadow: "0 0 20px black",
  },
  centerButton: {
    marginLeft: "30px",
    textShadow: "0 0 20px black",
  },
  centerButtonEmpty: {
    margin: "50px",
  },
  colorText: {
    color: "#5AFF3D",
  },
  linkText: {
    textDecoration: "none",
    padding: "2px",
    color: "white",
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

  const handleHelp = () => {
    history.push("/help");
  };

  const handleContact = () => {
    history.push("/contact");
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
            <Typography variant="h1" className={classes.centerTitle}>
              DATA <span style={{ fontWeight: 900 }}>PORTAL</span>
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" className={classes.centerTitle2}>
              <p>Sharing for a Cure</p>
            </Typography>
          </Grid>
        </Grid>
        <div>
          {props.signedIn ? (
            <Grid container spacing={4} className={classes.centerButton}>
              <Grid item>
                <Link onClick={handleExploreCase}>
                  <img src="/assets/landingPageImages/ExploreCases.png" />
                </Link>
              </Grid>
              <Grid item>
                <a target="_blank" href="http://npoddatashare.coh.org">
                  <img src="/assets/landingPageImages/SampleInventory.png" />
                </a>
              </Grid>
              <Grid item>
                <img src="/assets/landingPageImages/ExploreDatasetsNotAvailable.png" />
              </Grid>
              <Grid item>
                <img src="/assets/landingPageImages/SubmitDatasetsNotAvailable.png" />
              </Grid>
            </Grid>
          ) : (
            <div className={classes.centerButtonEmpty}>&nbsp;</div>
          )}
        </div>
        <div>
          <Typography variant="subtitle1" className={classes.centerTitle3}>
            <Link onClick={handleHelp} className={classes.linkText}>
              HELP
            </Link>{" "}
            |{" "}
            <Link onClick={handleContact} className={classes.linkText}>
              CONTACT
            </Link>
          </Typography>
        </div>
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
