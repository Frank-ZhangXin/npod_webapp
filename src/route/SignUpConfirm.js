import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Auth from "@aws-amplify/auth";
import Link from "@material-ui/core/Link";
import { useParams, useHistory } from "react-router-dom";

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
}));

export default function SignUpConfirm() {
  const classes = useStyles();
  const { user } = useParams();
  const [username, setUsername] = useState("");
  const [code, setCode] = useState("");
  const history = useHistory();

  useEffect(() => {
    setUsername(user);
    console.log("passed in user is ", user);
  }, []);

  const handleSumbit = async function (event) {
    event.preventDefault();
    try {
      const response = await Auth.confirmSignUp(username, code);
      console.log("Signup Confirm response: ", response);
      alert("Sign up successfully, please sign in.");
      history.push("/signin");
    } catch (error) {
      console.log("Signup Confirm error: ", error);
      alert(error.message);
    }
  };

  const handleResend = async function (event) {
    event.preventDefault();
    try {
      const response = await Auth.resendSignUp(username);
      console.log("Code resend response: ", response);
    } catch (error) {
      console.log("Code resend error: ", error);
      alert(error.message);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up confirm
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
                defaultValue={user}
                onChange={(event) => setUsername(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="code"
                label="Confirmation Code"
                name="code"
                autoFocus
                onChange={(event) => setCode(event.target.value)}
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
            Confirm
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="#" variant="body2" onClick={handleResend}>
                Didn't get the code? Resend
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
