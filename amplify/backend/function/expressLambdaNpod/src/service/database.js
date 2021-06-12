const mysql = require("mysql");
const dotenv = require("dotenv").config();
const { translateAABresult } = require("./translateAABresult");

var pool = mysql.createPool({
  connectLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

async function testPool() {
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
    console.log("DB connection was released.");
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
    console.log("DB connection was released.");
  }
}

// get all cases
async function get_cases() {
  const sql =
    "SELECT cases.*, AAB.GADA, AAB.IA_2A, AAB.mIAA, AAB.ZnT8A FROM `cases` LEFT JOIN `AAB` ON cases.case_id = AAB.case_id";
  const asyncAction = async (newConnection) => {
    return await new Promise((resolve, reject) => {
      newConnection.query(sql, (error, result) => {
        if (error) {
          reject(error);
        } else {
          translateAABresult(result);
          console.log(
            `[Fetch cases] Totally ${result.length} cases were fetched.`
          );
          resolve(result);
        }
      });
    });
  };
  return await pooledConnection(asyncAction);
}

// get donor_types
async function get_donor_types() {
  const sql = "SELECT * FROM `donor_types`";
  const asyncAction = async (newConnection) => {
    return await new Promise((resolve, reject) => {
      newConnection.query(sql, (error, result) => {
        if (error) {
          reject(error);
        } else {
          console.log(
            `[Fetch donortypes] Totally ${result.length} donor type records were fetched.`
          );
          resolve(result);
        }
      });
    });
  };
  return await pooledConnection(asyncAction);
}

// get cause_of_death
async function get_cause_of_death() {
  const sql = "SELECT * FROM `cause_of_death`";
  const asyncAction = async (newConnection) => {
    return await new Promise((resolve, reject) => {
      newConnection.query(sql, (error, result) => {
        if (error) {
          reject(error);
        } else {
          console.log(
            `[Fetch causeofdeath] Totally ${result.length} cause of death records were fetched.`
          );
          resolve(result);
        }
      });
    });
  };
  return await pooledConnection(asyncAction);
}

// get HLA
async function get_HLA() {
  const sql = "SELECT * FROM `HLA`";
  const asyncAction = async (newConnection) => {
    return await new Promise((resolve, reject) => {
      newConnection.query(sql, (error, result) => {
        if (error) {
          reject(error);
        } else {
          console.log(
            `[Fetch HLA] Totally ${result.length} HLA records were fetched.`
          );
          resolve(result);
        }
      });
    });
  };
  return await pooledConnection(asyncAction);
}

module.exports = {
  testPool: testPool,
  get_cases: get_cases,
  get_donor_types: get_donor_types,
  get_cause_of_death: get_cause_of_death,
  get_HLA: get_HLA,
};
