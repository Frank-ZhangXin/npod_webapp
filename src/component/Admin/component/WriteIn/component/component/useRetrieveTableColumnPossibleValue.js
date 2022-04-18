import React, { useState, useEffect } from "react";
import { API, Auth } from "aws-amplify";

export default function useRetrieveTableColumnPossibleValue(
  tableName,
  columnName
) {
  const [result, setResult] = useState([]);
  useEffect(() => {
    if (tableName !== "") {
      retrieve(tableName, columnName);
    }
  }, [tableName]);
  async function retrieve(table, column) {
    return await API.post(
      "dbapi",
      "/db/get_one_table_one_column_all_possible_values",
      {
        body: {
          table_name: table,
          column_name: column,
        },
      }
    )
      .then((res) => {
        console.log("Table column possible value was retrieved successfully.");
        setResult(res);
      })
      .catch((error) => {
        console.log("Failed to retrieve table column possible value");
        console.log("Failed table", table);
        console.log("Failed column", column);
        console.log("Amplify API call error", error);
      });
  }

  return result;
}
