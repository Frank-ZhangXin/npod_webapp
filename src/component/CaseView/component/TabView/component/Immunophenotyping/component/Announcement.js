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
    maxHeight: "45vh",
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
            Annoucement
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
                As of November 2024, nPOD has implemented an updated
                Immunophenotyping panel for donor sample analysis. While it
                retains many core markers from the previous HIP2_Lineage panel,
                the new CBC panel features key improvements in fluorochromes,
                gating strategy, and the range of analyzed cell populations.
                CD33 has been removed, and new markers such as CD5, CD4, and CD8
                have been added. Neutrophils and eosinophils are now
                differentiated using CD66b instead of CD16. The panel now
                enumerates ILCs, pDCs, CD5+ B cells, various T cell subsets
                (including CD4+, CD8+, and CD4+CD8+), NKT cells, and NK cell
                subsets based on CD56 and CD16 expression. Boolean gating is no
                longer part of the workflow, and gMFI values for HLA-DR are now
                provided across all identified populations. If you have any
                questions about this update, please contact&nbsp;
                <a href="npod@pathology.ufl.edu">npod@pathology.ufl.edu</a>
              </h4>
            </Typography>
          </Card>
        </div>
      </div>
    </div>
  );
}
