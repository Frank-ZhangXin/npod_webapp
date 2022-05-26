import React, { useState, useEffect } from "react";
import AuthHeader from "../component/AuthHeader";
import { Auth } from "@aws-amplify/auth";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import { useHistory } from "react-router-dom";
import userEvent from "@testing-library/user-event";

const useStyles = makeStyles((theme) => ({
  root: {},
  notice: {
    margin: theme.spacing(3, 0, 2),
    borderRadius: "10px",
    boxShadow: "1px 1px 10px grey",
  },
  centerBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "20vh",
  },
  centerMessage: {
    width: "20vw",
  },
  countDown: {
    marginTop: "10px",
  },
}));

export default function VerifyAttributeWithCode(props) {
  const classes = useStyles();
  // const [signedIn, setSignedIn] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("Default message");
  const [countDowm, setCountDown] = useState(15);
  const queryParams = new URLSearchParams(window.location.search);
  const attr = queryParams.get("attribute");
  const code = queryParams.get("verify_code");
  const history = useHistory();

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    try {
      const authRes = await Auth.currentAuthenticatedUser();
      handleVerify();
      countDownHandler();
      if (countDowm === 0) {
        history.push("/");
      }
    } catch (error) {
      console.log("On verify page, this user has not signed in yet.");
      history.push("/resetpassword", { verify_code: code });
    }
  }

  // useEffect(() => {
  //   countDownHandler();
  //   if (countDowm === 0) {
  //     history.push("/");
  //   }
  // });

  const countDownHandler = () => {
    const timer = setTimeout(() => {
      setCountDown(countDowm - 1);
    }, 1000);
  };

  const handleVerify = async function () {
    try {
      const response = await Auth.verifyCurrentUserAttributeSubmit(attr, code);
      console.log("Verify email result: ", response);
      setSuccess(true);
      setMessage("Now you can close this window or wait for redirecting.");
    } catch (error) {
      console.log("Verify email error: ", error);
      setSuccess(false);
      setMessage(
        error.message +
          " Now you can close this window or wait for redirecting."
      );
    }
  };

  return (
    <div>
      <AuthHeader location="Verify Email" />
      <Container component="main" maxWidth="sm">
        <div className={classes.notice}>
          <Box className={classes.centerBox}>
            <div className={classes.centerMessage}>
              {success ? (
                <Typography variant="h6">
                  {attr} verification is successful!
                </Typography>
              ) : (
                <Typography variant="h6">
                  {attr} verification has failed! {message}
                </Typography>
              )}
            </div>
            <div className={classes.countDown}>
              Redirect to Home page in {countDowm} seconds...
            </div>
          </Box>
        </div>
      </Container>
    </div>
  );
}
