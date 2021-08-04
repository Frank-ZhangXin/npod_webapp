import React, { setState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridBox from "./component/GridBox";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

const handleSumbit = async function (event) {};

export default function CaseIdentificationAndQC_step1() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <form noValidate onSubmit={handleSumbit}>
        <div>
          <GridBox nameList={["Public", "Case ID", "Alt Case ID"]} />
          <GridBox nameList={["UNOS ID", "RR ID", "Aperio ID"]} />
          <GridBox
            nameList={["Donor Type ID", "Donor Type Comment", "Case Flag"]}
          />
          <GridBox
            nameList={[
              "Retire Status",
              "Accepted As Donor Type ID",
              "Chart Received",
            ]}
          />
          <GridBox
            nameList={["Consent Restriction Status", "Source", "OPO ID"]}
          />
          <GridBox
            nameList={[
              "Case Recovery Type",
              "Chart Reviewed Date",
              "Chart Review Notes",
            ]}
          />
          <GridBox
            nameList={[
              "Case Entry Status",
              "Entry Initials And Date",
              "Case QC Status",
            ]}
          />
          <GridBox nameList={["QC Initials And Date", "name_2", "name_3"]} />
        </div>
      </form>
    </div>
  );
}
