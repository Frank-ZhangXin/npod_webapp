import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";

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
    //minWidth: 650,
  },
  note: {
    maxHeight: "25vh",
    overflow: "auto",
  },
  noteText: {
    padding: "10px",
  },
}));

function HistopathologyInfo(props) {
  const classes = useStyles();

  function createData(name, value) {
    return { name, value };
  }

  const rows = [];

  return (
    <div>
      <div>
        <Typography variant="h5" className={classes.title}>
          Histopathology Information
        </Typography>
      </div>
      <div>
        <Card variant="outlined" className={classes.note}>
          <Typography
            variant="body2"
            component="p"
            className={classes.noteText}
          >
            {props.currentCase.histopathology
              ? props.currentCase.histopathology
              : "Unavailable"}
          </Typography>
        </Card>
      </div>
    </div>
  );
}

// Subscribe
const mapStateToProps = (state) => {
  return {
    // Filtered Data
    currentCase: state.explore.currentCase,

    // Donor Types (map)
    donorTypesMap: state.explore.donorTypesMap,

    // Cause of Deaht map
    causeOfDeathMap: state.explore.causeOfDeathMap,
  };
};

export default connect(mapStateToProps, null)(HistopathologyInfo);
