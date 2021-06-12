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
  createData("Auto Antibody Status", "Active"),
  createData("GADA", "Positive"),
  createData("IA2A", "Negative"),
  createData("mIAA Age", "Positive"),
  createData("ZnT8A", "Negative"),
  createData("C-Peptide", "20 ng/mL"),
  createData("HbA1c", "15%"),
  createData("Serologies", "---"),
  createData("Total Pancreas Weight", "260 G"),
  createData("Panhead", "100 G"),
  createData("Panbody", "130 G"),
  createData("Panbody", "30 G"),
];

export default function DemoTable2() {
  const classes = useStyles();

  return (
    <div>
      <Toolbar>
        <Typography className={classes.title} variant="h5" noWrap>
          Lab Test Results
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
