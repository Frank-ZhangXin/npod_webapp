import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridBox from "./component/GridBox";
import useDebounced from "./component/useDebounced";
import useRetrieveCaseColumns from "./component/useRetrieveCaseColumns";
import useRetrieveTableColumnPossibleValue from "./component/useRetrieveTableColumnPossibleValue";
import useUpdate from "./component/useUpdate";
import Alert from "@material-ui/lab/Alert";
import Fade from "@material-ui/core/Fade";

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
}));

function opsGenerator(idArr, nameArr) {
  const ops = [];
  for (let i = 0; i < idArr.length; i++) {
    ops.push({ value: idArr[i], label: nameArr[i] });
  }
  ops.push({ value: null, label: "NULL" });
  return ops;
}

export default function CaseProcessing_step2({
  caseId,
  update,
  changed,
  setAccept,
  setChanged,
}) {
  const classes = useStyles();

  const columnList = [
    "age_years",
    "gestational_age_weeks",
    "diabetes_hx_years",
    "sex",
    "race_ethnicity",
    "height_cm",
    "weight_kg",
    "BMI",
    "BMI_percentile",
    "downtime_minutes",
    "admission_date",
    "admission_time",
    "death_date",
    "death_time",
    "cross_clamp_date",
    "cross_clamp_time",
  ];
  const tempOps = useRetrieveTableColumnPossibleValue(
    "cases",
    "race_ethnicity"
  );

  const raceOps = opsGenerator(tempOps, tempOps);

  const columnPropsList = [
    {
      column: "age_years",
      input: "floatBox",
      restrict: { type: "float", range: [0, 100] },
      valid: useState(true),
      ops: [],
    },
    {
      column: "gestational_age_weeks",
      input: "floatBox",
      restrict: { type: "float", range: [0, 40] },
      valid: useState(true),
      ops: [],
    },
    {
      column: "diabetes_hx_years",
      input: "floatBox",
      restrict: { type: "float", range: [0, 100] },
      valid: useState(true),
      ops: [],
    },
    {
      colum: "sex",
      input: "dropDown",
      restrict: { type: "string", range: [] },
      valid: useState(true),
      ops: [
        { value: "Male", label: "Male" },
        { value: "Female", label: "Female" },
        { value: null, label: "NULL" },
      ],
    },
    {
      colum: "race_ethnicity",
      input: "dropDown",
      restrict: { type: "string", range: [] },
      valid: useState(true),
      ops: raceOps,
    },
    {
      colum: "height_cm",
      input: "floatBox",
      restrict: { type: "float", range: [0, 200] },
      valid: useState(true),
      ops: [],
    },
    {
      colum: "weight_kg",
      input: "floatBox",
      restrict: { type: "float", range: [0, 200] },
      valid: useState(true),
      ops: [],
    },
    {
      colum: "BMI",
      input: "floatBox",
      restrict: { type: "float", range: [0, 55] },
      valid: useState(true),
      ops: [],
    },
    {
      colum: "BMI_percentile",
      input: "floatBox",
      restrict: { type: "float", range: [0, 99] },
      valid: useState(true),
      ops: [],
    },
    {
      colum: "downtime_minutes",
      input: "integerBox",
      restrict: { type: "int", range: [0, 240] },
      valid: useState(true),
      ops: [],
    },
    {
      colum: "admission_date",
      input: "datePicker",
      restrict: { type: "string", range: [] },
      valid: useState(true),
      ops: [],
    },
    {
      colum: "admission_time",
      input: "timePicker",
      restrict: { type: "string", range: [] },
      valid: useState(true),
      ops: [],
    },
    {
      colum: "death_date",
      input: "datePicker",
      restrict: { type: "string", range: [] },
      valid: useState(true),
      ops: [],
    },
    {
      colum: "death_time",
      input: "timePicker",
      restrict: { type: "string", range: [] },
      valid: useState(true),
      ops: [],
    },
    {
      colum: "cross_clamp_date",
      input: "datePicker",
      restrict: { type: "string", range: [] },
      valid: useState(true),
      ops: [],
    },
    {
      colum: "cross_clamp_time",
      input: "timePicker",
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
  const nameList = [
    "Age Years",
    "Gestational Age Weeks",
    "Diabetes History Years",
    "Sex",
    "Race/Ethnicity",
    "Height cm",
    "Weight kg",
    "BMI",
    "BMI Percentile",
    "Downtime min",
    "Admission Date",
    "Admission Time",
    "Death Date",
    "Death Time",
    "Cross Clamp Date",
    "Cross Clamp Time",
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

  const updateResult = useUpdate(
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
          {/* <div>
            <GridBox
              columnPropsList={columnPropsList.slice(18, 21)}
              nameList={nameList.slice(18, 21)}
              valueList={defaultValue.slice(18, 21)}
              setValueList={setValueList.slice(18, 21)}
              setChanged={setChanged}
            />
          </div> */}
        </div>
      </form>
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
