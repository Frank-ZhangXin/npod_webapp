import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridBox from "./component/GridBox";
import useDebounced from "./component/useDebounced";
import useRetrieve from "./component/useRetrieve";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
}));

const handleSumbit = async function (event) {};

export default function CaseProcessing_step2(
  caseId,
  update,
  accept,
  setChanged
) {
  const classes = useStyles();

  const columnList = [];

  return (
    <div className={classes.root}>
      <form noValidate onSubmit={handleSumbit}>
        <div></div>
      </form>
    </div>
  );
}
