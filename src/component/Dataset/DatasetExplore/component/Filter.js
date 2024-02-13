import React, { useState, useEffect } from "react";
import {
  Container,
  FormControlLabel,
  Box,
  Checkbox,
  FormControl,
  FormLabel,
  FormGroup,
  Chip,
  Autocomplete,
  TextField,
  Typography,
} from "@mui/material";

export default function Filter() {
  const url = new URL(window.location.href);
  const searchParameters = new URLSearchParams(url.search);

  const baseUrl = url.origin + url.pathname;

  const setFilterValue = (params, filterName) => {
    for (const [name, value] of params.entries()) {
      const optList = JSON.parse(value);
      const selectedObj = optList.reduce((obj, item) => {
        obj[item] = true;
        return obj;
      }, {});
      if (name === filterName) {
        return selectedObj;
      }
    }
    return {};
  };

  const type = setFilterValue(searchParameters, "type");
  const category = setFilterValue(searchParameters, "category");
  const published = setFilterValue(searchParameters, "published");

  const generateQueryParameters = (typeObj, categoryObj, publishedObj) => {
    let qp = "";
    let typeQuery = "[";
    for (const [name, value] of Object.entries(typeObj)) {
      if (value) {
        if (typeQuery.length > 1) {
          typeQuery = typeQuery + ",";
        }
        typeQuery = typeQuery + '"' + name + '"';
      }
    }
    typeQuery = "type=" + typeQuery + "]";

    let categoryQuery = "[";
    for (const [name, value] of Object.entries(categoryObj)) {
      if (value) {
        if (categoryQuery.length > 1) {
          categoryQuery = categoryQuery + ",";
        }
        categoryQuery = categoryQuery + '"' + name + '"';
      }
    }
    categoryQuery = "category=" + categoryQuery + "]";

    let publishedQuery = "[";
    for (const [name, value] of Object.entries(publishedObj)) {
      if (value) {
        if (publishedQuery.length > 1) {
          publishedQuery = publishedQuery + ",";
        }
        publishedQuery = publishedQuery + '"' + name + '"';
      }
    }
    publishedQuery = "published=" + publishedQuery + "]";

    qp = typeQuery + "&" + categoryQuery + "&" + publishedQuery;
    return qp;
  };

  // Type filter

  const handleTypeChange = (event) => {
    let newType = { ...type };
    newType[event.target.name] = event.target.checked;
    let newQueryParameters = generateQueryParameters(
      newType,
      category,
      published
    );
    console.log("new query params", newQueryParameters);
    window.location.href = url.pathname + "?" + newQueryParameters;
  };

  // Category filter

  const handleCategoryChange = (event) => {
    let newCategory = { ...category };
    newCategory[event.target.name] = event.target.checked;
    let newQueryParameters = generateQueryParameters(
      type,
      newCategory,
      published
    );
    console.log("new query params", newQueryParameters);
    window.location.href = url.pathname + "?" + newQueryParameters;
  };

  // Published filter
  const handlePublishedChange = (event) => {
    let newPublished = { ...published };
    newPublished[event.target.name] = event.target.checked;
    let newQueryParameters = generateQueryParameters(
      type,
      category,
      newPublished
    );
    console.log("new query params", newQueryParameters);
    window.location.href = url.pathname + "?" + newQueryParameters;
  };

  // Case ID filter
  const [caseId, setCaseId] = useState([]);
  const handleCaseIdChange = (event) => {
    console.log("event name", event.name);
    console.log("event target value", event.target.value);
  };

  useEffect(() => {
    if (searchParameters.toString() === "") {
      const initType = {
        genetics: true,
        transcriptomics: true,
        proteomics: true,
        metabolomics: true,
        other: true,
      };

      const initCategory = {
        investigator: true,
        npod: true,
      };

      const initPublished = {
        yes: true,
        no: true,
      };

      const initQueryParameters = generateQueryParameters(
        initType,
        initCategory,
        initPublished
      );
      console.log("init parameters", initQueryParameters);
      window.location.href = url.pathname + "?" + initQueryParameters;
    }
  }, []);

  const usageSubFilter = (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      {/* ------Type filter------ */}
      <FormControl sx={{ m: 3 }}>
        <FormLabel>Type</FormLabel>
        <FormGroup sx={{ ml: 2 }}>
          <FormControlLabel
            label="Genetics"
            control={
              <Checkbox
                checked={"genetics" in type ? type.genetics : false}
                onChange={handleTypeChange}
                name="genetics"
              />
            }
          />
          <FormControlLabel
            label="Transcriptomics"
            control={
              <Checkbox
                checked={
                  "transcriptomics" in type ? type.transcriptomics : false
                }
                onChange={handleTypeChange}
                name="transcriptomics"
              />
            }
          />
          <FormControlLabel
            label="Proteomics"
            control={
              <Checkbox
                checked={"proteomics" in type ? type.proteomics : false}
                onChange={handleTypeChange}
                name="proteomics"
              />
            }
          />
          <FormControlLabel
            label="Metabolomics"
            control={
              <Checkbox
                checked={"metabolomics" in type ? type.metabolomics : false}
                onChange={handleTypeChange}
                name="metabolomics"
              />
            }
          />
          <FormControlLabel
            label="Other"
            control={
              <Checkbox
                checked={"other" in type ? type.other : false}
                onChange={handleTypeChange}
                name="other"
              />
            }
          />
        </FormGroup>
      </FormControl>
      {/* ------Category filter------ */}
      <FormControl sx={{ m: 3 }}>
        <FormLabel>Category</FormLabel>
        <FormGroup sx={{ ml: 2 }}>
          <FormControlLabel
            label="Investigator"
            control={
              <Checkbox
                checked={
                  "investigator" in category ? category.investigator : false
                }
                onChange={handleCategoryChange}
                name="investigator"
              />
            }
          />
          <FormControlLabel
            label="nPOD"
            control={
              <Checkbox
                checked={"npod" in category ? category.npod : false}
                onChange={handleCategoryChange}
                name="npod"
              />
            }
          />
        </FormGroup>
      </FormControl>
      {/* ------Published filter------ */}
      <FormControl sx={{ m: 3 }}>
        <FormLabel>Published</FormLabel>
        <FormGroup sx={{ ml: 2 }}>
          <FormControlLabel
            label="Yes"
            control={
              <Checkbox
                checked={"yes" in published ? published.yes : false}
                onChange={handlePublishedChange}
                name="yes"
              />
            }
          />
          <FormControlLabel
            label="No"
            control={
              <Checkbox
                checked={"no" in published ? published.no : false}
                onChange={handlePublishedChange}
                name="no"
              />
            }
          />
        </FormGroup>
      </FormControl>
      {/* ------Case ID filter------ */}
      {/* <FormControl sx={{ m: 3 }}>
        <FormLabel>Case ID</FormLabel>
        <Autocomplete
          sx={{ paddingLeft: 2 }}
          multiple
          id="case-id-filter"
          options={[
            { name: 6110 },
            { name: 6111 },
            { name: 6112 },
            { name: 6113 },
          ]}
          getOptionLabel={(option) => option.name}
          // defaultValue={[caseIdOptions[0]]}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              label="Specify Case ID"
              placeholder="Select or type Case ID"
            />
          )}
        />
      </FormControl> */}
    </Box>
  );

  return <Container maxWidth="md">{usageSubFilter}</Container>;
}
