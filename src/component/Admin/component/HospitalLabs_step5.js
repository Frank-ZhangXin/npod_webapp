import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridBox from "./component/GridBox";
import useDebounced from "./component/useDebounced";
import useRetrieveTableColumn from "./component/useRetrieveTableColumn";
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
    "ABO_blood_type",
    "admission_glucose_mg_dL",
    "admission_glucose_date",
    "admission_glucose_time",
    "peak_glucose_mg_dL",
    "admission_amylase",
    "admission_amylase_date",
    "admission_amylase_time",
    "peak_amylase",
    "admission_lipase",
    "admission_lipase_date",
    "admission_lipase_time",
    "peak_lipase",
    "admission_ABG_pH",
    "admission_ABG_pH_date",
    "admission_ABG_pH_time",
    "admission_ABG_HCO3",
    "admission_ABG_HCO3_date",
    "admission_ABG_HCO3_time",
    "HbA1c_percent",
    "HbA1c_date",
    "HbA1c_time",
    "infections",
    "hemodiluted_status",
    "serologies",
    "SARS_COV_2_results",
    "case_notes",
  ];
  const tempOps = useRetrieveTableColumnPossibleValue(
    "cases",
    "ABO_blood_type"
  );

  const aboOps = opsGenerator(tempOps, tempOps);

  const cod_id = useRetrieveTableColumn(
    "cause_of_death",
    "cause_of_death_id",
    "cause_of_death_id"
  );
  const cod_name = useRetrieveTableColumn(
    "cause_of_death",
    "description",
    "cause_of_death_id"
  );
  const codOps = opsGenerator(cod_id, cod_name);

  const columnPropsList = [
    {
      column: "ABO_blood_type",
      input: "dropDown",
      restrict: { type: "string", range: [] },
      valid: useState(true),
      ops: aboOps,
    },
    {
      column: "admission_glucose_mg_dL",
      input: "integerBox",
      restrict: { type: "string", range: [0, 1800] },
      valid: useState(true),
      ops: [],
    },
    {
      column: "admission_glucose_date",
      input: "datePicker",
      restrict: { type: "string", range: [] },
      valid: useState(true),
      ops: [],
    },
    {
      colum: "admission_glucose_time",
      input: "timePicker",
      restrict: { type: "string", range: [] },
      valid: useState(true),
      ops: [],
    },
    {
      colum: "peak_glucose_mg_dL",
      input: "integerBox",
      restrict: { type: "string", range: [0, 1800] },
      valid: useState(true),
      ops: [],
    },
    {
      colum: "admission_amylase",
      input: "integerBox",
      restrict: { type: "string", range: [0, 2500] },
      valid: useState(true),
      ops: [],
    },
    {
      colum: "admission_amylase_date",
      input: "datePicker",
      restrict: { type: "string", range: [] },
      valid: useState(true),
      ops: [],
    },
    {
      colum: "admission_amylase_time",
      input: "timePicker",
      restrict: { type: "string", range: [] },
      valid: useState(true),
      ops: [],
    },
    {
      colum: "peak_amylase",
      input: "integerBox",
      restrict: { type: "string", range: [0, 2500] },
      valid: useState(true),
      ops: [],
    },
    {
      colum: "admission_lipase",
      input: "integerBox",
      restrict: { type: "string", range: [0, 2500] },
      valid: useState(true),
      ops: [],
    },
    {
      colum: "admission_lipase_date",
      input: "datePicker",
      restrict: { type: "string", range: [] },
      valid: useState(true),
      ops: [],
    },
    {
      colum: "admission_lipase_time",
      input: "timePicker",
      restrict: { type: "string", range: [] },
      valid: useState(true),
      ops: [],
    },
    {
      colum: "peak_lipase",
      input: "integerBox",
      restrict: { type: "string", range: [0, 2500] },
      valid: useState(true),
      ops: [],
    },
    {
      colum: "admission_ABG_pH",
      input: "floatBox",
      restrict: { type: "float", range: [7, 7.7] },
      valid: useState(true),
      ops: [],
    },
    {
      colum: "admission_ABG_pH_date",
      input: "datePicker",
      restrict: { type: "string", range: [] },
      valid: useState(true),
      ops: [],
    },
    {
      colum: "admission_ABG_pH_time",
      input: "timePicker",
      restrict: { type: "string", range: [] },
      valid: useState(true),
      ops: [],
    },
    {
      colum: "admission_ABG_HCO3",
      input: "floatBox",
      restrict: { type: "float", range: [10, 35] },
      valid: useState(true),
      ops: [],
    },
    {
      colum: "admission_ABG_HCO3_date",
      input: "datePicker",
      restrict: { type: "string", range: [] },
      valid: useState(true),
      ops: [],
    },
    {
      colum: "admission_ABG_HCO3_time",
      input: "timePicker",
      restrict: { type: "string", range: [] },
      valid: useState(true),
      ops: [],
    },
    {
      colum: "HbA1c_percent",
      input: "floatBox",
      restrict: { type: "float", range: [2, 20] },
      valid: useState(true),
      ops: [],
    },
    {
      colum: "HbA1c_date",
      input: "datePicker",
      restrict: { type: "string", range: [] },
      valid: useState(true),
      ops: [],
    },
    {
      colum: "HbA1c_time",
      input: "timePicker",
      restrict: { type: "string", range: [] },
      valid: useState(true),
      ops: [],
    },
    {
      colum: "infections",
      input: "inputBoxLarge",
      restrict: { type: "string", range: [] },
      valid: useState(true),
      ops: [],
    },
    {
      colum: "hemodiluted_status",
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
      colum: "serologies",
      input: "inputBox",
      restrict: { type: "string", range: [] },
      valid: useState(true),
      ops: [],
    },
    {
      colum: "SARS_COV_2_results",
      input: "inputBoxLarge",
      restrict: { type: "string", range: [] },
      valid: useState(true),
      ops: [],
    },
    {
      colum: "case_notes",
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
  const [value19, setValue19] = useDebounced(defaultValue[19], 800);
  const [value20, setValue20] = useDebounced(defaultValue[20], 800);
  const [value21, setValue21] = useDebounced(defaultValue[21], 800);
  const [value22, setValue22] = useDebounced(defaultValue[22], 800);
  const [value23, setValue23] = useDebounced(defaultValue[23], 800);
  const [value24, setValue24] = useDebounced(defaultValue[24], 800);
  const [value25, setValue25] = useDebounced(defaultValue[25], 800);
  const [value26, setValue26] = useDebounced(defaultValue[26], 800);

  const nameList = [
    "ABO Blood Type",
    "Admission Glucose mg/dL",
    "Admission Glucose Date",
    "Admission Glucose Time",
    "Peak Glucose mg/dL",
    "Admission Amylase",
    "Admission Amylase Date",
    "Admission Amylase Time",
    "Peak Amylase",
    "Admission Lipase",
    "Admission Lipase Date",
    "Admission Lipase Time",
    "Peak Lipase",
    "Admission ABG pH",
    "Admission ABG pH Date",
    "Admission ABG pH Time",
    "Admission ABG HCO3",
    "Admission ABG HCO3 Date",
    "Admission ABG HCO3 Time",
    "HbA1c Percent",
    "HbA1c Date",
    "HbA1c Time",
    "Infections",
    "Hemodiluted Status",
    "Serologies",
    "SARS COV 2 Results",
    "Case Notes",
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
    value19,
    value20,
    value21,
    value22,
    value23,
    value24,
    value25,
    value26,
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
    setValue19,
    setValue20,
    setValue21,
    setValue22,
    setValue23,
    setValue24,
    setValue25,
    setValue26,
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
          <div>
            <GridBox
              columnPropsList={columnPropsList.slice(18, 21)}
              nameList={nameList.slice(18, 21)}
              valueList={defaultValue.slice(18, 21)}
              setValueList={setValueList.slice(18, 21)}
              setChanged={setChanged}
            />
          </div>
          <div>
            <GridBox
              columnPropsList={columnPropsList.slice(21, 24)}
              nameList={nameList.slice(21, 24)}
              valueList={defaultValue.slice(21, 24)}
              setValueList={setValueList.slice(21, 24)}
              setChanged={setChanged}
            />
          </div>
          <div>
            <GridBox
              columnPropsList={columnPropsList.slice(24, 27)}
              nameList={nameList.slice(24, 27)}
              valueList={defaultValue.slice(24, 27)}
              setValueList={setValueList.slice(24, 27)}
              setChanged={setChanged}
            />
          </div>
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
