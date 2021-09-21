import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import useCheckForeignKey from "./useCheckForeignKey";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import TextBox from "./TextBox";
import TextBoxLarge from "./TextBoxLarge";
import DateBox from "./DateBox";
import DropBox from "./DropBox";
import TimeBox from "./TimeBox";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

export default function InputBox({
  columnProps,
  name,
  value,
  setValue,
  setChanged,
}) {
  const classes = useStyles();

  const getInputContent = (input) => {
    switch (input) {
      case "inputBox":
        return (
          <TextBox value={value} setValue={setValue} setChanged={setChanged} />
        );
        break;
      case "inputBoxLarge":
        return (
          <TextBoxLarge
            value={value}
            setValue={setValue}
            setChanged={setChanged}
          />
        );
        break;
      case "dropDown":
        return (
          <DropBox
            value={value}
            setValue={setValue}
            setChanged={setChanged}
            ops={columnProps.ops}
          />
        );
        break;
      case "datePicker":
        return (
          <DateBox value={value} setValue={setValue} setChanged={setChanged} />
        );
      case "timePicker":
        return (
          <TimeBox value={value} setValue={setValue} setChanged={setChanged} />
        );
      default:
        break;
    }
  };

  // if (name === "OPO ID") {
  //   console.log("OPO ID is", value);
  // }

  return (
    <div className={classes.root}>
      <Box display="flex" alignItems="center">
        <Box>
          <label>{name}:</label>
        </Box>
        {/* <Box>
          {name.slice(-4).toLowerCase() === "date" ? (
            <DateBox
              value={value}
              setValue={setValue}
              setChanged={setChanged}
            />
          ) : name.slice(-7).toLowerCase() === "comment" ? (
            <TextBoxLarge
              value={value}
              setValue={setValue}
              setChanged={setChanged}
            />
          ) : name === "Donor Type ID" ? (
            <DropBox
              value={value}
              setValue={setValue}
              setChanged={setChanged}
              ops={columnProps.ops}
            />
          ) : (
            <TextBox
              value={value}
              setValue={setValue}
              setChanged={setChanged}
            />
          )}
        </Box> */}
        <Box>{getInputContent(columnProps.input)}</Box>
      </Box>
    </div>
  );
}
