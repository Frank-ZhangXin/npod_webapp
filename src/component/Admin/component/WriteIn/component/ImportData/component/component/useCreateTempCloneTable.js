import React, { useEffect } from "react";
import { API } from "aws-amplify";

export default function useCreateTempCloneTable(
  createClicked,
  tableName,
  setUploadSuccess,
  setUploadFail
) {
  useEffect(() => {
    if (tableName && createClicked > 0) {
      createTempCloneTable(tableName);
    }
  }, [createClicked]);

  async function createTempCloneTable(tableName) {
    const nowTime = new Date().toLocaleString().replace(",", "");

    return await API.post("dbapi", "/db/create_temp_clone_table", {
      body: {
        table_name: tableName,
      },
    })
      .then((res) => {
        console.log(`Created the temp clone of table ${tableName}`, res);
        setUploadSuccess((prevValues) => {
          return {
            ...prevValues,
            [tableName]: `Created the temp clone of table ${tableName} successfully!`,
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
            [tableName]: `Creating the temp clone of table ${tableName} failed!`,
          };
        });
      });
  }
}
