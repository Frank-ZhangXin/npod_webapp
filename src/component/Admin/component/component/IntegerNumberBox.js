import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  input: {
    maxWidth: "140px",
    height: "25px",
    marginLeft: "4px",
    marginBottom: "5px",
  },
  errInput: {
    maxWidth: "140px",
    height: "25px",
    marginLeft: "4px",
    marginBottom: "5px",
    color: "red",
    border: "1px solid red",
  },
}));

export default function IntegerNumberBox({ value, setValue, setChanged }) {
  const classes = useStyles();
  const [isInt, setIsInt] = useState(true);
  const handleChange = (event) => {
    const newValue = event.target.value;
    if (!/[a-zA-Z]/.test(newValue) && parseInt(newValue) == newValue) {
      setValue(newValue);
      setIsInt(true);
      setChanged(true);
    } else {
      setIsInt(false);
    }
  };
  return (
    <div>
      <input
        type="text"
        defaultValue={value}
        onChange={handleChange}
        className={isInt ? classes.input : classes.errInput}
      />
    </div>
  );
}
