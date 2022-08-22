import React, { useEffect, useState, useRef } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import AuthHeader from "../AuthHeader";
import { Box, Grid, Paper } from "@material-ui/core";
import { Link } from "react-router-dom";
import UsefulResourcesContent from "./UsefulResourcesContent";

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
      process.env.PUBLIC_URL + "/assets/usefulResourcesPage.png"
    })`,
    backgroundRepeat: "repeat",
    // backgroundSize: "cover",
    display: "flex",
    justifyContent: "flex-start",
  },

  ul: {
    listStyle: "none",
    width: "270px",
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
    width: "110%",
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

function UsefulResources(props) {
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
              .querySelector(`ul li a[href="/usefulresources#${id}"]`)
              .parentElement.classList.add("active");
          } else {
            document
              .querySelector(`ul li a[href="/usefulresources#${id}"]`)
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
    "npod-operational-model",
    "organ-processing-at-npod",
    "navigating-npod-platforms",
    "maximizing-sample-requests",
    "online-sample-ordering",
    "rrid-portal",
    "helpful-tutorials-and-publications-to-assist-in-data-interpretation",
    "eletron-microscopy",
    "genetics",
    "npod-research-webinars",
    "protocol-resources-for-life-scientists",
  ];

  const topicsName = [
    "Introduction",
    "nPOD Operational Model",
    "Organ Processing at nPOD",
    "Navigating nPOD Platforms",
    "➤ Maximizing Sample Requests",
    "➤ Online Sample Ordering",
    "➤ RRID Portal",
    "Helpful Tutorials and Publicaitons",
    "➤ Eletron Microscopy",
    "➤ Genetics",
    "nPOD Research Webinars",
    "Protocol Resources for Life Scientists",
  ];

  return (
    <div>
      <AuthHeader location="Support" />
      <div className={classes.root}>
        <div className={classes.articleContainer}>
          <Paper className={classes.articlePaper}>
            <UsefulResourcesContent />
          </Paper>
        </div>
        <div>
          <Paper className={classes.contentList}>
            <h2>Contents</h2>
            <ul className={classes.ul}>
              {topics.map((topic, index) => {
                const linkTo = "/usefulresources#" + topic;
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

export default UsefulResources;
