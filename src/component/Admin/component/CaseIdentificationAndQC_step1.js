import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridBox from "./component/GridBox";
import useDebounced from "./component/useDebounced";
import useRetrieveCaseColumns from "./component/useRetrieveCaseColumns";
import useRetrieveTableColumn from "./component/useRetrieveTableColumn";
import useUpdate from "./component/useUpdate";
import Alert from "@material-ui/lab/Alert";
import Fade from "@material-ui/core/Fade";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  resizeInputBox: {
    resize: "vertical",
    maxWidth: "140px",
    height: "25px",
    marginLeft: "4px",
    marginBottom: "5px",
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

export default function CaseIdentificationAndQC_step1({
  caseId,
  update,
  changed,
  setAccept,
  setChanged,
}) {
  const classes = useStyles();

  const columnList = [
    "is_public",
    "alt_case_id",
    "UNOS_id",
    "RR_id",
    "Aperio_id",
    "donor_type_id",
    "donor_type_comments",
    "case_flag",
    "retire_status",
    "accepted_as_donor_type_id",
    "chart_received",
    "consent_restriction_status",
    "source",
    "OPO_id",
    "case_recovery_type",
    "chart_reviewed_date",
    "chart_review_notes",
    "case_entry_status",
    "entry_initials_and_date",
    "case_QC_status",
    "QC_initials_and_date",
  ];

  const donorTypes = useRetrieveTableColumn("donor_types", "name", "name");
  const donorTypes_id = useRetrieveTableColumn(
    "donor_types",
    "donor_type_id",
    "name"
  );
  const donorTypesOps = opsGenerator(donorTypes_id, donorTypes);
  const OPO_name = useRetrieveTableColumn("OPO", "OPO_name", "OPO_name");
  const OPO_id = useRetrieveTableColumn("OPO", "OPO_id", "OPO_name");
  const OPOOps = opsGenerator(OPO_id, OPO_name);

  const columnPropsList = [
    {
      column: "is_public",
      input: "dropDown",
      restrict: { type: "string", range: [] },
      checkRes: true,
      ops: [
        { value: 1, label: "Yes" },
        { value: 0, label: "No" },
        { value: null, label: "NULL" },
      ],
    },
    {
      column: "alt_case_id",
      input: "inputBox",
      restrict: { type: "string", range: [] },
      checkRes: true,
      ops: [],
    },
    {
      column: "UNOS_id",
      input: "inputBox",
      restrict: { type: "string", range: [] },
      checkRes: true,
      ops: [],
    },
    {
      column: "RR_id",
      input: "inputBox",
      restrict: { type: "string", range: [] },
      checkRes: true,
      ops: [],
    },
    {
      column: "Aperio_id",
      input: "inputBox",
      restrict: { type: "string", range: [] },
      checkRes: true,
      ops: [],
    },
    {
      column: "donor_type_id",
      input: "dropDown",
      restrict: { type: "int", range: [] },
      checkRes: true,
      ops: donorTypesOps,
    },
    {
      column: "donor_type_comments",
      input: "inputBoxLarge",
      restrict: { type: "string", range: [] },
      checkRes: true,
      ops: [],
    },
    {
      column: "case_flag",
      input: "inputBox",
      restrict: { type: "string", range: [] },
      checkRes: true,
      ops: [],
    },
    {
      column: "retire_status",
      input: "dropDown",
      restrict: { type: "string", range: [] },
      checkRes: true,
      ops: [
        { value: "Retired", label: "Retired" },
        { value: "No Pancreas", label: "No Pancreas" },
        { value: "Disposed", label: "Disposed" },
        { value: null, label: "NULL" },
      ],
    },
    {
      column: "accepted_as_donor_type_id",
      input: "dropDown",
      restrict: { type: "int", range: [] },
      checkRes: true,
      ops: donorTypesOps,
    },
    {
      column: "chart_received",
      input: "dropDown",
      restrict: { type: "string", range: [] },
      checkRes: true,
      ops: [
        { value: "Yes", label: "Yes" },
        { value: "No", label: "No" },
        { value: "Not possible", label: "Not possible" },
        { value: null, label: "NULL" },
      ],
    },
    {
      column: "consent_restriction_status",
      input: "dropDown",
      restrict: { type: "string", range: [] },
      checkRes: true,
      ops: [
        { value: "Yes", label: "Yes" },
        { value: "No", label: "No" },
        { value: null, label: "NULL" },
      ],
    },
    {
      column: "source",
      input: "dropDown",
      restrict: { type: "string", range: [] },
      checkRes: true,
      ops: [
        { value: "Autopsy", label: "Autopsy" },
        { value: "IIAM", label: "IIAM" },
        { value: "NDRI", label: "NDRI" },
        { value: "nPOD-E", label: "nPOD-E" },
        { value: "OPO Direct", label: "OPO Direct" },
        { value: "Promethera", label: "Promethera" },
        { value: null, label: "NULL" },
      ],
    },
    {
      column: "OPO_id",
      input: "dropDown",
      restrict: { type: "string", range: [] },
      checkRes: true,
      ops: OPOOps,
    },
    {
      column: "case_recovery_type",
      input: "dropDown",
      restrict: { type: "string", range: [] },
      checkRes: true,
      ops: [
        { value: "Organ Donor", label: "Organ Donor" },
        { value: "DCD Organ Donor", label: "DCD Organ Donor" },
        { value: "Autopsy", label: "Autopsy" },
        { value: "Archive", label: "Archive" },
        { value: null, label: "NULL" },
      ],
    },
    {
      column: "chart_reviewed_date",
      input: "datePicker",
      restrict: { type: "string", range: [] },
      checkRes: true,
      ops: [],
    },
    {
      column: "chart_review_notes",
      input: "inputBoxLarge",
      restrict: { type: "string", range: [] },
      checkRes: true,
      ops: [],
    },
    {
      column: "case_entry_status",
      input: "dropDown",
      restrict: { type: "string", range: [] },
      checkRes: true,
      ops: [
        { value: 1, label: "Entered" },
        { value: 0, label: "Not Entered" },
        { value: null, label: "NULL" },
      ],
    },
    {
      column: "entry_initials_and_date",
      input: "inputBox",
      restrict: { type: "string", range: [] },
      checkRes: true,
      ops: [],
    },
    {
      column: "case_QC_status",
      input: "dropDown",
      restrict: { type: "string", range: [] },
      checkRes: true,
      ops: [
        { value: 1, label: "QC'd" },
        { value: 0, label: "Not QC'd" },
        { value: null, label: "NULL" },
      ],
    },
    {
      column: "QC_initials_and_date",
      input: "inputBox",
      restrict: { type: "string", range: [] },
      checkRes: true,
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
  const [value19, setValue19] = useDebounced(defaultValue[19], 800);
  const [value20, setValue20] = useDebounced(defaultValue[20], 800);

  const nameList = [
    "Public",
    "Alt Case ID",
    "UNOS ID",
    "RR ID",
    "Aperio ID",
    "Donor Type",
    "Donor Type Comment",
    "Case Flag",
    "Retire Status",
    "Accepted As Donor Type",
    "Chart Received",
    "Consent Restriction Status",
    "Source",
    "OPO",
    "Case Recovery Type",
    "Chart Reviewed Date",
    "Chart Review Notes",
    "Case Entry Status",
    "Entry Initials And Date",
    "Case QC Status",
    "QC Initial and Date",
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
  ];

  //const [updateFail, setUpdateFail] = useState(false);

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
