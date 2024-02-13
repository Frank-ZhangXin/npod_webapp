import React, { useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import { Box, Paper, Typography, Button } from "@mui/material";
import { useHistory } from "react-router-dom";
import useRetrieveDatasetsByAuthor from "./component/useRetrieveDatasetsByAuthor";

const Card = ({
  datasetId,
  datasetName,
  pi,
  uniqueCaseNumber,
  datasetType,
  description,
}) => (
  <Paper
    elevation={12}
    sx={{
      marginLeft: 3,
      marginRight: 3,
      marginBottom: 3,
      outlineOffset: "-3px",
      "&:hover": {
        cursor: "pointer",
      },
    }}
  >
    <Box sx={{ padding: 3 }}>
      <Box>
        <Typography variant="h5">{datasetName}</Typography>
      </Box>
      <Box>
        <Typography variant="body1" color="black">
          PI: {pi}
        </Typography>
      </Box>
      <Box>
        <Typography variant="body1" color="black">
          Unique Cases: {uniqueCaseNumber}
        </Typography>
      </Box>
      <Box>
        <Typography variant="body1" color="black">
          Dataset Type: {datasetType}
        </Typography>
      </Box>
      <Box>
        <Typography variant="body2" color="black">
          Description: {description}
        </Typography>
      </Box>
    </Box>
  </Paper>
);

export default function DatasetCardList() {
  const history = useHistory();
  const [datasetObj, setDatasetObj] = useState(null);
  const [datasetRetrieveSuccess, setDatasetRetrieveSuccess] = useState(null);
  const [datasetRetrieveFail, setDatasetRetrieveFail] = useState(null);
  const [author, setAuthor] = useState(null);

  useEffect(() => {
    setCurrentUserAsAuthor();
  }, []);

  async function setCurrentUserAsAuthor() {
    try {
      const authRes = await Auth.currentAuthenticatedUser();
      setAuthor(authRes.username);
    } catch (error) {
      console.log(error);
    }
  }

  useRetrieveDatasetsByAuthor(
    author,
    setDatasetObj,
    setDatasetRetrieveSuccess,
    setDatasetRetrieveFail
  );
  // console.log("all dataset", datasetObj);

  const handleClick = (id) => {
    console.log("dataset was clicked.");
    window.open(`${window.location.origin}/dataset-display/${id}`);
  };

  return (
    <div style={{ paddingTop: "3vh" }}>
      <Typography variant="h4" sx={{ padding: 3 }}>
        Here are all datasets of <span style={{ color: "red" }}>{author}</span>
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{ paddingRight: 5, display: "flex", flexDirection: "row-reverse" }}
      >
        Tip: Select one dataset to start
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row-reverse",
          paddingRight: 4,
          paddingBottom: 1,
        }}
      ></Box>
      {datasetObj !== null
        ? datasetObj.map((item, key) => (
            <div
              id={key}
              onClick={(event) => {
                return handleClick(item.dataset_id);
              }}
            >
              <Card
                datasetId={item.dataset_id}
                datasetName={item.dataset_name}
                pi={item.pi}
                uniqueCaseNumber={item.number_of_unique_cases}
                datasetType={item.dataset_type}
                description={item.description}
              />
            </div>
          ))
        : null}
      {datasetObj?.length === 0 ? (
        <Typography variant="h6" sx={{ padding: 3 }}>
          Looks like you don't have any dataset in nPOD portal.
          <br></br>
          You can create a new one{" "}
          <a href="/dataset-submit" target="_blank">
            here
          </a>
          .<br></br>
          Or browse existing datasets{" "}
          <a href="/dataset-explore" target="_blank">
            here
          </a>
          .
        </Typography>
      ) : null}
    </div>
  );
}
