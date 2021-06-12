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
  testPool,
  get_cases,
  get_donor_types,
  get_cause_of_death,
  get_HLA,
} = require("./service/database");

// declare a new express app
var app = express();
app.use(bodyParser.json());
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
  testPool()
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

app.post("/item", function (req, res) {
  // Add your code here
  res.json({ success: "post call succeed!", url: req.url, body: req.body });
});

app.post("/item/*", function (req, res) {
  // Add your code here
  res.json({ success: "post call succeed!", url: req.url, body: req.body });
});

/****************************
 * Example put method *
 ****************************/

app.put("/item", function (req, res) {
  // Add your code here
  res.json({ success: "put call succeed!", url: req.url, body: req.body });
});

app.put("/item/*", function (req, res) {
  // Add your code here
  res.json({ success: "put call succeed!", url: req.url, body: req.body });
});

/****************************
 * Example delete method *
 ****************************/

app.delete("/item", function (req, res) {
  // Add your code here
  res.json({ success: "delete call succeed!", url: req.url });
});

app.delete("/item/*", function (req, res) {
  // Add your code here
  res.json({ success: "delete call succeed!", url: req.url });
});

app.listen(3000, function () {
  console.log("App started");
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;
