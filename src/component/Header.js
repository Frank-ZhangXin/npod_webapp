import "../App.css";
import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import { Auth } from "aws-amplify";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    flexGrow: 1,
    fontWeight: 600,
    color: "#FFF",
  },
  appbarWrapper: {
    width: "80%",
    margin: "auto",
    paddingTop: "30px",
    textShadow: "0 0 20px black",
  },
  authButton: {
    marginRight: theme.spacing(1),
    color: "#FFF",
    "&:hover": {
      background: "none",
    },
    textShadow: "0 0 20px black",
  },
}));

function Header(props) {
  const classes = useStyles();
  const history = useHistory();

  console.log("signed in state: ", props.signedIn);
  const signOutHandler = async () => {
    try {
      props.setSignedIn(false);
      await Auth.signOut();
      history.push("/");
    } catch (error) {
      console.log("sign out error ", error);
    }
  };

  const signInHandler = () => {
    history.push("/signin");
  };

  const goHomeHandler = () => {
    history.push("/");
  };

  return (
    <div>
      <Helmet>
        <title>nPOD {props.location}</title>
      </Helmet>
      <div className={classes.root}>
        <AppBar color="transparent" elevation={0} position="absolute">
          <Toolbar className={classes.appbarWrapper}>
            <div className={classes.title}>
              <IconButton
                edge="end"
                className={classes.authButton}
                aria-label="home"
                onClick={goHomeHandler}
              >
                <Typography className={classes.title} variant="h3">
                  nPOD
                </Typography>
              </IconButton>
            </div>
            {props.signedIn ? (
              <IconButton
                edge="end"
                className={classes.authButton}
                aria-label="signOut"
                onClick={signOutHandler}
              >
                <div>
                  <Typography className={classes.title} variant="h5">
                    SIGN OUT
                  </Typography>
                </div>
                <ArrowForwardIosIcon />
              </IconButton>
            ) : (
              <IconButton
                edge="end"
                className={classes.authButton}
                aria-label="signIn"
                onClick={signInHandler}
              >
                <ArrowForwardIosIcon />
                <div>
                  <Typography className={classes.title} variant="h5">
                    SIGN IN
                  </Typography>
                </div>
              </IconButton>
            )}
          </Toolbar>
        </AppBar>
      </div>
    </div>
  );
}

// Subscribe
const mapStateToProps = (state, ownProps) => {
  return {
    signedIn: state.auth.signedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSignedIn: (newSignedIn) =>
      dispatch({ type: "SET_SIGNEDIN", value: newSignedIn }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
