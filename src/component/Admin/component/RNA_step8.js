import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridBox from "./component/GridBox";
import useDebounced from "./component/useDebounced";
import useCheckRNAExist from "./component/useCheckRNAExist";
import useRetrieveRNAColumns from "./component/useRetrieveRNAColumns";
import useUpdateRNA from "./component/useUpdateRNA";
import useCreateRNA from "./component/useCreateRNA";
import useRetrieveTableColumnPossibleValue from "./component/useRetrieveTableColumnPossibleValue";
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

export default function RNA_step8({
  caseId,
  exist,
  setExist,
  create,
  update,
  changed,
  setAccept,
  setChanged,
}) {
  const classes = useStyles();

  const columnList = [
    "is_public",
    "RNA_aliq_id",
    "process_date",
    "staff_id",
    "derivative_source",
    "sample_type_id",
    "aliquot_number",
    "aliq_id",
    "prep_elution_vol_ul",
    "conc_ng_ul",
    "RIN",
    "ratio",
    "yield",
    "comments",
  ];

  const columnPropsList = [
    {
      column: "is_public",
      input: "dropDown",
      restrict: { type: "string", range: [] },
      valid: useState(true),
      ops: [
        { value: 1, label: "Yes" },
        { value: 0, label: "No" },
        { value: null, label: "NULL" },
      ],
    },
    {
      column: "RNA_aliq_id",
      input: "integerBox",
      restrict: { type: "int", range: [0, 5] },
      valid: useState(true),
      ops: [],
    },
    {
      column: "process_date",
      input: "datePicker",
      restrict: { type: "string", range: [] },
      valid: useState(true),
      ops: [],
    },
    {
      column: "staff_id",
      input: "integerBox",
      restrict: { type: "int", range: [] },
      valid: useState(true),
      ops: [],
    },
    {
      column: "derivative_source",
      input: "integerBox",
      restrict: { type: "int", range: [] },
      valid: useState(true),
      ops: [],
    },
    {
      column: "sample_type_id",
      input: "integerBox",
      restrict: { type: "string", range: [] },
      valid: useState(true),
      ops: [],
    },
    {
      column: "aliquot_number",
      input: "integerBox",
      restrict: { type: "int", range: [0, 10] },
      valid: useState(true),
      ops: [],
    },
    {
      column: "aliq_id",
      input: "dropDown",
      restrict: { type: "string", range: [] },
      valid: useState(true),
      ops: [
        { value: "OCT", label: "OCT" },
        { value: "RNALater", label: "RNALater" },
        { value: "Vial", label: "Vial" },
        { value: null, label: "NULL" },
      ],
    },
    {
      column: "prep_elution_vol_ul",
      input: "floatBox",
      restrict: { type: "float", range: [0, 100] },
      valid: useState(true),
      ops: [],
    },
    {
      column: "conc_ng_ul",
      input: "floatBox",
      restrict: { type: "float", range: [0, 5000] },
      valid: useState(true),
      ops: [],
    },
    {
      column: "RIN",
      input: "floatBox",
      restrict: { type: "float", range: [0, 10] },
      valid: useState(true),
      ops: [],
    },
    {
      column: "ratio",
      input: "floatBox",
      restrict: { type: "float", range: [0, 3] },
      valid: useState(true),
      ops: [],
    },
    {
      column: "yield",
      input: "floatBox",
      restrict: { type: "float", range: [0, 100] },
      valid: useState(true),
      ops: [],
    },
    {
      colum: "comments",
      input: "inputBoxLarge",
      restrict: { type: "string", range: [] },
      valid: useState(true),
      ops: [],
    },
  ];

  const [checkFail, setCheckFail] = useState(false);
  const [RNAExist, setRNAExist] = useState(false);
  const [RNAexistMsg, setRNAExistMsg] = useState("Checking RNA existing...");
  const [showExistMsg, setShowExistMsg] = useState(false);
  const [createMsg, setCreateMsg] = useState("");
  const [createSuccess, setCreateSuccess] = useState(false);
  const [showCreateMsg, setShowCreateMsg] = useState(false);

  const isExist = useCheckRNAExist(
    caseId,
    setCheckFail,
    setExist,
    setRNAExist,
    setRNAExistMsg
  );

  const defaultValue = useRetrieveRNAColumns(caseId, columnList);
  useEffect(() => {
    for (let i = 0; i < setValueList.length; i++) {
      setValueList[i](defaultValue[i]);
    }
  }, [defaultValue]);

  const [value0, setValue0] = useDebounced(defaultValue[0], 800);
  const [value1, setValue1] = useDebounced(defaultValue[1], 800);
  const [value2, setValue2] = useDebounced(defaultValue[2], 800);
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

  const nameList = [
    "Public",
    "RNA Aliq ID",
    "Process Date",
    "Staff ID",
    "Derivative Source",
    "Sample Type ID",
    "Aliquot Number",
    "Aliq ID",
    "Prep Elution Vol uL",
    "Conc ng uL",
    "RIN",
    "Ratio",
    "Yield",
    "Comments",
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
  ];

  // CREATE
  const isCreate = useCreateRNA(
    caseId,
    isExist,
    create,
    changed,
    setAccept,
    setExist,
    setCreateMsg,
    setCreateSuccess,
    columnList,
    valueList
  );

  useEffect(() => {
    if (createSuccess) {
      setShowCreateMsg(true);
      const timer3 = setTimeout(() => {
        setShowCreateMsg(false);
        setCreateSuccess(false);
      }, 3000);
    }
  }, [createSuccess, value0]);

  useEffect(() => {
    if (RNAExist) {
      setRNAExistMsg("RNA case exists, click 'Update' to proceed updating.");
    } else {
      setRNAExistMsg(
        "RNA case DOES NOT exist, click 'Create' to proceed creating."
      );
    }

    const timer1 = setTimeout(() => {
      setShowExistMsg(true);
    }, 300);
    const timer2 = setTimeout(() => {
      setShowExistMsg(false);
    }, 3000);
  }, [RNAExist, createSuccess, value0]);

  useEffect(() => {
    if (update && !showUpdateError && showUpdateSuccess) {
      setAccept(true);
    } else {
      setAccept(false);
    }
  }, [update]);

  const [showUpdateError, setShowUpdateError] = useState(false);
  const [showUpdateSuccess, setShowUpdateSuccess] = useState(false);
  const [updateMsg, setUpdateMsg] = useState("Default message.");

  // UPDATE
  const updateResult = useUpdateRNA(
    caseId,
    update,
    changed,
    setAccept,
    columnList,
    valueList,
    setShowUpdateError,
    setShowUpdateSuccess,
    setUpdateMsg
  );

  useEffect(() => {
    if (showUpdateError) {
      setShowUpdateError(true);
      const timer = setTimeout(() => {
        setShowUpdateError(false);
      }, 5000);
    } else if (showUpdateSuccess) {
      setShowUpdateSuccess(true);
      const timer = setTimeout(() => {
        setShowUpdateSuccess(false);
      }, 3000);
    }
  }, [showUpdateError, showUpdateSuccess]);

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
        </div>
      </form>
      <Fade in={showExistMsg}>
        <Alert variant="filled" severity="info" className={classes.alert}>
          {RNAexistMsg}
        </Alert>
      </Fade>
      <Fade in={showCreateMsg}>
        <Alert variant="filled" severity="success" className={classes.alert}>
          {createMsg}
        </Alert>
      </Fade>
      <Fade in={showUpdateError || showUpdateSuccess}>
        <Alert
          variant="filled"
          severity={showUpdateError && !showUpdateSuccess ? "error" : "success"}
          className={classes.alert}
        >
          {updateMsg}
        </Alert>
      </Fade>
    </div>
  );
}
