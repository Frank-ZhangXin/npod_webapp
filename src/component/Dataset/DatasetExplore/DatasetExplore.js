import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Filter from "./component/Filter";
import DatasetCardList from "./component/DatasetCardList";

const PaperPanel = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  //textAlign: "center",
}));

export default function DatasetExplore() {
  const [filterSelected, setFilterSelected] = useState({
    usageFilter: {},
    datasetTypeFilter: {},
    typeFilter: {},
    caseIdFilter: {},
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
        Explore Datasets
      </Paper>
      <Grid container spacing={2} sx={{ padding: 5 }}>
        <Grid item xs={6} md={4}>
          <PaperPanel>
            <Filter
              filterSelected={filterSelected}
              setFilterSelected={setFilterSelected}
            />
          </PaperPanel>
        </Grid>
        <Grid item xs={6} md={8}>
          <PaperPanel>
            <DatasetCardList filterSelected={filterSelected} />
          </PaperPanel>
        </Grid>
      </Grid>
    </Box>
  );
}
