import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import EmailOutlinedIcon from "@material-ui/icons/EmailOutlined";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Auth } from "@aws-amplify/auth";
import Link from "@material-ui/core/Link";
import { useParams, useHistory } from "react-router-dom";
import AuthHeader from "../component/AuthHeader";
import Alert from "@material-ui/lab/Alert";
import Fade from "@material-ui/core/Fade";
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
  helperText: {
    margin: theme.spacing(1, 0, 0),
    color: "grey",
  },
}));

export default function VerifyEmail(props) {
  const classes = useStyles();
  const user = (props.location.state && props.location.state.user) || "";
  const [username, setUsername] = useState("");
  const [code, setCode] = useState("");
  const [showFail, setShowFail] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState(null);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState("Notice");
  const [alertContent, setAlertCotent] = useState("");
  const history = useHistory();

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    try {
      const authRes = await Auth.currentAuthenticatedUser();
      console.log("Check auth response ", authRes);
    } catch (error) {
      console.log("Check Auth error ", error);
      history.push("/");
    }
  }

  const handleSumbit = async function (event) {
    event.preventDefault();
    try {
      const response = await Auth.verifyCurrentUserAttribute("email");
      console.log("Verify email result: ", response);
      setAlertTitle("Verify Notice");
      setAlertCotent(
        "Sent verification email successfully. Please check your email inbox. You can send another one in 60 seconds if you don't receive it."
      );
      setOpenAlert(true);
    } catch (error) {
      console.log("Verify email error: ", error);
      setErrorMsg(error.message);
      showAlertHandler("fail");
      setAlertTitle("Verify Email Error");
      setAlertCotent(error.message);
      setOpenAlert(true);
    }
  };

  const showAlertHandler = (type) => {
    if (type === "fail") {
      setShowFail(true);
      const timer = setTimeout(() => {
        setShowFail(false);
      }, 5000);
    } else if (type == "success") {
      setShowSuccess(true);
      const timer = setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
    }
  };

  const handleGoHome = () => {
    history.push("/");
  };

  return (
    <div>
      <AuthHeader location="Verify Email" />

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
            <EmailOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Verify Your Email
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSumbit}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Send Verify Link
            </Button>
            <p className={classes.helperText}>
              <Typography variant="caption">
                Click the link in your email inbox to verify your email address
              </Typography>
            </p>
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
      <Fade in={showSuccess}>
        <Alert variant="filled" severity="success" className={classes.alert}>
          {successMsg || "Success."}
        </Alert>
      </Fade>
    </div>
  );
}
