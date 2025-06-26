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
    maxHeight: "25vh",
    overflow: "auto",
  },
  noteText: {
    padding: "15px",
  },
}));

export default function Annoucement() {
  const classes = useStyles();

  return (
    <div>
      <div>
        <div>
          <Typography variant="h5" className={classes.title}>
            Announcement
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
                As of April 2025, nPOD now uses the improved TOPMed-r3
                imputation panel for calculating Type 1 Diabetes Genetic Risk
                Scores (GRS1 and GRS2). To ensure compatibility with established
                scoring algorithms, a small number of proxy SNPs were added to
                support accurate and consistent risk estimation. For more
                background, refer to the publication below by Kyle J. Gaulton et
                al. If you have any questions about this update, please
                contact&nbsp;
                <a href="mailto:npod@pathology.ufl.edu">
                  npod@pathology.ufl.edu
                </a>
              </h4>
            </Typography>
          </Card>
        </div>
      </div>
    </div>
  );
}
