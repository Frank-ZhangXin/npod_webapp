import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { Box, Paper, Grid, Button } from "@mui/material/";
import useRetrieveDatasetByDatasetId from "./component/useRetrieveDatasetByDatasetId";
import NormalDisplay from "./component/NormalDisplay";
import EditDisplay from "./component/EditDisplay";
import { Auth } from "aws-amplify";

export default function DatasetPage({ datasetId, currUser }) {
  const [canEdit, setCanEdit] = useState(false);
  const [datasetObj, setDatasetObj] = useState(null);
  const [datasetRetrieveSuccess, setDatasetRetrieveSuccess] = useState(null);
  const [datasetRetrieveFail, setDatasetRetrieveFail] = useState(null);
  const [displayMode, setDisplayMode] = useState("normal");

  useRetrieveDatasetByDatasetId(
    datasetId,
    setDatasetObj,
    setDatasetRetrieveSuccess,
    setDatasetRetrieveFail,
    currUser,
    setCanEdit
  );

  const NormalDisplayView = () => (
    <div>
      {canEdit ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row-reverse",
            marginBottom: 2,
          }}
        >
          <Box>
            <Button
              variant="contained"
              onClick={handleClickEdit}
              sx={{ width: 100 }}
            >
              Edit
            </Button>
          </Box>
        </Box>
      ) : null}

      <NormalDisplay datasetObj={datasetObj !== null ? datasetObj : null} />
    </div>
  );

  const EditDisplayView = () => (
    <div>
      {canEdit ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row-reverse",
            marginBottom: 2,
          }}
        >
          <Box>
            <Button
              variant="contained"
              onClick={handleClickCancel}
              sx={{ width: 100 }}
            >
              Cancel
            </Button>
          </Box>
          <Box>
            <Button
              variant="contained"
              onClick={handleClickCancel}
              sx={{ width: 100, marginRight: 2 }}
            >
              Save
            </Button>
          </Box>
        </Box>
      ) : null}

      <EditDisplay datasetObj={datasetObj !== null ? datasetObj : null} />
    </div>
  );

  const handleClickEdit = () => {
    setDisplayMode("edit");
  };

  const handleClickSave = () => {
    setDisplayMode("normal");
  };

  const handleClickCancel = () => {
    setDisplayMode("normal");
  };

  console.log("the current datasetId", datasetId);

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
        Dataset
      </Paper>
      <Grid container justifyContent={"center"} sx={{ paddingTop: 2 }}>
        <Grid item xs={8} md={10}>
          {displayMode === "normal" ? (
            <NormalDisplayView />
          ) : (
            <EditDisplayView />
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
