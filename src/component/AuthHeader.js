import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { useParams, useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#263238",
  },
  menuButton: {
    marginRight: theme.spacing(1),
    "&:hover": {
      background: "none",
    },
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    color: "transparent",
  },
}));

export default function AuthHeader({ location }) {
  const classes = useStyles();
  const [title, setTitle] = useState("");
  const history = useHistory();
  const homeHandler = () => {
    history.push("/");
  };

  return (
    <div className={classes.root}>
      <Helmet>
        <title>nPOD {location}</title>
      </Helmet>
      <AppBar position="static" color="primary">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={homeHandler}
          >
            <ArrowBackIosIcon />
            <div>
              <Typography variant="h6" className={classes.title}>
                HOME
              </Typography>
            </div>
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}
