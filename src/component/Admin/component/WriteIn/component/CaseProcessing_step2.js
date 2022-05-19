import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridBox from "./component/GridBox";
import useDebounced from "./component/useDebounced";
import useRetrieveCaseColumns from "./component/useRetrieveCaseColumns";
import useUpdateCase from "./component/useUpdateCase";
import Alert from "@material-ui/lab/Alert";
import Fade from "@material-ui/core/Fade";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
  alert: {
    marginTop: "5px",
    marginBottom: "5px",
    width: "90%",
  },
  alert2: {
    marginTop: "4px",
    marginBottom: "3px",
  },
  title: {
    margin: theme.spacing(1, 0, 2),
    paddingTop: "3px",
    paddingBottom: "3px",
    backgroundColor: "#d9d9d9",
  },
  titleText: {
    paddingLeft: "10px",
  },
}));

export default function CaseProcessing_step2({
  caseId,
  update,
  changed,
  setAccept,
  setChanged,
}) {
  const classes = useStyles();

  const columnList = [
    "slices_shipping_status",
    "islet_isolation_status",
    "HANDEL_status",
    "processing_start_date",
    "processing_start_time",
    "processing_end_date",
    "processing_end_time",
    "pancreas_intact_status",
    "pancreas_weight_grams",
    "pancreas_head_grams",
    "pancreas_body_grams",
    "pancreas_tail_grams",
    "pancreas_weight_comments",
    "kidney_intact_status",
    "kidney_left_or_right",
    "kidney_weight_grams",
    "kidney_grossing_comments",
    "case_processing_info",
    "slices_processing_notes",
  ];
  const columnPropsList = [
    {
      column: "slices_shipping_status",
      input: "dropDown",
      restrict: { type: "string", range: [] },
      valid: useState(true),
      ops: [
        { value: "Yes", label: "Yes" },
        { value: "No", label: "No" },
        { value: null, label: "NULL" },
      ],
    },
    {
      column: "islet_isolation_status",
      input: "dropDown",
      restrict: { type: "string", range: [] },
      valid: useState(true),
      ops: [
        { value: "Yes", label: "Yes" },
        { value: "No", label: "No" },
        { value: null, label: "NULL" },
      ],
    },
    {
      column: "HANDEL_status",
      input: "dropDown",
      restrict: { type: "string", range: [] },
      valid: useState(true),
      ops: [
        { value: "HANDEL-P", label: "HANDEL-P" },
        { value: "HANDEL-P/I", label: "HANDEL-P/I" },
        { value: "HANDEL-I", label: "HANDEL-I" },
        { value: "No", label: "No" },
        { value: null, label: "NULL" },
      ],
    },
    {
      colum: "processing_start_date",
      input: "datePicker",
      restrict: { type: "string", range: [] },
      valid: useState(true),
      ops: [],
    },
    {
      colum: "processing_start_time",
      input: "timePicker",
      restrict: { type: "string", range: [] },
      valid: useState(true),
      ops: [],
    },
    {
      colum: "processing_end_date",
      input: "datePicker",
      restrict: { type: "string", range: [] },
      valid: useState(true),
      ops: [],
    },
    {
      colum: "processing_end_time",
      input: "timePicker",
      restrict: { type: "string", range: [] },
      valid: useState(true),
      ops: [],
    },
    {
      colum: "pancreas_intact_status",
      input: "dropDown",
      restrict: { type: "string", range: [] },
      valid: useState(true),
      ops: [
        { value: "Yes", label: "Yes" },
        { value: "No", label: "No" },
        { value: null, label: "NULL" },
      ],
    },
    {
      colum: "pancreas_weight_grams",
      input: "floatBox",
      restrict: { type: "float", range: [0, 250] },

      valid: useState(true),
      ops: [],
    },
    {
      colum: "pancreas_head_grams",
      input: "floatBox",
      restrict: { type: "float", range: [0, 120] },

      valid: useState(true),
      ops: [],
    },
    {
      colum: "pancreas_body_grams",
      input: "floatBox",
      restrict: { type: "float", range: [0, 120] },

      valid: useState(true),
      ops: [],
    },
    {
      colum: "pancreas_tail_grams",
      input: "floatBox",
      restrict: { type: "float", range: [0, 120] },

      valid: useState(true),
      ops: [],
    },
    {
      colum: "pancreas_weight_comments",
      input: "inputBoxLarge",
      restrict: { type: "string", range: [] },
      valid: useState(true),
      ops: [],
    },
    {
      colum: "kidney_intact_status",
      input: "dropDown",
      restrict: { type: "string", range: [] },
      valid: useState(true),
      ops: [
        { value: "true", label: "true" },
        { value: "false", label: "false" },
        { value: null, label: "NULL" },
      ],
    },
    {
      colum: "kidney_left_or_right",
      input: "dropDown",
      restrict: { type: "string", range: [] },
      valid: useState(true),
      ops: [
        { value: "left", label: "left" },
        { value: "right", label: "right" },
        { value: null, label: "NULL" },
      ],
    },
    {
      colum: "kidney_weight_grams",
      input: "floatBox",
      restrict: { type: "float", range: [0, 350] },

      valid: useState(true),
      ops: [],
    },
    {
      colum: "kidney_grossing_comments",
      input: "inputBoxLarge",
      restrict: { type: "string", range: [] },
      valid: useState(true),
      ops: [],
    },
    {
      colum: "case_processing_info",
      input: "inputBoxLarge",
      restrict: { type: "string", range: [] },
      valid: useState(true),
      ops: [],
    },
    {
      colum: "slices_processing_notes",
      input: "inputBoxLarge",
      restrict: { type: "string", range: [] },
      valid: useState(true),
      ops: [],
    },
  ];
  const defaultValue = useRetrieveCaseColumns(caseId, columnList);
  useEffect(() => {
    for (let i = 0; i < setValueList.length; i++) {
      setValueList[i](defaultValue[i]);
    }
  }, [defaultValue]);

  const [value0, setValue0] = useDebounced(defaultValue[0], 800);
  const [value1, setValue1] = useDebounced(defaultValue[0], 800);
  const [value2, setValue2] = useDebounced(defaultValue[0], 800);
  const [value3, setValue3] = useDebounced(defaultValue[3], 800);
  const [value4, setValue4] = useDebounced(defaultValue[4], 800);
  const [value5, setValue5] = useDebounced(defaultValue[5], 800);
  const [value6, setValue6] = useDebounced(defaultValue[6], 800);
  const [value7, setValue7] = useDebounced(defaultValue[7], 800);
  const [value8, setValue8] = useDebounced(defaultValue[8], 800);
  const [value9, setValue9] = useDebounced(defaultValue[9], 800);
  const [value10, setValue10] = useDebounced(defaultValue[10], 800);
  const [value11, setValue11] = useDebounced(defaultValue[11], 800);
  const [value12, setValue12] = useDebounced(defaultValue[12], 800);
  const [value13, setValue13] = useDebounced(defaultValue[13], 800);
  const [value14, setValue14] = useDebounced(defaultValue[14], 800);
  const [value15, setValue15] = useDebounced(defaultValue[15], 800);
  const [value16, setValue16] = useDebounced(defaultValue[16], 800);
  const [value17, setValue17] = useDebounced(defaultValue[17], 800);
  const [value18, setValue18] = useDebounced(defaultValue[18], 800);
  const nameList = [
    "Slices",
    "Islet Isolation Status",
    "HANDEL Status",
    "Processing Start Date",
    "Processing Start Time",
    "Processing End Date",
    "Processing End Time",
    "Pancreas Intact Status",
    "Pancreas Weight Grams",
    "Pancreas Head Grams",
    "Pancreas Body Grams",
    "Pancreas Tail Grams",
    "Pancreas Weight Comments",
    "Kidney Intact Status",
    "Kidney Left Or Right",
    "Kidney Weight Grams",
    "Kidney Grossing Comments",
    "Case Processing Info",
    "Slices Processing Notes",
  ];
  const valueList = [
    value0,
    value1,
    value2,
    value3,
    value4,
    value5,
    value6,
    value7,
    value8,
    value9,
    value10,
    value11,
    value12,
    value13,
    value14,
    value15,
    value16,
    value17,
    value18,
  ];
  const setValueList = [
    setValue0,
    setValue1,
    setValue2,
    setValue3,
    setValue4,
    setValue5,
    setValue6,
    setValue7,
    setValue8,
    setValue9,
    setValue10,
    setValue11,
    setValue12,
    setValue13,
    setValue14,
    setValue15,
    setValue16,
    setValue17,
    setValue18,
  ];

  useEffect(() => {
    if (update && !showError && showSuccess) {
      setAccept(true);
    } else {
      setAccept(false);
    }
  }, [update]);

  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [msg, setMsg] = useState("Default message.");

  const updateResult = useUpdateCase(
    caseId,
    update,
    changed,
    setAccept,
    columnList,
    valueList,
    setShowError,
    setShowSuccess,
    setMsg
  );

  useEffect(() => {
    if (showError) {
      setShowError(true);
      const timer = setTimeout(() => {
        setShowError(false);
      }, 5000);
    } else if (showSuccess) {
      setShowSuccess(true);
      const timer = setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    }
  }, [showError, showSuccess]);

  return (
    <div className={classes.root}>
      <div className={classes.title}>
        <Typography variant="h6" component="h6" className={classes.titleText}>
          CASE ID: {caseId}
        </Typography>
      </div>
      <form noValidate>
        <div>
          <div>
            <GridBox
              columnPropsList={columnPropsList.slice(0, 3)}
              nameList={nameList.slice(0, 3)}
              valueList={defaultValue.slice(0, 3)}
              setValueList={setValueList.slice(0, 3)}
              setChanged={setChanged}
            />
          </div>
          <div>
            <GridBox
              columnPropsList={columnPropsList.slice(3, 6)}
              nameList={nameList.slice(3, 6)}
              valueList={defaultValue.slice(3, 6)}
              setValueList={setValueList.slice(3, 6)}
              setChanged={setChanged}
            />
          </div>
          <div>
            <GridBox
              columnPropsList={columnPropsList.slice(6, 9)}
              nameList={nameList.slice(6, 9)}
              valueList={defaultValue.slice(6, 9)}
              setValueList={setValueList.slice(6, 9)}
              setChanged={setChanged}
            />
          </div>
          <div>
            <GridBox
              columnPropsList={columnPropsList.slice(9, 12)}
              nameList={nameList.slice(9, 12)}
              valueList={defaultValue.slice(9, 12)}
              setValueList={setValueList.slice(9, 12)}
              setChanged={setChanged}
            />
          </div>
          <div>
            <GridBox
              columnPropsList={columnPropsList.slice(12, 15)}
              nameList={nameList.slice(12, 15)}
              valueList={defaultValue.slice(12, 15)}
              setValueList={setValueList.slice(12, 15)}
              setChanged={setChanged}
            />
          </div>
          <div>
            <GridBox
              columnPropsList={columnPropsList.slice(15, 18)}
              nameList={nameList.slice(15, 18)}
              valueList={defaultValue.slice(15, 18)}
              setValueList={setValueList.slice(15, 18)}
              setChanged={setChanged}
            />
          </div>
          <div>
            <GridBox
              columnPropsList={columnPropsList.slice(18, 21)}
              nameList={nameList.slice(18, 21)}
              valueList={defaultValue.slice(18, 21)}
              setValueList={setValueList.slice(18, 21)}
              setChanged={setChanged}
            />
          </div>
        </div>
      </form>
      {changed ? (
        <Alert severity="warning" className={classes.alert2}>
          You have unsaved changes. Click 'Update' to save them, otherwise they
          will be lost.
        </Alert>
      ) : null}
      <Fade in={showError || showSuccess}>
        <Alert
          variant="filled"
          severity={showError && !showSuccess ? "error" : "success"}
          className={classes.alert}
        >
          {msg}
        </Alert>
      </Fade>
    </div>
  );
}
