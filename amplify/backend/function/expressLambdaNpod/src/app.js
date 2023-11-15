/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

var express = require("express");
var bodyParser = require("body-parser");
var awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");
var {
  testPoolForRead,
  get_cases,
  get_all_case_ids,
  get_donor_types,
  get_cause_of_death,
  get_HLA,
  get_sample_types,
  get_max_insulin,
  get_percent_viability,
  get_electron_microscopy_images,
  get_immunophenotyping,
  get_datasets_by_author,
  get_all_datasets,
  get_dataset_by_datasetId,
  get_caseId_by_datasetId,
  get_table_column_headers_by_table_name,
  get_primary_key_values_by_table_name,
} = require("./service/readDatabase");

var {
  testPoolForCreate,
  create_case,
  get_test_case,
  check_case_exist,
  get_one_case_all_column_values,
  get_one_table_one_column_all_existing_values,
  get_one_table_one_column_all_existing_values_with_conditions,
  get_one_table_one_column_all_possible_values,
  check_foreign_key,
  check_AAb_exist,
  get_all_AAb_id,
  get_one_AAb_all_column_values,
  create_AAb,
  check_HLA_exist,
  get_one_HLA_all_column_values,
  create_HLA,
  check_RNA_exist,
  get_all_RNA_id,
  get_one_RNA_all_column_values,
  create_RNA,
  create_sample,
  check_sample_exist,
  get_all_vial_id,
  get_one_sample_all_column_values,
  create_dataset,
  create_dataset_case_identifier,
  create_dataset_example_data_file,
  create_new_rows_into_table,
} = require("./service/createDatabase");

var {
  testPoolForUpdate,
  update_case,
  update_AAb,
  update_HLA,
  update_RNA,
  update_sample,
  update_dataset,
  update_slices_raw_data,
  update_immunophenotyping,
  batch_update_table,
  get_data_by_conditions,
} = require("./service/updateDatabase");

var {
  testPoolForDelete,
  delete_case,
  delete_sample,
} = require("./service/deleteDatabase");

// declare a new express app
var app = express();
app.use(express.json());
app.use(awsServerlessExpressMiddleware.eventContext());

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

/**********************
 * Example get method *
 **********************/

// test endpoint
app.get("/db", function (req, res) {
  res.json({ success: "nPOD DB endpoint was reached!", url: req.url });
});

// test db credential
app.get("/db/debug_db", function (req, res) {
  res.json({
    success: `db_host: ${process.env.DB_HOST}, db_name: ${process.env.DB_NAME}`,
    url: req.url,
  });
});

// test SQL pool connection
app.get("/db/test_db", function (req, res) {
  console.log("Testing database connection...");
  testPoolForRead()
    .then(() => {
      console.log("Database connection is successful!");
      res.status(200).json({ Database_connection: true });
    })
    .catch(() => {
      console.log("Error: Database connection is failed!");
      res.status(500).json({ Database_connection: false });
    });
});

// get cases
app.get("/db/case", function (req, res) {
  console.log("fetching cases.");
  if (typeof req.query.caseIdList !== "undefined") {
    const caseIdList = req.query.caseIdList.split(",");
    get_cases(caseIdList).then((promisedRes) => res.send(promisedRes));
  } else {
    get_cases().then((promisedRes) => res.send(promisedRes));
  }
});

// get case ids
app.get("/db/all_case_ids", function (req, res) {
  console.log("fetching case ids.");
  get_all_case_ids().then((promisedRes) => res.send(promisedRes));
});

// get donor_types
app.get("/db/donor_type", function (req, res) {
  console.log("fetching donorTypes.");
  get_donor_types().then((promisedRes) => res.send(promisedRes));
});

// get cause_of_death
app.get("/db/cause_of_death", function (req, res) {
  console.log("fetching causeOfDeath.");
  get_cause_of_death().then((promisedRes) => res.send(promisedRes));
});

// get HLA
app.get("/db/HLA", function (req, res) {
  console.log("fetching HLA.");
  get_HLA().then((promisedRes) => res.send(promisedRes));
});

// get sample_types
app.get("/db/sample_type", function (req, res) {
  console.log("fetching Sample Types.");
  get_sample_types().then((promisedRes) => res.send(promisedRes));
});

// get max insulin
app.get("/db/max_insulin", function (req, res) {
  console.log("fetching Max Insulin.");
  get_max_insulin(
    req.query.case_id,
    req.query.high_time,
    req.query.low_time
  ).then((promisedRes) => res.send(promisedRes));
});

// get percent_viability from samples table
app.get("/db/percent_viability", function (req, res) {
  console.log("fetching Max Insulin.");
  get_percent_viability(req.query.case_id).then((promisedRes) =>
    res.send(promisedRes)
  );
});

