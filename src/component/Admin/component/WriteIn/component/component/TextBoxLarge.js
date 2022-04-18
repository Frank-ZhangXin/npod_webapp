import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  inputLarge: {
    maxWidth: "140px",
    minHeight: "30px",
    marginLeft: "4px",
    marginBottom: "3px",
  },
  input_invalid: {
    maxWidth: "140px",
    minHeight: "30px",
    marginLeft: "4px",
    marginBottom: "3px",
    color: "red",
    border: "2px solid red",
  },
  hint_invalid: {
    marginTop: "-5px",
    color: "red",
    fontSize: 12,
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
    value.length <= restrict.range[1]
  ) {
    return true;
  }

  return false;
}

const largeInputBoxStyle = {
  resize: "both",
  overflow: "auto",
};

export default function TextBoxLarge({
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
          {/* <TextareaAutosize
            defaultValue={value}
            onChange={handleChange}
            className={invalid ? classes.input_invalid : classes.inputLarge}
          /> */}
          {/* <input
            type="text"
            defaultValue={value}
            onChange={handleChange}
            className={invalid ? classes.errInput : classes.inputLarge}
          /> */}
          <textarea
            type="text"
            defaultValue={value || ""}
            onChange={handleChange}
            className={invalid ? classes.errInput : classes.inputLarge}
          ></textarea>
        </Box>
      </Box>
      {invalid ? (
        <p className={classes.hint_invalid}>
          Input is invalid, type: string, constrain: {restrict.range[0]} &lt;=
          input length &lt;= {restrict.range[1]}
        </p>
      ) : null}
    </div>
  );
}
