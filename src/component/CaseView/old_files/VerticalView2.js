import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import actual_tissue_viability from "./assets/actual_tissue_viability.png";

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
          <MenuItem onClick={handleBox1}>Terminal Hospital Duration</MenuItem>
          <MenuItem onClick={handleBox2}>Organ Transport Time</MenuItem>
          <MenuItem onClick={handleBox3}>
            Actual Pancreatic Tissue Viability
          </MenuItem>
          <MenuItem onClick={handleBox4}>Cell Viability</MenuItem>
          <MenuItem onClick={handleBox5}>RNA RIN Value</MenuItem>
        </MenuList>
      </Paper>

      <Box display={showBox1}>
        <Paper variant="outlined" alignItems="stretch">
          <table rules="all">
            <thead>
              <tr>
                <th>Name</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Duration</td>
                <td>31 Hrs</td>
              </tr>
            </tbody>
          </table>
        </Paper>
      </Box>

      <Box display={showBox2}>
        <Paper variant="outlined" alignItems="stretch">
          <table rules="all">
            <thead>
              <tr>
                <th>Name</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Transport</td>
                <td>04-01-2021 14:00:00 CT</td>
              </tr>
            </tbody>
          </table>
        </Paper>
      </Box>

      <Box display={showBox3}>
        <Paper variant="outlined" alignItems="stretch">
          <img src={actual_tissue_viability} />
        </Paper>
      </Box>

      <Box display={showBox4}>
        <Paper variant="outlined" alignItems="stretch">
          <table rules="all">
            <thead>
              <tr>
                <th>Cell</th>
                <th>Viability</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Spleen</td>
                <td>No</td>
              </tr>
              <tr>
                <td>Lymph Nodes</td>
                <td>Yes</td>
              </tr>
            </tbody>
          </table>
        </Paper>
      </Box>

      <Box display={showBox5}>
        <Paper variant="outlined" alignItems="stretch">
          <table rules="all">
            <thead>
              <tr>
                <th>Pancreas Quality</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>RIN</td>
                <td>260/280</td>
              </tr>
              <tr>
                <td>RNA</td>
                <td>270/300</td>
              </tr>
            </tbody>
          </table>
        </Paper>
      </Box>
    </div>
  );
}
