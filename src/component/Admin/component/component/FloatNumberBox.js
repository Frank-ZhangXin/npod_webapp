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

export default function FloatNumberBox({ value, setValue, setChanged }) {
  const classes = useStyles();
  const [isFloat, setIsFloat] = useState(true);
  const handleChange = (event) => {
    const newValue = event.target.value;
    if (!/[a-zA-Z]/.test(newValue) && parseFloat(newValue) == newValue) {
      setValue(newValue);
      setIsFloat(true);
      setChanged(true);
    } else if (newValue === "") {
      setValue(null);
      setIsFloat(true);
      setChanged(true);
    } else {
      setIsFloat(false);
    }
  };
  return (
    <div>
      <input
        type="text"
        defaultValue={value}
        onChange={handleChange}
        className={isFloat ? classes.input : classes.errInput}
      />
    </div>
  );
}
