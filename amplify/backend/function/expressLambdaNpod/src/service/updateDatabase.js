const mysql = require("mysql");
const dotenv = require("dotenv").config();

var pool = mysql.createPool({
  connectLimit: 10,
  host: process.env.WRITE_DB_HOST,
  user: process.env.WRITE_DB_USER,
  password: process.env.WRITE_DB_PASS,
  database: process.env.WRITE_DB_NAME,
  multipleStatements: true,
});

async function testPoolForUpdate() {
  const newConnection = await new Promise((resolve, reject) => {
    pool.getConnection((error, connection) => {
      if (error) {
        reject(error);
      } else {
        resolve(connection);
      }
    });
  });
  try {
    return newConnection;
  } finally {
    newConnection.release();
    console.log("Write DB connection was released.");
  }
}

async function pooledConnection(asyncAction) {
  const newConnection = await new Promise((resolve, reject) => {
    pool.getConnection((error, connection) => {
      if (error) {
        reject(error);
      } else {
        resolve(connection);
      }
    });
  });
  try {
    return await asyncAction(newConnection);
  } finally {
    newConnection.release();
    console.log("Write DB connection was released.");
  }
}

// update a case
async function update_case(case_id, update_columns, update_values) {
  let updateStr = "";
  for (let i = 0; i < update_columns.length; i++) {
    let updateValue = update_values[i];
    if (update_values[i] === "") {
      updateValue = "''";
    }
    if (update_values[i] === "NULL" || update_values[i] === null) {
      updateValue = "NULL";
    } else {
      updateValue = "'" + update_values[i] + "'";
    }
    if (i === 0) {
      updateStr = update_columns[i] + "=" + updateValue;
    } else {
      updateStr = updateStr + ", " + update_columns[i] + "=" + updateValue;
    }
  }
  const sql = `UPDATE cases SET ${updateStr} WHERE case_id='${case_id}'`;
  console.log("sql: ", sql);
  const asyncAction = async (newConnection) => {
    return await new Promise((resolve, reject) => {
      newConnection.query(sql, (error, result) => {
        if (error) {
          reject(error);
        } else {
          console.log(`[Update the case] The case ${case_id} was updated.`);
          resolve(result);
        }
      });
    });
  };
  return await pooledConnection(asyncAction);
}

// update AAb
async function update_AAb(columns) {
  let updateStr = "";
  for (let [key, value] of Object.entries(columns)) {
    if (value !== null) {
      columns[key] = "'" + value + "'";
    }
    if (updateStr === "") {
      updateStr = key + "=" + columns[key];
    } else {
      updateStr += "," + key + "=" + columns[key];
    }
  }
  const sql = `UPDATE AAb SET ${updateStr} WHERE case_id=${columns.case_id} AND AAb_id=${columns.AAb_id}`;
  console.log("sql: ", sql);
  const asyncAction = async (newConnection) => {
    return await new Promise((resolve, reject) => {
      newConnection.query(sql, (error, result) => {
        if (error) {
          reject(error);
        } else {
          console.log(
            `[Update the AAb] The case ${columns.case_id} was updated.`
          );
          resolve(result);
        }
      });
    });
  };
  return await pooledConnection(asyncAction);
}

// update HLA
async function update_HLA(
  columns,
  isBatch = false,
  tempTableName = "HLA_temp"
) {
  let updateStr = "";
  for (let [key, value] of Object.entries(columns)) {
    if (key === "case_id") {
      continue;
    }
    if (value !== null) {
      columns[key] = "'" + value + "'";
    }
    if (updateStr === "") {
      updateStr = key + "=" + columns[key];
    } else {
      updateStr += "," + key + "=" + columns[key];
    }
  }
  const tableName = isBatch ? tempTableName : "HLA";
  const sql = `UPDATE ${tableName} SET ${updateStr} WHERE case_id='${columns.case_id}'`;
  console.log("sql: ", sql);
  const asyncAction = async (newConnection) => {
    return await new Promise((resolve, reject) => {
      newConnection.query(sql, (error, result) => {
        if (error) {
          reject(error);
        } else {
          console.log(
            `[Update the HLA] The case ${columns.case_id} was updated.`
          );
          resolve(result);
        }
      });
    });
  };
  return await pooledConnection(asyncAction);
}

