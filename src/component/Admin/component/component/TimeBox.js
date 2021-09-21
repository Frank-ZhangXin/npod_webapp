import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  timePicker: {
    width: "30px",
    height: "25px",
    marginLeft: "4px",
    marginBottom: "5px",
  },
  textField: {
    width: 80,
  },
}));

export default function TimeBox({ value, setValue, setChanged }) {
  const classes = useStyles();
  const [newTime, setNewTime] = useState(null);
  const handleDateChange = (t) => {
    setNewTime(t);
    setChanged(true);
  };
  return (
    <div>
      <Box className={classes.textField}>
        <TextField
          type="time"
          defaultValue={value}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            step: 300, // 5 min
          }}
        />
      </Box>
    </div>
  );
}
