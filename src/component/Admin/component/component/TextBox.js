import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  input: {
    maxWidth: "140px",
    height: "30px",
    marginLeft: "4px",
    marginBottom: "5px",
  },
}));

export default function TextBox({ value, setValue, setChanged }) {
  const classes = useStyles();
  const handleChange = (event) => {
    setValue(event.target.value);
    setChanged(true);
  };
  return (
    <div>
      <input
        type="text"
        defaultValue={value}
        onChange={handleChange}
        className={classes.input}
      />
    </div>
  );
}
