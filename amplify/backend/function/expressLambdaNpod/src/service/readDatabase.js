const mysql = require("mysql");
const dotenv = require("dotenv").config();
const { dataPreProcess } = require("./dataPreProcess");

var pool = mysql.createPool({
  connectLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

async function testPoolForRead() {
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
    "SELECT c.*, a.GADA, a.IA_2A, a.mIAA, a.ZnT8A, r.RIN, r.ratio, r.sample_type_id, e.electron_microscopy_images FROM cases AS c LEFT JOIN AAb AS a ON c.case_id = a.case_id AND a.is_public = 1 LEFT JOIN RNA AS r ON c.case_id = r.case_id AND r.is_public = 1 LEFT JOIN external_urls AS e ON c.case_id = e.case_id WHERE c.is_public = 1";
  const asyncAction = async (newConnection) => {
    return await new Promise((resolve, reject) => {
      newConnection.query(sql, (error, result) => {
        if (error) {
          reject(error);
        } else {
          dataPreProcess(result);
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

// get SampleTypes
async function get_sample_types() {
  const sql = "SELECT * FROM `sample_types`";
  const asyncAction = async (newConnection) => {
    return await new Promise((resolve, reject) => {
      newConnection.query(sql, (error, result) => {
        if (error) {
          reject(error);
        } else {
          console.log(
            `[Fetch SampleTypes] Totally ${result.length} SampleTypes records were fetched.`
          );
          resolve(result);
        }
      });
    });
  };
  return await pooledConnection(asyncAction);
}

// get Max Insulin
async function get_max_insulin(caseId, highTime, lowTime) {
  const sql = `SELECT MAX(insulin_mU_L) FROM slices_raw_data WHERE case_id="${caseId}" AND time_minutes > ${lowTime} AND time_minutes <= ${highTime}`;
  const asyncAction = async (newConnection) => {
    return await new Promise((resolve, reject) => {
      newConnection.query(sql, (error, result) => {
        if (error) {
          reject(error);
        } else {
          console.log(
            `[Fetch slice_raw_data] max insulin record ${result} was fetched.`
          );
          resolve(result);
        }
      });
    });
  };
  return await pooledConnection(asyncAction);
}

// get percent_viability from samples table
async function get_percent_viability(caseId) {
  const sql = `SELECT sample_type_id, percent_viability FROM samples WHERE case_id="${caseId}" AND percent_viability IS NOT NULL GROUP BY percent_viability ORDER BY sample_type_id ASC, percent_viability ASC`;
  const asyncAction = async (newConnection) => {
    return await new Promise((resolve, reject) => {
      newConnection.query(sql, (error, result) => {
        if (error) {
          reject(error);
        } else {
          console.log(
            `[Fetch percet_viability] percentage of viability from samples ${result} was fetched.`
          );
          resolve(result);
        }
      });
    });
  };
  return await pooledConnection(asyncAction);
}

module.exports = {
  testPoolForRead: testPoolForRead,
  get_cases: get_cases,
  get_donor_types: get_donor_types,
  get_cause_of_death: get_cause_of_death,
  get_HLA: get_HLA,
  get_sample_types: get_sample_types,
  get_max_insulin: get_max_insulin,
  get_percent_viability: get_percent_viability,
};
