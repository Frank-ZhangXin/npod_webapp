import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";

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
  hint_invalid: {
    marginTop: "-5px",
    color: "red",
    fontSize: 12,
  },
}));

function isValid(value, restrict) {
  if (restrict.range.length === 0 || value === "") {
    return true;
  }
  // int or float
  if (
    restrict.type === "float" &&
    restrict.range[0] <= value &&
    value <= restrict.range[1] &&
    !/[a-zA-Z]/.test(value) &&
    parseFloat(value) == value
  ) {
    return true;
  }
  return false;
}

export default function FloatNumberBox({
  name,
  value,
  setValue,
  setChanged,
  restrict,
  valid,
}) {
  const classes = useStyles();
  const [invalid, setInvalid] = useState(false);
  const handleChange = (event) => {
    if (isValid(event.target.value, restrict)) {
      if (event.target.value === "") {
        setValue(null);
      } else {
        setValue(event.target.value);
      }
      setChanged(true);
      valid[1](true);
      setInvalid(false);
    } else {
      valid[1](false);
      setInvalid(true);
    }
  };
  return (
    <div>
      <Box display="flex" alignItems="center">
        <Box>
          <label>{name}:</label>
        </Box>
        <Box>
          <input
            type="text"
            defaultValue={value}
            onChange={handleChange}
            className={invalid ? classes.errInput : classes.input}
          />
        </Box>
      </Box>
      {invalid ? (
        <p className={classes.hint_invalid}>
          Input is invalid, type: float, constrain: {restrict.range[0]} &lt;=
          input &lt;=
          {restrict.range[1]}
        </p>
      ) : null}
    </div>
  );
}
