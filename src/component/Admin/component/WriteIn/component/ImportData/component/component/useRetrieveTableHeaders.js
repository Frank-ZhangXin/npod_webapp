import React, { useEffect } from "react";
import { API } from "aws-amplify";

export default function useRetrieveTableHeaders(tableName, callback) {
  useEffect(() => {
    getTableHeaders(tableName);
  }, []);

  async function getTableHeaders(theTableName) {
    const nowTime = new Date().toLocaleString().replace(",", "");
    console.log(`Retrieving table headers of ${theTableName} table...`);
    return await API.get("dbapi", "/db/table_headers_by_table_name", {
      queryStringParameters: {
        table_name: theTableName,
      },
    })
      .then((res) => {
        console.log(`Retrieve table headers of ${theTableName} success!`, res);
        callback(theTableName, res);
      })
      .catch((error) => {
        console.log(`Retrieve table headers of ${theTableName} fail`, error);
      });
  }
}
