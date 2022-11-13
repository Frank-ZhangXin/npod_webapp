import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import GridBox from "./component/GridBox";
import useDebounced from "./component/useDebounced";
import useCheckHLAExist from "./component/useCheckHLAExist";
import useRetrieveHLAColumns from "./component/useRetrieveHLAColumns";
import useUpdateHLA from "./component/useUpdateHLA";
import useCreateHLA from "./component/useCreateHLA";
import useRetrieveTableColumnPossibleValue from "./component/useRetrieveTableColumnPossibleValue";
import Alert from "@material-ui/lab/Alert";
import Fade from "@material-ui/core/Fade";
import Tooltip from "@material-ui/core/Tooltip";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import Typography from "@material-ui/core/Typography";

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
  tip: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    fontWeight: "900",
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
  },
  helpIcon: {
    fontSize: 18,
    marginLeft: "3px",
    color: "#0292FF",
  },
  helpIcon2: {
    marginTop: "-10px",
    marginBottom: "-10px",
  },
  helpText: {
    padding: "10px",
    textShadow: "0 0 20px white",
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

const HLATooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    color: "#000000",
    border: "1px solid #dadde9",
    maxWidth: "420px",
    fontSize: 15,
  },
}))(Tooltip);

function opsGenerator(idArr, nameArr) {
  const ops = [];
  for (let i = 0; i < idArr.length; i++) {
    ops.push({ value: idArr[i], label: nameArr[i] });
  }
  ops.push({ value: null, label: "NULL" });
  return ops;
}

