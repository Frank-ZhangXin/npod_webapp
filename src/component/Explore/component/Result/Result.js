import React, { setState } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { connect } from "react-redux";
import Search from "./component/Search";
import FetchRawData from "./component/FetchRawData";
import CaseView from "../../../CaseView/CaseView";
import DataPreProcess from "./component/DataPreProcess";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "30vh",
  },
  button: {
    marginBottom: theme.spacing(2),
  },
  paper: {
    textAlign: "center",
    // color: theme.palette.text.secondary,
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
      cursor: "pointer",
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

function Result(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleSetDialogue = (value) => {
    setOpen(value);
  };

  return (
    <div className={classes.root}>
      {/* Fetch raw data */}
      <FetchRawData />
      <DataPreProcess />
      {/* Show search result */}

      <Search
        setDialogue={handleSetDialogue}
        requestedCaseId={props.requestedCaseId}
      />
      <CaseView open={open} setDialogue={handleSetDialogue} />
    </div>
  );
}

// Subscribe
const mapStateToProps = (state) => {
  return {
    // Raw Data
    rawData: state.explore.rawData,

    // Filtered Data
    filteredData: state.explore.filteredData,
  };
};

export default connect(mapStateToProps)(Result);