// get electron_microscopy_images
app.get("/db/electron_microscopy_images", function (req, res) {
  console.log("fetching electron_microscopy_images.");
  get_electron_microscopy_images().then((promisedRes) => res.send(promisedRes));
});

// get immunophenotyping
app.get("/db/immunophenotyping", function (req, res) {
  console.log("fetching immunophenotyping.");
  get_immunophenotyping().then((promisedRes) => res.send(promisedRes));
});

// get datasets by author
app.get("/db/datasets_by_author", function (req, res) {
  console.log("fetching datasets by author.");
  get_datasets_by_author(req.query.author).then((promisedRes) =>
    res.send(promisedRes)
  );
});

// get all datasets
app.get("/db/datasets", function (req, res) {
  console.log("fetching all datasets.");
  get_all_datasets().then((promisedRes) => res.send(promisedRes));
});

// get dataset by datasetId
app.get("/db/dataset_by_datasetId", function (req, res) {
  console.log("fetching dataset by datasetId.");
  get_dataset_by_datasetId(req.query.dataset_id).then((promisedRes) =>
    res.send(promisedRes)
  );
});

// get caseId by datasetId
app.get("/db/caseId_by_datasetId", function (req, res) {
  console.log("fetching caseId by datasetId.");
  get_caseId_by_datasetId(req.query.dataset_id).then((promisedRes) =>
    res.send(promisedRes)
  );
});

// get table headers by table name
app.get("/db/table_headers_by_table_name", function (req, res) {
  console.log("fetching table_headers by table_name.");
  get_table_column_headers_by_table_name(req.query.table_name).then(
    (promisedRes) => res.send(promisedRes)
  );
});

// get primary key's values by table name
app.get("/db/primary_key_values_by_table_name", function (req, res) {
  console.log("fetching table_headers by table_name.");
  get_primary_key_values_by_table_name(req.query.table_name).then(
    (promisedRes) => res.send(promisedRes)
  );
});

/****************************
 * Example post method *
 ****************************/
// test db credential
app.post("/db/debug_db", function (req, res) {
  res.json({
    success: `write_db_host: ${process.env.WRITE_DB_HOST}, write_db_name: ${process.env.WRITE_DB_NAME}`,
    url: req.url,
  });
});

app.post("/db/test_db", function (req, res) {
  // Add your code here
  console.log("Testing database connection...");
  testPoolForCreate()
    .then(() => {
      console.log("Database connection is successful!");
      res.status(200).json({ Database_connection: true });
    })
    .catch(() => {
      console.log("Error: Database connection is failed!");
      res.status(500).json({ Database_connection: false });
    });
});

app.post("/db/create_case", function (req, res) {
  // Add your code here
  console.log("inserting cases.");
  create_case(req.body["case_id"]).then((promisedRes) => res.send(promisedRes));
});

// get test case
app.post("/db/get_test_case", function (req, res) {
  console.log("fetching cases.");
  get_test_case().then((promisedRes) => res.send(promisedRes));
});

// check case exist
app.post("/db/check_case_exist", function (req, res) {
  console.log("Getting object case.");
  console.log(req.body);
  check_case_exist(req.body["case_id"]).then((promisedRes) =>
    res.send(promisedRes)
  );
});

// get one case all column values
app.post("/db/get_one_case_all_column_values", function (req, res) {
  console.log("Getting object case.");
  console.log(req.body);
  get_one_case_all_column_values(req.body["case_id"], req.body["columns"]).then(
    (promisedRes) => res.send(promisedRes)
  );
});

// get some table some column all existing values (OPO table and donor_types table)
app.post(
  "/db/get_one_table_one_column_all_existing_values",
  function (req, res) {
    console.log("Getting table column.");
    console.log(req.body);
    get_one_table_one_column_all_existing_values(
      req.body["table_name"],
      req.body["column_name"],
      req.body["sort_by"]
    ).then((promisedRes) => res.send(promisedRes));
  }
);

// get some table some column all existing values (sampletypes table)
app.post(
  "/db/get_one_table_one_column_all_existing_values_with_conditions",
  function (req, res) {
    console.log("Getting table column.");
    console.log(req.body);
    get_one_table_one_column_all_existing_values_with_conditions(
      req.body["table_name"],
      req.body["column_name"],
      req.body["sort_by"],
      req.body["conditions"]
    ).then((promisedRes) => res.send(promisedRes));
  }
);

// get some table some column all possible values (enum type)
app.post(
  "/db/get_one_table_one_column_all_possible_values",
  function (req, res) {
    console.log("Getting table column possible value");
    console.log(req.body);
    get_one_table_one_column_all_possible_values(
      req.body["table_name"],
      req.body["column_name"]
    ).then((promisedRes) => res.send(promisedRes));
  }
);

