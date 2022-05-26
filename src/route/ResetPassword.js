import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Auth } from "@aws-amplify/auth";
import { useHistory } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Alert from "@material-ui/lab/Alert";
import Fade from "@material-ui/core/Fade";
import AuthHeader from "../component/AuthHeader";
import AlertDialog from "../component/AlertDialog";

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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  alert: {
    position: "fixed",
    bottom: 0,
    width: "100%",
  },
  passwordHint: {
    marginTop: "1px",
  },
  passwordGreen: {
    color: "green",
    paddingLeft: "20px",
    fontSize: 12,
  },
  passwordRed: {
    color: "red",
    paddingLeft: "20px",
    fontSize: 12,
  },
}));

const initialFormState = {
  username: "",
  new_password: "",
  re_new_password: "",
};

export default function ResetPassword(props) {
  const classes = useStyles();
  const history = useHistory();
  const [formState, updateFormState] = useState(initialFormState);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showReNewPassword, setShowReNewPassword] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState(null);
  const [showFail, setShowFail] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [met7Chars, setMet7Chars] = useState(false);
  const [met1Upper, setMet1Upper] = useState(false);
  const [met1Lower, setMet1Lower] = useState(false);
  const [met1Number, setMet1Number] = useState(false);
  const [met1Special, setMet1Special] = useState(false);
  const [rePasswordMatch, setRePasswordMatch] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState("Notice");
  const [alertContent, setAlertCotent] = useState("");

  const handleSumbitSetNewPassword = async function (event) {
    event.preventDefault();
    const { username, new_password, re_new_password } = formState;
    const verify_code =
      (props.location.state && props.location.state.verify_code) || null;
    console.log(
      "username: " +
        username +
        "\r\n" +
        "password: " +
        new_password +
        "\r\n" +
        "re password: " +
        re_new_password +
        "\r\n" +
        "verify code: " +
        verify_code
    );
    try {
      if (
        username === null ||
        username.length < 1 ||
        new_password === null ||
        new_password.length < 1 ||
        re_new_password === null ||
        re_new_password.length < 1
      ) {
        throw "Error: All fields are required to fill!";
      }
    } catch (error) {
      console.log(error);
      setErrorMsg(error);
      showAlertHandler("fail");
      setAlertTitle("Reset Password Error");
      setAlertCotent(error);
      setOpenAlert(true);
      return;
    }
    try {
      if (!(met7Chars && met1Upper && met1Lower && met1Number && met1Special))
        throw "Error: Password is not qualifed! Please choose another one";
    } catch (error) {
      console.log(error);
      setErrorMsg(error);
      showAlertHandler("fail");
      setAlertTitle("Reset Password Error");
      setAlertCotent(error);
      setOpenAlert(true);
      return;
    }
    try {
      if (!rePasswordMatch || new_password !== re_new_password)
        throw "Error: Re-input password not matched";
    } catch (error) {
      console.log(error);
      setErrorMsg(error);
      showAlertHandler("fail");
      setAlertTitle("Reset Password Error");
      setAlertCotent(error);
      setOpenAlert(true);
      return;
    }

    try {
      const response = await Auth.forgotPasswordSubmit(
        username,
        verify_code,
        new_password
      );
      console.log("Reset Password response: ", response);
      setSuccessMsg("Password reset is successful! Please sign in");
      showAlertHandler("success");
      setAlertTitle("Reset Password Notice");
      setAlertCotent("Password reset is successful!");
      setOpenAlert(true);
    } catch (error) {
      console.log("Reset New Password error: ", error.message);

      let error_msg = error.message;
      if (error_msg.includes("code")) {
        error_msg =
          "Verification link has been expired, please proceed 'Forgot password' again.";
      }
      setAlertCotent("Password reset error: " + error_msg);
      setOpenAlert(true);
      setErrorMsg(error_msg);
      showAlertHandler("fail");
      setAlertTitle("Reset Password Error");
    }
    return;
  };

  const showAlertHandler = (type) => {
    if (type === "success") {
      setShowSuccess(true);
      const timer = setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
    } else if (type === "fail") {
      setShowFail(true);
      const timer = setTimeout(() => {
        setShowFail(false);
      }, 5000);
    }
  };

  const handleClickShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const handleClickShowReNewPassword = () => {
    setShowReNewPassword(!showReNewPassword);
  };

  const handleChange = (event) => {
    event.persist();
    updateFormState(() => ({
      ...formState,
      [event.target.name]: event.target.value,
    }));
    if (event.target.name === "new_password") {
      handlePasswordCheck(event.target.value);
      if (event.target.value !== formState.re_new_password) {
        setRePasswordMatch(false);
      } else {
        setRePasswordMatch(true);
      }
    }
    if (event.target.name === "re_new_password") {
      handleRePasswordCheck(event.target.value);
    }
  };

  const handlePasswordCheck = (value) => {
    const newVal = value;
    var re1 = /.{7,}$/;
    if (re1.test(newVal)) {
      setMet7Chars(true);
    } else {
      setMet7Chars(false);
    }
    var re2 = /[A-Z]/;
    if (re2.test(newVal)) {
      setMet1Upper(true);
    } else {
      setMet1Upper(false);
    }
    var re3 = /[a-z]/;
    if (re3.test(newVal)) {
      setMet1Lower(true);
    } else {
      setMet1Lower(false);
    }
    var re4 = /[0-9]/;
    if (re4.test(newVal)) {
      setMet1Number(true);
    } else {
      setMet1Number(false);
    }
    var re5 = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    if (re5.test(newVal)) {
      setMet1Special(true);
    } else {
      setMet1Special(false);
    }
  };

  const handleRePasswordCheck = (value) => {
    const newVal = value;
    if (newVal === formState.new_password) {
      setRePasswordMatch(true);
    } else {
      setRePasswordMatch(false);
    }
  };

  const handleGoHome = () => {
    history.push("/");
  };

  return (
    <div>
      <AuthHeader location="Reset Password" />
      <AlertDialog
        title={alertTitle}
        contentText={alertContent}
        open={openAlert}
        setOpen={setOpenAlert}
        btn1Name="Back"
        btn2Name="Home"
        callBack={handleGoHome}
      />
      <div>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Reset Password
            </Typography>
            <form
              className={classes.form}
              noValidate
              onSubmit={handleSumbitSetNewPassword}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="new_password"
                    label="New Password"
                    type={showNewPassword ? "text" : "password"}
                    id="new_password"
                    onChange={handleChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowNewPassword}
                            edge="end"
                          >
                            {showNewPassword ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography>
                    <p
                      style={{ fontSize: 12 }}
                      className={classes.passwordHint}
                    >
                      Password requirement: <br></br>
                      <span
                        className={
                          met7Chars
                            ? classes.passwordGreen
                            : classes.passwordRed
                        }
                      >
                        At least 7 characters long
                      </span>
                      <br></br>
                      <span
                        className={
                          met1Upper
                            ? classes.passwordGreen
                            : classes.passwordRed
                        }
                      >
                        Includes at least 1 UPPERCASE alphbet character
                      </span>
                      <br></br>
                      <span
                        className={
                          met1Lower
                            ? classes.passwordGreen
                            : classes.passwordRed
                        }
                      >
                        Includes at least 1 lowercase alphbet character
                      </span>
                      <br></br>
                      <span
                        className={
                          met1Number
                            ? classes.passwordGreen
                            : classes.passwordRed
                        }
                      >
                        Includes at least 1 number
                      </span>
                      <br></br>
                      <span
                        className={
                          met1Special
                            ? classes.passwordGreen
                            : classes.passwordRed
                        }
                      >
                        Includes at least 1 special sign from ! @ # $ % ^ & * (
                        ) _ + - = [ ] &#123; &#125; ; ' : " \ | , . &#60; &#62;
                        / ?
                      </span>
                      <br></br>
                    </p>
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="re_new_password"
                    label="Re-input New Password"
                    type={showReNewPassword ? "text" : "password"}
                    id="re_new_password"
                    onChange={handleChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowReNewPassword}
                            edge="end"
                          >
                            {showReNewPassword ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                {rePasswordMatch ? (
                  <p
                    className={classes.passwordGreen}
                    style={{ marginTop: "1px" }}
                  >
                    Re-input password matched.
                  </p>
                ) : (
                  <p
                    className={classes.passwordRed}
                    style={{ marginTop: "1px" }}
                  >
                    Re-input password not matched.
                  </p>
                )}
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Set New Password
              </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link href="signin" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
          <Box mt={5}>
            <Copyright />
          </Box>
        </Container>
      </div>
      <Fade in={showSuccess}>
        <Alert variant="filled" severity="success" className={classes.alert}>
          {successMsg || "Success"}
        </Alert>
      </Fade>
      <Fade in={showFail}>
        <Alert variant="filled" severity="error" className={classes.alert}>
          {errorMsg || "Unknown error"}
        </Alert>
      </Fade>
    </div>
  );
}
