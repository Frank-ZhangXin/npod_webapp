import React, { useState, useEffect } from "react";
import { Button, Typography, TextField, Fade } from "@material-ui/core";
import { Autocomplete, Alert } from "@material-ui/lab";
import useRetrieveTableHeaders from "./component/useRetrieveTableHeaders";
import useRetrieveExisitingPrimaryKeyValues from "./component/useRetrieveExistingPrimaryKeyValues";
import useDataUpload from "./component/useDataUpload";
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
    },
    allRawFileNames: {
      HLA: null,
      RNA: null,
    },
    allRawFileHeaders: {
      HLA: [],
      RNA: [],
    },
    allTableHeaders: {
      HLA: [],
      RNA: [],
    },
    HLAHeadersMapping: {},
    allTablePrimaryKeyValues: {
      HLA: [],
      RNA: [],
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
    },
    uploadFail: {
      HLA: null,
      RNA: null,
    },
    uploadSuccess: {
      HLA: null,
      RNA: null,
    },
    allUploadClicked: {
      HLA: 0,
      RNA: 0,
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

  const handleFileDataImport = (event, targetTable) => {
    const file = event.target.files[0];

    setAllRawFileNames((prevValues) => {
      return { ...prevValues, [targetTable]: file.name };
    });

    const reader = new FileReader();
    reader.onload = (readerEvent) => {
      const workbook = XLSX.read(readerEvent.target.result, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const parsedJson = XLSX.utils.sheet_to_json(worksheet);
      setAllRawFileData((prevValues) => {
        return { ...prevValues, [targetTable]: parsedJson };
      });
      setAllRawFileHeaders((prevValues) => {
        return { ...prevValues, [targetTable]: Object.keys(parsedJson[0]) };
      });
    };
    reader.readAsBinaryString(file);

    const timer = setTimeout(() => {
      reader.abort();
    }, 3000);
    event.target.value = null;

    // const workbook = XLSX.read(file, { type: "binary" });
    // const sheetName = workbook.SheetNames[0];
    // const worksheet = workbook.Sheets[sheetName];
    // const parsedJson = XLSX.utils.sheet_to_json(worksheet);

    // setAllRawFileData((prevValues) => {
    //   return { ...prevValues, [targetTable]: parsedJson };
    // });
    // setAllRawFileHeaders((prevValues) => {
    //   return { ...prevValues, [targetTable]: Object.keys(parsedJson[0]) };
    // });
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
    setAllTableDataToSend(initStates.allTableDataToSend);
    setUploadSuccess(initStates.uploadSuccess);
    setUploadFail(initStates.uploadFail);
    setAllUploadClicked(initStates.allUploadClicked);
  }

  const handleUploadClick = (tableName) => {
    setAllUploadClicked((prevValues) => {
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

  useRetrieveExisitingPrimaryKeyValues("HLA_temp", setTablePrimaryKeyValues); // Note: testing set, need revert later
  useRetrieveExisitingPrimaryKeyValues("RNA", setTablePrimaryKeyValues);

  useCheckImportFileFormat(
    "HLA",
    allRawFileData["HLA"],
    allTablePrimaryKeyValues["HLA_temp"], // Note: testing set, need revert later
    HLAHeadersMapping,
    setDataToSend
  );

  useDataUpload(
    allTableDataToSend["HLA"]["checkRes"],
    allUploadClicked["HLA"],
    allTableDataToSend["HLA"]["dataToCreate"],
    allTableDataToSend["HLA"]["dataToUpdate"],
    "HLA", // tableName
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
  console.log("HLA headers mapping", HLAHeadersMapping);
  console.log("All upload clicked", allUploadClicked);

  return (
    <div>
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
    </div>
  );
}