// update RNA
async function update_RNA(columns) {
  let updateStr = "";
  for (let [key, value] of Object.entries(columns)) {
    if (value !== null) {
      columns[key] = "'" + value + "'";
    }
    if (updateStr === "") {
      updateStr = key + "=" + columns[key];
    } else {
      updateStr += "," + key + "=" + columns[key];
    }
  }
  const sql = `UPDATE RNA SET ${updateStr} WHERE case_id='${columns.case_id}' AND RNA_id='${columns.RNA_id}'`;
  console.log("sql: ", sql);
  const asyncAction = async (newConnection) => {
    return await new Promise((resolve, reject) => {
      newConnection.query(sql, (error, result) => {
        if (error) {
          reject(error);
        } else {
          console.log(
            `[Update the HLA] The case ${columns.case_id} was updated.`
          );
          resolve(result);
        }
      });
    });
  };
  return await pooledConnection(asyncAction);
}

// update sample
async function update_sample(columns) {
  let updateStr = "";
  for (let [key, value] of Object.entries(columns)) {
    if (value !== null && value !== "null") {
      columns[key] = "'" + value + "'";
    }
    if (updateStr === "") {
      updateStr = key + "=" + columns[key];
    } else {
      updateStr += "," + key + "=" + columns[key];
    }
  }
  const sql = `UPDATE samples SET ${updateStr} WHERE case_id='${columns.case_id}' AND vial_id='${columns.vial_id}'`;
  console.log("sql: ", sql);
  const asyncAction = async (newConnection) => {
    return await new Promise((resolve, reject) => {
      newConnection.query(sql, (error, result) => {
        if (error) {
          reject(error);
        } else {
          console.log(
            `[Update the sample] The case ${columns.case_id} was updated.`
          );
          resolve(result);
        }
      });
    });
  };
  return await pooledConnection(asyncAction);
}

// update dataset
async function update_dataset(dataset_id, columns) {
  let updateStr = "";
  for (let [key, value] of Object.entries(columns)) {
    if (value !== null && value !== "null") {
      columns[key] = "'" + value + "'";
    }
    if (updateStr === "") {
      updateStr = key + "=" + columns[key];
    } else {
      updateStr += "," + key + "=" + columns[key];
    }
  }
  const sql = `UPDATE dataset SET ${updateStr} WHERE dataset_id='${dataset_id}'`;
  console.log("sql: ", sql);
  const asyncAction = async (newConnection) => {
    return await new Promise((resolve, reject) => {
      newConnection.query(sql, (error, result) => {
        if (error) {
          reject(error);
        } else {
          console.log(
            `[Update the HLA] The case ${columns.case_id} was updated.`
          );
          resolve(result);
        }
      });
    });
  };
  return await pooledConnection(asyncAction);
}

// update slices_raw_data
async function update_slices_raw_data(
  columns,
  isBatch = false,
  tempTableName = "slices_raw_data_temp"
) {
  let updateStr = "";
  for (let [key, value] of Object.entries(columns)) {
    if (key === "id") {
      continue;
    }
    if (value !== null) {
      columns[key] = "'" + value + "'";
    }
    if (updateStr === "") {
      updateStr = key + "=" + columns[key];
    } else {
      updateStr += "," + key + "=" + columns[key];
    }
  }
  const tableName = isBatch ? tempTableName : "slices_raw_data";
  const sql = `UPDATE ${tableName} SET ${updateStr} WHERE id='${columns.id}'`;
  console.log("sql: ", sql);
  const test_sql = `SELECT * FROM ${tableName}`;
  // console.log("test sql: ", test_sql);
  const asyncAction = async (newConnection) => {
    return await new Promise((resolve, reject) => {
      newConnection.query(sql, (error, result) => {
        if (error) {
          reject(error);
        } else {
          console.log(
            `[Update the slices_raw_data_temp] The case ${columns.id} was updated.`
          );
          resolve(result);
        }
      });
    });
  };
  return await pooledConnection(asyncAction);
}

