import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  datePicker: {
    width: "140px",
    height: "25px",
    marginLeft: "4px",
    marginBottom: "5px",
  },
}));

export default function DateBox({ name, value, setValue, setChanged }) {
  const classes = useStyles();
  const [newDate, setNewDate] = useState(null);
  const handleDateChange = (date) => {
    setValue(date.toLocaleDateString("en-CA").slice(0, 10));
    console.log(
      "writing time is",
      date.toLocaleDateString("en-CA").slice(0, 10)
    );
    setNewDate(date);
    setChanged(true);
  };
  return (
    <div>
      <Box display="flex" alignItems="center">
        <Box>
          <label>{name}:</label>
        </Box>
        <Box>
          <DatePicker
            selected={
              value && !newDate
                ? new Date(
                    Date.parse(value.slice(0, 10) + " 00:00:00 GMT-0500")
                  )
                : newDate
            }
            onChange={handleDateChange}
            className={classes.datePicker}
          />
        </Box>
      </Box>
    </div>
  );
}
