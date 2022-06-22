import React, { useEffect, useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import AuthHeader from "..//AuthHeader";
import { Box, Grid, Paper } from "@material-ui/core";
import Markdown from "markdown-to-jsx";
import {
  Link,
  animatedScroll as scroll,
  scrollspy,
  Element,
} from "react-scroll";
import styled from "styled-components";

// TODO: Remember me function need further implementation.
// For now, Cognito will let user opt in remembering device.

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <a color="inherit" href="https://nPOD.org/">
        nPOD
      </a>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    // minHeight: "150vh",
    backgroundImage: `url(${
      process.env.PUBLIC_URL + "/assets/supportPage.jpg"
    })`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    display: "flex",
    flexDirection: "row",
    scroll: "smooth",
    //textAlign: "center",
    //backgroundColor: "#282c34",
    //flexDirection: "column",
    //alignItems: "center",
    //justifyContent: "center",
    //color: "white",
    //paddingTop: "130px",
  },
  paper: {
    //marginTop: theme.spacing(2),
    // display: "flex",
    // flexDirection: "column",
    // alignItems: "center",
  },
  markDown: {
    paddingTop: "50px",
    paddingBottom: "50px",
    paddingLeft: "100px",
    paddingRight: "100px",
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
  gridContainer: {
    width: "100%",
  },
  link: {
    "&.active": {
      color: "red",
    },
  },
}));

const CustomizeLink = styled(Link)`
  color: blue;
  &.active {
    color: red;
  }
`;

function Support(props) {
  const classes = useStyles();
  const [post, setPost] = useState("");

  useEffect(() => {
    const setTheText = async () => {
      const fileName = "supportText";
      const file = await import(`./${fileName}.txt`);
      const response = await fetch(file.default);
      const text = await response.text();
      setPost(text);
    };
    setTheText();
  }, []);

  return (
    <div>
      <AuthHeader location="Support" />
      <div className={classes.root}>
        <div style={{ width: "50%", marginLeft: "auto", marginRight: "auto" }}>
          <Paper style={{ backgroundColor: "white", padding: "20px" }}>
            <Element name="top-title" style={{ height: "40px" }}>
              <h1 style={{ margin: "20px 5px" }}>Top title</h1>
            </Element>
            <Element name="section-a" style={{ height: "1020px" }}>
              <h2 style={{ margin: "10px 10px" }}>Section A</h2>
              <p style={{ margin: "0px 15px 1000px" }}>...</p>
            </Element>
            <Element name="section-b" style={{ height: "1020px" }}>
              <h2 style={{ margin: "10px 10px" }}>Section B</h2>
              <p style={{ margin: "0px 15px 1000px" }}>...</p>
            </Element>
            <Element name="section-c" style={{ height: "1020px" }}>
              <h2 style={{ margin: "10px 10px" }}>Section C</h2>
              <p style={{ margin: "0px 15px 1000px" }}>...</p>
            </Element>
          </Paper>
        </div>
        <div>
          <Paper
            style={{
              backgroundColor: "white",
              padding: "20px",
              position: "sticky",
              top: 0,
            }}
          >
            <ul>
              <li>
                <CustomizeLink
                  activeClass="active"
                  className="top-title"
                  to="top-title"
                  spy={true}
                  smooth={true}
                  duration={500}
                >
                  Top title
                </CustomizeLink>
              </li>
              <ul>
                <li>
                  <CustomizeLink
                    activeClass="active"
                    className="section-a"
                    to="section-a"
                    spy={true}
                    smooth={true}
                    duration={500}
                  >
                    Section A
                  </CustomizeLink>
                </li>
                <li>
                  <CustomizeLink
                    activeClass="active"
                    className="section-b"
                    to="section-b"
                    spy={true}
                    smooth={true}
                    duration={500}
                  >
                    Section B
                  </CustomizeLink>
                </li>
                <li>
                  <CustomizeLink
                    activeClass="active"
                    className="section-c"
                    to="section-c"
                    spy={true}
                    smooth={true}
                    duration={500}
                  >
                    Section C
                  </CustomizeLink>
                </li>
              </ul>
            </ul>
          </Paper>
        </div>

        <div style={{ paddingBottom: "2000px" }}>blah</div>
      </div>
    </div>
  );
}

export default Support;
