import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Auth from "@aws-amplify/auth";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Alert from "@material-ui/lab/Alert";
import Fade from "@material-ui/core/Fade";
import AuthHeader from "../component/AuthHeader";

// TODO: Remember me function need further implementation.
// For now, Cognito will let user opt in remembering device.

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://nPOD.org/">
        nPOD
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  alert: {
    position: "fixed",
    bottom: 0,
    width: "100%",
  },
}));

function SignIn(props) {
  useEffect(() => {
    const signInType =
      (props.location.state && props.location.state.from) || "";
    if (signInType === "forgotpassword") {
      setSuccessMsg("Password reset is successful! Please sign in");
      showAlertHandler("success");
    } else if (signInType === "signupconfirm") {
      setSuccessMsg("Sign up is successful! Please sign in");
      showAlertHandler("success");
    } else if (signInType === "changepassword") {
      setErrorMsg("Please sign in first to change password.");
      showAlertHandler("fail");
    }
  }, []);

  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState(null);
  const [showFail, setShowFail] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const history = useHistory();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleRememberMe = () => {
    setRemember(!remember);
  };

  const handleSumbit = async function (event) {
    event.preventDefault();
    try {
      const response = await Auth.signIn(username, password);
      console.log("Sign in response ", response);
      props.setSignedIn(true);
      props.setUserName(username);
      history.push("/");
    } catch (error) {
      console.log("signin error: ", error);
      setErrorMsg(error.message);
      showAlertHandler("fail");
    }
  };

  const showAlertHandler = (type) => {
    if (type === "success") {
      setShowSuccess(true);
      const timer = setTimeout(() => {
        setShowSuccess(false);
      }, 2000);
    } else if (type === "fail") {
      setShowFail(true);
      const timer = setTimeout(() => {
        setShowFail(false);
      }, 2000);
    }
  };

  return (
    <div>
      <AuthHeader location="Sign In" />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSumbit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              onChange={(event) => setUsername(event.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              onChange={(event) => setPassword(event.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  value="remember"
                  color="primary"
                  onChange={handleRememberMe}
                  defaultValue={remember}
                />
              }
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/forgotpassword" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
      <Fade in={showSuccess}>
        <Alert variant="filled" severity="success" className={classes.alert}>
          {successMsg || "Success."}
        </Alert>
      </Fade>
      <Fade in={showFail}>
        <Alert variant="filled" severity="error" className={classes.alert}>
          {errorMsg || "Unknown error."}
        </Alert>
      </Fade>
    </div>
  );
}

// Subscribe
const mapStateToProps = (state, ownProps) => {
  return {
    signedIn: state.auth.signedIn,
  };
};

// Update
const mapDispatchToProps = (dispatch) => {
  return {
    setSignedIn: (newSignedIn) =>
      dispatch({ type: "SET_SIGNEDIN", value: newSignedIn }),
    setUserName: (newUserName) =>
      dispatch({ type: "SET_USERNAME", value: newUserName }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
