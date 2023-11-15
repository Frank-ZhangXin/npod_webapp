import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { Box, Paper, Typography, Button } from "@mui/material";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import useRetrieveCaseIdByDatasetId from "./component/useRetrieveCaseIdByDatasetId";
import useRetrieveCaseIdList from "./component/useRetrieveCaseByCaseIdList";
import useRetrieveDonorTypeMap from "./component/useRetrieveDonorTypeMap";
import useRetrieveCauseOfDeathMap from "./component/useRetrieveCauseOfDeathMap";
import useRetrieveHLAMap from "./component/useRetrieveHLAMap";
import { Chart } from "react-google-charts";
import ButtonDownloadCsvFromJson from "./component/ButtonDownloadCsvFromJson";
import ExampleDataFileGrid from "./component/ExampleDataFIleGrid";
import usePreprocessCaseData from "./component/usePreprocessCaseData";

const PaperPanel = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  //textAlign: "center",
  width: "100%",
  // minHeight: "80vh",
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

function DataEntryWrapper(props) {
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
          marginLeft: 5,
          marginRight: 5,
        }}
      >
        {props.children}
      </Box>
    </Box>
  );
}

function ChartBox(props) {
  return (
    <Paper elevation={3} sx={{ width: "80%" }}>
      {props.children}
    </Paper>
  );
}

