import React, { useState } from "react";
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
import AuthHeader from "../component/AuthHeader";
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

export default function SignUp() {
  const classes = useStyles();
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [rePassword, setRePassword] = useState(null);
  const [invitation, setInvitation] = useState(null);
  const [showRePassword, setShowRePassword] = useState(false);
  const [showFail, setShowFail] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const history = useHistory();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowRePassword = () => {
    setShowRePassword(!showRePassword);
  };

  const handleSumbit = async function (event) {
    event.preventDefault();
    try {
      if (
        username === null ||
        username.length < 1 ||
        email === null ||
        email.length < 1 ||
        password === null ||
        password.length < 1 ||
        rePassword === null ||
        rePassword.length < 1 ||
        invitation === null ||
        invitation.length < 1
      ) {
        throw "Error: All fields are required to fill!";
      }
    } catch (error) {
      console.log(error);
      setErrorMsg(error);
      showAlertHandler("fail");
      return;
    }

    try {
      if (invitation !== "npodbetauser2021") {
        throw "Error: Invitation code is invalid! Please contact admin for sign up";
      }
    } catch (error) {
      console.log("Invitation Error: ", error);
      setErrorMsg(error);
      showAlertHandler("fail");
      return;
    }

    try {
      if (!emailValidation(email)) {
        throw "Error: Email format is not valid.";
      }
    } catch (error) {
      console.log(error);
      setErrorMsg(error);
      showAlertHandler("fail");
      return;
    }

    console.log("password validation: ", passwordValidation(password));
    try {
      if (!passwordValidation(password))
        throw "Error: Password is not qualifed! Please choose another one";
    } catch (error) {
      console.log(error);
      setErrorMsg(error);
      showAlertHandler("fail");
      return;
    }

    try {
      if (password !== rePassword) throw "Error: Two passwords don't match.";
    } catch (error) {
      console.log(error);
      setErrorMsg(error);
      showAlertHandler("fail");
      return;
    }

    try {
      const response = await Auth.signUp({
        username,
        password,
        attributes: {
          email,
        },
      });
      console.log("Signup response: ", response);
      history.push("/signupconfirm", { user: username });
    } catch (error) {
      console.log("Signup error: ", error);
      setErrorMsg(error.message);
      showAlertHandler("fail");
      return;
    }
  };

  const showAlertHandler = (type) => {
    if (type === "fail") {
      setShowFail(true);
      const timer = setTimeout(() => {
        setShowFail(false);
      }, 5000);
    }
  };

  const emailValidation = (theEmail) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const passwordValidation = (thePassword) => {
    // const re = {
    //   capital: /[A-Z]/,
    //   digit: /[0-9]/,
    //   //except: /[aeiou]/,
    //   full: /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?][A-Za-z0-9]{7,}$/,
    // };
    const re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,}$/;

    return re.test(thePassword);
  };

  return (
    <div>
      <AuthHeader location="Sign Up" />

      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSumbit}>
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
                  onChange={(event) => setUsername(event.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(event) => setEmail(event.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  onChange={(event) => setPassword(event.target.value)}
                  helperText="Password must have minimum 7 characters and contain at least 1 UPPERCASE, 1 lower case, 1 number, 1 special character."
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
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="rePassword"
                  label="Re-input Password"
                  type={showRePassword ? "text" : "password"}
                  id="rePassword"
                  onChange={(event) => setRePassword(event.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle repassword visibility"
                          onClick={handleClickShowRePassword}
                          edge="end"
                        >
                          {showRePassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="invitation"
                  label="Invitation Code"
                  type="text"
                  id="invitation"
                  onChange={(event) => setInvitation(event.target.value)}
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
              EMAIl CONFIRMATION CODE
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
      <Fade in={showFail}>
        <Alert variant="filled" severity="error" className={classes.alert}>
          {errorMsg || "Unknown sign up Error."}
        </Alert>
      </Fade>
    </div>
  );
}
