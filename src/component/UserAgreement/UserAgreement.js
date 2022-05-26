import React, { useEffect, useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import AuthHeader from "..//AuthHeader";
import { Paper } from "@material-ui/core";
import ReactMarkdown from "react-markdown";

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
  root: {
    minHeight: "100vh",
    backgroundImage: `url(${
      process.env.PUBLIC_URL + "/assets/supportPage.jpg"
    })`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    //textAlign: "center",
    //backgroundColor: "#282c34",
    //flexDirection: "column",
    //alignItems: "center",
    //justifyContent: "center",
    //color: "white",
    //paddingTop: "130px",
  },
  paper: {
    marginTop: theme.spacing(15),
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(15),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  markDown: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(5),
    paddingLeft: theme.spacing(15),
    paddingRight: theme.spacing(15),
  },
  container: {
    display: "flex",
    flexDirection: "column",
  },
  title: {
    margin: theme.spacing(5),
    fontWeight: 600,
    alignSelf: "center",
    color: "white",
  },
  copyRight: {
    marginBottom: "50px",
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

function UserAgreement(props) {
  const classes = useStyles();
  const [post, setPost] = useState("");

  useEffect(() => {
    const setTheText = async () => {
      const fileName = "userAgreementText";
      const file = await import(`./${fileName}.txt`);
      const response = await fetch(file.default);
      const text = await response.text();
      setPost(text);
    };
    setTheText();
  }, []);

  console.log("(out of useeffect)md file content", post);
  const test_text = "# sample title";
  return (
    <div>
      <AuthHeader location="UserAgreement" />
      <div className={classes.root}>
        <Container Width="md" maxWidth="md" className={classes.container}>
          <Paper className={classes.paper}>
            <h1 align="center">USER AGREEMENT</h1>
            <h2 align="center">FOR nPOD DATA PORTAL</h2>
            <ReactMarkdown className={classes.markDown}>{post}</ReactMarkdown>
          </Paper>
          <Box mt={8} className={classes.copyRight}>
            <Copyright />
          </Box>
        </Container>
      </div>
    </div>
  );
}

export default UserAgreement;
