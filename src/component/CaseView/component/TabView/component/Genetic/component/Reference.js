import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";

const useStyles = makeStyles((theme) => ({
  title: {
    paddingBottom: theme.spacing(2),
  },
  title2: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  container: {
    maxHeight: "56vh",
  },
  table: {
    paddingBottom: theme.spacing(2),
  },
  note: {
    minHeight: "35vh",
    overflow: "auto",
  },
  noteText: {
    padding: "15px",
  },
}));

export default function Reference() {
  const classes = useStyles();

  return (
    <div>
      <div>
        <div>
          <Typography variant="h5" className={classes.title2}>
            See these references for detailed data generation and calculation
          </Typography>
        </div>
        <div>
          <Card variant="outlined" className={classes.note}>
            <Typography
              variant="body2"
              component="p"
              className={classes.noteText}
            >
              <h4>
                <a
                  href="https://doi.org/10.1038/s41597-023-02244-6"
                  target="_blank"
                >
                  A genomic data archive from the Network for Pancreatic Organ
                  donors with Diabetes
                </a>
              </h4>
              <h4>
                <a href="https://doi.org/10.2337/dc15-1111" target="_blank">
                  A Type 1 Diabetes Genetic Risk Score Can Aid Discrimination
                  Between Type 1 and Type 2 Diabetes in Young Adults
                </a>
              </h4>{" "}
              <h4>
                <a href="https://doi.org/10.2337/dc18-1785" target="_blank">
                  Development and Standardization of an Improved Type 1 Diabetes
                  Genetic Risk Score for Use in Newborn Screening and Incident
                  Diagnosis
                </a>
              </h4>
              <h4>
                <a href="https://doi.org/10.2337/dc21-1254" target="_blank">
                  Improving the Prediction of Type 1 Diabetes Across Ancestries
                </a>
              </h4>
              <h4>
                <a
                  href="https://repository.niddk.nih.gov/studies/t1dgc/"
                  target="_blank"
                >
                  Type 1 Diabetes Genetic Consortium (T1DGC)
                </a>
              </h4>
              <h4>
                <a
                  href="https://pmc.ncbi.nlm.nih.gov/articles/PMC11312647/"
                  target="_blank"
                >
                  Genetic association and machine learning improves discovery
                  and prediction of type 1 diabetes
                </a>
              </h4>
            </Typography>
          </Card>
        </div>
      </div>
    </div>
  );
}