const CaseButtonMatrix = ({ caseList }) => (
  <Box sx={{ display: "flex", flexWrap: "wrap" }}>
    {caseList.map((item, key) => (
      <Box sx={{ marginBottom: 2, marginTop: 2, marginRight: 2 }}>
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

  const [filteredRequestedCases, setFilteredRequestedCases] = useState([]);
  const [donorTypeMap, setDonorTypeMap] = useState(null);
  const [donorTypeMapRetrieveSuccess, setDonorTypeMapRetrieveSuccess] =
    useState(null);
  const [donorTypeMapRetrieveFail, setDonorTypeMapRetrieveFail] =
    useState(null);
  const [causeOfDeathMap, setCauseOfDeathMap] = useState(null);
  const [causeOfDeathRetrieveSuccess, setCauseOfDeathMapRetrieveSuccess] =
    useState(null);
  const [causeOfDeathRetrieveFail, setCauseOfDeathMapRetrieveFail] =
    useState(null);

  const [HLAMap, setHLAMap] = useState(null);
  const [HLARetrieveSuccess, setHLAMapRetrieveSuccess] = useState(null);
  const [HLARetrieveFail, setHLAMapRetrieveFail] = useState(null);

  const [donorTypeChartData, setDonorTypeChartData] = useState([]);
  const [sexChartData, setSexChartData] = useState([]);
  const [raceChartData, setRaceChartData] = useState([]);

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

  useRetrieveCauseOfDeathMap(
    setCauseOfDeathMap,
    setCaseIdRetrieveSuccess,
    setCauseOfDeathMapRetrieveFail
  );

  useRetrieveHLAMap(setHLAMap, setHLAMapRetrieveSuccess, setHLAMapRetrieveFail);

  usePreprocessCaseData(
    requestedCases,
    donorTypeMap,
    causeOfDeathMap,
    HLAMap,
    setDonorTypeChartData,
    setSexChartData,
    setRaceChartData,
    setFilteredRequestedCases
  );

  // console.log("current dataset", datasetObj);
  // console.log("all related case ID", caseIdList);
  // console.log("requested cases", requestedCases);
  // console.log("donor type map", donorTypeMap);
  // console.log("cause of death map", causeOfDeathMap);

  console.log("dataset obj", datasetObj);
  console.log("fitered requested cases", filteredRequestedCases);
  // console.log("donor type chart data", donorTypeChartData);
  // console.log("sex chart data", sexChartData);
  // console.log("HLA map", HLAMap);

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
                Created Date:{" "}
                <span style={{ color: "#e85a80", fontWeight: 600 }}>
                  {datasetObj.created_time.slice(0, 10)}
                </span>
              </Subtitle1>
            </Box>
            <Box>
              <Subtitle1>
                Updated Date:{" "}
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
              name="Point Of Contact"
              value={datasetObj.poc}
              value2={datasetObj.poc_email}
              type2="email"
            />
            <DataEntry
              name="Published"
              value={datasetObj.published === 1 ? "Yes" : "No"}
            />
            <DataEntry
              name="PMID"
              value={
                datasetObj.pm_id === null ? "Not available" : datasetObj.pm_id
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
            <DataEntryWrapper name="Unique Cases">
              <Typography variant="subtitle2" sx={{ color: "#474747" }}>
                Found{" "}
                <span style={{ color: "#e85a80", fontWeight: 600 }}>
                  {caseIdList.length}
                </span>{" "}
                cases. Click any case to explore more
              </Typography>
              <CaseButtonMatrix caseList={caseIdList} />
              {requestedCases.length !== 0 ? (
                <ButtonDownloadCsvFromJson jsonData={filteredRequestedCases} />
              ) : null}
            </DataEntryWrapper>
            <DataEntryWrapper name="Case Data Summary">
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Box sx={{ paddingTop: 2 }}>
                  {donorTypeChartData.length !== 0 ? (
                    <ChartBox>
                      <Chart
                        chartType="PieChart"
                        width="100%"
                        height="500px"
                        data={donorTypeChartData}
                        options={{
                          title: "DONOR TYPE",
                          titleTextStyle: {
                            fontSize: 18,
                            color: "#454545",
                          },
                          pieHole: 0.4,
                          is3D: false,
                          legend: { textStyle: { fontSize: 20 } },
                        }}
                      />
                    </ChartBox>
                  ) : (
                    <Typography variant="subtitle2">None</Typography>
                  )}
                </Box>
                <Box sx={{ paddingTop: 4 }}>
                  {sexChartData.length !== 0 ? (
                    <ChartBox>
                      <Chart
                        chartType="PieChart"
                        width="100%"
                        height="500px"
                        data={sexChartData}
                        options={{
                          title: "SEX",
                          titleTextStyle: {
                            fontSize: 18,
                            color: "#454545",
                          },
                          pieHole: 0.4,
                          is3D: false,
                          slices: {
                            0: { color: "#454545" },
                            1: { color: "#adadad" },
                          },
                          legend: { textStyle: { fontSize: 20 } },
                        }}
                      />
                      {/* <Chart
                        chartType="BarChart"
                        data={sexChartData}
                        width="100%"
                        height="400px"
                        options={{
                          title: "Sex",
                          hAxis: {
                            title: "Percentage",
                            minValue: 0,
                          },
                          // vAxis: {
                          //   title: "Gender",
                          // },
                          chartArea: { width: "60%" },
                          colors: ["#b0120a", "#ffab91"],
                          legend: { position: "none" },
                        }}
                      /> */}
                    </ChartBox>
                  ) : null}
                </Box>
                <Box sx={{ paddingTop: 4 }}>
                  {raceChartData.length !== 0 ? (
                    <ChartBox>
                      <Chart
                        chartType="PieChart"
                        width="100%"
                        height="500px"
                        data={raceChartData}
                        options={{
                          title: "Race/Ethnicity",
                          titleTextStyle: {
                            fontSize: 18,
                            color: "#454545",
                          },
                          pieHole: 0.4,
                          is3D: false,
                          legend: { textStyle: { fontSize: 20 } },
                        }}
                      />
                    </ChartBox>
                  ) : null}
                </Box>
              </Box>
            </DataEntryWrapper>
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
            <DataEntryWrapper name="Example Data File Preview">
              <ExampleDataFileGrid datasetId={datasetObj.dataset_id} />
            </DataEntryWrapper>
          </DataPaper>
        </PaperPanel>
      ) : null}
    </div>
  );
}
