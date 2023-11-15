import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Filter from "./component/Filter";
import DatasetCardList from "./component/DatasetCardList";

const PaperPanel = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  //textAlign: "center",
}));

export default function DatasetExplore() {
  const [filterSelected, setFilterSelected] = useState({
    type: {},
    category: {},
  });

  const convertFilterToPathParams = (filtersCollection) => {
    let pathParams = "?";
    Object.keys(filtersCollection).forEach((filterName) => {
      const currFilter = filtersCollection[filterName];
      Object.keys(currFilter)
        .filter((filterKey) => currFilter[filterKey] === true)
        .forEach((selectedKey) => {
          if (pathParams.length > 1) {
            pathParams = pathParams + "&";
          }
          pathParams = pathParams + filterName + "=" + selectedKey;
        });
    });
    console.log("path params", pathParams);
    return pathParams;
  };

  // useEffect(() => {
  //   setCurrPathParams(convertFilterToPathParams(filterSelected));

  //   console.log("current path params", currPathParams);
  // }, [filterSelected]);

  // useEffect(() => {
  //   window.history.pushState(null, "", `${currPathParams}`);
  // }, [currPathParams]);

  const postObj = {
    name: "",
    identifier: "",
    description: "",
    tag: "",
    usage: "",
    dataType: "",
  };
  //console.log("filter selected", filterSelected);

  return (
    <Box
      sx={{
        //flexGrow: 1,

        paddingBottom: 2,
        backgroundImage: `url(${
          process.env.PUBLIC_URL + "/assets/caseExplorePage.jpg"
        })`,
        // backgroundSize: "auto 100%",
        backgroundSize: "cover",
        width: "100%",
        minHeight: "100vh",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
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
        Explore Omics Datasets
      </Paper>
      <Grid container spacing={2} sx={{ padding: 5 }}>
        <Grid item xs={2} md={3}>
          <PaperPanel>
            <Filter />
          </PaperPanel>
        </Grid>
        <Grid item xs={6} md={8}>
          <PaperPanel>
            <Button
              variant="contained"
              component="label"
              sx={{ marginTop: 3, marginLeft: 3 }}
              onClick={() =>
                window.open(`${window.location.origin}/dataset-manage`)
              }
            >
              View Your Datasets
            </Button>
            <DatasetCardList filterSelected={filterSelected} />
          </PaperPanel>
        </Grid>
      </Grid>
    </Box>
  );
}
