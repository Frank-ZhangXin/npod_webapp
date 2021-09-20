import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridBox from "./component/GridBox";
import useDebounced from "./component/useDebounced";
import useCreate from "./component/useCreate";
import useCheckExist from "./component/useCheckExist";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
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
    if (update && !checkFail) {
      setAccept(true);
    } else {
      setAccept(false);
    }
  }, [create, update]);

  const [value0, setValue0] = useDebounced("", 1000);

  const columnList = ["case_id"];
  const columnPropsList = [
    { column: "case_id", input: "inputBox", type: "string", ops: [] },
  ];
  const nameList = ["Case ID"];
  const valueList = [value0];
  const setValueList = [setValue0];
  const [checkFail, setCheckFail] = useState(true);
  const [createFail, setCreateFail] = useState(true);
  const isExist = useCheckExist(value0, setCheckFail, setExist);
  useEffect(() => {
    setCaseId(value0);
  }, [value0]);
  const createResult = useCreate(
    value0,
    isExist,
    create,
    changed,
    setCreateFail,
    setAccept,
    setExist
  );

  return (
    <div className={classes.root}>
      <div>[Debug] check exist result is {isExist.toString()}</div>
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
        <div>[Debug] input case number is {valueList[0]}</div>
        {createResult ? <div>The case was created successfully!</div> : null}
      </form>
    </div>
  );
}
