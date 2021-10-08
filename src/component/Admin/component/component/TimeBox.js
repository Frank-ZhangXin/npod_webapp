import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import "rc-time-picker/assets/index.css";
import moment from "moment";
import TimePicker from "rc-time-picker";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";

const StyledTimePicker = styled(TimePicker)`
  & .rc-time-picker-clear {
    position: absolute;
    right: -30px;
  }

  & .rc-time-picker-clear-icon:after {
    font-size: 15px;
  }
  & .rc-time-picker-input {
    width: 140px;
    font-size: 16px;
  }
`;

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    width: 200,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}));

export default function TimeBox({ name, value, setValue, setChanged }) {
  const classes = useStyles();
  const [defaultTime, setDefaultTime] = useState(null);
  const [defaultValue, setDefaultValue] = useState(null);
  useEffect(() => {
    setDefaultTime(value);
    setDefaultValue(moment("2021-09-22 " + value, "YYYY-MM-DD hh:mm:ss"));
  }, [value]);

  const handleTimeChange = (event) => {
    setValue(event.target.value);
    setChanged(true);
    setDefaultTime(event.target.value);
  };

  const onChange = (newValue) => {
    console.log(newValue && newValue.format("HH:mm"));
    setValue(newValue.format("HH:mm"));
    setDefaultValue(newValue);
  };

  return (
    <div>
      <Box display="flex" alignItems="center">
        <Box>
          <label>{name}:</label>
        </Box>
        <Box>
          <StyledTimePicker
            style={{ width: 100 }}
            showSecond={false}
            value={defaultValue}
            className="xxx"
            onChange={onChange}
          />
        </Box>
      </Box>
    </div>
  );
}
