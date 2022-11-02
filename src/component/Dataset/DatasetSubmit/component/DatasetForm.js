import React, { useState, useEffect } from "react";
import {
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
import XLSX from "xlsx";

export default function DatasetForm({ setDatasetInfo }) {
  const [values, setValues] = useState({
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
    datasetType: [],
    rawDataFileLink: "",
    publicationLink: "",
  });
  const [datasetNameAvailableLength, setDataseAvailabletNameLength] =
    useState(200);
  const datasetNameHelperText = datasetNameAvailableLength + " characters left";
  const [descriptionAvailableLength, setDescriptionAvailableLength] =
    useState(1000);
  const descriptionHelperText = descriptionAvailableLength + " characters left";
  const [submitButtonClicked, setSubmitButtonClicked] = useState(0);
  const [datasetCreateSuccess, setDatasetCreateSuccess] = useState(null);
  const [datasetCreateFail, setDatasetCreateFail] = useState(null);
  const [caseIdentifierData, setCaseIdentifierData] = useState([]);

  useEffect(() => {
    setCurrentUserAsAuthor();
  }, []);

  useEffect(() => {
    if (datasetCreateSuccess !== null) {
      const sucessTimer = setTimeout(() => {
        setDatasetCreateSuccess(null);
      }, 5000);
    } else if (datasetCreateFail !== null) {
      const failTimer = setTimeout(() => {
        setDatasetCreateFail(null);
      }, 5000);
    }
  }, [datasetCreateSuccess, datasetCreateFail]);

  async function setCurrentUserAsAuthor() {
    try {
      const authRes = await Auth.currentAuthenticatedUser();
      setValues({ ...values, ["author"]: authRes.username });
    } catch (error) {
      console.log(error);
    }
  }

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
  const handleFormChange = (event) => {
    setDatasetInfo(() => ({
      ...setDatasetInfo,
      [event.target.name]: event.target.value,
    }));
  };

  const hanldeSubmitButtonClicked = (event) => {
    setSubmitButtonClicked((click) => click + 1);
  };

  const handleUploadCaseIdentifier = (event) => {
    const file = event.target.files[0];
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

  useCreateDataset(
    values,
    submitButtonClicked,
    setDatasetCreateSuccess,
    setDatasetCreateFail,
    caseIdentifierData
  );

  console.log(values);

  return (
    <Box sx={{ padding: 5, display: "flex", flexDirection: "column" }}>
      <Box sx={{ paddingTop: 2 }}>
        <TextField
          sx={{ width: 500 }}
          id="pi"
          label="PI"
          onChange={handleChange("pi")}
        />
      </Box>
      <Box sx={{ paddingTop: 2 }}>
        <TextField
          sx={{ width: 500 }}
          id="piEmail"
          label="PI Email"
          onChange={handleChange("piEmail")}
        />
      </Box>
      <Box sx={{ paddingTop: 2 }}>
        <TextField
          sx={{ width: 500 }}
          id="poc"
          label="POC"
          onChange={handleChange("poc")}
        />
      </Box>
      <Box sx={{ paddingTop: 2 }}>
        <TextField
          sx={{ width: 500 }}
          id="pocEmail"
          label="POC Email"
          onChange={handleChange("pocEmail")}
        />
      </Box>
      <Box sx={{ paddingTop: 2 }}>
        <TextField
          sx={{ width: 500 }}
          id="datasetName"
          label="Dataset Name"
          onChange={handleChange("datasetName")}
          helperText={datasetNameHelperText}
        />
      </Box>
      <Box sx={{ paddingTop: 2 }}>
        <TextField
          sx={{ width: 500 }}
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
          id="numberOfAnalyses"
          label="Number of Cases"
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
              id="pmId"
              label="PMID"
              onChange={handleChange("pmId")}
            />
          </Box>
          <Box sx={{ paddingTop: 2 }}>
            <TextField
              sx={{ width: 500 }}
              id="publicationLink"
              label="Publication Link"
              onChange={handleChange("publicationLink")}
            />
          </Box>
        </div>
      ) : null}

      <Box sx={{ paddingTop: 2 }}>
        <TextField
          sx={{ width: 500 }}
          id="datasetType"
          label="Dataset Type"
          onChange={handleChange("datasetType")}
        />
      </Box>
      <Box sx={{ paddingTop: 2 }}>
        <TextField
          sx={{ width: 500 }}
          id="rawDataFileLink"
          label="Raw Data File Link"
          onChange={handleChange("rawDataFileLink")}
          helperText="The website URL where the raw data is stored"
        />
      </Box>
      <Box sx={{ paddingTop: 2 }}>
        <InputLabel>Case Identifier</InputLabel>
        <Button variant="outlined" component="label">
          Choose File
          <input
            hidden
            accept=".csv"
            type="file"
            onChange={handleUploadCaseIdentifier}
          />
        </Button>
        <Typography variant="subtitle1">(File type: *.csv)</Typography>
      </Box>

      <Box sx={{ paddingTop: 2 }}>
        <InputLabel>Data File</InputLabel>
        <Button variant="outlined" component="label">
          Choose File
          <input hidden accept="image/*" multiple type="file" />
        </Button>
        <Typography variant="subtitle1">(File type: *.csv)</Typography>
      </Box>
      <Box sx={{ paddingTop: 2 }}>
        <Button variant="contained" onClick={hanldeSubmitButtonClicked}>
          Submit
        </Button>
      </Box>
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
    </Box>
  );
}
