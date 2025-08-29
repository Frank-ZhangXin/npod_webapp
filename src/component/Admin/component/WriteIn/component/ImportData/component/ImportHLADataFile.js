import React, { useState, useEffect } from "react";
import { Button, Typography, TextField, Fade, Box } from "@material-ui/core";
import { Autocomplete, Alert } from "@material-ui/lab";
import useRetrieveTableHeaders from "./component/useRetrieveTableHeaders";
import useRetrieveExisitingPrimaryKeyValues from "./component/useRetrieveExistingPrimaryKeyValues";
import useDataUpload from "./component/useDataUpload";
import useCreateTempCloneTable from "./component/useCreateTempCloneTable";
import Papa from "papaparse";
import useCheckImportFileFormat from "./component/useCheckImportFileFormat";
import HeaderMappingTable from "./component/HeaderMappingTable";
import XLSX from "xlsx";

function csvToJson(csvData) {
  return new Promise((resolve, reject) => {
    Papa.parse(csvData, {
      header: true,
      complete: (result) => {
        resolve(result.data);
      },
      error: (error) => {
        reject(error);
      },
    });
  });
}

function isCsvData(data) {
  const csvRegex =
    /^([^\n,]*,)*[^\n,]*\n?([^\n,]*,)*[^\n,]*\n?([^\n,]*,)*[^\n,]*\n?/;
  return csvRegex.test(data);
}

function xlsxToJson(xlsxData) {
  const reader = new FileReader();
  reader.onload = (readerEvent) => {
    const workbook = XLSX.read(readerEvent.target.result, { type: "binary" });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    return XLSX.utils.sheet_to_json(worksheet);
  };
}

