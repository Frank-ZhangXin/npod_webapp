import React, { useState, useEffect } from "react";
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
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Alert from "@material-ui/lab/Alert";
import Fade from "@material-ui/core/Fade";

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
}));

const initialFormState = {
  username: "",
  new_password: "",
  code: "",
  formType: "sendCode",
};

export default function ForgotPassword() {
  const classes = useStyles();
  const history = useHistory();
  const [formState, updateFormState] = useState(initialFormState);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState(null);
  const [showFail, setShowFail] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleChange = (event) => {
    event.persist();
    updateFormState(() => ({
      ...formState,
      [event.target.name]: event.target.value,
    }));
  };
  const { formType } = formState;

  const handleClickShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const handleSumbitSendCode = async function (event) {
    event.preventDefault();
    const { username } = formState;
    try {
      const response = await Auth.forgotPassword(username);
      console.log("SendCode response: ", response);
      setSuccessMsg("Confirmation code was sent! Please check your email");
      showAlertHandler("success");
      updateFormState(() => ({ ...formState, formType: "setNewPassword" }));
    } catch (error) {
      console.log("SendCode error: ", error);
      setErrorMsg(error.message);
      showAlertHandler("fail");
    }
  };

  const handleSumbitSetNewPassword = async function (event) {
    event.preventDefault();
    const { username, new_password, code } = formState;
    try {
      const response = await Auth.forgotPasswordSubmit(
        username,
        code,
        new_password
      );
      console.log("Set New Password response: ", response);
      setSuccessMsg("New password reset is successful! Please sign in");
      showAlertHandler("success");
      history.push("/signin", { from: "forgotpassword" });
    } catch (error) {
      console.log("Set New Password error: ", error);
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
      {/* Send Confirmation Code */}
      {formType === "sendCode" && (
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
                onSubmit={handleSumbitSendCode}
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
                      autoComplete="username"
                      autoFocus
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Email Confirm Code
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
      )}

      {/* Set new password */}
      {formType === "setNewPassword" && (
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
                      defaultValue={formState.username}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="code"
                      label="Confirm Code"
                      name="code"
                      autoFocus
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
      )}
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
