import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import useMdImport from "./useMdImport";
import ReactMarkdown from "react-markdown";

const useStyles = makeStyles((theme) => ({
  root: {},

  section: {
    paddingTop: "10px",
    paddingBottom: "50px",
    marginBottom: "50px",
    "& h1": {
      margin: "20px 30px",
      fontSize: "40px",
    },
    "& h2": {
      margin: "20px 30px",
      fontSize: "30px",
    },
    "& p": {
      margin: "20px 30px",
      fontSize: "20px",
    },
    "& img": {
      maxHeight: "60vh",
      maxWidth: "35vw",
      display: "block",
      marginLeft: "auto",
      marginRight: "auto",
      paddingTop: "10px",
      paddingBottom: "10px",
      boxShadow:
        "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    },
    "& ol": {
      margin: "20px 50px",
      padding: "10px 50px",
      maxWidth: "500px",
      fontSize: "18px",
      borderLeft: "5px solid #6b6b6b",
      backgroundColor: "#e3e4e6",
    },
  },
}));

export default function SupportContent() {
  const classes = useStyles();
  // HTML content

  const p1 = useMdImport(`./SupportParapraph/P1_Introduction.txt`);
  const p2 = useMdImport(`./SupportParapraph/P2_SignUp.txt`);
  const p3 = useMdImport(`./SupportParapraph/P3_SignIn.txt`);
  const p4 = useMdImport(`./SupportParapraph/P4_ExploreCases.txt`);
  const p5 = useMdImport(`./SupportParapraph/P5_SampleInventory.txt`);
  const p6 = useMdImport(
    `./SupportParapraph/P6_ExploreDatasetsAndSubmitDatasets.txt`
  );

  return (
    <div>
      <section id="introduction" className={classes.section}>
        {p1}
      </section>
      <section id="sign-up" className={classes.section}>
        {p2}
      </section>
      <section id="sign-in" className={classes.section}>
        {p3}
      </section>
      <section id="explore-cases" className={classes.section}>
        {p4}
      </section>
      <section id="sample-inventory" className={classes.section}>
        {p5}
      </section>
      <section
        id="explore-datasets-and-submit-datasets"
        className={classes.section}
      >
        {p6}
      </section>
    </div>
  );
}
