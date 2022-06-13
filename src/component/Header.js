import "../App.css";
import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import { Auth, API } from "aws-amplify";
import { Link, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import Typography from "@material-ui/core/Typography";
import { makeStyles, withStyles } from "@material-ui/core/styles";
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
import Tooltip from "@material-ui/core/Tooltip";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";

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
  title1: {
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
  title3: {
    flexGrow: 1,
    fontWeight: 300,
    color: "#FFF",
    marginRight: "-11vw",
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
    textDecoration: "none",
  },
  authButton2: {
    marginRight: theme.spacing(1),
    color: "#FFF",
    "&:hover": {
      background: "none",
    },
    textShadow: "0 0 20px black",
    textDecoration: "none",
    borderRadius: "3px",
    border: "2px solid #fcba03",
  },
  helpText: {
    padding: "10px",
    textShadow: "0 0 20px white",
  },
}));

const HeaderTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    color: "#000000",
    border: "1px solid #dadde9",
    maxWidth: "420px",
    fontSize: 15,
  },
}))(Tooltip);

function Header(props) {
  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    try {
      const authRes = await Auth.currentAuthenticatedUser();
      console.log("Check auth response ", authRes);
      props.setUserName(authRes.username);
      props.setSignedIn(true);
      if (authRes.attributes.email_verified) {
        setEmailVerified(true);
      } else {
        setEmailVerified(false);
      }
    } catch (error) {
      console.log("Check Auth error ", error);
      props.setSignedIn(false);
    }
  }

  const classes = useStyles();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [logoSize, setLogoSize] = useState("");
  const [title1Size, setTitle1Size] = useState("");
  const [title2Size, setTitle2Size] = useState("");
  const [avatarSize, setAvatarSize] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);

  const updateResponsiveWidth = () => {
    if (window.innerWidth >= 1920) {
      setLogoSize("200vh");
      setTitle1Size("h3");
      setTitle2Size("h4");
      setAvatarSize("large");
    } else if (window.innerWidth >= 1360 && window.innerWidth < 1920) {
      setLogoSize("180vh");
      setTitle1Size("h3");
      setTitle2Size("h4");
      setAvatarSize("large");
    } else if (window.innerWidth >= 800 && window.innerWidth < 1360) {
      setLogoSize("160vh");
      setTitle1Size("h4");
      setTitle2Size("h5");
      setAvatarSize("medium");
    } else {
      setLogoSize("140vh");
      setTitle1Size("h4");
      setTitle2Size("h5");
      setAvatarSize("medium");
    }
  };
  useEffect(() => {
    updateResponsiveWidth();
    window.addEventListener("resize", updateResponsiveWidth);
    return () => window.removeEventListener("resize", updateResponsiveWidth);
  });

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

  const goVerifyEmailHandler = () => {
    history.push("/verifyemail");
  };

  const accountOpenHandler = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const accountCloseHandler = () => {
    setAnchorEl(null);
  };

  const helpTextBeforeSignIn = (
    <React.Fragment>
      <div className={classes.helpText}>Sign In/ Sign Up An Account</div>
    </React.Fragment>
  );

  const helpTextAfterSignIn = (
    <React.Fragment>
      <div className={classes.helpText}>Sign Out/ Account Management</div>
    </React.Fragment>
  );

  const helpTextEmailVerify = (
    <React.Fragment>
      <div className={classes.helpText}>
        Your email is not verified yet. Please go to Click here to veify it.
        Otherwise you will lose the ability to recover your account.
      </div>
    </React.Fragment>
  );

  return (
    <div>
      <Helmet>
        <title>nPOD {props.location}</title>
      </Helmet>
      <div className={classes.roots}>
        <HideOnScroll threshold={0}>
          <AppBar color="transparent" elevation={0} position="fixed">
            <Toolbar className={classes.appbarWrapper}>
              <div>
                <a style={{ textDecoration: "none" }} href="/">
                  {useLocation().pathname === "/" ? (
                    // <img src="/assets/npodLogoWhite.png" width={logoSize} />
                    <div></div>
                  ) : (
                    <Typography className={classes.title1} variant={title1Size}>
                      nPOD
                    </Typography>
                  )}
                </a>
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
                      <Typography
                        variant={title2Size}
                        style={{ fontWeight: 600 }}
                      >
                        EXPLORE CASES
                      </Typography>
                    </div>
                  </IconButton>
                </div>
              ) : (
                <div className={classes.title2}></div>
              )}

              {!emailVerified && props.signedIn ? (
                <div className={classes.title3}>
                  <HeaderTooltip title={helpTextEmailVerify} placement="bottom">
                    <IconButton
                      className={classes.authButton2}
                      aria-label="caseExplore"
                      onClick={goVerifyEmailHandler}
                    >
                      <NotificationsActiveIcon />{" "}
                      <Typography
                        variant={avatarSize}
                        style={{ fontWeight: 300, marginLeft: "5px" }}
                      >
                        Email Not Verified
                      </Typography>
                    </IconButton>
                  </HeaderTooltip>
                </div>
              ) : null}

              {props.signedIn ? (
                // After sign in
                <HeaderTooltip title={helpTextAfterSignIn} placement="left">
                  <div className={classes.title1}>
                    <IconButton
                      edge="end"
                      className={classes.authButton}
                      aria-label="avatar"
                      onClick={accountOpenHandler}
                    >
                      <AccountBoxIcon
                        className={classes.icon}
                        fontSize={avatarSize}
                      />
                      <div>
                        <Typography
                          className={classes.title1}
                          variant={title2Size}
                        >
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
                </HeaderTooltip>
              ) : (
                // Before sign in
                <HeaderTooltip title={helpTextBeforeSignIn} placement="left">
                  <IconButton
                    edge="end"
                    className={classes.authButton}
                    aria-label="signIn"
                    onClick={signInHandler}
                  >
                    <ArrowForwardIosIcon fontSize={avatarSize} />
                    <div>
                      <Typography
                        className={classes.title2}
                        variant={title2Size}
                      >
                        SIGN IN
                      </Typography>
                    </div>
                  </IconButton>
                </HeaderTooltip>
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
