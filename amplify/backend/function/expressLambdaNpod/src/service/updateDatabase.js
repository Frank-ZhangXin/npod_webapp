const mysql = require("mysql");
const dotenv = require("dotenv").config();
const updateColumnMap = require("./updateColumnMap");

var pool = mysql.createPool({
  connectLimit: 10,
  host: process.env.WRITE_DB_HOST,
  user: process.env.WRITE_DB_USER,
  password: process.env.WRITE_DB_PASS,
  database: process.env.WRITE_DB_NAME,
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

// update AAB
async function update_AAB(columns) {
  let updateStr = "";
  // for (let i = 0; i < update_columns.length; i++) {
  //   let updateValue = update_values[i];
  //   if (update_values[i] === "") {
  //     updateValue = "''";
  //   }
  //   if (update_values[i] === "NULL" || update_values[i] === null) {
  //     updateValue = "NULL";
  //   } else {
  //     updateValue = "'" + update_values[i] + "'";
  //   }
  //   if (i === 0) {
  //     updateStr = update_columns[i] + "=" + updateValue;
  //   } else {
  //     updateStr = updateStr + ", " + update_columns[i] + "=" + updateValue;
  //   }
  // }
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
  const sql = `UPDATE AAB SET ${updateStr} WHERE case_id=${columns.case_id}`;
  console.log("sql: ", sql);
  const asyncAction = async (newConnection) => {
    return await new Promise((resolve, reject) => {
      newConnection.query(sql, (error, result) => {
        if (error) {
          reject(error);
        } else {
          console.log(
            `[Update the AAB] The case ${columns.case_id} was updated.`
          );
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
  update_AAB: update_AAB,
};
