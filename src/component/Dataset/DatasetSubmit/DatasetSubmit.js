import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import DatasetForm from "./component/DatasetForm";

const PaperPanel = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  display: "flex",
  justifyContent: "center",
  margin: "5vh 10vw",
  //textAlign: "center",
}));

export default function DatasetSubmit() {
  const [filterSelected, setFilterSelected] = useState({
    usageFilter: {},
    datasetTypeFilter: {},
  });

  const postObj = {
    name: "",
    identifier: "",
    description: "",
    tag: "",
    usage: "",
    dataType: "",
  };
  console.log(filterSelected);

  return (
    <Box
      sx={{
        //flexGrow: 1,
        minHeight: "100vh",
        paddingBottom: 2,
        backgroundImage: `url(${
          process.env.PUBLIC_URL + "/assets/caseExplorePage.jpg"
        })`,
        backgroundSize: "auto 100%",
      }}
    >
      <Paper
        sx={{
          flexGrow: 1,
          backgroundColor: "black",
          padding: 5,
          color: "white",
          fontSize: 48,
        }}
      >
        Dataset Submit
      </Paper>

      <PaperPanel>
        <DatasetForm />
      </PaperPanel>
    </Box>
  );
}
