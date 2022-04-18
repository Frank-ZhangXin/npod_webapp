import React, { useState, useEffect } from "react";
import { API, Auth } from "aws-amplify";

export default function useRetrieveTableColumnWithConditions(
  tableName,
  columnName,
  sortBy,
  conditions
) {
  const [result, setResult] = useState([]);
  useEffect(() => {
    if (tableName !== "") {
      retrieve(tableName, columnName, sortBy, conditions);
    }
  }, [tableName]);
  async function retrieve(table, column, sortby, the_conditions) {
    return await API.post(
      "dbapi",
      "/db/get_one_table_one_column_all_existing_values_with_conditions",
      {
        body: {
          table_name: table,
          column_name: column,
          sort_by: sortby,
          conditions: the_conditions,
        },
      }
    )
      .then((res) => {
        console.log("Table column was retrieved successfully.");
        setResult(res);
      })
      .catch((error) => {
        console.log("Failed to retrieve table column");
        console.log("Failed table", table);
        console.log("Failed column", column);
        console.log("Failed sortby", sortby);
        console.log("Amplify API call error", error);
      });
  }

  return result;
}
