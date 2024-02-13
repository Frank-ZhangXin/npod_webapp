import React from "react";
import { connect } from "react-redux";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";

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
  helpIcon: {
    fontSize: 18,
    color: "#0292FF",
  },
  helpText: {
    padding: "10px",
    textShadow: "0 0 20px white",
  },
}));

const GeneticTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    color: "#000000",
    border: "1px solid #dadde9",
    maxWidth: "420px",
    fontSize: 15,
  },
}))(Tooltip);

function ScoreAndPercentile(props) {
  const classes = useStyles();
  const genetic = props.geneticMap[props.currentCase.case_id];

  const helpText = (
    <React.Fragment>
      <div className={classes.helpText}>
        Hint:
        <br />
        Comparison to T1D cases in T1D Genetic Consortium
      </div>
    </React.Fragment>
  );

  function createData(attrName, attrData1, attrData2, attrData3) {
    return { attrName, attrData1, attrData2, attrData3 };
  }

  const rows = [
    createData(
      "Score",
      genetic && genetic.GRS1_score ? genetic.GRS1_score : "Unavailable",
      genetic && genetic.GRS2_score ? genetic.GRS2_score : "Unavailable",
      genetic && genetic.AA_GRS_score ? genetic.AA_GRS_score : "Unavailable"
    ),
    createData(
      "Percentile",
      genetic && genetic.GRS1_percentile
        ? genetic.GRS1_percentile.toFixed(2)
        : "Unavailable",
      genetic && genetic.GRS2_percentile
        ? genetic.GRS2_percentile.toFixed(2)
        : "Unavailable",
      genetic && genetic.AA_GRS_percentile
        ? genetic.AA_GRS_percentile.toFixed(2)
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
        genetic && genetic.AA_GRS_percentile ? genetic.GRS1_percentile : 0,
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
                    {row.attrName}{" "}
                    {row.attrName === "Percentile" ? (
                      <div style={{ lineHeight: 0.1 }}>
                        <br></br>
                        <GeneticTooltip title={helpText} placement="right">
                          <HelpOutlineIcon className={classes.helpIcon} />
                        </GeneticTooltip>
                      </div>
                    ) : null}
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
                        tooltip: {
                          trigger: "none",
                        },
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