export default function HLA_step7({
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

  const helpText = (
    <React.Fragment>
      <div className={classes.helpText}>
        Hint:
        <br />
        Input format 1: 00:00
        <br />
        Inpurt format 2: 0:0
        <br />
        Input format 3: 00/00
      </div>
    </React.Fragment>
  );

  const columnList = [
    "T_A_1",
    "T_A_2",
    "T_B_1",
    "T_B_2",
    "T_DR_1",
    "T_DR_2",
    "T_DQB_1",
    "T_DQB_2",
    "A_1",
    "A_2",
    "B_1",
    "B_2",
    "C_1",
    "C_2",
    "DRB1_1",
    "DRB1_2",
    "DQA1_1",
    "DQA1_2",
    "DQB1_1",
    "DQB1_2",
    "DPA1_1",
    "DPA1_2",
    "DPB1_1",
    "DPB1_2",
    "comments",
  ];

  const columnPropsList = [
    {
      column: "T_A_1",
      input: "inputBoxHLA",
      restrict: { type: "string", range: [0, 15] },
      valid: useState(true),
      ops: [],
    },
    {
      column: "T_A_2",
      input: "inputBoxHLA",
      restrict: { type: "string", range: [0, 15] },
      valid: useState(true),
      ops: [],
    },
    {
      column: "T_B_1",
      input: "inputBoxHLA",
      restrict: { type: "string", range: [0, 15] },
      valid: useState(true),
      ops: [],
    },
    {
      column: "T_B_2",
      input: "inputBoxHLA",
      restrict: { type: "string", range: [0, 15] },
      valid: useState(true),
      ops: [],
    },
    {
      column: "T_DR_1",
      input: "inputBoxHLA",
      restrict: { type: "string", range: [0, 15] },
      valid: useState(true),
      ops: [],
    },
    {
      column: "T_DR_2",
      input: "inputBoxHLA",
      restrict: { type: "string", range: [0, 15] },
      valid: useState(true),
      ops: [],
    },
    {
      column: "T_DQB_1",
      input: "inputBoxHLA",
      restrict: { type: "string", range: [0, 15] },
      valid: useState(true),
      ops: [],
    },
    {
      column: "T_DQB_2",
      input: "inputBoxHLA",
      restrict: { type: "string", range: [0, 15] },
      valid: useState(true),
      ops: [],
    },
    {
      column: "A_1",
      input: "inputBoxHLA",
      restrict: { type: "string", range: [0, 15] },
      valid: useState(true),
      ops: [],
    },
    {
      column: "A_2",
      input: "inputBoxHLA",
      restrict: { type: "string", range: [0, 15] },
      valid: useState(true),
      ops: [],
    },
    {
      column: "B_1",
      input: "inputBoxHLA",
      restrict: { type: "string", range: [0, 15] },
      valid: useState(true),
      ops: [],
    },
    {
      column: "B_2",
      input: "inputBoxHLA",
      restrict: { type: "string", range: [0, 15] },
      valid: useState(true),
      ops: [],
    },
    {
      column: "C_1",
      input: "inputBoxHLA",
      restrict: { type: "string", range: [0, 15] },
      valid: useState(true),
      ops: [],
    },
    {
      column: "C_2",
      input: "inputBoxHLA",
      restrict: { type: "string", range: [0, 15] },
      valid: useState(true),
      ops: [],
    },
    {
      column: "DRB1_1",
      input: "inputBoxHLA",
      restrict: { type: "string", range: [0, 15] },
      valid: useState(true),
      ops: [],
    },
    {
      column: "DRB1_2",
      input: "inputBoxHLA",
      restrict: { type: "string", range: [0, 15] },
      valid: useState(true),
      ops: [],
    },
    {
      column: "DQA1_1",
      input: "inputBoxHLA",
      restrict: { type: "string", range: [0, 15] },
      valid: useState(true),
      ops: [],
    },
    {
      column: "DQA1_2",
      input: "inputBoxHLA",
      restrict: { type: "string", range: [0, 15] },
      valid: useState(true),
      ops: [],
    },
    {
      column: "DQB1_1",
      input: "inputBoxHLA",
      restrict: { type: "string", range: [0, 15] },
      valid: useState(true),
      ops: [],
    },
    {
      column: "DQB1_2",
      input: "inputBoxHLA",
      restrict: { type: "string", range: [0, 15] },
      valid: useState(true),
      ops: [],
    },
    {
      column: "DPA1_1",
      input: "inputBoxHLA",
      restrict: { type: "string", range: [0, 15] },
      valid: useState(true),
      ops: [],
    },
    {
      column: "DPA1_2",
      input: "inputBoxHLA",
      restrict: { type: "string", range: [0, 15] },
      valid: useState(true),
      ops: [],
    },
    {
      column: "DPB1_1",
      input: "inputBoxHLA",
      restrict: { type: "string", range: [0, 15] },
      valid: useState(true),
      ops: [],
    },
    {
      column: "DPB1_2",
      input: "inputBoxHLA",
      restrict: { type: "string", range: [0, 15] },
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
  const [HLAExist, setHLAExist] = useState(false);
  const [HLAexistMsg, setHLAExistMsg] = useState("Checking HLA existing...");
  const [showExistMsg, setShowExistMsg] = useState(false);
  const [createMsg, setCreateMsg] = useState("");
  const [createSuccess, setCreateSuccess] = useState(false);
  const [showCreateMsg, setShowCreateMsg] = useState(false);

  const isExist = useCheckHLAExist(
    caseId,
    setCheckFail,
    setExist,
    setHLAExist,
    setHLAExistMsg
  );

  const defaultValue = useRetrieveHLAColumns(caseId, columnList);
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
  const [value14, setValue14] = useDebounced(defaultValue[14], 800);
  const [value15, setValue15] = useDebounced(defaultValue[15], 800);
  const [value16, setValue16] = useDebounced(defaultValue[16], 800);
  const [value17, setValue17] = useDebounced(defaultValue[17], 800);
  const [value18, setValue18] = useDebounced(defaultValue[18], 800);
  const [value19, setValue19] = useDebounced(defaultValue[18], 800);
  const [value20, setValue20] = useDebounced(defaultValue[18], 800);
  const [value21, setValue21] = useDebounced(defaultValue[18], 800);
  const [value22, setValue22] = useDebounced(defaultValue[18], 800);
  const [value23, setValue23] = useDebounced(defaultValue[18], 800);
  const [value24, setValue24] = useDebounced(defaultValue[18], 800);

  const nameList = [
    "T_A_1",
    "T_A_2",
    "T_B_1",
    "T_B_2",
    "T_DR_1",
    "T_DR_2",
    "T_DQB_1",
    "T_DQB_2",
    "A_1",
    "A_2",
    "B_1",
    "B_2",
    "C_1",
    "C_2",
    "DRB1_1",
    "DRB1_2",
    "DQA1_1",
    "DQA1_2",
    "DQB1_1",
    "DQB1_2",
    "DPA1_1",
    "DPA1_2",
    "DPB1_1",
    "DPB1_2",
    "comments",
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
  ];

  // CREATE
  const isCreate = useCreateHLA(
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
    if (HLAExist) {
      setHLAExistMsg("HLA case exists, click 'Update' to proceed updating.");
    } else {
      setHLAExistMsg(
        "HLA case DOES NOT exist, click 'Create' to proceed creating."
      );
    }

    const timer1 = setTimeout(() => {
      setShowExistMsg(true);
    }, 300);
    const timer2 = setTimeout(() => {
      setShowExistMsg(false);
    }, 3000);
  }, [HLAExist, createSuccess, value0]);

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
  const updateResult = useUpdateHLA(
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

  console.log("HLA page changed", changed);

  return (
    <div className={classes.root}>
      <div className={classes.title}>
        <Typography variant="h6" component="h6" className={classes.titleText}>
          CASE ID: {caseId}
        </Typography>
      </div>
      <form noValidate>
        <div>
          <Typography variant="body1" className={classes.tip}>
            How-to-use{"  "}
            <HLATooltip title={helpText} placement="right">
              <HelpOutlineIcon className={classes.helpIcon} />
            </HLATooltip>
          </Typography>
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
              columnPropsList={columnPropsList.slice(24, 25)}
              nameList={nameList.slice(24, 25)}
              valueList={defaultValue.slice(24, 25)}
              setValueList={setValueList.slice(24, 25)}
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

      <Fade in={showExistMsg}>
        <Alert variant="filled" severity="info" className={classes.alert}>
          {HLAexistMsg}
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
