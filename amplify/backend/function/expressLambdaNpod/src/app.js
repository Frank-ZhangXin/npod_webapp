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
  get_donor_types,
  get_cause_of_death,
  get_HLA,
} = require("./service/readDatabase");

var {
  testPoolForCreate,
  create_case,
  get_test_case,
  get_object_case,
  get_case_column,
  get_table_column,
  check_foreign_key,
} = require("./service/createDatabase");

var { testPoolForUpdate, update_case } = require("./service/updateDatabase");

var { testPoolForDelete, delete_case } = require("./service/deleteDatabase");

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
    success: `db_host: ${process.env.DB_HOST}, db_user: ${process.env.DB_USER}, db_password: ${process.env.DB_PASS}, db_name: ${process.env.DB_NAME}`,
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
  get_cases().then((promisedRes) => res.send(promisedRes));
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

/****************************
 * Example post method *
 ****************************/
// test db credential
app.post("/db/debug_db", function (req, res) {
  res.json({
    success: `write_db_host: ${process.env.WRITE_DB_HOST}, write_db_user: ${process.env.WRITE_DB_USER}, write_db_password: ${process.env.WRITE_DB_PASS}, write_db_name: ${process.env.WRITE_DB_NAME}`,
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

// get object case
app.post("/db/get_object_case", function (req, res) {
  console.log("Getting object case.");
  console.log(req.body);
  get_object_case(req.body["case_id"]).then((promisedRes) =>
    res.send(promisedRes)
  );
});

// get object case column
app.post("/db/get_object_case_column", function (req, res) {
  console.log("Getting object case.");
  console.log(req.body);
  get_case_column(req.body["case_id"], req.body["columns"]).then(
    (promisedRes) => res.send(promisedRes)
  );
});

// get table column
app.post("/db/get_table_column", function (req, res) {
  console.log("Getting table column.");
  console.log(req.body);
  get_table_column(
    req.body["table_name"],
    req.body["column_name"],
    req.body["sort_by"]
  ).then((promisedRes) => res.send(promisedRes));
});

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

/****************************
 * Example put method *
 ****************************/

app.put("/db/update_case", function (req, res) {
  // Add your code here
  console.log("Updating case.");
  console.log(req.body);
  update_case(
    req.body["case_id"],
    req.body["update_columns"],
    req.body["update_values"]
  ).then((promisedRes) => res.send(promisedRes));
});

app.put("/db/test_db", function (req, res) {
  // Add your code here
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

/****************************
 * Example delete method *
 ****************************/

app.delete("/db/delete_case", function (req, res) {
  console.log("deleting cases.");
  delete_case(req.body["case_id"]).then((promisedRes) => res.send(promisedRes));
});

app.delete("/db/test_db", function (req, res) {
  // Add your code here
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
