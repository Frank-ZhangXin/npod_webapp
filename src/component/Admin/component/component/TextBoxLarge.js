import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";

const useStyles = makeStyles((theme) => ({
  inputLarge: {
    maxWidth: "140px",
    minHeight: "25px",
    marginLeft: "4px",
    marginBottom: "5px",
  },
}));

export default function TextBoxLarge({ value, setValue, setChanged }) {
  const classes = useStyles();
  const handleChange = (event) => {
    setValue(event.target.value);
    setChanged(true);
  };
  return (
    <div>
      <TextareaAutosize
        defaultValue={value}
        onChange={handleChange}
        className={classes.inputLarge}
      />
    </div>
  );
}
