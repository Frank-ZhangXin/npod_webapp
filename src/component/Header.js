import "../App.css";
import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import { Auth } from "aws-amplify";
import { Link, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Slide from "@material-ui/core/Slide";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DirectionsRunIcon from "@material-ui/icons/DirectionsRun";
import LockIcon from "@material-ui/icons/Lock";

const HideOnScroll = (props) => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: props.threshold,
    target: props.window ? window() : undefined,
  });

  return (
    <Slide appear={true} direction="down" in={!trigger}>
      {props.children}
    </Slide>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    //flexGrow: 1,
    fontWeight: 600,
    color: "#FFF",
    marginRight: "1px",
  },
  title2: {
    flexGrow: 1,
    fontWeight: 600,
    color: "#FFF",
    marginRight: "1px",
  },
  icon: {
    marginRight: "3px",
  },
  appbarWrapper: {
    width: "95%",
    margin: "auto",
    marginTop: "30px",
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
  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    try {
      const authRes = await Auth.currentAuthenticatedUser();
      console.log("Check auth response ", authRes);
      props.setUserName(authRes.username);
    } catch (error) {
      console.log("Check Auth error ", error);
    }
  }

  const classes = useStyles();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);

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

  const goCaseExploreHandler = () => {
    history.push("/explore");
  };

  const goChangePasswordHandler = () => {
    history.push("/changepassword");
  };

  const accountOpenHandler = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const accountCloseHandler = () => {
    setAnchorEl(null);
  };
  console.log("current location", useLocation());
  return (
    <div>
      <Helmet>
        <title>nPOD {props.location}</title>
      </Helmet>
      <div className={classes.roots}>
        <HideOnScroll threshold={0}>
          <AppBar color="transparent" elevation={0} position="fixed">
            <Toolbar className={classes.appbarWrapper}>
              <div className={classes.title}>
                <IconButton
                  edge="end"
                  className={classes.authButton}
                  aria-label="home"
                  onClick={goHomeHandler}
                >
                  {useLocation().pathname === "/" ? (
                    <img src="/assets/npodLogo.png" width="70%" />
                  ) : (
                    <Typography className={classes.title} variant="h3">
                      nPOD
                    </Typography>
                  )}
                </IconButton>
              </div>
              {props.location === "Case Explore" ? (
                <div className={classes.title2}>
                  <IconButton
                    className={classes.authButton}
                    aria-label="caseExplore"
                    onClick={goCaseExploreHandler}
                  >
                    <ArrowForwardIosIcon />
                    <div>
                      <Typography variant="h4" className={classes.title2}>
                        CASE EXPLORE
                      </Typography>
                    </div>
                  </IconButton>
                </div>
              ) : (
                <div className={classes.title2}></div>
              )}
              {props.signedIn ? (
                // After sign in
                <div className={classes.title}>
                  <IconButton
                    edge="end"
                    className={classes.authButton}
                    aria-label="avatar"
                    onClick={accountOpenHandler}
                  >
                    <AccountBoxIcon className={classes.icon} fontSize="large" />
                    <div>
                      <Typography className={classes.title} variant="h4">
                        {props.userName}
                      </Typography>
                    </div>
                  </IconButton>
                  <Menu
                    id="avatar-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    getContentAnchorEl={null}
                    onClose={accountCloseHandler}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "center",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "center",
                    }}
                  >
                    <MenuItem onClick={goChangePasswordHandler}>
                      <ListItemIcon>
                        <LockIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="CHANGE PASSWORD" />
                    </MenuItem>
                    <MenuItem onClick={signOutHandler}>
                      <ListItemIcon>
                        <DirectionsRunIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="SIGN OUT" />
                    </MenuItem>
                  </Menu>
                </div>
              ) : (
                // Before sign in
                <IconButton
                  edge="end"
                  className={classes.authButton}
                  aria-label="signIn"
                  onClick={signInHandler}
                >
                  <ArrowForwardIosIcon fontSize="large" />
                  <div>
                    <Typography className={classes.title} variant="h4">
                      SIGN IN
                    </Typography>
                  </div>
                </IconButton>
              )}
            </Toolbar>
          </AppBar>
        </HideOnScroll>
      </div>
    </div>
  );
}

// Subscribe
const mapStateToProps = (state, ownProps) => {
  return {
    signedIn: state.auth.signedIn,
    userName: state.auth.userName,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSignedIn: (newSignedIn) =>
      dispatch({ type: "SET_SIGNEDIN", value: newSignedIn }),
    setUserName: (newUserName) =>
      dispatch({ type: "SET_USERNAME", value: newUserName }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
