import React, { setState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Select from "react-select";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
  inputBox: {
    maxWidth: "100px",
  },
  multiSelect: {
    marginLeft: "5px",
  },
}));

const options = [
  { value: "No Diabetes", label: "No Diabetes" },
  { value: "Type 1 Diabetes", label: "Type 1 Diabetes" },
  { value: "Autoantibody Positive", label: "Autoantibody Positive" },
  { value: "Type 2 Diabetes", label: "Type 2 Diabetes" },
  { value: "Other – No Diabetes", label: "Other – No Diabetes" },
  { value: "Other – Diabetes", label: "Other – Diabetes" },
  {
    value: "Type 1 Diabetes Joslin Medalist",
    label: "Type 1 Diabetes Joslin Medalist",
  },
  {
    value: "Transplant",
    label: "Transplant",
  },
  {
    value: "Cystic Fibrosis",
    label: "Cystic Fibrosis",
  },
  {
    value: "Monogenic Diabetes",
    label: "Monogenic Diabetes",
  },
  {
    value: "Gestational Diabetes",
    label: "Gestational Diabetes",
  },
  { value: "Pregnancy", label: "Pregnancy" },
  {
    value: "Gastric Bypass",
    label: "Gastric Bypass",
  },
  { value: "Ketosis-Prone Diabetes", label: "Ketosis-Prone Diabetes" },
  { value: "Pending", label: "Pending" },
];

const handleSumbit = async function (event) {};

export default function CreateForm1() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <form noValidate onSubmit={handleSumbit}>
        <div>
          <Box display="flex" alignItems="center">
            <Box>
              <Typography>Donor Type</Typography>
            </Box>
            <Box>
              <Select
                className={classes.multiSelect}
                defaultValue={[options[0]]}
                options={options}
                isMulti
                closeMenuOnSelect={false}
              />
            </Box>
          </Box>
          <Box display="flex" alignItems="center">
            <Box>
              <Typography>Donor Height (CM)</Typography>
            </Box>
            <Box>
              <TextField
                defaultValue="160"
                variant="outlined"
                size="small"
                className={classes.inputBox}
              />
            </Box>
          </Box>
          <Box display="flex" alignItems="center">
            <Box>
              <Typography>Donor Weight (Kg)</Typography>
            </Box>
            <Box>
              <TextField
                defaultValue="83"
                variant="outlined"
                size="small"
                className={classes.inputBox}
              />
            </Box>
          </Box>
        </div>
      </form>
    </div>
  );
}
