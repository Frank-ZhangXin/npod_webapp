import React, { setState } from "react";
import Typography from "@material-ui/core/Typography";
import FilterAge from "./component/FilterAge";
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

export default function Filter() {
  return (
    <div>
      <FilterTitle />
      <FilterDonorType />
      <FilterDiabetesDuration />
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
