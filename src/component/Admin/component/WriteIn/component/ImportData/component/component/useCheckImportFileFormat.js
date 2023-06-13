import React, { useState, useEffect } from "react";

export default function useCheckImportFileFormat(
  tableName,
  primaryKey,
  rawFileData,
  primaryKeyValuesArr,
  headerMapping,
  callback
) {
  useEffect(() => {
    if (rawFileData.length !== 0) {
      checkFormat(tableName, rawFileData, primaryKeyValuesArr);
    }
  }, [rawFileData, headerMapping]);

  function checkFormat(theName, theFileData, theExsitingDataArr) {
    const rawFileHeadersArr = Object.keys(theFileData[0]);
    console.log("raw file header arr", rawFileHeadersArr);
    const rawFilePrimaryKey = rawFileHeadersArr[0];

    const [theDataToUpdate, theDataToCreate] = checkExisting(
      rawFileData,
      rawFilePrimaryKey,
      theExsitingDataArr
    );

    const checkPrimaryKeyMapping = headerMapping[primaryKey] ? true : false;
    const checkDataToUpdateAtLeastOneHeaderMapped =
      checkAtLeastOneHeaderMapped(theDataToUpdate);
    const checkDataToCreateAtLeastOneHeaderMapped =
      checkAtLeastOneHeaderMapped(theDataToCreate);

    callback(tableName, {
      checkRes:
        checkPrimaryKeyMapping &&
        (checkDataToUpdateAtLeastOneHeaderMapped ||
          checkDataToCreateAtLeastOneHeaderMapped),
      dataToUpdate: theDataToUpdate,
      dataToCreate: theDataToCreate,
    });
  }

  // filter exsiting to update and new data to create
  function checkExisting(
    fileData,
    filePrimaryKey,
    existingPrimaryKeyvValuesArr
  ) {
    const existSet = new Set(existingPrimaryKeyvValuesArr);
    const filePrimaryKeyValuesArr = fileData.reduce((tempArr, current) => {
      tempArr.push(current[filePrimaryKey]);
      return tempArr;
    }, []);
    const oldDataToUpdate = [];
    const newDataToCreate = [];
    for (let i = 0; i < filePrimaryKeyValuesArr.length; i++) {
      let currentFilePrimaryKeyValue = filePrimaryKeyValuesArr[i];
      if (existSet.has(currentFilePrimaryKeyValue)) {
        oldDataToUpdate.push(fileData[i]);
      } else {
        newDataToCreate.push(fileData[i]);
      }
    }
    return [renameHeaders(oldDataToUpdate), renameHeaders(newDataToCreate)];
  }

  function renameHeaders(dataToUpdate) {
    return dataToUpdate.map((rowObject) => {
      let newRowObject = {};
      Object.keys(headerMapping).forEach((key) => {
        let mappedKey = headerMapping[key];
        let mappedValue = rowObject[mappedKey];
        newRowObject[key] = mappedValue;
      });
      return newRowObject;
    });
  }

  // check if there's at least one header mapped which is other than primary key
  function checkAtLeastOneHeaderMapped(theObjectArr) {
    let res = false;
    for (const theObject of theObjectArr) {
      for (const key in theObject) {
        if (key !== primaryKey && theObject[key]) {
          res = res || true;
        }
      }
    }
    return res;
  }
}
