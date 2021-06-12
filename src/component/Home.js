import React, { useEffect, useState } from "react";
import { AmplifySignOut } from "@aws-amplify/ui-react";
import { API, Auth } from "aws-amplify";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
  },
}));

function Home() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <h1>Welcome To Use nPOD! </h1>
    </div>
  );
}

export default Home;
