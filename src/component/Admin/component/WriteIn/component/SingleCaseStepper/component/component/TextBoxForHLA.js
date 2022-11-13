import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import TextCheckAndFix from "./TextCheckAndFix";

const useStyles = makeStyles((theme) => ({
  input: {
    maxWidth: "140px",
    height: "30px",
    marginLeft: "4px",
    marginBottom: "5px",
  },
  input_invalid: {
    maxWidth: "140px",
    height: "30px",
    marginLeft: "4px",
    marginBottom: "5px",
    color: "red",
    border: "2px solid red",
  },
  hint_invalid: {
    marginTop: "-5px",
    color: "red",
    fontSize: 12,
  },
  labelColored: {
    backgroundColor: "#fae7cf",
    padding: "3px",
  },
  label: {
    padding: "3px",
  },
}));

function isValid(value, restrict) {
  if (restrict.range.length === 0) {
    return true;
  }
  // string type
  if (
    restrict.type === "string" &&
    restrict.range[0] <= value.length &&
    value.length <= restrict.range[1] &&
    /^[0-9][0-9]:[0-9][0-9]$|^[0-9]:[0-9]$|^[0-9][0-9]\([0-9][0-9]\)$|^[0-9][0-9]:[0-9][0-9]\/0|^[0-9][0-9]$/.test(
      value
    )
  ) {
    return true;
  }

  return false;
}

export default function TextBox({
  name,
  value,
  setValue,
  setChanged,
  restrict,
  valid,
}) {
  const classes = useStyles();
  const [invalid, setInvalid] = useState(false);
  const [labelChanged, setLabelChanged] = useState(false);
  const handleChange = (event) => {
    var newVal = TextCheckAndFix(event.target.value);
    if (isValid(newVal, restrict)) {
      if (newVal === "") {
        setValue(null);
      } else {
        setValue(newVal);
      }
      setChanged(true);
      valid[1](true);
      setInvalid(false);
    } else {
      valid[1](false);
      setInvalid(true);
    }
    setLabelChanged(true);
  };
  return (
    <div>
      <Box display="flex" alignItems="center">
        <Box>
          <label
            className={labelChanged ? classes.labelColored : classes.label}
          >
            {name}:
          </label>
        </Box>
        <Box>
          <input
            type="text"
            defaultValue={value}
            onInput={handleChange}
            className={invalid ? classes.input_invalid : classes.input}
          />
        </Box>
      </Box>
      {invalid ? (
        <p className={classes.hint_invalid}>
          Input is invalid, type: string, constrain: {restrict.range[0]} &lt;=
          input length &lt;= {restrict.range[1]}, format: 00 or 0:0 or 00:00 or
          00(00) or 00:00/0
        </p>
      ) : null}
    </div>
  );
}
