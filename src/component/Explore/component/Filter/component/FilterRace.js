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
  { value: "African American", label: "African American" },
  {
    value: "American Indian/Alaska Native",
    label: "American Indian/Alaska Native",
  },
  { value: "Arab/Middle Eastern", label: "Arab/Middle Eastern" },
  { value: "Asian", label: "Asian" },
  { value: "Caucasian", label: "Caucasian" },
  {
    value: "Hawaiian/Other Pacific Islander",
    label: "Hawaiian/Other Pacific Islander",
  },
  { value: "Hispanic/Latino", label: "Hispanic/Latino" },
  { value: "Multiracial", label: "Multiracial" },
];

function FilterRace(props) {
  const classes = useStyles();

  return (
    <div>
      <Box display="flex" justifyContent="flex-start">
        <Box>
          <Typography variant="h6" className={classes.title}>
            <Box fontWeight="fontWeightBold">Race/Ethnicity</Box>
          </Typography>
        </Box>
      </Box>
      <Box className={classes.box}>
        <Select
          className={classes.multiSelect}
          value={props.selectedRace}
          onChange={(value) => props.setSelectedRace(value)}
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
    selectedRace: state.explore.selectedRace,
  };
};

// update
const mapDispatchToProps = (dispatch) => {
  return {
    setSelectedRace: (newRace) =>
      dispatch({ type: "SET_SELECTED_RACE", value: newRace }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterRace);
