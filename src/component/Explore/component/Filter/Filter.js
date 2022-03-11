import React, { setState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import FilterCaseId from "./component/FilterCaseId";
import FilterAge from "./component/FilterAge";
import FilterAgeOnset from "./component/FilterAgeOnset";
import FilterGender from "./component/FilterGender";
import FilterRace from "./component/FilterRace";
import FilterBMI from "./component/FilterBMI";
import FilterDonorType from "./component/FilterDonorType";
import FilterDiabetesDuration from "./component/FilterDiabetesDuration";
import FilterHbA1c from "./component/FilterHbA1c";
import FilterAutoAntibody from "./component/FilterAutoAntibody";
import FilterAutoAntibodyPositiveNumber from "./component/FilterAutoAntibodyPositiveNumber";
import FilterInsulitis from "./component/FilterInsulitis";
import FilterCPeptide from "./component/FilterCPeptide";
import FilterTitle from "./component/FilterTitle";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: theme.spacing(2),
  },
}));

export default function Filter() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <FilterTitle />
      <FilterCaseId />
      <FilterDonorType />
      <FilterDiabetesDuration />
      <FilterAgeOnset />
      <FilterAge />
      <FilterGender />
      <FilterRace />
      <FilterBMI />
      <FilterCPeptide />
      <FilterHbA1c />
      <FilterAutoAntibody />
      <FilterAutoAntibodyPositiveNumber />
      <FilterInsulitis />
    </div>
  );
}
