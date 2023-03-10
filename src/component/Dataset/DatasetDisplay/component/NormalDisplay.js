import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { Box, Paper, Typography, Button } from "@mui/material";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import useRetrieveCaseIdByDatasetId from "./component/useRetrieveCaseIdByDatasetId";
import useRetrieveCaseIdList from "./component/useRetrieveCaseByCaseIdList";
import useRetrieveDonorTypeMap from "./component/useRetriveDonorTypeMap";

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
      {type === "link" ? (
        <Box sx={{ "&:hover": { cursor: "pointer" } }}>
          <a href={value} target="_blank">
            <Typography variant="subtitle2">{value}</Typography>
          </a>
        </Box>
      ) : (
        <Box>
          <Typography variant="subtitle2">{value}</Typography>
        </Box>
      )}
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
          <Box>
            <MailOutlineIcon
              onClick={() => (window.location = "mailto:" + value2)}
            />
          </Box>
          <Box sx={{ marginLeft: 1 }}>
            <Typography variant="subtitle2">{value2}</Typography>
          </Box>
        </Box>
      ) : null}
    </Box>
  </Box>
);

function DataEntryForCaseId(props) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box sx={{ marginTop: 2, marginLeft: 3, marginRight: 3 }}>
        <Typography
          variant="overline"
          sx={{ fontSize: 15, fontWeight: 600 }}
          style={{ color: "#6e6e6e" }}
        >
          {props.name}
        </Typography>
      </Box>
      <Box
        sx={{
          marginLeft: 3,
          marginRight: 3,
        }}
      >
        {props.children}
      </Box>
    </Box>
  );
}

const CaseButtonMatrix = ({ caseList }) => (
  <Box sx={{ display: "flex", flexWrap: "wrap" }}>
    {caseList.map((item, key) => (
      <Box sx={{ margin: 2 }}>
        <Button
          variant="outlined"
          onClick={() =>
            window.open(`${window.location.origin}/explore/${item}`)
          }
        >
          {item}
        </Button>
      </Box>
    ))}
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

export default function NormalDisplay({ datasetObj }) {
  const [caseIdList, setCaseIdList] = useState([]);
  const [caseIdRetrieveSuccess, setCaseIdRetrieveSuccess] = useState(null);
  const [caseIdRetrieveFail, setCaseIdRetrieveFail] = useState(null);
  const [dataset_id, setDatasetId] = useState(null);
  const [requestedCases, setRequestedCases] = useState([]);
  const [requestedCasesRetrieveSuccess, setRequestedCasesRetrieveSuccess] =
    useState(null);
  const [requestedCasesRetrieveFail, setRequestedCasesRetrieveFail] =
    useState(null);
  const [donorTypeMap, setDonorTypeMap] = useState(null);
  const [donorTypeMapRetrieveSuccess, setDonorTypeMapRetrieveSuccess] =
    useState(null);
  const [donorTypeMapRetrieveFail, setDonorTypeMapRetrieveFail] =
    useState(null);

  useEffect(() => {
    try {
      setDatasetId(datasetObj.dataset_id);
    } catch (err) {
      console.log("Dataset ID setting error in Normal Display");
    }
  }, [datasetObj]);

  useRetrieveCaseIdByDatasetId(
    dataset_id,
    setCaseIdList,
    setCaseIdRetrieveSuccess,
    setCaseIdRetrieveFail
  );

  useRetrieveCaseIdList(
    caseIdList,
    setRequestedCases,
    setRequestedCasesRetrieveSuccess,
    setRequestedCasesRetrieveFail
  );

  useRetrieveDonorTypeMap(
    setDonorTypeMap,
    setDonorTypeMapRetrieveSuccess,
    setDonorTypeMapRetrieveFail
  );

  const handleCaseButtonClick = (event) => {};

  // console.log("current dataset", datasetObj);
  // console.log("all related case ID", caseIdList);
  console.log("requested cases", requestedCases);
  // console.log("donor type map", donorTypeMap);

  useEffect(() => {
    if (requestedCases.length !== 0 && donorTypeMap !== null) {
      let donorTypeCountMap = new Map();
      for (let i = 0; i < requestedCases.length; i++) {
        const currDonorTypeId = requestedCases[i]["donor_type_id"];
        const currDonorType = donorTypeMap[currDonorTypeId];
        if (!donorTypeCountMap.has(currDonorType)) {
          donorTypeCountMap.set(currDonorType, 0);
        }
        donorTypeCountMap.set(
          currDonorType,
          donorTypeCountMap.get(currDonorType) + 1
        );
      }
      console.log("donor type count map", donorTypeCountMap);
    }

    if (requestedCases.length !== 0) {
      let sexCountMap = new Map();
      for (let i = 0; i < requestedCases.length; i++) {
        const currSex = requestedCases[i]["sex"];
        if (!sexCountMap.has(currSex)) {
          sexCountMap.set(currSex, 0);
        }
        sexCountMap.set(currSex, sexCountMap.get(currSex) + 1);
      }
      console.log("sex count map", sexCountMap);
    }
  }, [requestedCases, donorTypeMap]);

  return (
    <div>
      {datasetObj !== null ? (
        <PaperPanel sx={{ paddingBottom: 3 }}>
          <Title1 text={datasetObj.dataset_name} />
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
            <DataEntryForCaseId name="Unique Cases">
              <Typography
                variant="subtitle2"
                sx={{ marginLeft: 2, color: "#474747" }}
              >
                Found{" "}
                <span style={{ color: "#e85a80", fontWeight: 600 }}>
                  {caseIdList.length}
                </span>{" "}
                cases. Click any case to explore more
              </Typography>
              <CaseButtonMatrix caseList={caseIdList} />
            </DataEntryForCaseId>
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
              type={
                datasetObj.raw_data_file_link !== "null" &&
                datasetObj.raw_data_file_link !== "None"
                  ? "link"
                  : null
              }
            />
          </DataPaper>
        </PaperPanel>
      ) : null}
    </div>
  );
}
