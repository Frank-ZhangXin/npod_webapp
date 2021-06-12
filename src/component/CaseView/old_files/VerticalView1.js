import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import DemoTable from "./DemoTable";
import DemoTable2 from "./DemoTable2";

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

export default function VerticalView1() {
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

  const handleBox3 = () => {
    setShowBox1("none");
    setShowBox2("none");
    setShowBox3("flex");
    setShowBox4("none");
    setShowBox5("none");
  };

  const handleBox4 = () => {
    setShowBox1("none");
    setShowBox2("none");
    setShowBox3("none");
    setShowBox4("flex");
    setShowBox5("none");
  };

  const handleBox5 = () => {
    setShowBox1("none");
    setShowBox2("none");
    setShowBox3("none");
    setShowBox4("none");
    setShowBox5("flex");
  };

  return (
    <div className={classes.root}>
      <Paper variant="outlined" className={classes.paper}>
        <MenuList>
          <MenuItem onClick={handleBox1}>Donnor Type and Demographics</MenuItem>
          <MenuItem onClick={handleBox2}>
            Lab Test and Serology Results{" "}
          </MenuItem>
          <MenuItem onClick={handleBox3}>Clinical and Family History</MenuItem>
          <MenuItem onClick={handleBox4}>Medications</MenuItem>
          <MenuItem onClick={handleBox5}>Case Narrative</MenuItem>
        </MenuList>
      </Paper>

      <Box display={showBox1}>
        <Paper variant="outlined" alignItems="stretch">
          <DemoTable />
        </Paper>
      </Box>

      <Box display={showBox2}>
        <Paper variant="outlined" alignItems="stretch">
          <DemoTable2 />
        </Paper>
      </Box>

      <Box display={showBox3}>
        <Paper variant="outlined" alignItems="stretch">
          <DemoTable />
        </Paper>
      </Box>

      <Box display={showBox4}>
        <Paper variant="outlined" alignItems="stretch">
          <DemoTable2 />
        </Paper>
      </Box>

      <Box display={showBox5}>
        <Paper variant="outlined" alignItems="stretch">
          <DemoTable />
        </Paper>
      </Box>
    </div>
  );
}
