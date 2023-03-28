import React, { useState, useEffect } from "react";
import FileSaver from "file-saver";
import XLSX from "xlsx";
import { Button } from "@mui/material";

export default function ButtonDownloadCsvFromJson({ jsonData }) {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".csv";
  const fileName = "customized_case_data";
  const exportToXlsx = (jData, fName, fExtension) => {
    const ws = XLSX.utils.json_to_sheet(jData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const writeBuffer = XLSX.write(wb, { bookType: "csv", type: "array" });
    const data = new Blob([writeBuffer], { type: fileType });
    FileSaver.saveAs(data, fName + fExtension);
  };

  return (
    <Button
      variant="contained"
      onClick={() => exportToXlsx(jsonData, fileName, fileExtension)}
    >
      Download Case Data
    </Button>
  );
}
