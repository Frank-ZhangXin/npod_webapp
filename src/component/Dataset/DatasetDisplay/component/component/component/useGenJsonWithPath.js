import React, { useEffect, useState } from "react";

import Papa from "papaparse";

export default function useGenJsonWithPath(
  path,
  setExampleDataJson,
  setExampleDataColConfig,
  setExampleDataKey
) {
  useEffect(() => {
    async function fetchData() {
      fetchCsvFile(path);
    }
    fetchData();
  }, [path]);

  async function fetchCsvFile(filePath) {
    const response = await fetch(filePath);
    const data = await response.text();
    if (isCsvData(data)) {
      setExampleDataKey(data.split("\n").shift().split(",").shift());
      const parsedDataPromise = csvToJson(data);
      parsedDataPromise.then((data) => {
        setExampleDataJson(data);
        const header = Object.keys(data[0]);
        const convertFunc = (item) => ({
          field: item,
          // headerName: item,
          renderHeader: () => <strong>{item}</strong>,
          minWidth: 150,
          flex: 1,
        });

        const dataColConfig = header.map(convertFunc);
        setExampleDataColConfig(dataColConfig);
      });
    }
  }

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
}
