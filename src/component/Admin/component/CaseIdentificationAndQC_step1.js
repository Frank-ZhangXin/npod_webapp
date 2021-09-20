import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridBox from "./component/GridBox";
import useDebounced from "./component/useDebounced";
import useRetrieve from "./component/useRetrieve";
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

const handleSumbit = async function (event) {};

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
  const columnPropsList = [
    {
      column: "is_public",
      input: "dropDown",
      type: "string",
      ops: [
        { value: 1, label: "1" },
        { value: 0, label: "0" },
        { value: null, label: "NULL" },
      ],
    },
    { column: "alt_case_id", input: "inputBox", type: "string", ops: [] },
    { column: "UNOS_id", input: "inputBox", type: "string", ops: [] },
    { column: "RR_id", input: "inputBox", type: "string", ops: [] },
    { column: "Aperio_id", input: "inputBox", type: "string", ops: [] },
    {
      column: "donor_type_id",
      input: "dropDown",
      type: "int",
      ops: [
        { value: 1, label: "1. Autoantibody Positive" },
        { value: 2, label: "2. Type 1 Diabetes" },
        { value: 3, label: "3. Type 1 Diabetes Joslin Medalist" },
        { value: 4, label: "4. Type 2 Diabetes" },
        { value: 5, label: "5. No Diabetes" },
        { value: 6, label: "6. No Diabetes" },
        { value: 7, label: "7. Pregnancy" },
        { value: 8, label: "8. Other" },
        { value: 9, label: "9. Pending" },
        { value: 10, label: "10. Autoab Pos by screening" },
        { value: 11, label: "11. Preclinical T2D" },
        { value: 12, label: "12. Cystic Fibrosis" },
        { value: 13, label: "13. Fulminant Type 1 Diabetes" },
        { value: 14, label: "14. Transplant" },
        { value: 16, label: "16. Monogenic Diabetes" },
        { value: 18, label: "18. T2D+Incretin" },
        { value: 20, label: "20. Gastric Bypass" },
        { value: 21, label: "21. Ketosis-Prone Diabetes" },
        { value: 23, label: "23. Other - Diabetes" },
        { value: 24, label: "24. Other - No Diabetes" },
        { value: null, label: "NULL" },
      ],
    },
    {
      column: "donor_type_comments",
      input: "inputBoxLarge",
      type: "string",
      ops: [],
    },
    { column: "case_flag", input: "inputBox", type: "string", ops: [] },
    {
      column: "retire_status",
      input: "dropDown",
      type: "string",
      //ops: ["Retired", "No Pancreas", "Disposed", "NULL"],
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
      type: "int",
      ops: [
        { value: 1, label: "1. Autoantibody Positive" },
        { value: 2, label: "2. Type 1 Diabetes" },
        { value: 3, label: "3. Type 1 Diabetes Joslin Medalist" },
        { value: 4, label: "4. Type 2 Diabetes" },
        { value: 5, label: "5. No Diabetes" },
        { value: 6, label: "6. No Diabetes" },
        { value: 7, label: "7. Pregnancy" },
        { value: 8, label: "8. Other" },
        { value: 9, label: "9. Pending" },
        { value: 10, label: "10. Autoab Pos by screening" },
        { value: 11, label: "11. Preclinical T2D" },
        { value: 12, label: "12. Cystic Fibrosis" },
        { value: 13, label: "13. Fulminant Type 1 Diabetes" },
        { value: 14, label: "14. Transplant" },
        { value: 16, label: "16. Monogenic Diabetes" },
        { value: 18, label: "18. T2D+Incretin" },
        { value: 20, label: "20. Gastric Bypass" },
        { value: 21, label: "21. Ketosis-Prone Diabetes" },
        { value: 23, label: "23. Other - Diabetes" },
        { value: 24, label: "24. Other - No Diabetes" },
        { value: null, label: "NULL" },
      ],
    },
    {
      column: "chart_received",
      input: "dropDown",
      type: "string",
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
      type: "string",
      ops: [
        { value: "Yes", label: "Yes" },
        { value: "No", label: "No" },
        { value: null, label: "NULL" },
      ],
    },
    {
      column: "source",
      input: "dropDown",
      type: "string",
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
      type: "string",
      ops: [
        { value: 1, label: "1. Donor Alliance, Inc" },
        { value: 2, label: "2. Gift of Life Donor Program" },
        { value: 3, label: "3. Sierra Donor Services" },
        { value: 4, label: "4. Intermountain Donor Services" },
        { value: 5, label: "5. Life Alliance Organ Recovery Agency" },
        { value: 6, label: "6. Lifesharing" },
        { value: 7, label: "7. OneLegacy" },
        { value: 8, label: "8. New York Organ Donor Network" },
        { value: 9, label: "9. California Transplant Donor Network" },
        { value: 10, label: "10. Gift of Hope Organ & Tissue Donor Network" },
        { value: 11, label: "11. Gift of Life Michigan" },
        { value: 12, label: "12. LifeCenter Northwest Donor Network" },
        { value: 13, label: "13. Life Choice Donor Services" },
        { value: 14, label: "14. Life Source, Upper Midwest OPO, Inc." },
        { value: 15, label: "15. Nevada Donor Network, Inc." },
        { value: 16, label: "16. New England Donor Services" },
        {
          value: 17,
          label: "17. New Jersey Organ and Tissue Sharing Network (NJTO)",
        },
        { value: 18, label: "18. Pacific Northwest Transplant Bank" },
        { value: 19, label: "19. Legacy of Hope" },
        { value: 20, label: "20. Arkansas Regional Organ Recovery Agency" },
        { value: 21, label: "21. Carolina Donor Services" },
        { value: 22, label: "22. Center for Donation & Transplant" },
        {
          value: 23,
          label: "23. Center for Organ Recovery and Education (CORE)",
        },
        { value: 24, label: "24. Donor Network of Arizona" },
        { value: 25, label: "25. Finger Lakes Donor Recovery Network" },
        { value: 26, label: "26. Indiana Donor Network" },
        { value: 27, label: "27. Iowa Donor Network" },
        { value: 28, label: "28. Kentucky Organ Donor Affiliates" },
        { value: 29, label: "29. Lifeshare of the Carolinas" },
        { value: 30, label: "30. Life Quest Organ Recovery Agency" },
        { value: 31, label: "31. LifeBanc" },
        { value: 32, label: "32. LifeCenter Organ Donor Network" },
        { value: 33, label: "33. Life Connection of Ohio" },
        { value: 34, label: "34. LifeGift Organ Donor Donation Center" },
        {
          value: 35,
          label: "35. Life Line of Ohio Organ Procurement Agency",
        },
        { value: 36, label: "36. Life Link of Florida" },
        { value: 37, label: "37. LifeLink of Georgia" },
        { value: 38, label: "38. Life Net Health" },
        { value: 39, label: "39. We Are Sharing Hope SC" },
        {
          value: 40,
          label: "40. Lifeshare Transplant Donor Services of Oklahoma",
        },
        { value: 41, label: "41. Louisana Organ Procurement Organization" },
        { value: 42, label: "42. Mid America Transplant Services" },
        { value: 43, label: "43. Mid-South Transplant Foundation Inc." },
        { value: 44, label: "44. Midwest Transplant Network" },
        { value: 45, label: "45. Mississippi Organ Recovery Agency" },
        { value: 46, label: "46. Nebraska Organ Retrieval System" },
        { value: 47, label: "47. Southwest Transplant Alliance" },
        { value: 48, label: "48. Tennessee Donor Services" },
        { value: 49, label: "49. Texas Organ Sharing Alliance" },
        { value: 50, label: "50. Living Legacy Foundation of Maryland" },
        { value: 51, label: "51. OurLegacy" },
        {
          value: 52,
          label: "52. University of Wisconsin Hospital and Clinic",
        },
        { value: 53, label: "53. Upstate New York Transplant Services	" },
        { value: 54, label: "54. Washington Regional Transplant Community" },
        { value: 55, label: "55. Versiti Wisconsin, Inc." },
        { value: 56, label: "56. New Mexico Donor Services" },
        { value: 57, label: "57. Legacy of Life Hawaii" },
        { value: 59, label: "59. University of Uppsala" },
        { value: 60, label: "60. Hospital Referral" },
        { value: 61, label: "61. UT Health Science Center" },
        { value: 62, label: "62. Spain- nPOD-E" },
        { value: 63, label: "63. RTI Donor Services (SETA)" },
        { value: 64, label: "64. University of Yamanashi" },
        { value: 65, label: "65. University of Miami (nPOD-T)" },
        { value: 66, label: "66. Baylor College of Medicine" },
        { value: 67, label: "67. University of Pittsburgh" },
        { value: 68, label: "68. University of Maryland (nPOD-T)" },
        { value: 69, label: "69. Life Link Puerto Rico" },
        {
          value: 70,
          label: "70. University of Massachusetts Memorial Hospital",
        },
        { value: 71, label: "71. UW Organ and Tissue Donation" },
        { value: 72, label: "72. Donor Network West" },
        { value: 73, label: "73. DonorConnect" },
        { value: 74, label: "74. Johns Hopkins Hospital" },
        { value: 75, label: "75. Live On Nebraska" },
        { value: null, label: "NULL" },
      ],
    },
    {
      column: "case_recovery_type",
      input: "dropDown",
      type: "string",
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
      type: "string",
      ops: [],
    },
    {
      column: "chart_review_notes",
      input: "inputBoxLarge",
      type: "string",
      ops: [],
    },
    {
      column: "case_entry_status",
      input: "dropDown",
      type: "string",
      ops: [
        { value: 1, label: "1" },
        { value: 0, label: "0" },
        { value: null, label: "NULL" },
      ],
    },
    {
      column: "entry_initials_and_date",
      input: "datePicker",
      type: "string",
      ops: [],
    },
    {
      column: "case_QC_status",
      input: "dropDown",
      type: "string",
      ops: [
        { value: 1, label: "1" },
        { value: 0, label: "0" },
        { value: null, label: "NULL" },
      ],
    },
    {
      column: "QC_initials_and_date",
      input: "datePicker",
      type: "string",
      ops: [],
    },
  ];

  const defaultValue = useRetrieve(caseId, columnList);

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
    "Donor Type ID",
    "Donor Type Comment",
    "Case Flag",
    "Retire Status",
    "Accepted As Donor Type ID",
    "Chart Received",
    "Consent Restriction Status",
    "Source",
    "OPO ID",
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

  const [updateFail, setUpdateFail] = useState(false);

  useEffect(() => {
    if (update && !updateFail) {
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
      <form noValidate onSubmit={handleSumbit}>
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
