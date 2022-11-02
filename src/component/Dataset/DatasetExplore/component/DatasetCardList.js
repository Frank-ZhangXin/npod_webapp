import React, { useState } from "react";
import { Box, Paper, Typography } from "@mui/material";
import useRetrieveAllDatasets from "./component/useRetrieveAllDatasets";

const Card = ({
  datasetName,
  pi,
  unqiueCaseNumber,
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
        // borderColor: "grey",
        // borderStyle: "solid",
        // borderWidth: "1px",
        color: "blue",
        fontWeight: "bold",
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
          Unique Cases: {unqiueCaseNumber}
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

export default function DatasetCardList({ filterSelected }) {
  const [datasetObj, setDatasetObj] = useState(null);
  const [datasetRetrieveSuccess, setDatasetRetrieveSuccess] = useState(null);
  const [datasetRetrieveFail, setDatasetRetrieveFail] = useState(null);
  useRetrieveAllDatasets(
    setDatasetObj,
    setDatasetRetrieveSuccess,
    setDatasetRetrieveFail
  );
  console.log("all dataset", datasetObj);
  console.log(filterSelected);
  return (
    <div style={{ paddingTop: "3vh" }}>
      {datasetObj !== null
        ? datasetObj
            // .filter((item) => filterSelected["usageFilter"][item.tag])
            .map((item, key) => (
              <div
                onClick={() => {
                  window.open(
                    `${window.location.origin}/dataset-display/${item.dataset_id}`
                  );
                }}
              >
                <Card
                  id={key}
                  datasetName={item.dataset_name}
                  pi={item.pi}
                  unqiueCaseNumber={item.number_of_unique_cases}
                  datasetType={item.dataset_type}
                  description={item.description}
                />
              </div>
            ))
        : null}
    </div>

    // <Card
    //   name="first dataset"
    //   identifier="group-1"
    //   description="abcdefg..."
    // ></Card>
  );
}
