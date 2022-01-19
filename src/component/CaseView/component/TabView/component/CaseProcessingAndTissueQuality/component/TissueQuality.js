import React, { useState, useEffect } from "react";
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
import { API } from "aws-amplify";

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
    //minWidth: 650,
  },
}));

function TissueQuality(props) {
  const classes = useStyles();
  const [percentList, setPercentList] = useState();
  useEffect(() => {
    if (props.currentCase.case_id !== "") {
      getPercentViability(props.currentCase.case_id);
    }
  }, [props.currentCase.case_id]);

  async function getPercentViability(id) {
    return await API.get("dbapi", "/db/percent_viability", {
      queryStringParameters: {
        case_id: id,
      },
    })
      .then((res) => {
        setPercentList(res);
      })
      .catch((error) => {
        console.log("[Percent Viability] Amplify API call error", error);
      });
  }

  function createData(name, value) {
    return { name, value };
  }

  const rows = [
    createData(
      "RIN",
      props.currentCase.RIN === null ? "Unavailable" : props.currentCase.RIN
    ),
    createData(
      "Sample Type",
      props.currentCase.sample_type_id === null
        ? "Unavailable"
        : props.sampleTypesMap[props.currentCase.sample_type_id]
    ),
    createData(
      "260/280",
      props.currentCase.ratio === null ? "Unavailable" : props.currentCase.ratio
    ),
  ];

  const rows2 = [];

  if (percentList && percentList.length != 0) {
    let typeName = "";
    let typeIndex = 1;
    for (let i = 0; i < percentList.length; i++) {
      if (props.sampleTypesMap[percentList[i]["sample_type_id"]] !== typeName) {
        typeName = props.sampleTypesMap[percentList[i]["sample_type_id"]];
        typeIndex = 1;
      } else {
        typeIndex += 1;
      }

      rows2.push(
        createData(
          typeName + " set " + typeIndex,
          percentList[i]["percent_viability"] + "%"
        )
      );
    }
  } else {
    rows2.push(createData("Cell Viability", "Not Available"));
  }

  return (
    <div>
      <div>
        <Typography variant="h5" className={classes.title}>
          RNA Quality
        </Typography>
      </div>
      <div>
        <TableContainer component={Paper} className={classes.container}>
          <Table className={classes.table} size="small" stickyHeader>
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
                  <TableCell align="right">{row.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div>
        <Typography variant="h5" className={classes.title2}>
          Cell Viability
        </Typography>
      </div>
      <div>
        <TableContainer component={Paper} className={classes.container}>
          <Table className={classes.table} size="small" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Value</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows2.map((row) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.value}</TableCell>
                </TableRow>
              ))}
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

    // Sample Types (map)
    sampleTypesMap: state.explore.sampleTypesMap,

    // Cause of Deaht map
    causeOfDeathMap: state.explore.causeOfDeathMap,
  };
};

export default connect(mapStateToProps, null)(TissueQuality);
