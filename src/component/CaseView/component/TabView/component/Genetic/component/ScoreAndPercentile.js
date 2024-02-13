import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

// import Table from "@material-ui/core/Table";
// import TableBody from "@material-ui/core/TableBody";
// import TableCell from "@material-ui/core/TableCell";
// import TableContainer from "@material-ui/core/TableContainer";
// import TableHead from "@material-ui/core/TableHead";
// import TableRow from "@material-ui/core/TableRow";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import { Chart } from "react-google-charts";
import { Box } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  title: {
    paddingBottom: theme.spacing(2),
  },
  title2: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  container: {
    maxHeight: "56vh",
  },
  table: {
    paddingBottom: theme.spacing(2),
  },
  note: {
    maxHeight: "25vh",
    overflow: "auto",
  },
  noteText: {
    padding: "10px",
  },
}));

function ScoreAndPercentile(props) {
  const classes = useStyles();
  const genetic = props.geneticMap[props.currentCase.case_id];

  function createData(attrName, attrData1, attrData2, attrData3) {
    return { attrName, attrData1, attrData2, attrData3 };
  }

  const rows = [
    createData(
      "Score",
      genetic && genetic.GRS1_score ? genetic.GRS1_score : "Unavailable",
      genetic && genetic.GRS2_score ? genetic.GRS2_score : "Unavailable",
      genetic && genetic.AA_GRS_score === null
        ? genetic.AA_GRS_score
        : "Unavailable"
    ),
    createData(
      "Percentile",
      genetic && genetic.GRS1_percentile
        ? genetic.GRS1_percentile
        : "Unavailable",
      genetic && genetic.GRS2_percentile
        ? genetic.GRS2_percentile
        : "Unavailable",
      genetic && genetic.AA_GRS_percentile
        ? genetic.AA_GRS_percentile
        : "Unavailable"
    ),
  ];

  const GRS1PercentileDiffData = {
    old: [
      ["Name", "Percentile"],
      ["GRS1", 100],
    ],
    new: [
      ["Name", "Percentile"],
      [
        "GRS1",
        genetic && genetic.GRS1_percentile ? genetic.GRS1_percentile : 0,
      ],
    ],
  };

  const GRS2PercentileDiffData = {
    old: [
      ["Name", "Percentile"],
      ["GRS2", 100],
    ],
    new: [
      ["Name", "Percentile"],
      [
        "GRS2",
        genetic && genetic.GRS2_percentile ? genetic.GRS2_percentile : 0,
      ],
    ],
  };

  const AAGRSPercentileDiffData = {
    old: [
      ["Name", "Percentile"],
      ["AAGRS", 100],
    ],
    new: [
      ["Name", "Percentile"],
      [
        "AAGRS",
        genetic && genetic.AA_GRS_percentile ? genetic.AA_GRS_percentile : 0,
      ],
    ],
  };

  const GRSPercentileDiffDataArr = [
    GRS1PercentileDiffData,
    GRS2PercentileDiffData,
    AAGRSPercentileDiffData,
  ];

  return (
    <div>
      <div>
        <Typography variant="h5" className={classes.title}>
          Score & Percentile
        </Typography>
      </div>
      <div>
        <TableContainer
          component={Paper}
          className={classes.container}
          sx={{ width: "max-content" }}
        >
          <Table className={classes.table} stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell
                  align="center"
                  sx={{ backgroundColor: "#BBDEFB", width: 70 }}
                >
                  GRS1
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ backgroundColor: "#DCEDC8", width: 70 }}
                >
                  GRS2
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ backgroundColor: "#FFF0B2", width: 70 }}
                >
                  AAGRS
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row" variant="head">
                    {row.attrName}
                  </TableCell>
                  <TableCell align="center">{row.attrData1}</TableCell>
                  <TableCell align="center">{row.attrData2}</TableCell>
                  <TableCell align="center">{row.attrData3}</TableCell>
                </TableRow>
              ))}

              <TableRow>
                <TableCell variant="head"></TableCell>
                {GRSPercentileDiffDataArr.map((diffData, index) => (
                  <TableCell style={{ minWidthwidth: "300px" }}>
                    <Chart
                      chartType="ColumnChart"
                      width="100%"
                      height="200px"
                      diffdata={diffData}
                      options={{
                        theme: "maximized",
                        legend: "none",
                        diff: {
                          oldData: {
                            tooltip: {
                              prefix: "label 1",
                            },
                          },
                          newData: {
                            widthFactor: 0.7,
                            tooltip: {
                              prefix: "label 2",
                            },
                          },
                        },
                      }}
                    />
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

// Subscribe
const mapStateToProps = (state) => {
  return {
    // Filtered Data
    currentCase: state.explore.currentCase,

    // Donor Types (map)
    donorTypesMap: state.explore.donorTypesMap,

    // genetic map
    geneticMap: state.explore.geneticMap,
  };
};

export default connect(mapStateToProps, null)(ScoreAndPercentile);
