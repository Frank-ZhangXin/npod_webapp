import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import GetAppIcon from "@material-ui/icons/GetApp";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 400,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Donnor Type", "Type A"),
  createData("Diabetes Duration", "14 years"),
  createData("Age", 62),
  createData("Gestational Age", 35),
  createData("Gender", "Male"),
  createData("Race", "Caucasion"),
  createData("Height", "175 CM"),
  createData("Weight", "70 KG"),
  createData("BMI", "260"),
  createData("Cause of Death", "---"),
  createData("Age Group", "Sennior"),
];

export default function DemoTable() {
  const classes = useStyles();

  return (
    <div>
      <Toolbar>
        <Typography className={classes.title} variant="h5" noWrap>
          Donnor Information
        </Typography>
        <Button color="primary" display="flex">
          <GetAppIcon />
          Download
        </Button>
      </Toolbar>
      <TableContainer component={Paper}>
        <Table
          className={classes.table}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
