import React, { useState, useEffect } from "react";
import FileSaver from "file-saver";
import { Button } from "@mui/material";

export default function ButtonDownloadCsvFromPath({ path }) {
  async function dowanloadFile(filePath) {
    const response = await fetch(filePath);
    const data = await response.blob();
    FileSaver.saveAs(new File([data], "exampleDataFile", { type: data.type }));
  }
  return (
    <Button
      variant="contained"
      sx={{ marginTop: 2 }}
      onClick={() => dowanloadFile(path)}
    >
      Download Example Data
    </Button>
  );
}
