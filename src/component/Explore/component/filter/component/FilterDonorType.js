import React, { setState } from "react";
import Select from "react-select";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  multiSelect: {
    width: "75%",
  },
  box: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    margin: theme.spacing(3),
  },
}));

const options = [
  { value: "No Diabetes", label: "No Diabetes" },
  { value: "Type 1 Diabetes", label: "Type 1 Diabetes" },
  { value: "Autoantibody Positive", label: "Autoantibody Positive" },
  { value: "Type 2 Diabetes", label: "Type 2 Diabetes" },
  { value: "Other – No Diabetes", label: "Other – No Diabetes" },
  { value: "Other – Diabetes", label: "Other – Diabetes" },
  {
    value: "Type 1 Diabetes Joslin Medalist",
    label: "Type 1 Diabetes Joslin Medalist",
  },
  {
    value: "Transplant",
    label: "Transplant",
  },
  {
    value: "Cystic Fibrosis",
    label: "Cystic Fibrosis",
  },
  {
    value: "Monogenic Diabetes",
    label: "Monogenic Diabetes",
  },
  {
    value: "Gestational Diabetes",
    label: "Gestational Diabetes",
  },
  { value: "Pregnancy", label: "Pregnancy" },
  {
    value: "Gastric Bypass",
    label: "Gastric Bypass",
  },
  { value: "Ketosis-Prone Diabetes", label: "Ketosis-Prone Diabetes" },
  { value: "Pending", label: "Pending" },
];

function FilterDonorType(props) {
  const classes = useStyles();

  return (
    <div>
      <Box display="flex" justifyContent="flex-start">
        <Box>
          <Typography variant="h6" className={classes.title}>
            <Box fontWeight="fontWeightBold">Donor Type</Box>
          </Typography>
        </Box>
      </Box>
      <Box className={classes.box}>
        <Select
          className={classes.multiSelect}
          value={props.selectedDonorType}
          onChange={(value) => props.setSelectedDonorType(value)}
          options={options}
          isMulti
          closeMenuOnSelect={false}
        />
      </Box>
    </div>
  );
}

// subscribe
const mapStateToProps = (state) => {
  return {
    selectedDonorType: state.explore.selectedDonorType,
  };
};

// update
const mapDispatchToProps = (dispatch) => {
  return {
    setSelectedDonorType: (newType) =>
      dispatch({ type: "SET_SELECTED_TYPE", value: newType }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterDonorType);
