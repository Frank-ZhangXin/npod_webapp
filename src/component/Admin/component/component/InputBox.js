import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  inputBox: {
    maxWidth: "120px",
  },
}));

InputBox.defaultProps = {
  name: "Undefined",
  value: "Undefined",
};

export default function InputBox(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Box display="flex" alignItems="center">
        <Box>
          <Typography>{props.name}</Typography>
        </Box>
        <Box>
          <TextField
            defaultValue={props.value}
            variant="outlined"
            size="small"
            className={classes.inputBox}
          />
        </Box>
      </Box>
    </div>
  );
}