// update immunophenotyping
async function update_immunophenotyping(
  columns,
  isBatch = false,
  tempTableName = "immunophenotyping_temp"
) {
  let updateStr = "";
  for (let [key, value] of Object.entries(columns)) {
    if (key === "id") {
      continue;
    }
    if (value !== null) {
      columns[key] = "'" + value + "'";
    }
    if (updateStr === "") {
      updateStr = key + "=" + columns[key];
    } else {
      updateStr += "," + key + "=" + columns[key];
    }
  }
  const tableName = isBatch ? tempTableName : "immunophenotyping";
  const sql = `UPDATE ${tableName} SET ${updateStr} WHERE id='${columns.id}'`;
  console.log("sql: ", sql);
  const test_sql = `SELECT * FROM ${tableName}`;
  // console.log("test sql: ", test_sql);
  const asyncAction = async (newConnection) => {
    return await new Promise((resolve, reject) => {
      newConnection.query(sql, (error, result) => {
        if (error) {
          reject(error);
        } else {
          console.log(
            `[Update the immunophenotyping_temp] The case ${columns.id} was updated.`
          );
          resolve(result);
        }
      });
    });
  };
  return await pooledConnection(asyncAction);
}

// Batch update a table
async function batch_update_table(tableName, matrix) {
  const resList = [];
  let updateFunc;
  let targetTable = tableName;

  if (tableName.split("_temp")[0] === "HLA") {
    updateFunc = update_HLA;
  } else if (tableName.split("_temp")[0] === "slices_raw_data") {
    updateFunc = update_slices_raw_data;
  } else if (tableName.split("_temp")[0] === "immunophenotyping") {
    updateFunc = update_immunophenotyping;
  } else {
    updateFunc = null;
  }

  for (const row of matrix) {
    let rowRes = updateFunc
      ? updateFunc(row, true, targetTable)
      : "The updating table is not supported";
    resList.push(rowRes);
  }
  return await Promise.all(resList);
}

async function get_data_by_conditions(table_name, conditions) {
  function parseCond(theCond) {
    let sql = "";
    if (
      typeof theCond !== "object" ||
      !theCond.hasOwnProperty("name") ||
      !theCond.hasOwnProperty("operator" || !theCond.hasOwnProperty("value"))
    ) {
      return sql;
    }
    if (theCond.name === "LOGIC_CONNECT") {
      let subCondList = theCond.value;
      let subCondRtList = [];
      subCondList.forEach((subCond) => {
        let subRt = parseCond(subCond);
        subCondRtList.push(subRt);
      });
      console.log("sub cond list result", subCondRtList);
      let logic_connector = " " + theCond.operator + " ";
      sql = subCondRtList.join(logic_connector);
      sql = "(" + sql + ")";
    } else {
      if (theCond.operator === "NOT IN") {
        sql = theCond.name + " " + theCond.operator + " " + theCond.value;
      } else {
        sql = theCond.name + theCond.operator + "'" + theCond.value + "'";
      }
    }
    return sql;
  }
  const sqlCond = parseCond(conditions);
  let sql = `SELECT * FROM ${table_name}`;
  if (sqlCond !== "") {
    sql = sql + " WHERE " + sqlCond;
  }
  console.log("sql query:", sql);

  const asyncAction = async (newConnection) => {
    return await new Promise((resolve, reject) => {
      newConnection.query(sql, (error, result) => {
        if (error) {
          reject(error);
        } else {
          console.log(`[Fetch datasets_by_condition] fetch successful.`);
          resolve(result);
        }
      });
    });
  };
  return await pooledConnection(asyncAction);
}

module.exports = {
  testPoolForUpdate: testPoolForUpdate,
  update_case: update_case,
  update_AAb: update_AAb,
  update_HLA: update_HLA,
  update_RNA: update_RNA,
  update_sample: update_sample,
  update_dataset: update_dataset,
  update_slices_raw_data: update_slices_raw_data,
  update_immunophenotyping: update_immunophenotyping,
  batch_update_table: batch_update_table,
  get_data_by_conditions: get_data_by_conditions,
};
