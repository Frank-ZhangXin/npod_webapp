import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import InputBox from "./InputBox";

const useStyles = makeStyles((theme) => ({
  valueList: {
    display: "none",
  },
}));

export default function GridBox({
  columnPropsList,
  nameList,
  valueList,
  setValueList,
  setChanged,
}) {
  const classes = useStyles();
  return (
    <div>
      <Grid container spacing={2} justify="flex-start">
        <Grid item md={4}>
          <InputBox
            columnProps={columnPropsList[0]}
            name={nameList[0]}
            value={valueList[0]}
            setValue={setValueList[0]}
            setChanged={setChanged}
          />
        </Grid>

        {nameList[1] ? (
          <Grid item md={4}>
            <InputBox
              columnProps={columnPropsList[1]}
              name={nameList[1]}
              value={valueList[1]}
              setValue={setValueList[1]}
              setChanged={setChanged}
            />
          </Grid>
        ) : null}

        {nameList[2] ? (
          <Grid item md={4}>
            <InputBox
              columnProps={columnPropsList[2]}
              name={nameList[2]}
              value={valueList[2]}
              setValue={setValueList[2]}
              setChanged={setChanged}
            />
          </Grid>
        ) : null}
      </Grid>
    </div>
  );
}
