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
import { Auth } from "@aws-amplify/auth";
import { useHistory } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import AuthHeader from "../component/AuthHeader";
import Alert from "@material-ui/lab/Alert";
import Fade from "@material-ui/core/Fade";
import EmailIcon from "@material-ui/icons/Email";
import AlertDialog from "../component/AlertDialog";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import ReactMarkdown from "react-markdown";

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
    margin: theme.spacing(3, 0, 0),
  },
  helperText: {
    margin: theme.spacing(1, 0, 0),
    color: "grey",
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
  userAgreementBox: {
    display: "flex",
  },
  userAgreementDialog: {
    width: "50vw",
  },
  userDisagree: {
    color: "red",
    marginLeft: "10px",
  },
  userAgree: {
    color: "green",
    marginLeft: "10px",
  },
  markDown: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(5),
    paddingLeft: theme.spacing(15),
    paddingRight: theme.spacing(15),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [firstname, setFirstname] = useState(null);
  const [lastname, setLastname] = useState(null);
  const [organization, setOrganization] = useState(null);
  const [institution, setInstitution] = useState(null);
  const [project, setProject] = useState(null);
  const [password, setPassword] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [rePassword, setRePassword] = useState(null);
  const [showRePassword, setShowRePassword] = useState(false);
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
  const [agreement, setAgreement] = useState(true);
  const [openUserAgreement, setOpenUserAgreement] = useState(false);
  const [post, setPost] = useState("");
  const history = useHistory();

  useEffect(() => {
    const setTheText = async () => {
      const fileName = "userAgreementText";
      const file = await import(`../component/UserAgreement/${fileName}.txt`);
      const response = await fetch(file.default);
      const text = await response.text();
      setPost(text);
    };
    setTheText();
  }, []);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowRePassword = () => {
    setShowRePassword(!showRePassword);
  };

  const handlePasswordCheck = (event) => {
    const newVal = event.target.value;
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

    setPassword(newVal);
    if (newVal !== rePassword) {
      setRePasswordMatch(false);
    } else {
      setRePasswordMatch(true);
    }
  };

  const handleRePasswordCheck = (event) => {
    const newVal = event.target.value;
    if (newVal === password) {
      setRePasswordMatch(true);
    } else {
      setRePasswordMatch(false);
    }
    setRePassword(newVal);
  };

  const handleSumbit = async function (event) {
    event.preventDefault();
    try {
      if (
        username === null ||
        username.length < 1 ||
        email === null ||
        email.length < 1 ||
        firstname === null ||
        firstname.length < 1 ||
        lastname === null ||
        lastname.length < 1 ||
        password === null ||
        password.length < 1 ||
        rePassword === null ||
        rePassword.length < 1
      ) {
        throw "Error: All fields are required to fill!";
      }
    } catch (error) {
      console.log(error);
      setErrorMsg(error);
      showAlertHandler("fail");
      setAlertTitle("Sign-up Error");
      setAlertCotent(error);
      setOpenAlert(true);
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
      setAlertTitle("Sign-up Error");
      setAlertCotent(error);
      setOpenAlert(true);
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
      setAlertTitle("Sign-up Error");
      setAlertCotent(error);
      setOpenAlert(true);
      return;
    }

    try {
      if (password !== rePassword)
        throw "Error: Re-input password doesn't match.";
    } catch (error) {
      console.log(error);
      setErrorMsg(error);
      showAlertHandler("fail");
      setAlertTitle("Sign-up Error");
      setAlertCotent(error);
      setOpenAlert(true);

      return;
    }

    try {
      if (agreement !== true)
        throw "Error: User has to agree the nPOD User Agreement prior the sign-up.";
    } catch (error) {
      console.log(error);
      setErrorMsg(error);
      showAlertHandler("fail");
      setAlertTitle("Sign-up Error");
      setAlertCotent(error);
      setOpenAlert(true);

      return;
    }

    try {
      const response = await Auth.signUp({
        username,
        password,
        attributes: {
          email,
          "custom:firstname": firstname,
          "custom:lastname": lastname,
          "custom:institution": institution ? institution : "None",
          "custom:project": project ? project : "None",
        },
      });
      console.log("Signup response: ", response);
      //history.push("/signupconfirm", { user: username });
    } catch (error) {
      console.log("Signup error: ", error);
      setErrorMsg(error.message);
      if (
        error.message ===
        "CustomMessage failed with error Pending for approval."
      ) {
        setAlertTitle("Sign-up Notification");
        setAlertCotent(
          "Your sign up request has been submitted. The approval notice will be sent to your email after admin confirm your identity."
        );
        setOpenAlert(true);
      } else {
        setAlertTitle("Sign-up Error");
        setAlertCotent(error.message);
        setOpenAlert(true);
      }
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

  const handleOpenAlert = () => {
    setOpenAlert(true);
  };

  const handleGoHome = () => {
    history.push("/");
  };

  const handleClickUserAgreement = () => {
    setOpenUserAgreement(!openUserAgreement);
  };

  const handleUserAgree = () => {
    setAgreement(true);
    setOpenUserAgreement(false);
  };

  const handleUserDisagree = () => {
    setAgreement(false);
    setOpenUserAgreement(false);
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
    const re =
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{7,}$/;

    return re.test(thePassword);
  };

  const InvitationHelpText = (
    <React.Fragment>
      <div style={{ display: "flex", alignItems: "center", marginTop: "3px" }}>
        <EmailIcon />
        <div style={{ fontSize: 12, marginLeft: "3px" }}>
          Request Invitation Code:{" "}
          <a target="_blank" href="mailto:npod@pathology.ufl.edu">
            npod@pathology.ufl.edu
          </a>
        </div>
      </div>
      <div>
        {" "}
        Please put{" "}
        <a target="_blank" href="mailto:no-reply@verificationemail.com">
          no-reply@verificationemail.com
        </a>{" "}
        to your email whitelist in case you can't get the verification email
        properly. If you still don't get the verification email in 10 mins,
        please consider using another email to sign up.
      </div>
    </React.Fragment>
  );

  return (
    <div>
      <AuthHeader location="Sign Up" />
      <Dialog
        open={openUserAgreement}
        onClose={handleClickUserAgreement}
        fullWidth="true"
        maxWidth="md"
      >
        {/* <DialogTitle>{"nPOD User Agreement"}</DialogTitle> */}
        <DialogContent>
          <h1 align="center">nPOD User Agreement</h1>
          <ReactMarkdown className={classes.markDown}>{post}</ReactMarkdown>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUserDisagree} color="primary">
            Disagree
          </Button>
          <Button onClick={handleUserAgree} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      <AlertDialog
        title={alertTitle}
        contentText={alertContent}
        open={openAlert}
        setOpen={setOpenAlert}
        btn1Name="Back"
        btn2Name="Home"
        callBack={handleGoHome}
      />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            nPOD Sign up
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
                  onChange={handlePasswordCheck}
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
                <Typography>
                  <p style={{ fontSize: 12 }} className={classes.passwordHint}>
                    Password requirement: <br></br>
                    <span
                      className={
                        met7Chars ? classes.passwordGreen : classes.passwordRed
                      }
                    >
                      At least 7 characters long
                    </span>
                    <br></br>
                    <span
                      className={
                        met1Upper ? classes.passwordGreen : classes.passwordRed
                      }
                    >
                      Includes at least 1 UPPERCASE alphbet character
                    </span>
                    <br></br>
                    <span
                      className={
                        met1Lower ? classes.passwordGreen : classes.passwordRed
                      }
                    >
                      Includes at least 1 lowercase alphbet character
                    </span>
                    <br></br>
                    <span
                      className={
                        met1Number ? classes.passwordGreen : classes.passwordRed
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
                      Includes at least 1 special sign from ! @ # $ % ^ & * ( )
                      _ + - = [ ] &#123; &#125; ; ' : " \ | , . &#60; &#62; / ?
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
                  name="rePassword"
                  label="Re-input Password"
                  type={showRePassword ? "text" : "password"}
                  id="rePassword"
                  onChange={handleRePasswordCheck}
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
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="firstname"
                  label="First Name"
                  name="firstname"
                  autoComplete="given-name"
                  onChange={(event) => setFirstname(event.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastname"
                  label="Last Name"
                  name="lastname"
                  autoComplete="family-name"
                  onChange={(event) => setLastname(event.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="institution"
                  label="Institution"
                  name="institution"
                  autoComplete="institution"
                  onChange={(event) => setInstitution(event.target.value)}
                />
                <p className={classes.helperText}>
                  <Typography variant="caption">
                    Leave blank if you don't have one.
                  </Typography>
                </p>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="project"
                  label="nPOD Approved Project"
                  name="project"
                  autoComplete="project"
                  onChange={(event) => setProject(event.target.value)}
                />
                <p className={classes.helperText}>
                  <Typography variant="caption">
                    Leave blank if you don't have one.
                  </Typography>
                </p>
              </Grid>
              <Grid item xs={12}>
                <Box className={classes.userAgreementBox}>
                  <Button
                    variant="contained"
                    onClick={handleClickUserAgreement}
                  >
                    nPOD User Agreement
                  </Button>{" "}
                  <p
                    className={
                      agreement ? classes.userAgree : classes.userDisagree
                    }
                  >
                    {agreement ? "User agrees" : "User does not agree"}
                  </p>
                </Box>
                <p className={classes.helperText}>
                  <Typography variant="caption">
                    Click to read "nPOD User Agreement" then select "Agree" or
                    not.
                  </Typography>
                </p>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <p className={classes.helperText}>
              <Typography variant="caption">
                Click "SIGN UP" button to request the new account. The admin
                will grant you the access after approval.
              </Typography>
            </p>
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
