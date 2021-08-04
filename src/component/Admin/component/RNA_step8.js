import React, { setState } from "react";
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
    maxWidth: "100px",
  },
}));

const handleSumbit = async function (event) {};

export default function RNA_step8() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <form noValidate onSubmit={handleSumbit}>
        <div>
          <Box display="flex" alignItems="center">
            <Box>
              <Typography>Donor Age (Years)</Typography>
            </Box>
            <Box>
              <TextField
                defaultValue="56"
                variant="outlined"
                size="small"
                className={classes.inputBox}
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