export default function ImportHLADataFile() {
  const initStates = {
    needReset: false,
    allRawFileData: {
      HLA: [],
      RNA: [],
      slices_raw_data: [],
      immunophenotyping: [],
    },
    allRawFileNames: {
      HLA: null,
      RNA: null,
      slices_raw_data: null,
      immunophenotyping: null,
    },
    allRawFileHeaders: {
      HLA: [],
      RNA: [],
      slices_raw_data: [],
      immunophenotyping: [],
    },
    allTableHeaders: {
      HLA: [],
      RNA: [],
      slices_raw_data: [],
      immunophenotyping: [],
    },
    HLAHeadersMapping: {},
    slicesRawDataHeadersMapping: {},
    immunophenotypingHeadersMapping: {},
    allTablePrimaryKeyValues: {
      HLA: [],
      RNA: [],
      slices_raw_data: [],
      immunophenotyping: [],
    },
    allTableDataToSend: {
      HLA: {
        checkRes: false,
        dataToUpdate: [],
        dataToCreate: [],
      },
      RNA: {
        checkRes: false,
        dataToUpdate: [],
        dataToCreate: [],
      },
      slices_raw_data: {
        checkRes: false,
        dataToUpdate: [],
        dataToCreate: [],
      },
      immunophenotyping: {
        checkRes: false,
        dataToUpdate: [],
        dataToCreate: [],
      },
    },
    uploadFail: {
      HLA: null,
      RNA: null,
      slices_raw_data: null,
      immunophenotyping: null,
    },
    uploadSuccess: {
      HLA: null,
      RNA: null,
      slices_raw_data: null,
      immunophenotyping: null,
    },
    allUploadClicked: {
      HLA: 0,
      RNA: 0,
      slices_raw_data: 0,
      immunophenotyping: 0,
    },
    allCreateClicked: {
      HLA: 0,
      RNA: 0,
      slices_raw_data: 0,
      immunophenotyping: 0,
    },
  };

  const [needReset, setNeedReset] = useState(initStates.needReset);

  const [allRawFileData, setAllRawFileData] = useState(
    initStates.allRawFileData
  );

  const [allRawFileNames, setAllRawFileNames] = useState(
    initStates.allRawFileNames
  );

  const [allRawFileHeaders, setAllRawFileHeaders] = useState(
    initStates.allRawFileHeaders
  );

  const [allTableHeaders, setAllTableHeaders] = useState(
    initStates.allTableHeaders
  );

  const [HLAHeadersMapping, setHLAHeadersMapping] = useState(
    initStates.HLAHeadersMapping
  );

  const [slicesRawDataHeadersMapping, setSlicesRawDataHeadersMapping] =
    useState(initStates.slicesRawDataHeadersMapping);

  const [immunophenotypingHeadersMapping, setImmunophenotypingHeadersMapping] =
    useState(initStates.immunophenotypingHeadersMapping);

  const [allTablePrimaryKeyValues, setAllTablePrimaryKeyValues] = useState(
    initStates.allTablePrimaryKeyValues
  );

  const [allTableDataToSend, setAllTableDataToSend] = useState(
    initStates.allTableDataToSend
  );

  const [uploadSuccess, setUploadSuccess] = useState(initStates.uploadSuccess);

  const [uploadFail, setUploadFail] = useState(initStates.uploadFail);

  const [allUploadClicked, setAllUploadClicked] = useState(
    initStates.allUploadClicked
  );

  const [allCreateClicked, setAllCreateClicked] = useState(
    initStates.allCreateClicked
  );

  const handleFileDataImport = (event, targetTable) => {
    const file = event.target.files[0];

    setAllRawFileNames((prevValues) => {
      return { ...prevValues, [targetTable]: file.name };
    });

    const reader = new FileReader();
    reader.onload = (readerEvent) => {
      const workbook = XLSX.read(readerEvent.target.result, {
        type: "binary",
        cellText: false,
        cellDates: true,
      });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      const parsedJson = XLSX.utils.sheet_to_json(worksheet);
      console.log("Parsed json data", parsedJson);

      // Because SheetJS(XLSX) covert spreadsheet time to an dateobject
      // Here all date value needs re-format
      parsedJson.forEach((row) => {
        for (let [key, value] of Object.entries(row)) {
          if (value instanceof Date) {
            row[key] = value.toISOString().slice(0, 10);
          }
        }
      });

      setAllRawFileData((prevValues) => {
        return { ...prevValues, [targetTable]: parsedJson };
      });

      // all unique headers
      const rawFileHeaders = [...new Set(parsedJson.flatMap(Object.keys))];
      setAllRawFileHeaders((prevValues) => {
        return { ...prevValues, [targetTable]: rawFileHeaders };
      });
    };
    reader.readAsBinaryString(file);

    const timer = setTimeout(() => {
      reader.abort();
    }, 3000);
    event.target.value = null;
  };

  function setTableHeaders(tableName, data) {
    setAllTableHeaders((preValues) => {
      return { ...preValues, [tableName]: data };
    });
  }

  function setTablePrimaryKeyValues(tableName, data) {
    setAllTablePrimaryKeyValues((prevValues) => {
      return { ...prevValues, [tableName]: data };
    });
  }

  function setDataToSend(tableName, data) {
    setAllTableDataToSend((prevValues) => {
      return { ...prevValues, [tableName]: data };
    });
  }

  function resetAllStates() {
    setAllRawFileData(initStates.allRawFileData);
    setAllRawFileNames(initStates.allRawFileNames);
    setAllRawFileHeaders(initStates.allRawFileHeaders);
    setHLAHeadersMapping(initStates.HLAHeadersMapping);
    setSlicesRawDataHeadersMapping(initStates.slicesRawDataHeadersMapping);
    setAllTableDataToSend(initStates.allTableDataToSend);
    setUploadSuccess(initStates.uploadSuccess);
    setUploadFail(initStates.uploadFail);
    setAllUploadClicked(initStates.allUploadClicked);
    setAllCreateClicked(initStates.allCreateClicked);
  }

  const handleUploadClick = (tableName) => {
    setAllUploadClicked((prevValues) => {
      return { ...prevValues, [tableName]: prevValues[tableName] + 1 };
    });
    setNeedReset(true);
  };

  const handleCreateClick = (tableName) => {
    setAllCreateClicked((prevValues) => {
      return { ...prevValues, [tableName]: prevValues[tableName] + 1 };
    });
    setNeedReset(true);
  };

  const handResetClick = () => {
    setNeedReset(false);
    resetAllStates();
  };

  useRetrieveTableHeaders("HLA", setTableHeaders);
  useRetrieveTableHeaders("RNA", setTableHeaders);
  useRetrieveTableHeaders("slices_raw_data", setTableHeaders);
  useRetrieveTableHeaders("immunophenotyping", setTableHeaders);

  useRetrieveExisitingPrimaryKeyValues("HLA_temp", setTablePrimaryKeyValues); // Note: testing set, need revert later
  useRetrieveExisitingPrimaryKeyValues("RNA", setTablePrimaryKeyValues);
  useRetrieveExisitingPrimaryKeyValues(
    "slices_raw_data_temp",
    setTablePrimaryKeyValues
  );
  useRetrieveExisitingPrimaryKeyValues(
    "immunophenotyping_temp",
    setTablePrimaryKeyValues
  );

  // Check HLA importing format
  useCheckImportFileFormat(
    "HLA",
    "case_id", // primary key name
    allRawFileData["HLA"],
    allTablePrimaryKeyValues["HLA_temp"], // Note: testing set, need revert later
    HLAHeadersMapping,
    setDataToSend
  );

  // Check slices_raw_data importing format
  useCheckImportFileFormat(
    "slices_raw_data",
    "id", // primary key name
    allRawFileData["slices_raw_data"],
    allTablePrimaryKeyValues["slices_raw_data_temp"], // Note: testing set, need revert later
    slicesRawDataHeadersMapping,
    setDataToSend
  );

  // Check immunophenotyping import format
  useCheckImportFileFormat(
    "immunophenotyping",
    "id",
    allRawFileData["immunophenotyping"],
    allTablePrimaryKeyValues["immunophenotyping_temp"],
    immunophenotypingHeadersMapping,
    setDataToSend
  );

  // HLA import Upload
  useDataUpload(
    allTableDataToSend["HLA"]["checkRes"],
    allUploadClicked["HLA"],
    allTableDataToSend["HLA"]["dataToCreate"],
    allTableDataToSend["HLA"]["dataToUpdate"],
    "HLA", // tableName
    setUploadSuccess,
    setUploadFail
  );

  // slices_raw_data Upload
  useDataUpload(
    allTableDataToSend["slices_raw_data"]["checkRes"],
    allUploadClicked["slices_raw_data"],
    allTableDataToSend["slices_raw_data"]["dataToCreate"],
    allTableDataToSend["slices_raw_data"]["dataToUpdate"],
    "slices_raw_data", // tableName
    setUploadSuccess,
    setUploadFail
  );

  // immunophenotyping Upload
  useDataUpload(
    allTableDataToSend["immunophenotyping"]["checkRes"],
    allUploadClicked["immunophenotyping"],
    allTableDataToSend["immunophenotyping"]["dataToCreate"],
    allTableDataToSend["immunophenotyping"]["dataToUpdate"],
    "immunophenotyping", // tableName
    setUploadSuccess,
    setUploadFail
  );

  // create temp table of HLA
  useCreateTempCloneTable(
    allCreateClicked["HLA"],
    "HLA",
    setUploadSuccess,
    setUploadFail
  );

  // create temp table of slices_raw_data
  useCreateTempCloneTable(
    allCreateClicked["slices_raw_data"],
    "slices_raw_data",
    setUploadSuccess,
    setUploadFail
  );

  // create temp table of immunophenotyping
  useCreateTempCloneTable(
    allCreateClicked["immunophenotyping"],
    "immunophenotyping",
    setUploadSuccess,
    setUploadFail
  );

  useEffect(() => {
    let resetMsg = false;
    for (const key in uploadFail) {
      resetMsg = resetMsg || uploadFail[key];
    }
    for (const key in uploadSuccess) {
      resetMsg = resetMsg || uploadSuccess[key];
    }
    if (resetMsg) {
      const timer = setTimeout(() => {
        setUploadSuccess(initStates.uploadSuccess);
        setUploadFail(initStates.uploadFail);
      }, 3000);
    }
  }, [uploadFail, uploadSuccess]);

  console.log("All raw file data", allRawFileData);
  console.log("All raw file headers", allRawFileHeaders);
  console.log("all table headers", allTableHeaders);
  console.log("All primary key values", allTablePrimaryKeyValues);
  console.log("All data to send", allTableDataToSend);
  // console.log("HLA headers mapping", HLAHeadersMapping);
  // console.log("slices_raw_data headers mapping", slicesRawDataHeadersMapping);
  console.log(
    "immunophenotyping headers mapping",
    immunophenotypingHeadersMapping
  );
  console.log("All upload clicked", allUploadClicked);

  return (
    <div>
      {/* HLA table import */}
      <Box>
        <Typography variant="h5">HLA Data Import</Typography>

        <HeaderMappingTable
          tableHeaders={allTableHeaders["HLA"]}
          fileHeaders={allRawFileHeaders["HLA"]}
          setMapping={setHLAHeadersMapping}
        />

        {allRawFileData.HLA.length === 0 ? (
          <Typography variant="subtitle1">
            Note: Only ".xlsx" file is supported
          </Typography>
        ) : (
          <Typography variant="subtitle1">
            File Name: <i>{allRawFileNames.HLA}</i>
          </Typography>
        )}

        <Button variant="outlined" component="label" style={{ marginTop: 10 }}>
          Choose File
          <input
            hidden
            accept=".xlsx"
            type="file"
            onChange={(event) => handleFileDataImport(event, "HLA")}
          />
        </Button>

        <Fade in={uploadFail["HLA"] !== null}>
          <Alert
            variant="filled"
            severity="error"
            style={{ marginTop: "5px", marginBottom: "5px", width: "1000px" }}
          >
            {uploadFail["HLA"]}
          </Alert>
        </Fade>

        <Fade in={uploadSuccess["HLA"] !== null}>
          <Alert
            variant="filled"
            severity="success"
            style={{ marginTop: "5px", marginBottom: "5px", width: "1000px" }}
          >
            {uploadSuccess["HLA"]}
          </Alert>
        </Fade>

        {allRawFileData.HLA.length !== 0 && !allTableDataToSend.HLA.checkRes ? (
          <Typography variant="subtitle1" style={{ color: "blue" }}>
            Please set HLA table primary key "case_id" mapping.
            <br></br>
            And set at least one non-primary-key header mapping.
          </Typography>
        ) : null}

        {needReset ? (
          <Typography variant="subtitle1" style={{ color: "red" }}>
            Please click reset button before next import.
          </Typography>
        ) : null}

        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: 10, width: "100px" }}
          disabled={!allTableDataToSend["HLA"].checkRes || needReset}
          onClick={(event) => handleUploadClick("HLA")}
        >
          Upload
        </Button>

        <Button
          variant="contained"
          color="secondary"
          style={{ marginTop: 10, marginLeft: 15, width: "100px" }}
          onClick={handResetClick}
        >
          Reset
        </Button>

        <Button
          variant="contained"
          component="label"
          style={{
            marginTop: 10,
            marginLeft: 15,
            color: "white",
            backgroundColor: "#f99500",
          }}
          onClick={(event) => handleCreateClick("HLA")}
        >
          Generate Temp Table
        </Button>
      </Box>

      {/* slices_raw_data table import */}
      <Box style={{ marginTop: 50, paddingBottom: 50 }}>
        <Typography variant="h5">Slice Raw Data Import</Typography>
        <HeaderMappingTable
          tableHeaders={allTableHeaders["slices_raw_data"]}
          fileHeaders={allRawFileHeaders["slices_raw_data"]}
          setMapping={setSlicesRawDataHeadersMapping}
        />
        {allRawFileData.slices_raw_data.length === 0 ? (
          <Typography variant="subtitle1">
            Note: Only ".xlsx" file is supported
          </Typography>
        ) : (
          <Typography variant="subtitle1">
            File Name: <i>{allRawFileNames.slices_raw_data}</i>
          </Typography>
        )}

        <Button variant="outlined" component="label" style={{ marginTop: 10 }}>
          Choose File
          <input
            hidden
            accept=".xlsx"
            type="file"
            onChange={(event) => handleFileDataImport(event, "slices_raw_data")}
          />
        </Button>

        <Fade in={uploadFail["slices_raw_data"] !== null}>
          <Alert
            variant="filled"
            severity="error"
            style={{ marginTop: "5px", marginBottom: "5px", width: "1000px" }}
          >
            {uploadFail["slices_raw_data"]}
          </Alert>
        </Fade>

        <Fade in={uploadSuccess["slices_raw_data"] !== null}>
          <Alert
            variant="filled"
            severity="success"
            style={{ marginTop: "5px", marginBottom: "5px", width: "1000px" }}
          >
            {uploadSuccess["slices_raw_data"]}
          </Alert>
        </Fade>

        {allRawFileData.slices_raw_data.length !== 0 &&
        !allTableDataToSend.slices_raw_data.checkRes ? (
          <Typography variant="subtitle1" style={{ color: "blue" }}>
            Please set slices_raw_data table primary key "id" mapping.
            <br></br>
            And set at least one non-primary-key header mapping.
          </Typography>
        ) : null}

        {needReset ? (
          <Typography variant="subtitle1" style={{ color: "red" }}>
            Please click reset button before next import.
          </Typography>
        ) : null}

        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: 10, width: "100px" }}
          disabled={
            !allTableDataToSend["slices_raw_data"].checkRes || needReset
          }
          onClick={(event) => handleUploadClick("slices_raw_data")}
        >
          Upload
        </Button>

        <Button
          variant="contained"
          color="secondary"
          style={{ marginTop: 10, marginLeft: 15, width: "100px" }}
          onClick={handResetClick}
        >
          Reset
        </Button>

        <Button
          variant="contained"
          component="label"
          style={{
            marginTop: 10,
            marginLeft: 15,
            color: "white",
            backgroundColor: "#f99500",
          }}
          onClick={(event) => handleCreateClick("slices_raw_data")}
        >
          Generate Temp Table
        </Button>
      </Box>

      {/* immunophenotyping table import */}
      <Box style={{ marginTop: 50, paddingBottom: 50 }}>
        <Typography variant="h5">Immunophenotyping Import</Typography>
        <HeaderMappingTable
          tableHeaders={allTableHeaders["immunophenotyping"]}
          fileHeaders={allRawFileHeaders["immunophenotyping"]}
          setMapping={setImmunophenotypingHeadersMapping}
        />
        {allRawFileData.immunophenotyping.length === 0 ? (
          <Typography variant="subtitle1">
            Note: Only ".xlsx" file is supported
          </Typography>
        ) : (
          <Typography variant="subtitle1">
            File Name: <i>{allRawFileNames.immunophenotyping}</i>
          </Typography>
        )}

        <Button variant="outlined" component="label" style={{ marginTop: 10 }}>
          Choose File
          <input
            hidden
            accept=".xlsx"
            type="file"
            onChange={(event) =>
              handleFileDataImport(event, "immunophenotyping")
            }
          />
        </Button>

        <Fade in={uploadFail["immunophenotyping"] !== null}>
          <Alert
            variant="filled"
            severity="error"
            style={{ marginTop: "5px", marginBottom: "5px", width: "1000px" }}
          >
            {uploadFail["immunophenotyping"]}
          </Alert>
        </Fade>

        <Fade in={uploadSuccess["immunophenotyping"] !== null}>
          <Alert
            variant="filled"
            severity="success"
            style={{ marginTop: "5px", marginBottom: "5px", width: "1000px" }}
          >
            {uploadSuccess["immunophenotyping"]}
          </Alert>
        </Fade>

        {allRawFileData.immunophenotyping.length !== 0 &&
        !allTableDataToSend.immunophenotyping.checkRes ? (
          <Typography variant="subtitle1" style={{ color: "blue" }}>
            Please set immunophenotyping table primary key "id" mapping.
            <br></br>
            And set at least one non-primary-key header mapping.
          </Typography>
        ) : null}

        {needReset ? (
          <Typography variant="subtitle1" style={{ color: "red" }}>
            Please click reset button before next import.
          </Typography>
        ) : null}

        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: 10, width: "100px" }}
          disabled={
            !allTableDataToSend["immunophenotyping"].checkRes || needReset
          }
          onClick={(event) => handleUploadClick("immunophenotyping")}
        >
          Upload
        </Button>

        <Button
          variant="contained"
          color="secondary"
          style={{ marginTop: 10, marginLeft: 15, width: "100px" }}
          onClick={handResetClick}
        >
          Reset
        </Button>

        <Button
          variant="contained"
          component="label"
          style={{
            marginTop: 10,
            marginLeft: 15,
            color: "white",
            backgroundColor: "#f99500",
          }}
          onClick={(event) => handleCreateClick("immunophenotyping")}
        >
          Generate Temp Table
        </Button>
      </Box>
    </div>
  );
}
