import * as React from "react";
import { DataGrid } from "@material-ui/data-grid";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import donor_types from "../../../../../../../data/donor_types.json";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  title: {
    paddingBottom: theme.spacing(2),
  },
  title2: {
    paddingTop: theme.spacing(2),
  },
  content: {
    paddingTop: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.primary,
  },
}));

function HLAInformation(props) {
  const classes = useStyles();

  const columns = [
    { field: "name", headerName: "Name", width: 150 },
    { field: "value", headerName: "Value", width: 300 },
  ];

  const data = props.hlaMap[props.currentCase.case_id];

  const rows = [
    {
      id: 1,
      name: "A1",
      value: (data && data["T_A_1"]) || "Unavailable",
    }, // need mockup
    {
      id: 2,
      name: "A2",
      value: (data && data["T_A_2"]) || "Unavailable",
    }, // need mockup
    {
      id: 3,
      name: "B1",
      value: (data && data["T_B_1"]) || "Unavailable",
    }, // need mockup
    {
      id: 4,
      name: "B2",
      value: (data && data["T_B_2"]) || "Unavailable",
    }, // need mockup
    {
      id: 5,
      name: "DR1",
      value: (data && data["T_DR_1"]) || "Unavailable",
    }, // need mockup
    {
      id: 6,
      name: "DR2",
      value: (data && data["T_DR_2"]) || "Unavailable",
    }, // need mockup
    {
      id: 7,
      name: "DRB1",
      value: (data && data["DRB1_2"]) || "Unavailable",
    }, // need mockup
    {
      id: 8,
      name: "DQA1",
      value: (data && data["DQA1_2"]) || "Unavailable",
    }, // need mockup
    {
      id: 9,
      name: "DQB1",
      value: (data && data["DQB1_2"]) || "Unavailable",
    }, // need mockup
    {
      id: 10,
      name: "DPA1",
      value: (data && data["DPA1_2"]) || "Unavailable",
    }, // need mockup
    {
      id: 11,
      name: "DPB1",
      value: (data && data["DPB1_2"]) || "Unavailable",
    }, // need mockup
  ];

  const rows2 = [
    {
      id: 1,
      name: "A1",
      value: (data && data["A_1"]) || "Unavailable",
    }, // need mockup
    {
      id: 2,
      name: "A2",
      value: (data && data["A_2"]) || "Unavailable",
    }, // need mockup
    {
      id: 3,
      name: "B1",
      value: (data && data["B_1"]) || "Unavailable",
    }, // need mockup
    {
      id: 4,
      name: "B2",
      value: (data && data["B_2"]) || "Unavailable",
    }, // need mockup
    {
      id: 5,
      name: "C1",
      value: (data && data["C_1"]) || "Unavailable",
    }, // need mockup
    {
      id: 6,
      name: "C2",
      value: (data && data["C_2"]) || "Unavailable",
    }, // need mockup
    {
      id: 7,
      name: "DRB1",
      value: (data && data["DRB1_1"]) || "Unavailable",
    }, // need mockup
    {
      id: 8,
      name: "DQA1",
      value: (data && data["DQA1_1"]) || "Unavailable",
    }, // need mockup
    {
      id: 9,
      name: "DQB1",
      value: (data && data["DQB1_1"]) || "Unavailable",
    }, // need mockup
    {
      id: 10,
      name: "DPA1",
      value: (data && data["DPA1_1"]) || "Unavailable",
    }, // need mockup
    {
      id: 11,
      name: "DPB1",
      value: (data && data["DPB1_1"]) || "Unavailable",
    }, // need mockup
  ];

  return (
    <div>
      <div>
        <Typography variant="h5" className={classes.title}>
          HLA INFORMATION
        </Typography>
      </div>
      <div>
        <Typography variant="h6" className={classes.title2}>
          Transplant
        </Typography>
      </div>
      <div style={{ height: "300px", width: "100%" }}>
        <DataGrid rows={rows} columns={columns} autoPageSize={true} />
      </div>
      {/* <div>
        <Typography variant="h6" className={classes.title2}>
          Hospital
        </Typography>
      </div>
      <div style={{ height: "300px", width: "100%" }}>
        <DataGrid rows={rows2} columns={columns} autoPageSize={true} />
      </div> */}
    </div>
  );
}

// Subscribe
const mapStateToProps = (state) => {
  return {
    // Filtered Data
    currentCase: state.explore.currentCase,
    hlaMap: state.explore.hlaMap,
  };
};

export default connect(mapStateToProps, null)(HLAInformation);
