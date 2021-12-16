import React, { useEffect, useState } from "react";
import { API, Auth } from "aws-amplify";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { CssBaseline, Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import Header from "./Header";
import { Link } from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";

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
  helpText: {
    padding: "10px",
    textShadow: "0 0 20px white",
  },
}));

const LandingPageTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    color: "#000000",
    border: "1px solid #dadde9",
    maxWidth: "420px",
    fontSize: 15,
  },
}))(Tooltip);

function LandingPage(props) {
  const classes = useStyles();
  const [caseDataNum, setCaseDataNum] = useState(0);
  const [authed, setAuthed] = useState(false);
  const history = useHistory();

  const helpTextNotAvailable = (
    <React.Fragment>
      <div className={classes.helpText}>Coming Soon</div>
    </React.Fragment>
  );

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
              <span style={{ fontWeight: 300 }}>DATA</span>{" "}
              <span style={{ fontWeight: 700 }}>PORTAL</span>
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" className={classes.centerTitle2}>
              <p style={{ fontWeight: 400 }}>Sharing for a Cure</p>
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
                <LandingPageTooltip
                  title={helpTextNotAvailable}
                  placement="top"
                >
                  <img src="/assets/landingPageImages/ExploreDatasetsNotAvailable.png" />
                </LandingPageTooltip>
              </Grid>
              <Grid item>
                <LandingPageTooltip
                  title={helpTextNotAvailable}
                  placement="top"
                >
                  <img src="/assets/landingPageImages/SubmitDatasetsNotAvailable.png" />
                </LandingPageTooltip>
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
