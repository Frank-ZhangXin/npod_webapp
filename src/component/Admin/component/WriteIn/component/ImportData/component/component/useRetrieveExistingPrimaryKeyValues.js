import React, { useEffect } from "react";
import { API } from "aws-amplify";

export default function useRetrieveExisitingPrimaryKeyValues(
  tableName,
  callback
) {
  useEffect(() => {
    getPrimaryKeyValues(tableName);
  }, []);

  async function getPrimaryKeyValues(theTableName) {
    const nowTime = new Date().toLocaleString().replace(",", "");
    console.log(
      `Retrieving existing primary key values of ${theTableName} table...`
    );
    return await API.get("dbapi", "/db/primary_key_values_by_table_name", {
      queryStringParameters: {
        table_name: theTableName,
      },
    })
      .then((res) => {
        console.log(
          `Retrieve primary key values of ${theTableName} success!`,
          res
        );
        const result = res.reduce((temp, current) => {
          temp.push(current[Object.keys(current)[0]]);
          return temp;
        }, []);
        callback(theTableName, result);
      })
      .catch((error) => {
        console.log(
          `Retrieve primary key values of ${theTableName} fail`,
          error
        );
      });
  }
}
