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
import IntegerNumberBox from "./IntegerNumberBox";
import FloatNumberBox from "./FloatNumberBox";

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
          <TextBox
            name={name}
            value={value}
            setValue={setValue}
            setChanged={setChanged}
            restrict={columnProps.restrict}
            valid={columnProps.valid}
          />
        );
        break;
      case "inputBoxLarge":
        return (
          <TextBoxLarge
            name={name}
            value={value}
            setValue={setValue}
            setChanged={setChanged}
            restrict={columnProps.restrict}
            valid={columnProps.valid}
          />
        );
        break;
      case "integerBox":
        return (
          <IntegerNumberBox
            name={name}
            value={value}
            setValue={setValue}
            setChanged={setChanged}
            restrict={columnProps.restrict}
            valid={columnProps.valid}
          />
        );
        break;
      case "floatBox":
        return (
          <FloatNumberBox
            name={name}
            value={value}
            setValue={setValue}
            setChanged={setChanged}
            restrict={columnProps.restrict}
            valid={columnProps.valid}
          />
        );
        break;
      case "dropDown":
        return (
          <DropBox
            name={name}
            value={value}
            setValue={setValue}
            setChanged={setChanged}
            ops={columnProps.ops}
          />
        );
        break;
      case "datePicker":
        return (
          <DateBox
            name={name}
            value={value}
            setValue={setValue}
            setChanged={setChanged}
          />
        );
      case "timePicker":
        return (
          <TimeBox
            name={name}
            value={value}
            setValue={setValue}
            setChanged={setChanged}
          />
        );
      default:
        break;
    }
  };

  return (
    <div className={classes.root}>{getInputContent(columnProps.input)}</div>
  );
}
