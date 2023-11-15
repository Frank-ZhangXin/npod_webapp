import React, { useState, useEffect } from "react";
import {
  Autocomplete,
  TextField,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  FormControlLabel,
  OutlinedInput,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Button,
  Typography,
  Alert,
  Fade,
} from "@mui/material";
import Box from "@mui/material/Box";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Auth } from "aws-amplify";
import useCreateDataset from "./component/useCreateDataset";
import useDownloadFile from "./component/useDownloadFile";
import XLSX from "xlsx";

export default function DatasetForm({ setDatasetInfo }) {
  const initStates = {
    datasetName: "",
    description: "",
    pi: "",
    piEmail: "",
    poc: "",
    pocEmail: "",
    author: "",
    numberOfAnalyses: "",
    published: false,
    pmId: "",
    datasetType: "",
    rawDataFileLink: "",
    publicationLink: "",
    datasetNameAvailableLength: 200,
    descriptionAvailableLength: 1000,
    submitButtonClicked: 0,
    datasetCreateSuccess: null,
    datasetCreateFail: null,
    caseIdentifierData: [],
    caseIdentifierFileName: null,
    exampleDataFile: null,
    exampleDataFileName: null,
    downloadSuccess: null,
    downloadError: null,
  };
  const [values, setValues] = useState({
    datasetName: initStates.datasetName,
    description: initStates.description,
    pi: initStates.pi,
    piEmail: initStates.piEmail,
    poc: initStates.poc,
    pocEmail: initStates.pocEmail,
    author: initStates.author,
    numberOfAnalyses: initStates.numberOfAnalyses,
    published: initStates.published,
    pmId: initStates.pmId,
    datasetType: initStates.datasetType,
    rawDataFileLink: initStates.rawDataFileLink,
    publicationLink: initStates.publicationLink,
  });
  const [datasetNameAvailableLength, setDataseAvailabletNameLength] = useState(
    initStates.datasetNameAvailableLength
  );
  const datasetNameHelperText = datasetNameAvailableLength + " characters left";
  const [descriptionAvailableLength, setDescriptionAvailableLength] = useState(
    initStates.descriptionAvailableLength
  );
  const descriptionHelperText = descriptionAvailableLength + " characters left";
  const [submitButtonClicked, setSubmitButtonClicked] = useState(
    initStates.submitButtonClicked
  );
  const [datasetCreateSuccess, setDatasetCreateSuccess] = useState(
    initStates.datasetCreateSuccess
  );
  const [datasetCreateFail, setDatasetCreateFail] = useState(
    initStates.datasetCreateFail
  );
  const [caseIdentifierData, setCaseIdentifierData] = useState(
    initStates.caseIdentifierData
  );
  const [caseIdentifierFileName, setCaseIdentifierFileName] = useState(
    initStates.caseIdentifierFileName
  );
  const [exampleDataFile, setExampleDataFile] = useState(
    initStates.exampleDataFile
  );
  const [exampleDataFileName, setExampleDataFileName] = useState(
    initStates.exampleDataFileName
  );
  const [caseIdentifierExampleUrl, setCaseIdentifierExampleUrl] = useState("");
  const [downloadButtonClicked, setDownloadButtonClicked] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(
    initStates.downloadSuccess
  );
  const [downloadError, setDownloadError] = useState(initStates.downloadError);

  const datasetTypeOps = [
    { typeName: "Genetics", label: "Genetics" },
    { typeName: "Transcriptomics", label: "Transcriptomics" },
    { typeName: "Proteomics", label: "Proteomics" },
    { typeName: "Metabolomics", label: "Metablomics" },
  ];

  useEffect(() => {
    setCurrentUserAsAuthor();
  }, []);

  useEffect(() => {
    if (datasetCreateSuccess !== null) {
      const sucessTimer = setTimeout(() => {
        resetAllStates();
      }, 3000);
    } else if (datasetCreateFail !== null) {
      const failTimer = setTimeout(() => {
        resetAllStates();
      }, 3000);
    }
  }, [datasetCreateSuccess, datasetCreateFail]);

  // Download the case identifier example file when button clicked and file path available
  useEffect(() => {
    if (downloadButtonClicked === true && caseIdentifierExampleUrl !== null) {
      window.open(caseIdentifierExampleUrl);
    }
  }, [downloadButtonClicked, caseIdentifierExampleUrl]);

  async function setCurrentUserAsAuthor() {
    try {
      const authRes = await Auth.currentAuthenticatedUser();
      setValues({ ...values, ["author"]: authRes.username });
    } catch (error) {
      console.log(error);
    }
  }

  function resetAllStates() {
    setValues({
      datasetName: initStates.datasetName,
      description: initStates.description,
      pi: initStates.pi,
      piEmail: initStates.piEmail,
      poc: initStates.poc,
      pocEmail: initStates.pocEmail,
      author: values["author"],
      numberOfAnalyses: initStates.numberOfAnalyses,
      published: initStates.published,
      pmId: initStates.pmId,
      datasetType: initStates.datasetType,
      rawDataFileLink: initStates.rawDataFileLink,
      publicationLink: initStates.publicationLink,
    });
    setDataseAvailabletNameLength(initStates.datasetNameAvailableLength);
    setDescriptionAvailableLength(initStates.descriptionAvailableLength);
    setSubmitButtonClicked(initStates.submitButtonClicked);
    setDatasetCreateSuccess(initStates.datasetCreateSuccess);
    setDatasetCreateFail(initStates.datasetCreateFail);
    setCaseIdentifierData(initStates.caseIdentifierData);
    setCaseIdentifierFileName(initStates.caseIdentifierFileName);
    setExampleDataFile(initStates.exampleDataFile);
    setExampleDataFileName(initStates.exampleDataFileName);
  }

  const handleReset = () => {
    resetAllStates();
    handleButtonReset();
  };

  const handleButtonReset = () => {
    setDownloadButtonClicked(false);
  };

  const handleDownloadClicked = () => {
    setDownloadButtonClicked(true);
  };

  const handleChange = (prop) => (event) => {
    if (prop === "datasetName") {
      setDataseAvailabletNameLength(200 - event.target.value.length);
    }
    if (prop === "description") {
      setDescriptionAvailableLength(1000 - event.target.value.length);
    }
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleDateChange = (date) => {
    setValues({
      ...values,
      create_date: date.toLocaleDateString("en-CA").slice(0, 10),
    });
  };

  const hanldeSubmitButtonClicked = (event) => {
    setSubmitButtonClicked((click) => click + 1);
  };

  const handleUploadCaseIdentifier = (event) => {
    const file = event.target.files[0];
    setCaseIdentifierFileName(file.name);
    const reader = new FileReader();
    reader.onload = (readerEvent) => {
      const workbook = XLSX.read(readerEvent.target.result, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      setCaseIdentifierData(jsonData);
    };
    reader.readAsBinaryString(file);
  };

  const handleUploadExampleDataFile = (event) => {
    const file = event.target.files[0];
    setExampleDataFileName(file.name);
    setExampleDataFile(file);
  };

  useCreateDataset(
    values,
    submitButtonClicked,
    setDatasetCreateSuccess,
    setDatasetCreateFail,
    caseIdentifierData,
    exampleDataFile
  );

  useDownloadFile(
    setCaseIdentifierExampleUrl,
    setDownloadSuccess,
    setDownloadError,
    downloadButtonClicked,
    handleButtonReset
  );

  console.log("dataset submit form values", values);
  console.log("download file url", caseIdentifierExampleUrl);
  console.log("download button clicked", downloadButtonClicked);

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Typography variant="h5" sx={{ marginTop: 8 }}>
        Create a new dataset
      </Typography>

      <Typography variant="subtitle1" sx={{ marginTop: 2 }}>
        Please fill the form about the dataset
      </Typography>
      <Box sx={{ paddingTop: 2 }}>
        <TextField
          sx={{ width: 500 }}
          value={values.pi}
          id="pi"
          label="PI"
          onChange={handleChange("pi")}
        />
      </Box>
      <Box sx={{ paddingTop: 2 }}>
        <TextField
          sx={{ width: 500 }}
          value={values.piEmail}
          id="piEmail"
          label="PI Email"
          onChange={handleChange("piEmail")}
        />
      </Box>
      <Box sx={{ paddingTop: 2 }}>
        <TextField
          sx={{ width: 500 }}
          value={values.poc}
          id="poc"
          label="Point Of Contact"
          onChange={handleChange("poc")}
        />
      </Box>
      <Box sx={{ paddingTop: 2 }}>
        <TextField
          sx={{ width: 500 }}
          value={values.pocEmail}
          id="pocEmail"
          label="Point Of Contact Email"
          onChange={handleChange("pocEmail")}
        />
      </Box>
      <Box sx={{ paddingTop: 2 }}>
        <TextField
          sx={{ width: 500 }}
          value={values.datasetName}
          id="datasetName"
          label="Dataset Name"
          onChange={handleChange("datasetName")}
          helperText={datasetNameHelperText}
        />
      </Box>
      <Box sx={{ paddingTop: 2 }}>
        <TextField
          sx={{ width: 500 }}
          value={values.description}
          id="description"
          label="Description"
          multiline
          maxRows={4}
          onChange={handleChange("description")}
          helperText={descriptionHelperText}
        />
      </Box>
      <Box sx={{ paddingTop: 2 }}>
        <TextField
          sx={{ width: 500 }}
          value={values.numberOfAnalyses}
          id="numberOfAnalyses"
          label="Number of Analyses"
          onChange={handleChange("numberOfAnalyses")}
        />
      </Box>

      <Box sx={{ paddingTop: 2 }}>
        <FormLabel>Published</FormLabel>
        <RadioGroup
          row
          value={values.published}
          onChange={handleChange("published")}
        >
          <FormControlLabel value={true} control={<Radio />} label="Yes" />
          <FormControlLabel value={false} control={<Radio />} label="No" />
        </RadioGroup>
      </Box>
      {values.published === "true" ? (
        <div>
          <Box sx={{ paddingTop: 2 }}>
            <TextField
              sx={{ width: 500 }}
              value={values.pmId}
              id="pmId"
              label="PMID"
              onChange={handleChange("pmId")}
            />
          </Box>
          <Box sx={{ paddingTop: 2 }}>
            <TextField
              sx={{ width: 500 }}
              value={values.publicationLink}
              id="publicationLink"
              label="Publication Link"
              onChange={handleChange("publicationLink")}
            />
          </Box>
        </div>
      ) : null}

      <Box sx={{ paddingTop: 2 }}>
        {/* <TextField
          sx={{ width: 500 }}
          value={values.datasetType}
          id="datasetType"
          label="Dataset Type"
          onChange={handleChange("datasetType")}
        /> */}
        <Autocomplete
          options={datasetTypeOps}
          renderInput={(params) => (
            <TextField {...params} label="Dataset Type" variant="outlined" />
          )}
          onChange={(event, value) => {
            if (value !== null) {
              setValues({ ...values, datasetType: value.typeName });
            } else {
              setValues({ ...values, datasetType: "" });
            }
          }}
        />
      </Box>
      <Box sx={{ paddingTop: 2 }}>
        <TextField
          sx={{ width: 500 }}
          value={values.rawDataFileLink}
          id="rawDataFileLink"
          label="Raw Data File Link"
          onChange={handleChange("rawDataFileLink")}
          helperText="The website URL where the raw data is stored"
        />
      </Box>
      <Box sx={{ paddingTop: 2 }}>
        <InputLabel>Case Identifier</InputLabel>

        {caseIdentifierFileName ? (
          <Typography variant="subtitle1">
            Selected file: {caseIdentifierFileName}
          </Typography>
        ) : null}

        <Button variant="outlined" component="label">
          Choose File
          <input
            hidden
            accept=".csv"
            type="file"
            onChange={handleUploadCaseIdentifier}
          />
        </Button>
        <a
          style={{ textDecoration: "underline", cursor: "pointer" }}
          onClick={handleDownloadClicked}
        >
          <Typography variant="subtitle1">
            Download Case Identifier Example
          </Typography>
        </a>
        <Typography variant="subtitle1">(File type: *.csv)</Typography>
      </Box>

      <Box sx={{ paddingTop: 2 }}>
        <InputLabel>Data File</InputLabel>

        {exampleDataFileName ? (
          <Typography variant="subtitle1">
            Selected file: {exampleDataFileName}
          </Typography>
        ) : null}

        <Button variant="outlined" component="label">
          Choose File
          <input
            hidden
            accept=".csv"
            type="file"
            onChange={handleUploadExampleDataFile}
          />
        </Button>
        <Typography variant="subtitle1">(File type: *.csv)</Typography>
      </Box>
      <Box sx={{ paddingTop: 2 }}>
        <Button
          variant="contained"
          sx={{ width: "100px" }}
          onClick={hanldeSubmitButtonClicked}
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          sx={{ marginLeft: 4, width: "100px" }}
          onClick={handleReset}
        >
          Reset
        </Button>
      </Box>
      {datasetCreateFail !== null || datasetCreateSuccess !== null ? (
        <Box>
          <Fade in={datasetCreateFail !== null}>
            <Alert variant="filled" severity="error">
              {datasetCreateFail}
            </Alert>
          </Fade>
          <Fade in={datasetCreateSuccess !== null}>
            <Alert variant="filled" severity="success">
              {datasetCreateSuccess}
            </Alert>
          </Fade>
        </Box>
      ) : null}
    </Box>
  );
}
