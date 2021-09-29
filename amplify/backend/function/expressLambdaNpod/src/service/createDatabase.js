const mysql = require("mysql");
const dotenv = require("dotenv").config();
const writeColumnMap = require("./updateColumnMap");

var pool = mysql.createPool({
  connectLimit: 10,
  host: process.env.WRITE_DB_HOST,
  user: process.env.WRITE_DB_USER,
  password: process.env.WRITE_DB_PASS,
  database: process.env.WRITE_DB_NAME,
});

async function testPoolForCreate() {
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

// create a new case
async function create_case(case_id) {
  const sql = `INSERT INTO cases(case_id) VALUES('${case_id}')`;
  const asyncAction = async (newConnection) => {
    return await new Promise((resolve, reject) => {
      newConnection.query(sql, (error, result) => {
        if (error) {
          reject(error);
        } else {
          console.log(
            `[Write Database][Insert the case] The case ${case_id} was inserted.`
          );
          resolve(result);
        }
      });
    });
  };
  return await pooledConnection(asyncAction);
}

// get test case
async function get_test_case() {
  const sql = "SELECT * FROM `cases` WHERE `case_id`=9999";
  const asyncAction = async (newConnection) => {
    return await new Promise((resolve, reject) => {
      newConnection.query(sql, (error, result) => {
        if (error) {
          reject(error);
        } else {
          console.log(
            `[Write Database][Insert the case] The case 9999 was inserted.`
          );
          resolve(result);
        }
      });
    });
  };
  return await pooledConnection(asyncAction);
}

// get the object case
async function get_object_case(case_id) {
  console.log("case id is " + case_id);
  const sql = `SELECT COUNT(1) FROM cases WHERE case_id='${case_id}'`;
  const asyncAction = async (newConnection) => {
    return await new Promise((resolve, reject) => {
      newConnection.query(sql, (error, result) => {
        if (error) {
          reject(error);
        } else {
          console.log(`[Fetch cases] Test case was fetched.`);
          resolve(result);
        }
      });
    });
  };
  return await pooledConnection(asyncAction);
}

async function get_case_column(case_id, columns) {
  let columnStr = "";
  for (let i = 0; i < columns.length; i++) {
    if (i === 0) {
      columnStr = columns[i];
    } else {
      columnStr = columnStr + "," + columns[i];
    }
  }
  //console.log(columnStr);
  const sql = `SELECT ${columnStr} FROM cases WHERE case_id='${case_id}'`;
  console.log("sql: " + sql);
  const asyncAction = async (newConnection) => {
    return await new Promise((resolve, reject) => {
      newConnection.query(sql, (error, result) => {
        if (error) {
          reject(error);
        } else {
          console.log(
            `[Fetch case column] Case ${case_id} column ${columnStr} was fetched.`
          );
          resolve(result);
        }
      });
    });
  };
  return await pooledConnection(asyncAction);
}

async function get_table_column(table_name, column_name, sort_by) {
  const sql = `SELECT ${column_name}, ${sort_by} FROM ${table_name}`;
  console.log("sql: " + sql);
  function compare(a, b) {
    return a[sort_by] - b[sort_by];
  }
  const asyncAction = async (newConnection) => {
    return await new Promise((resolve, reject) => {
      newConnection.query(sql, (error, result) => {
        if (error) {
          reject(error);
        } else {
          console.log(
            `[Fetch table column] Table ${table_name} column ${column_name} was fetched.`
          );
          const sorted_res = result.sort(compare);
          resolve(sorted_res.map((res) => res[column_name]));
        }
      });
    });
  };
  return await pooledConnection(asyncAction);
}

async function get_table_column_possible_value(table_name, column_name) {
  const sql = `SELECT COLUMN_TYPE FROM information_schema.COLUMNS WHERE TABLE_NAME="${table_name}" AND COLUMN_NAME="${column_name}"`;
  console.log("sql: " + sql);
  function str_to_arr(values) {
    let newValues = [];
    // remove "enum" suffix
    let temp = values.slice(5, -1).split(",");
    // remove single quote around each value
    for (let i = 0; i < temp.length; i++) {
      newValues.push(temp[i].slice(1, -1));
    }
    return newValues;
  }
  const asyncAction = async (newConnection) => {
    return await new Promise((resolve, reject) => {
      newConnection.query(sql, (error, result) => {
        if (error) {
          reject(error);
        } else {
          console.log(
            `[Fetch table column] Table ${table_name} column ${column_name} was fetched.`
          );
          resolve(str_to_arr(result[0]["COLUMN_TYPE"]));
          console.log(
            "Returned possible column value",
            str_to_arr(result[0]["COLUMN_TYPE"])
          );
        }
      });
    });
  };
  return await pooledConnection(asyncAction);
}

async function check_foreign_key(table_name, foreign_key, foreign_key_value) {
  const sql = `SELECT * FROM ${table_name} WHERE ${foreign_key}='${foreign_key_value}'`;
  console.log("sql: " + sql);
  const asyncAction = async (newConnection) => {
    return await new Promise((resolve, reject) => {
      newConnection.query(sql, (error, result) => {
        if (error) {
          reject(error);
        } else {
          console.log(
            `[Check Foreign Key] Table ${table_name} column ${foreign_key} was fetched.`
          );
          resolve(result);
        }
      });
    });
  };
  return await pooledConnection(asyncAction);
}

module.exports = {
  testPoolForCreate: testPoolForCreate,
  create_case: create_case,
  get_test_case: get_test_case,
  get_object_case: get_object_case,
  get_case_column: get_case_column,
  get_table_column: get_table_column,
  get_table_column_possible_value: get_table_column_possible_value,
  check_foreign_key: check_foreign_key,
};
