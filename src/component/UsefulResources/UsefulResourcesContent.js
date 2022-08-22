import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import useMdImport from "./useMdImport";

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
    "& h3": {
      margin: "20px 30px",
      fontSize: "25px",
    },
    "& h4": {
      margin: "20px 30px",
      fontSize: "20px",
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
      maxWidth: "800px",
      fontSize: "18px",
      borderLeft: "5px solid #6b6b6b",
      backgroundColor: "#e3e4e6",
    },
  },
}));

export default function UsefulResourcesContent() {
  const classes = useStyles();
  // HTML content

  const p1 = useMdImport(`./UsefulResourcesParapraph/P1_Introduction.txt`);
  const p2 = useMdImport(
    `./UsefulResourcesParapraph/P2_nPOD_Operational_Model.txt`
  );
  const p3 = useMdImport(
    `./UsefulResourcesParapraph/P3_Organ_Processing_At_nPOD.txt`
  );
  const p4 = useMdImport(
    `./UsefulResourcesParapraph/P4_Navigating_nPOD_Platforms.txt`
  );
  const p4_1 = useMdImport(
    `./UsefulResourcesParapraph/P4_1_Maximizing_nPOD_Sample_Requests.txt`
  );
  const p4_2 = useMdImport(
    `./UsefulResourcesParapraph/P4_2_Online_Sample_Ordering.txt`
  );
  const p4_3 = useMdImport(`./UsefulResourcesParapraph/P4_3_RRID_Portal.txt`);
  const p5 = useMdImport(
    `./UsefulResourcesParapraph/P5_Useful_Tutorials_and_Publications.txt`
  );
  const p5_1 = useMdImport(
    `./UsefulResourcesParapraph/P5_1_Electron_Microscopy.txt`
  );
  const p5_2 = useMdImport(`./UsefulResourcesParapraph/P5_2_Genetics.txt`);

  const p6 = useMdImport(
    `./UsefulResourcesParapraph/P6_nPOD_Research_Webinars.txt`
  );
  const p7 = useMdImport(
    `./UsefulResourcesParapraph/P7_Protocol_Resouces_for_the_Life_Scientists.txt`
  );

  return (
    <div>
      <section id="introduction" className={classes.section}>
        {p1}
      </section>
      <section id="npod-operational-model" className={classes.section}>
        {p2}
      </section>
      <section id="organ-processing-at-npod" className={classes.section}>
        {p3}
      </section>
      <section id="navigating-npod-platforms" className={classes.section}>
        {p4}
      </section>
      <section id="maximizing-sample-requests" className={classes.section}>
        {p4_1}
      </section>
      <section id="online-sample-ordering" className={classes.section}>
        {p4_2}
      </section>
      <section id="rrid-portal" className={classes.section}>
        {p4_3}
      </section>
      <section
        id="helpful-tutorials-and-publications-to-assist-in-data-interpretation"
        className={classes.section}
      >
        {p5}
      </section>
      <section id="eletron-microscopy" className={classes.section}>
        {p5_1}
      </section>
      <section id="genetics" className={classes.section}>
        {p5_2}
      </section>
      <section id="npod-research-webinars" className={classes.section}>
        {p6}
      </section>
      <section
        id="protocol-resources-for-life-scientists"
        className={classes.section}
      >
        {p7}
      </section>

      <section
        className={classes.section}
        style={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <p style={{ fontStyle: "italic" }}>
          Prepared by University of Florida, nPOD{" "}
          <span style={{ fontStyle: "normal" }}>|</span> Version 1{" "}
          <span style={{ fontStyle: "normal" }}>|</span> August 2022
        </p>
      </section>
    </div>
  );
}
