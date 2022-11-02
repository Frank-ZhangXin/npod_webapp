import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import DatasetCardList from "./component/DatasetCardList";

const PaperPanel = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  //textAlign: "center",
}));

export default function DatasetManage() {
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
        Dataset Manage
      </Paper>
      <Grid container justifyContent={"center"} sx={{ padding: 5 }}>
        <Grid item xs={8} md={10}>
          <PaperPanel>
            <DatasetCardList />
          </PaperPanel>
        </Grid>
      </Grid>
    </Box>
  );
}
