import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridBox from "./component/GridBox";
import useDebounced from "./component/useDebounced";
import useRetrieveTableColumn from "./component/useRetrieveTableColumn";
import useRetrieveCaseColumns from "./component/useRetrieveCaseColumns";
import useRetrieveTableColumnPossibleValue from "./component/useRetrieveTableColumnPossibleValue";
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
    "admission_course",
    "clinical_history",
    "stage_kidney_disease",
    "cause_of_death_id",
    "death_mechanism",
    "death_circumstance",
    "meds_diabetes",
    "meds_home",
    "meds_hospital",
    "allergies",
    "alcohol_use",
    "drug_use",
  ];
  const tempOps = useRetrieveTableColumnPossibleValue(
    "cases",
    "stage_kidney_disease"
  );

  const stageOps = opsGenerator(tempOps, tempOps);

  const cod_id = useRetrieveTableColumn(
    "cause_of_death",
    "cause_of_death_id",
    "description"
  );
  const cod_name = useRetrieveTableColumn(
    "cause_of_death",
    "description",
    "description"
  );
  const codOps = opsGenerator(cod_id, cod_name);

  const columnPropsList = [
    {
      column: "admission_course",
      input: "inputBoxLarge",
      restrict: { type: "string", range: [] },
      valid: useState(true),
      ops: [],
    },
    {
      column: "clinical_history",
      input: "inputBoxLarge",
      restrict: { type: "string", range: [] },
      valid: useState(true),
      ops: [],
    },
    {
      column: "stage_kidney_disease",
      input: "dropDown",
      restrict: { type: "string", range: [] },
      valid: useState(true),
      ops: stageOps,
    },
    {
      colum: "cause_of_death_id",
      input: "dropDown",
      restrict: { type: "string", range: [] },
      valid: useState(true),
      ops: codOps,
    },
    {
      colum: "death_mechanism",
      input: "inputBox",
      restrict: { type: "string", range: [] },
      valid: useState(true),
      ops: [],
    },
    {
      colum: "death_circumstance",
      input: "inputBox",
      restrict: { type: "string", range: [] },
      valid: useState(true),
      ops: [],
    },
    {
      colum: "meds_diabetes",
      input: "inputBoxLarge",
      restrict: { type: "string", range: [] },
      valid: useState(true),
      ops: [],
    },
    {
      colum: "meds_home",
      input: "inputBoxLarge",
      restrict: { type: "string", range: [] },
      valid: useState(true),
      ops: [],
    },
    {
      colum: "meds_hospital",
      input: "inputBoxLarge",
      restrict: { type: "string", range: [] },
      valid: useState(true),
      ops: [],
    },
    {
      colum: "allergies",
      input: "inputBoxLarge",
      restrict: { type: "string", range: [] },
      valid: useState(true),
      ops: [],
    },
    {
      colum: "alcohol_use",
      input: "inputBoxLarge",
      restrict: { type: "string", range: [] },
      valid: useState(true),
      ops: [],
    },
    {
      colum: "drug_use",
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

  const nameList = [
    "Admission Course",
    "Clinical History",
    "Stage Kidney Disease",
    "Cause of Death",
    "Death Mechanism",
    "Death Circumstance",
    "Meds Diabetes",
    "Meds Home",
    "Meds Hospital",
    "Allergies",
    "Alcohol Use",
    "Drug Use",
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
          {/* <div>
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
          </div> */}
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
