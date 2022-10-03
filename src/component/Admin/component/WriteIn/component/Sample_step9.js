import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import GridBox from "./component/GridBox";
import DropBox from "./component/DropBox";
import useDebounced from "./component/useDebounced";
import useCheckSampleExist from "./component/useCheckSampleExist";
import useRetrieveAllVialIds from "./component/useRetrieveAllVialIds";
import useRetrieveSampleColumns from "./component/useRetrieveSampleColumns";
import useUpdateSample from "./component/useUpdateSample";
import useCreateSample from "./component/useCreateSample";
import useDeleteSample from "./component/useDeleteSample";
import useRetrieveTableColumn from "./component/useRetrieveTableColumn";
import useRetrieveTableColumnWithConditions from "./component/useRetrieveTableColumnWithConditions";
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

const SampleTooltip = withStyles((theme) => ({
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

function vialIdOpsGenerator(idArr, nameArr) {
  const ops = [];
  for (let i = 0; i < idArr.length; i++) {
    ops.push({ value: idArr[i], label: nameArr[i] });
  }
  ops.push({ value: "New", label: "New" });
  return ops;
}

export default function Sample_step9({
  caseId,
  exist,
  setExist,
  create,
  update,
  deleting,
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
        Select Vial ID then start the update.
        <br />
        Select 'New' then create a new Sample record for this case.
      </div>
    </React.Fragment>
  );

  const columnList = ["sample_type_id", "aliquot_number", "percent_viability"];

  const sampleTypesConditions = [{ column: "status", value: "Active" }];

  const sampleTypeIds = useRetrieveTableColumnWithConditions(
    "sample_types",
    "sample_type_id",
    "sample_type_id",
    sampleTypesConditions
  );

  const sampleTypeNames = useRetrieveTableColumnWithConditions(
    "sample_types",
    "name",
    "sample_type_id",
    sampleTypesConditions
  );

  const sampleTypeOps = opsGenerator(sampleTypeIds, sampleTypeNames);

  const columnPropsList = [
    {
      column: "sample_type_id",
      input: "dropDown",
      restrict: { type: "string", range: [] },
      valid: useState(true),
      ops: sampleTypeOps,
    },
    {
      column: "aliquot_number",
      input: "integerBox",
      restrict: { type: "int", range: [0, 10] },
      valid: useState(true),
      ops: [],
    },
    {
      column: "prep_elution_vol_ul",
      input: "floatBox",
      restrict: { type: "float", range: [0, 100] },
      valid: useState(true),
      ops: [],
    },
  ];

  const [checkFail, setCheckFail] = useState(false);
  const [sampleExist, setSampleExist] = useState(false);
  const [sampleExistMsg, setSampleExistMsg] = useState(
    "Checking sample existing..."
  );
  const [showExistMsg, setShowExistMsg] = useState(false);
  const [createMsg, setCreateMsg] = useState("");
  const [createSuccess, setCreateSuccess] = useState(false);
  const [showCreateMsg, setShowCreateMsg] = useState(false);
  const [showDeleteMsg, setShowDeleteMsg] = useState(false);
  const [deleteMsg, setDeleteMsg] = useState("");
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  const isExist = useCheckSampleExist(
    caseId,
    setCheckFail,
    setExist,
    setSampleExist,
    setSampleExistMsg
  );

  const vialIdList = useRetrieveAllVialIds(caseId);
  const vialIdOps = vialIdOpsGenerator(vialIdList, vialIdList);
  const vialIdListName = "Vial ID List";
  const [vialId, setVialId] = useState(vialIdList[0]);

  const defaultValue = useRetrieveSampleColumns(caseId, vialId, columnList);
  useEffect(() => {
    for (let i = 0; i < setValueList.length; i++) {
      setValueList[i](defaultValue[i]);
    }
  }, [defaultValue]);

  const [value0, setValue0] = useDebounced(defaultValue[0], 800);
  const [value1, setValue1] = useDebounced(defaultValue[1], 800);
  const [value2, setValue2] = useDebounced(defaultValue[2], 800);

  const nameList = ["Sample Type", "Aliquot Number", "Percent Viability"];
  const valueList = [value0, value1, value2];
  const setValueList = [setValue0, setValue1, setValue2];

  // CREATE
  const isCreate = useCreateSample(
    caseId,
    vialId,
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
    if (sampleExist) {
      setSampleExistMsg(
        "Sample of this case exists, click 'Update' to proceed updating."
      );
    } else {
      setSampleExistMsg(
        "Sample of this case DOES NOT exist, click 'Create' to proceed creating."
      );
    }

    const timer1 = setTimeout(() => {
      setShowExistMsg(true);
    }, 300);
    const timer2 = setTimeout(() => {
      setShowExistMsg(false);
    }, 3000);
  }, [sampleExist, createSuccess, value0]);

  // DELETE
  const isDelete = useDeleteSample(
    caseId,
    vialId,
    deleting,
    setAccept,
    setDeleteMsg,
    setDeleteSuccess
  );

  useEffect(() => {
    if (deleting) {
      setShowDeleteMsg(true);
      const timer3 = setTimeout(() => {
        setShowDeleteMsg(false);
        setDeleteSuccess(false);
      }, 3000);
    }
  }, [deleteSuccess, deleting]);

  // UPDATE
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

  const updateResult = useUpdateSample(
    caseId,
    vialId,
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
            <SampleTooltip title={helpText} placement="right">
              <HelpOutlineIcon className={classes.helpIcon} />
            </SampleTooltip>
          </Typography>
          <div>
            <DropBox
              name={vialIdListName}
              value={vialId}
              setValue={setVialId}
              setChanged={setChanged}
              ops={vialIdOps}
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
          {sampleExistMsg}
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
      <Fade in={showDeleteMsg}>
        <Alert
          variant="filled"
          severity={!deleteSuccess ? "error" : "success"}
          className={classes.alert}
        >
          {deleteMsg}
        </Alert>
      </Fade>
    </div>
  );
}
