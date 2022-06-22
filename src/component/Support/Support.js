import React, { useEffect, useState, useRef } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import AuthHeader from "..//AuthHeader";
import { Box, Grid, Paper } from "@material-ui/core";
import { Link } from "react-router-dom";
import SupportContent from "./SupportContent";

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
    backgroundRepeat: "repeat-y",
    // backgroundSize: "cover",
    display: "flex",
    justifyContent: "flex-start",
  },

  ul: {
    listStyle: "none",
  },
  li: {
    "&.active": {
      "& a": {
        color: "#333",
        fontWeight: "500",
        paddingLeft: "15px",
        paddingTop: "3px",
        paddingBottom: "3px",
        borderLeft: "2px solid #000",
      },
    },
    "& a": {
      "&:hover": {
        color: "#666",
      },
      "&:active": {
        color: "#000",
      },
      fontSize: "20px",
      paddingLeft: "15px",
      paddingTop: "3px",
      paddingBottom: "3px",
      borderLeft: "1px solid #ccc",
      textDecoration: "none",
      color: "#ccc",
      transition: "all 50ms ease-in-out",
    },
  },
  contentList: {
    marginTop: "100px",
    paddingTop: "40px",
    paddingBottom: "40px",
    width: "100%",
    // marginRight: "auto",
    marginLeft: "3vw",
    position: "sticky",
    top: 50,

    "& h2": {
      paddingLeft: "35px",
    },
  },
  articleContainer: {
    marginTop: "100px",
    width: "60%",
    marginLeft: "12vw",
    // marginRight: "auto",
  },
  articlePaper: {
    padding: "50px 60px",
  },
}));

function Support(props) {
  const classes = useStyles();
  const [viewTopTitle, setViewTopTitle] = useState();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      // if (entry.isIntersecting === true) {
      //   console.log("You're viewing " + entry.target.id);
      // }
      entries.forEach((entry) => {
        const id = entry.target.getAttribute("id");
        try {
          if (entry.intersectionRatio > 0) {
            document
              .querySelector(`ul li a[href="/support#${id}"]`)
              .parentElement.classList.add("active");
          } else {
            document
              .querySelector(`ul li a[href="/support#${id}"]`)
              .parentElement.classList.remove("active");
          }
        } catch (error) {}
      });
    });
    document.querySelectorAll("section[id]").forEach((section) => {
      observer.observe(section);
    });
  }, []);

  const topics = ["how-to", "sign-up", "sign-in", "explore-cases"];

  return (
    <div>
      <AuthHeader location="Support" />
      <div className={classes.root}>
        <div className={classes.articleContainer}>
          <Paper className={classes.articlePaper}>
            <SupportContent />
          </Paper>
        </div>
        <div>
          <Paper className={classes.contentList}>
            <h2>Topics of Content</h2>
            <ul className={classes.ul}>
              {/* {topics.map((topic) => (
                <li className={classes.li}>
                  <Link
                    to={"/support#" + topic}
                    onClick={() => {
                      let target = document.getElementById({ topic });
                      target &&
                        target.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        });
                    }}
                  >
                    {topic
                      .split("-")
                      .map((word) => word[0].toUpperCase() + word.slice(1))
                      .join(" ")}
                  </Link>
                </li>
              ))} */}
              <li className={classes.li}>
                <Link
                  to="/support#introduction"
                  onClick={() => {
                    let target = document.getElementById("introduction");
                    target &&
                      target.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                  }}
                >
                  Introduction
                </Link>
              </li>
              <li className={classes.li}>
                <Link
                  to="/support#sign-up"
                  onClick={() => {
                    let target = document.getElementById("sign-up");
                    target &&
                      target.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                  }}
                >
                  Sign Up
                </Link>
              </li>
              <li className={classes.li}>
                <Link
                  to="/support#sign-in"
                  onClick={() => {
                    let target = document.getElementById("sign-in");
                    target &&
                      target.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                  }}
                >
                  Sign In
                </Link>
              </li>
              <li className={classes.li}>
                <Link
                  to="/support#explore-cases"
                  onClick={() => {
                    let target = document.getElementById("explore-cases");
                    target &&
                      target.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                  }}
                >
                  Explore Cases
                </Link>
              </li>
              <li className={classes.li}>
                <Link
                  to="/support#explore-datasets-and-submit-datasets"
                  onClick={() => {
                    let target = document.getElementById(
                      "explore-datasets-and-submit-datasets"
                    );
                    target &&
                      target.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                  }}
                >
                  Explore/Submit Datasets
                </Link>
              </li>
            </ul>
          </Paper>
        </div>

        <div style={{ paddingBottom: "2000px" }}>blah</div>
      </div>
    </div>
  );
}

export default Support;
