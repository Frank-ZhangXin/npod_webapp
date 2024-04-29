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
    backgroundRepeat: "repeat",
    // backgroundSize: "cover",
    display: "flex",
    justifyContent: "flex-start",
  },

  ul: {
    listStyle: "none",
    width: "230px",
  },
  li: {
    paddingLeft: "25px",
    textIndent: "-20px",
    paddingTop: "10px",
    paddingBottom: "10px",
    borderLeft: "3px solid #ccc",
    "&.active": {
      borderLeft: "3px solid #000",
      "& a": {
        color: "#333",
        // fontWeight: "500",
        paddingLeft: "20px",
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
      paddingLeft: "20px",
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
    marginLeft: "2vw",
    position: "sticky",
    top: 50,

    "& h2": {
      paddingLeft: "35px",
    },
  },
  articleContainer: {
    marginTop: "100px",
    width: "100%",
    maxWidth: "68vw",
    minWidth: "700px",
    marginLeft: "5vw",
    paddingBottom: "20vh",
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

  const topics = [
    "introduction",
    "sign-up",
    "sign-in",
    "explore-cases",
    "sample-inventory",
    "datasets",
    "explore-datasets",
    "submit-datasets",
  ];

  const topicsName = [
    "Introduction",
    "Sign Up",
    "Sign In",
    "Explore Cases",
    "Sample Inventory",
    "Datasets",
    "➤ Explore Datasets",
    "➤ Submit Datasets",
  ];

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
            <h2>Contents</h2>
            <ul className={classes.ul}>
              {topics.map((topic, index) => {
                const linkTo = "/support#" + topic;
                const linkElement = topic;
                return (
                  <li className={classes.li}>
                    <Link
                      to={linkTo}
                      onClick={() => {
                        let target = document.getElementById(`${topic}`);
                        target &&
                          target.scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                          });
                      }}
                    >
                      {/* {topic
                        .split("-")
                        .map((word) => word[0].toUpperCase() + word.slice(1))
                        .join(" ")} */}
                      {topicsName[index]}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </Paper>
        </div>
      </div>
    </div>
  );
}

export default Support;
