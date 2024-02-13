import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import { Chart } from "react-google-charts";

const useStyles = makeStyles((theme) => ({
  title: {
    paddingTop: theme.spacing(2),
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

function Admixture(props) {
  const classes = useStyles();
  const genetic = props.geneticMap[props.currentCase.case_id];

  const admixture = {
    amr:
      genetic && genetic.admixed_american_AMR
        ? genetic.admixed_american_AMR
        : 0,
    eur: genetic && genetic.european_EUR ? genetic.european_EUR : 0,
    sas: genetic && genetic.south_asian_SAS ? genetic.south_asian_SAS : 0,
    afr: genetic && genetic.african_AFR ? genetic.african_AFR : 0,
    eas: genetic && genetic.east_asian_EAS ? genetic.east_asian_EAS : 0,
  };

  const admixtureDict = {
    amr: "American",
    eur: "European",
    sas: "South Asian",
    afr: "African",
    eas: "East Asian",
  };

  const admixtureSum = Object.values(admixture).reduce(
    (acc, curr) => acc + curr,
    0
  );

  let normalizedChartData = [["Race", "Ratio"]];
  if (admixtureSum !== 0) {
    const normalizedAdmixture = {
      amr: Number((admixture.amr / admixtureSum).toFixed(3)),
      eur: Number((admixture.eur / admixtureSum).toFixed(3)),
      sas: Number((admixture.sas / admixtureSum).toFixed(3)),
      afr: Number((admixture.afr / admixtureSum).toFixed(3)),
      eas: Number((admixture.eas / admixtureSum).toFixed(3)),
    };

    const chartDataGen = (charObj) => {
      let tempChartData = [["Race", "Ratio"]];
      for (let [key, value] of Object.entries(charObj)) {
        tempChartData.push([admixtureDict[key], value]);
      }
      return tempChartData;
    };
    normalizedChartData = chartDataGen(normalizedAdmixture);
  }

  console.log("normalized chart data", normalizedChartData);

  return (
    <div>
      <div>
        <Typography variant="h5" className={classes.title}>
          Admixture
        </Typography>
      </div>
      <div>
        <Chart
          chartType="PieChart"
          height="400px"
          data={normalizedChartData}
          options={{
            pieHole: 0.4,
            is3D: false,
            chartArea: {
              left: 0,
              width: "100%",
            },
            legend: {
              textStyle: { color: "blue", fontSize: 15 },
              position: "top",
              maxLines: 3,
            },
          }}
        />
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

export default connect(mapStateToProps, null)(Admixture);