// check foreigh key
app.post("/db/check_foreign_key", function (req, res) {
  console.log("Checking foreign key...");
  console.log(req.body);
  check_foreign_key(
    req.body["table_name"],
    req.body["foreign_key"],
    req.body["foreign_key_value"]
  ).then((promisedRes) => res.send(promisedRes));
});

// check AAb exist
app.post("/db/check_AAb_exist", function (req, res) {
  console.log("Checking AAb exist...");
  console.log(req.body);
  check_AAb_exist(req.body["case_id"]).then((promisedRes) =>
    res.send(promisedRes)
  );
});

// get all AAb_id by one case_id
app.post("/db/get_all_AAb_id", function (req, res) {
  console.log("Getting all AAb_id...");
  console.log(req.body);
  get_all_AAb_id(req.body["case_id"]).then((promisedRes) =>
    res.send(promisedRes)
  );
});

// get one AAb all column values
app.post("/db/get_one_AAb_all_column_values", function (req, res) {
  console.log("Getting AAb object case.");
  console.log(req.body);
  get_one_AAb_all_column_values(
    req.body["case_id"],
    req.body["AAb_id"],
    req.body["columns"]
  ).then((promisedRes) => res.send(promisedRes));
});

// create a new AAb
app.post("/db/create_AAb", function (req, res) {
  console.log("Creating new AAb...");
  console.log(req.body);
  create_AAb(req.body["columns"]).then((promisedRes) => res.send(promisedRes));
});

// check HLA exist
app.post("/db/check_HLA_exist", function (req, res) {
  console.log("Checking HLA exist...");
  console.log(req.body);
  check_HLA_exist(req.body["case_id"]).then((promisedRes) =>
    res.send(promisedRes)
  );
});

// get one HLA all column values
app.post("/db/get_one_HLA_all_column_values", function (req, res) {
  console.log("Getting HLA object case.");
  console.log(req.body);
  get_one_HLA_all_column_values(req.body["case_id"], req.body["columns"]).then(
    (promisedRes) => res.send(promisedRes)
  );
});

// create a new HLA
app.post("/db/create_HLA", function (req, res) {
  console.log("Creating new HLA...");
  console.log(req.body);
  create_HLA(req.body["columns"]).then((promisedRes) => res.send(promisedRes));
});

// check RNA exist
app.post("/db/check_RNA_exist", function (req, res) {
  console.log("Checking RNA exist...");
  console.log(req.body);
  check_RNA_exist(req.body["case_id"]).then((promisedRes) =>
    res.send(promisedRes)
  );
});

// get all RNA_id by one case_id
app.post("/db/get_all_RNA_id", function (req, res) {
  console.log("Getting all RNA_id...");
  console.log(req.body);
  get_all_RNA_id(req.body["case_id"]).then((promisedRes) =>
    res.send(promisedRes)
  );
});

// get one RNA all column values
app.post("/db/get_one_RNA_all_column_values", function (req, res) {
  console.log("Getting RNA object case.");
  console.log(req.body);
  get_one_RNA_all_column_values(
    req.body["case_id"],
    req.body["RNA_id"],
    req.body["columns"]
  ).then((promisedRes) => res.send(promisedRes));
});

// create a new RNA
app.post("/db/create_RNA", function (req, res) {
  console.log("Creating new RNA...");
  console.log(req.body);
  create_RNA(req.body["columns"]).then((promisedRes) => res.send(promisedRes));
});

// create a new sample
app.post("/db/create_sample", function (req, res) {
  console.log("Creating new sample...");
  console.log(req.body);
  create_sample(req.body["columns"]).then((promisedRes) =>
    res.send(promisedRes)
  );
});

// check sample exist
app.post("/db/check_sample_exist", function (req, res) {
  console.log("Checking sample exist...");
  console.log(req.body);
  check_sample_exist(req.body["case_id"]).then((promisedRes) =>
    res.send(promisedRes)
  );
});

// get all RNA_id by one case_id
app.post("/db/get_all_vial_id", function (req, res) {
  console.log("Getting all vial_id...");
  console.log(req.body);
  get_all_vial_id(req.body["case_id"]).then((promisedRes) =>
    res.send(promisedRes)
  );
});

// get one sample all column values
app.post("/db/get_one_sample_all_column_values", function (req, res) {
  console.log("Getting RNA object case.");
  console.log(req.body);
  get_one_sample_all_column_values(
    req.body["case_id"],
    req.body["vial_id"],
    req.body["columns"]
  ).then((promisedRes) => res.send(promisedRes));
});

// create dataset
app.post("/db/create_dataset", function (req, res) {
  console.log("creating new row in dataset...");
  console.log(req.body);
  create_dataset(req.body.datasetObj).then((promiseRes) =>
    res.send(promiseRes)
  );
});

