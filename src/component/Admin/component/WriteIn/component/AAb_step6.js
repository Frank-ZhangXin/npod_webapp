import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import GridBox from "./component/GridBox";
import DropBox from "./component/DropBox";
import useDebounced from "./component/useDebounced";
import useCheckAAbExist from "./component/useCheckAAbExist";
import useRetrieveAllAAbIds from "./component/useRetrieveAllAAbIds";
import useRetrieveAAbColumns from "./component/useRetrieveAAbColumns";
import useUpdateAAb from "./component/useUpdateAAb";
import useCreateAAb from "./component/useCreateAAb";
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

const AAbTooltip = withStyles((theme) => ({
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

function AAbIdOpsGenerator(idArr, nameArr) {
  const ops = [];
  for (let i = 0; i < idArr.length; i++) {
    ops.push({ value: idArr[i], label: nameArr[i] });
  }
  ops.push({ value: "New", label: "New" });
  return ops;
}

export default function AAb_step6({
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
        Select AAb ID then start the update.
        <br />
        Select 'New' then create a new AAb record for this case.
      </div>
    </React.Fragment>
  );

  const columnList = [
    "is_public",
    "GADA",
    "IA_2A",
    "mIAA",
    "ZnT8A",
    "received_date",
    "reported_date",
    "sample_status",
    "comments",
  ];

  const sampleStatusPossibleValues = useRetrieveTableColumnPossibleValue(
    "AAb",
    "sample_status"
  );
  const sampleStatusOps = opsGenerator(
    sampleStatusPossibleValues,
    sampleStatusPossibleValues
  );

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
      column: "GADA",
      input: "floatBox",
      restrict: { type: "float", range: [-0.1, 1500] },
      valid: useState(true),
      ops: [],
    },
    {
      column: "IA_2A",
      input: "floatBox",
      restrict: { type: "float", range: [-0.1, 450] },
      valid: useState(true),
      ops: [],
    },
    {
      colum: "mIAA",
      input: "floatBox",
      restrict: { type: "float", range: [-0.1, 7] },
      valid: useState(true),
      ops: [],
    },
    {
      colum: "ZnT8A",
      input: "floatBox",
      restrict: { type: "float", range: [-0.1, 300] },
      valid: useState(true),
      ops: [],
    },
    {
      colum: "received_date",
      input: "datePicker",
      restrict: { type: "string", range: [] },
      valid: useState(true),
      ops: [],
    },
    {
      colum: "reported_date",
      input: "datePicker",
      restrict: { type: "string", range: [] },
      valid: useState(true),
      ops: [],
    },
    {
      colum: "sample_status",
      input: "dropDown",
      restrict: { type: "string", range: [] },
      valid: useState(true),
      ops: sampleStatusOps,
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
  const [AAbExist, setAAbExist] = useState(false);
  const [AAbexistMsg, setAAbExistMsg] = useState("Checking AAb existing...");
  const [showExistMsg, setShowExistMsg] = useState(false);
  const [createMsg, setCreateMsg] = useState("");
  const [createSuccess, setCreateSuccess] = useState(false);
  const [showCreateMsg, setShowCreateMsg] = useState(false);

  const isExist = useCheckAAbExist(
    caseId,
    setCheckFail,
    setExist,
    setAAbExist,
    setAAbExistMsg
  );

  const AAbIdList = useRetrieveAllAAbIds(caseId);
  const AAbIdOps = AAbIdOpsGenerator(AAbIdList, AAbIdList);
  const AAbIdListName = "AAb ID List";
  const [AAbIdValue, setAAbIdValue] = useState(AAbIdList[0]);

  const defaultValue = useRetrieveAAbColumns(caseId, AAbIdValue, columnList);
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

  const nameList = [
    "Public",
    "GADA",
    "IA_2A",
    "mIAA",
    "ZnT8A",
    "Received Date",
    "Reported Date",
    "Sample Status",
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
  ];

  // CREATE
  const isCreate = useCreateAAb(
    caseId,
    AAbIdValue,
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
    if (create) {
      setShowCreateMsg(true);
      const timer3 = setTimeout(() => {
        setShowCreateMsg(false);
        setCreateSuccess(false);
      }, 3000);
    }
  }, [createSuccess, value0, create]);

  useEffect(() => {
    if (AAbExist) {
      setAAbExistMsg("AAb case exists, click 'Update' to proceed updating.");
    } else {
      setAAbExistMsg(
        "AAb case DOES NOT exist, click 'Create' to proceed creating."
      );
    }

    const timer1 = setTimeout(() => {
      setShowExistMsg(true);
    }, 300);
    const timer2 = setTimeout(() => {
      setShowExistMsg(false);
    }, 3000);
  }, [AAbExist, createSuccess, value0]);

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
  const updateResult = useUpdateAAb(
    caseId,
    AAbIdValue,
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
      <div className={classes.title}>
        <Typography variant="h6" component="h6" className={classes.titleText}>
          CASE ID: {caseId}
        </Typography>
      </div>
      <form noValidate>
        <div>
          <Typography variant="body1" className={classes.tip}>
            How-to-use{"  "}
            <AAbTooltip title={helpText} placement="right">
              <HelpOutlineIcon className={classes.helpIcon} />
            </AAbTooltip>
          </Typography>
          <div>
            <DropBox
              name={AAbIdListName}
              value={AAbIdValue}
              setValue={setAAbIdValue}
              setChanged={setChanged}
              ops={AAbIdOps}
            />
          </div>
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
          {AAbexistMsg}
        </Alert>
      </Fade>
      <Fade in={showCreateMsg}>
        <Alert
          variant="filled"
          severity={!createSuccess ? "error" : "success"}
          className={classes.alert}
        >
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
