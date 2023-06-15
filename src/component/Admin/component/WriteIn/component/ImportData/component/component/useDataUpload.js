import React, { useEffect } from "react";
import { API } from "aws-amplify";

export default function useDataUpload(
  checkRes,
  uploadClicked,
  dataToCreate,
  dataToUpdate,
  tableName,
  setUploadSuccess,
  setUploadFail
) {
  useEffect(() => {
    if (dataToCreate.length !== 0 && checkRes) {
      createData(dataToCreate);
    }

    if (dataToUpdate.length !== 0 && checkRes) {
      updateData(dataToUpdate);
    }
  }, [uploadClicked]);

  async function createData(theData) {
    const nowTime = new Date().toLocaleString().replace(",", "");

    console.log("the data to create is passed to API", dataFilter(theData));

    return await API.post("dbapi", "/db/create_new_rows_into_table", {
      body: {
        table_name: tableName + "_temp",
        matrix: dataFilter(theData),
      },
    })
      .then((res) => {
        console.log(
          `New rows are successfully inserted in table ${tableName}`,
          res
        );
        setUploadSuccess((prevValues) => {
          return {
            ...prevValues,
            [tableName]: `New rows are created in table ${tableName} successfully!`,
          };
        });
        setUploadFail((prevValues) => {
          return { ...prevValues, [tableName]: null };
        });
      })
      .catch((error) => {
        console.log(`New row inserted fail in table ${tableName}`, error);
        setUploadSuccess((prevValues) => {
          return { ...prevValues, [tableName]: null };
        });
        setUploadFail((prevValues) => {
          return {
            ...prevValues,
            [tableName]: `New rows creating in table ${tableName} failed!`,
          };
        });
      });
  }

  async function updateData(theData) {
    const nowTime = new Date().toLocaleString().replace(",", "");

    console.log("the data to update is passed to API", dataFilter(theData));

    return await API.put("dbapi", "/db/batch_update_table", {
      body: {
        table_name: tableName + "_temp",
        matrix: dataFilter(theData),
      },
    })
      .then((res) => {
        console.log(`Rows are successfully updated in table ${tableName}`, res);
        setUploadSuccess((prevValues) => {
          return {
            ...prevValues,
            [tableName]: `Rows are updated in table ${tableName} successfully!`,
          };
        });
        setUploadFail((prevValues) => {
          return { ...prevValues, [tableName]: null };
        });
      })
      .catch((error) => {
        console.log(`Rows update fail in table ${tableName}`, error);
        setUploadSuccess((prevValues) => {
          return { ...prevValues, [tableName]: null };
        });
        setUploadFail((prevValues) => {
          return {
            ...prevValues,
            [tableName]: `Rows update fail in table ${tableName} failed!`,
          };
        });
      });
  }

  // fitlering out all entries with "undefined" or "null" value
  function dataFilter(theData) {
    return theData.map((row) => {
      let newRow = {};
      for (const key in row) {
        if (row[key]) {
          newRow[key] = row[key];
        }
      }
      return newRow;
    });
  }
}
