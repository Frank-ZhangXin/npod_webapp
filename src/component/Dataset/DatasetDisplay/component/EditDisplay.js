import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { Box, Paper, Typography, OutlinedInput } from "@mui/material";
import MailOutlineIcon from "@material-ui/icons/MailOutline";

const PaperPanel = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  //textAlign: "center",
  width: "100%",
  minHeight: "80vh",
}));

function DataPaper(props) {
  return (
    <Paper
      elevation={3}
      sx={{
        marginTop: 2,
        marginBottom: 2,
        marginLeft: 4,
        marginRight: 4,
        paddingBottom: 3,
      }}
    >
      {props.children}
    </Paper>
  );
}

const DataEntry = ({
  name,
  value,
  type = null,
  value2 = null,
  type2 = null,
}) => (
  <Box sx={{ display: "flex", flexDirection: "column" }}>
    <Box sx={{ marginTop: 2, marginLeft: 3, marginRight: 3 }}>
      <Typography
        variant="overline"
        sx={{ fontSize: 15, fontWeight: 600 }}
        style={{ color: "#6e6e6e" }}
      >
        {name}
      </Typography>
    </Box>
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        marginLeft: 3,
        marginRight: 3,
      }}
    >
      {/* {type === "link" ? (
        <Box sx={{ "&:hover": { cursor: "pointer" } }}>
          <a href={value} target="_blank">
            <Typography variant="subtitle2">{value}</Typography>
          </a>
        </Box>
      ) : (
        <Box>
          <Typography variant="subtitle2">{value}</Typography>
        </Box>
      )} */}
      <OutlinedInput defaultValue={value} sx={{ width: 500 }} />
      {type2 === "email" ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            marginLeft: 2,
            "&:hover": {
              cursor: "pointer",
            },
          }}
        >
          {/* <Box>
            <MailOutlineIcon
              onClick={() => (window.location = "mailto:" + value2)}
            />
          </Box>
          <Box sx={{ marginLeft: 1 }}>
            <Typography variant="subtitle2">{value2}</Typography>
          </Box> */}
          <OutlinedInput defaultValue={value2} sx={{ width: 500 }} />
        </Box>
      ) : null}
    </Box>
  </Box>
);

const Title1 = ({ text }) => (
  <Typography
    variant="h3"
    sx={{
      fontSize: 32,
      fontWeight: 600,
      marginTop: 4,
      marginLeft: 4,
      marginRight: 4,
    }}
    style={{ color: "#0d4375" }}
  >
    {text}
  </Typography>
);

const Title2 = ({ text }) => (
  <Typography
    sx={{
      fontSize: 18,
      fontWeight: 600,
      marginTop: 6,
      marginLeft: 4,
      marginRight: 4,
    }}
    style={{ color: "#474747" }}
  >
    {text}
  </Typography>
);

function Subtitle1(props) {
  return (
    <Typography
      sx={{
        fontSize: 15,
        marginTop: 3,
        marginLeft: 4,
        marginRight: 2,
      }}
      style={{ color: "#474747" }}
    >
      {props.children}
    </Typography>
  );
}

export default function EditDisplay({ datasetObj }) {
  console.log("current dataset", datasetObj);
  return (
    <div>
      {datasetObj !== null ? (
        <PaperPanel sx={{ paddingBottom: 3 }}>
          {/* <Title1 text={datasetObj.dataset_name} /> */}
          <DataPaper>
            <Typography
              variant="overline"
              sx={{
                fontSize: 15,
                fontWeight: 600,
                marginLeft: 4,
              }}
              style={{ color: "#6e6e6e" }}
            >
              DATASET NAME
            </Typography>
            <OutlinedInput
              defaultValue={datasetObj.dataset_name}
              sx={{ marginLeft: 4, width: 1000 }}
            />
          </DataPaper>

          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Box>
              <Subtitle1>
                Dataset ID:{" "}
                <span style={{ color: "#e85a80", fontWeight: 600 }}>
                  {datasetObj.dataset_id}
                </span>
              </Subtitle1>
            </Box>
            <Box>
              <Subtitle1>
                Created By:{" "}
                <span style={{ color: "#e85a80", fontWeight: 600 }}>
                  {datasetObj.author}
                </span>
              </Subtitle1>
            </Box>
            <Box>
              <Subtitle1>
                Created Time:{" "}
                <span style={{ color: "#e85a80", fontWeight: 600 }}>
                  {datasetObj.created_time.slice(0, 10)}
                </span>
              </Subtitle1>
            </Box>
            <Box>
              <Subtitle1>
                Updated Time:{" "}
                <span style={{ color: "#e85a80", fontWeight: 600 }}>
                  {datasetObj.updated_time.slice(0, 10)}
                </span>
              </Subtitle1>
            </Box>
          </Box>

          <Title2 text="Overview" />
          <DataPaper>
            <DataEntry name="Description" value={datasetObj.description} />
            <DataEntry name="Dataset Type" value={datasetObj.dataset_type} />
            <DataEntry
              name="Number of Analyses"
              value={datasetObj.number_of_analyses}
            />
          </DataPaper>

          <Title2 text="Detail" />
          <DataPaper>
            <DataEntry
              name="PI"
              value={datasetObj.pi}
              value2={datasetObj.pi_email}
              type2="email"
            />
            <DataEntry
              name="POC"
              value={datasetObj.poc}
              value2={datasetObj.poc_email}
              type2="email"
            />
            <DataEntry
              name="Published"
              value={datasetObj.published === 1 ? "True" : "False"}
            />
            <DataEntry
              name="PMID"
              value={
                datasetObj.pmid != null ? datasetObj.pmid : "Not available"
              }
            />
            <DataEntry
              name="Publication Link"
              value={
                datasetObj.publication_link !== "null"
                  ? datasetObj.publication_link
                  : "Not available"
              }
              type={datasetObj.publication_link !== "null" ? "link" : null}
            />
          </DataPaper>

          <Title2 text="Data" />
          <DataPaper>
            <DataEntry
              name="Raw Data File Link"
              value={
                datasetObj.raw_data_file_link !== "null"
                  ? datasetObj.raw_data_file_link
                  : "Not available"
              }
              type={datasetObj.raw_data_file_link !== "null" ? "link" : null}
            />
          </DataPaper>
        </PaperPanel>
      ) : null}
    </div>
  );
}
