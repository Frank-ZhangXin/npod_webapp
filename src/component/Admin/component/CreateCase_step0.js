import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridBox from "./component/GridBox";
import useDebounced from "./component/useDebounced";
import useCreate from "./component/useCreate";
import useCheckExist from "./component/useCheckExist";
import Alert from "@material-ui/lab/Alert";
import Fade from "@material-ui/core/Fade";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  alert: {
    marginTop: "5px",
    marginBottom: "5px",
    width: "90%",
  },
}));

const handleSumbit = async function (event) {};

export default function CreateCase_step0({
  setCaseId,
  exist,
  setExist,
  create,
  update,
  changed,
  setChanged,
  setAccept,
}) {
  const classes = useStyles();

  useEffect(() => {
    if (update && caseExist) {
      setAccept(true);
    } else {
      setAccept(false);
    }
  }, [create, update]);

  const [value0, setValue0] = useDebounced("", 1000);

  const columnList = ["case_id"];
  const columnPropsList = [
    {
      column: "case_id",
      input: "inputBox",
      restrict: { type: "string", range: [1, 10] },
      valid: useState(true),
      ops: [],
    },
  ];
  const nameList = ["Case ID"];
  const valueList = [value0];
  const setValueList = [setValue0];
  const [checkFail, setCheckFail] = useState(true);
  const [caseExist, setCaseExist] = useState(false);
  const [showExistMsg, setShowExistMsg] = useState(false);
  const [existMsg, setExistMsg] = useState("Please input case number and wait");
  const [showCreateMsg, setShowCreateMsg] = useState(false);
  const [createMsg, setCreateMsg] = useState("");
  const [createSuccess, setCreateSuccess] = useState(false);

  const isExist = useCheckExist(
    value0,
    setCheckFail,
    setExist,
    setExistMsg,
    setCaseExist,
    createSuccess
  );

  const createResult = useCreate(
    value0,
    isExist,
    create,
    changed,
    setAccept,
    setExist,
    setCreateMsg,
    setCreateSuccess
  );

  useEffect(() => {
    setCaseId(value0);

    if (createSuccess) {
      setShowCreateMsg(true);
      const timer3 = setTimeout(() => {
        setShowCreateMsg(false);
        setCreateSuccess(false);
      }, 3000);
    }
  }, [createSuccess, value0]);

  useEffect(() => {
    if (value0 !== "") {
      if (caseExist) {
        setExistMsg("Case exists, click 'Update' to proceed updating.");
      } else {
        setExistMsg(
          "Case DOES NOT exist, click 'Create' then 'Next' to proceed creating."
        );
      }
    }

    const timer1 = setTimeout(() => {
      setShowExistMsg(true);
    }, 300);
    const timer2 = setTimeout(() => {
      setShowExistMsg(false);
    }, 3000);
  }, [caseExist, createSuccess, value0]);

  return (
    <div className={classes.root}>
      <form noValidate onSubmit={handleSumbit}>
        <div>
          <GridBox
            columnPropsList={columnPropsList}
            nameList={nameList}
            valueList={valueList}
            setValueList={setValueList}
            setChanged={setChanged}
          />
        </div>
        {/* <div>[Debug] input case number is {valueList[0]}</div>
        {createResult ? <div>The case was created successfully!</div> : null} */}
      </form>
      <Fade in={showExistMsg}>
        <Alert variant="filled" severity="info" className={classes.alert}>
          {existMsg}
        </Alert>
      </Fade>
      <Fade in={showCreateMsg}>
        <Alert variant="filled" severity="success" className={classes.alert}>
          {createMsg}
        </Alert>
      </Fade>
    </div>
  );
}
