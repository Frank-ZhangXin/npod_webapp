import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button } from "@mui/system";
import FileSaver from "file-saver";
import useRetrieveDataFileKey from "./component/useRetrieveDataFileKey";
import useRetrieveDataFilePath from "./component/useRetrieveDataFilePath";
import useGenJsonWithPath from "./component/useGenJsonWithPath";
import ButtonDownloadCsvFromPath from "./component/ButtonDownloadCsvFromPath";

export default function ExampleDataFileGrid({ datasetId }) {
  const [dataFilePath, setDataFilePath] = useState(null);
  const [dataFileKey, setDataFileKey] = useState(null);
  const [exampleDataJson, setExampleDataJson] = useState(null);
  const [exampleDataColConfig, setExampleDataColConfig] = useState(null);
  const [exampleDataKey, setExampleDataKey] = useState(null);

  useRetrieveDataFileKey(setDataFileKey, datasetId);

  useRetrieveDataFilePath(setDataFilePath, dataFileKey);

  useGenJsonWithPath(
    dataFilePath,
    setExampleDataJson,
    setExampleDataColConfig,
    setExampleDataKey
  );

  console.log("dataset id in example data file", datasetId);
  console.log("example data file key", dataFileKey);
  console.log("example data file path", dataFilePath);
  console.log("example data file json", exampleDataJson);
  console.log("example data file column config", exampleDataColConfig);
  console.log("example data key id", exampleDataKey);

  return (
    <div>
      {dataFilePath ? (
        <Box sx={{ height: 600, width: "100%" }}>
          {exampleDataColConfig ? (
            <DataGrid
              getRowId={(row) => row[exampleDataKey]}
              rows={exampleDataJson}
              columns={exampleDataColConfig}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 25,
                  },
                },
              }}
              pageSizeOptions={[25, 50, 100]}
              disableRowSelectionOnClick
              showCellVerticalBorder={true}
              showColumnVerticalBorder={true}
              checkboxSelection={false}
              sx={{ maxHeight: 500 }}
            />
          ) : null}

          {dataFilePath ? (
            <ButtonDownloadCsvFromPath path={dataFilePath} />
          ) : null}
        </Box>
      ) : (
        "None"
      )}
    </div>
  );
}
