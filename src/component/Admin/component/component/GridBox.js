import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import InputBox from "./InputBox";

GridBox.defaultProps = {
  nameList: ["name_1", "name_2", "name_3"],
  valueList: ["value_1", "value_2", "value_3"],
};

export default function GridBox(props) {
  return (
    <div>
      <Grid container spacing={2} justify={"left"}>
        <Grid item md={4}>
          <InputBox name={props.nameList[0]} value={props.valueList[0]} />
        </Grid>
        <Grid item md={4}>
          <InputBox name={props.nameList[1]} value={props.valueList[1]} />
        </Grid>
        <Grid item md={4}>
          <InputBox name={props.nameList[2]} value={props.valueList[2]} />
        </Grid>
      </Grid>
    </div>
  );
}
