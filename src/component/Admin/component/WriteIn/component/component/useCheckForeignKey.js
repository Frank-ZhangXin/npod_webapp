import React, { useState, useEffect } from "react";
import { API, Auth } from "aws-amplify";
import { TrendingUp } from "@material-ui/icons";

export default function useCheckForeignKey(
  foreignKeyValue,
  column,
  setIsForeignKey
) {
  const [checkResult, setCheckResult] = useState(true);
  const [tableName, setTableName] = useState("");
  const [columnName, setColumnName] = useState(column);
  useEffect(() => {
    console.log("checking foreign key...");
    switch (column) {
      case "donor_type_id":
        setTableName("donor_types");
        setIsForeignKey(true);
        break;
      case "accepted_as_donor_type_id":
        setTableName("donor_types");
        setColumnName("donor_type_id");
        setIsForeignKey(true);
        break;
      case "cause_of_death_id":
        setTableName("cause_of_death");
        setIsForeignKey(true);
        break;
      case "OPO_id":
        setTableName("OPO");
        setIsForeignKey(true);
        break;
      default:
        setIsForeignKey(false);
        break;
    }
    if (tableName !== "") {
      checkForeignKey(tableName, columnName, foreignKeyValue);
    }
  }, [foreignKeyValue]);

  async function checkForeignKey(table, key, key_value) {
    return await API.post("dbapi", "/db/check_foreign_key", {
      body: {
        table_name: table,
        foreign_key: key,
        foreign_key_value: key_value,
      },
    })
      .then((res) => {
        if (res.length > 0) {
          setCheckResult(true);
          console.log("exist foreign key!");
        } else {
          setCheckResult(false);
          console.log("non-exist foreign key!");
        }
      })
      .catch((error) => {
        console.log("Amplify API call error", error);
        console.log("*check foreign key failed");
        console.log(
          "*failed table name:",
          table,
          "*failed key:",
          key,
          "*failed key_value:",
          key_value
        );
      });
  }
  return checkResult;
}
