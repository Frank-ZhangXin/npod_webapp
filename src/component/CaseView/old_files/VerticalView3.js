import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import insulin_secretion from "./assets/insulin_secretion.png";
import glucagon_secretion from "./assets/glucagon_secretion.png";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  paper: {
    marginRight: theme.spacing.unit * 2,
  },
  innerPaper: {
    width: "100%",
  },
}));

export default function VerticalView2() {
  const classes = useStyles();
  const [showBox1, setShowBox1] = useState("flex");
  const [showBox2, setShowBox2] = useState("none");
  const [showBox3, setShowBox3] = useState("none");
  const [showBox4, setShowBox4] = useState("none");
  const [showBox5, setShowBox5] = useState("none");

  const handleBox1 = () => {
    setShowBox1("flex");
    setShowBox2("none");
    setShowBox3("none");
    setShowBox4("none");
    setShowBox5("none");
  };

  const handleBox2 = () => {
    setShowBox1("none");
    setShowBox2("flex");
    setShowBox3("none");
    setShowBox4("none");
    setShowBox5("none");
  };

  return (
    <div className={classes.root}>
      <Paper variant="outlined" className={classes.paper}>
        <MenuList>
          <MenuItem onClick={handleBox1}>Insulin Secretion</MenuItem>
          <MenuItem onClick={handleBox2}>Glucagon Secretion</MenuItem>
        </MenuList>
      </Paper>

      <Box display={showBox1}>
        <Paper variant="outlined" alignItems="stretch">
          <img src={insulin_secretion} />
        </Paper>
      </Box>

      <Box display={showBox2}>
        <Paper variant="outlined" alignItems="stretch">
          <img src={glucagon_secretion} />
        </Paper>
      </Box>
    </div>
  );
}