// create dataset_case_identifier
app.post("/db/create_dataset_case_identifier", function (req, res) {
  console.log("creating new row in dataset_case_identifier...");
  console.log(req.body);
  create_dataset_case_identifier(req.body.datasetCaseIdentifierObjList).then(
    (promiseRes) => res.send(promiseRes)
  );
});

// create dataset_example_data_file
app.post("/db/create_dataset_example_data_file", function (req, res) {
  console.log("creating new row in dataset_example_data_file...");
  console.log(req.body);
  create_dataset_example_data_file(req.body.datasetExampleDataFileObj).then(
    (promiseRes) => res.send(promiseRes)
  );
});

// create_new_rows_into_table

// create dataset_example_data_file
app.post("/db/create_new_rows_into_table", function (req, res) {
  console.log(`creating new rows into the table ${req.body.table_name}`);
  console.log(req.body);
  create_new_rows_into_table(req.body.table_name, req.body.matrix).then(
    (promiseRes) => res.send(promiseRes)
  );
});

/****************************
 * Example put method *
 ****************************/

// test update db
app.put("/db/test_db", function (req, res) {
  console.log("Testing database connection...");
  testPoolForUpdate()
    .then(() => {
      console.log("Database connection is successful!");
      res.status(200).json({ Database_connection: true });
    })
    .catch(() => {
      console.log("Error: Database connection is failed!");
      res.status(500).json({ Database_connection: false });
    });
});

// Update cases
app.put("/db/update_case", function (req, res) {
  console.log("Updating case.");
  console.log(req.body);
  update_case(
    req.body["case_id"],
    req.body["update_columns"],
    req.body["update_values"]
  ).then((promisedRes) => res.send(promisedRes));
});

// Update AAb
app.put("/db/update_AAb", function (req, res) {
  console.log("Updating AAb.");
  console.log(req.body);
  update_AAb(req.body["columns"]).then((promisedRes) => res.send(promisedRes));
});

// Update HLA
app.put("/db/update_HLA", function (req, res) {
  console.log("Updating HLA.");
  console.log(req.body);
  update_HLA(req.body["columns"]).then((promisedRes) => res.send(promisedRes));
});

// Update RNA
app.put("/db/update_RNA", function (req, res) {
  console.log("Updating RNA.");
  console.log(req.body);
  update_RNA(req.body["columns"]).then((promisedRes) => res.send(promisedRes));
});

// Update sample
app.put("/db/update_sample", function (req, res) {
  console.log("Updating sample.");
  console.log(req.body);
  update_sample(req.body["columns"]).then((promisedRes) =>
    res.send(promisedRes)
  );
});

// Update dataset
app.put("/db/update_dataset", function (req, res) {
  console.log("Updating dataset.");
  console.log(req.body);
  update_dataset(req.body["dataset_id"], req.body["columns"]).then(
    (promisedRes) => res.send(promisedRes)
  );
});

// Update slices_raw_data
app.put("/db/update_slices_raw_data", function (req, res) {
  console.log("Updating slices_raw_data.");
  console.log(req.body);
  update_slices_raw_data(req.body["columns"]).then((promisedRes) =>
    res.send(promisedRes)
  );
});

// batch update table
app.put("/db/batch_update_table", function (req, res) {
  console.log("Updating multiple rows in a table...");
  console.log(req.body);
  batch_update_table(req.body["table_name"], req.body["matrix"]).then(
    (promiseRes) => res.send(promiseRes)
  );
});

// get dataset by conditions
app.put("/db/get_data_by_conditions", function (req, res) {
  console.log("getting dataset by conditions...");
  const table_name = req.body["table_name"];
  const conditions = req.body["conditions"];
  get_data_by_conditions(table_name, conditions).then((promoiseRes) =>
    res.send(promoiseRes)
  );
});

/****************************
 * Example delete method *
 ****************************/

// delete case
app.delete("/db/delete_case", function (req, res) {
  console.log("deleting cases.");
  delete_case(req.body["case_id"]).then((promisedRes) => res.send(promisedRes));
});

// delete sample
app.delete("/db/delete_sample", function (req, res) {
  console.log("deleting sample.");
  delete_sample(req.body["case_id"], req.body["vial_id"]).then((promisedRes) =>
    res.send(promisedRes)
  );
});

app.delete("/db/test_db", function (req, res) {
  console.log("Testing database connection...");
  testPoolForDelete()
    .then(() => {
      console.log("Database connection is successful!");
      res.status(200).json({ Database_connection: true });
    })
    .catch(() => {
      console.log("Error: Database connection is failed!");
      res.status(500).json({ Database_connection: false });
    });
});

/****************************
 * Start the app *
 ****************************/

app.listen(3000, function () {
  console.log("App started");
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;
