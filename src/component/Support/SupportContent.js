import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import useMdImport from "./useMdImport";
import ReactMarkdown from "react-markdown";

const useStyles = makeStyles((theme) => ({
  root: {},

  section: {
    paddingTop: "10px",
    paddingBottom: "10px",
    "& h1": {
      margin: "20px 30px",
      fontSize: "40px",
    },
    "& h2": {
      margin: "20px 30px",
      fontSize: "30px",
    },
    "& p": {
      margin: "10px 30px",
      fontSize: "20px",
    },
    "& img": {
      maxHeight: "700px",
      maxWidth: "500px",
      display: "block",
      marginLeft: "auto",
      marginRight: "auto",
      paddingTop: "10px",
      paddingBottom: "10px",
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

  const p1 = useMdImport(`./SupportParapraph/P1_Introduction.md`);
  const p2 = useMdImport(`./SupportParapraph/P2_SignUp.md`);
  const p3 = useMdImport(`./SupportParapraph/P3_SignIn.md`);
  const p4 = useMdImport(`./SupportParapraph/P4_ExploreCases.md`);
  const p5 = useMdImport(`./SupportParapraph/P5_SampleInventory.md`);
  const p6 = useMdImport(
    `./SupportParapraph/P6_ExploreDatasetsAndSubmitDatasets.md`
  );

  return (
    <div>
      <section id="introduction" className={classes.section}>
        <ReactMarkdown>{p1}</ReactMarkdown>
      </section>
      <section
        id="sign-up"
        className={classes.section}
        style={{ paddingBottom: "150px" }}
      >
        <ReactMarkdown>{p2}</ReactMarkdown>
      </section>
      <section
        id="sign-in"
        className={classes.section}
        style={{ paddingBottom: "150px" }}
      >
        <ReactMarkdown>{p3}</ReactMarkdown>
      </section>
      <section
        id="explore-cases"
        className={classes.section}
        style={{ paddingBottom: "150px" }}
      >
        <ReactMarkdown>{p4}</ReactMarkdown>
      </section>
      <section
        id="explore-cases"
        className={classes.section}
        style={{ paddingBottom: "150px" }}
      >
        <ReactMarkdown>{p5}</ReactMarkdown>
      </section>
      <section
        id="explore-datasets-and-submit-datasets"
        className={classes.section}
        style={{ paddingBottom: "150px" }}
      >
        <ReactMarkdown>{p6}</ReactMarkdown>
      </section>
    </div>
  );
}
