import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Box } from "@material-ui/core";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepButton from "@material-ui/core/StepButton";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import CreateCase_step0 from "./component/CreateCase_step0";
import CaseIdentificationAndQC_step1 from "./component/CaseIdentificationAndQC_step1";
import CaseProcessing_step2 from "./component/CaseProcessing_step2";
import DemographicsAndTimeline_step3 from "./component/DemographicsAndTimeline_step3";
import ClinicalHistoryAndMedSoc_step4 from "./component/ClinicalHistoryAndMedSoc_step4";
import HospitalLabs_step5 from "./component/HospitalLabs_step5";
import AAb_step6 from "./component/AAb_step6";
import HLA_step7 from "./component/HLA_step7";
import RNA_step8 from "./component/RNA_step8";
import Sample_step9 from "./component/Sample_step9";

const useStyles = makeStyles((theme) => ({
  stepper: {
    padding: theme.spacing(1, 1, 1),
  },
  stepLabel: {
    "&:hover": {
      //backgroundColor: theme.palette.primary.light,
      cursor: "pointer",
    },
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}));

function getSteps() {
  return [
    "Create a new case / Update an existing case",
    "Case Identification and QC",
    "Case Processing",
    "Demographics and Timeline",
    "Clinical History and Med/Soc",
    "Hospital Labs",
    "AAb",
    "HLA",
    "RNA",
    "Sample",
  ];
}

export default function SingleCaseStepper() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const steps = getSteps();

  const [caseId, setCaseId] = useState("");
  const [caseExist, setCaseExist] = useState(false);
  const [AAbExist, setAAbExist] = useState(false);
  const [HLAExist, setHLAExist] = useState(false);
  const [RNAExist, setRNAExist] = useState(false);
  const [sampleExist, setSampleExist] = useState(false);
  const [createCase, setCreateCase] = useState(false);
  const [createAAb, setCreateAAb] = useState(false);
  const [createHLA, setCreateHLA] = useState(false);
  const [createRNA, setCreateRNA] = useState(false);
  const [createSample, setCreateSample] = useState(false);
  const [update, setUpdate] = useState(false);
  const [changed, setChanged] = useState(false);
  const [accept, setAccept] = useState(false);
  const [update1, setUpdate1] = useState(false);
  const [accept1, setAccept1] = useState(false);
  const [update2, setUpdate2] = useState(false);
  const [accept2, setAccept2] = useState(false);
  const [update3, setUpdate3] = useState(false);
  const [accept3, setAccept3] = useState(false);
  const [update4, setUpdate4] = useState(false);
  const [accept4, setAccept4] = useState(false);
  const [update5, setUpdate5] = useState(false);
  const [accept5, setAccept5] = useState(false);
  const [update6, setUpdate6] = useState(false);
  const [accept6, setAccept6] = useState(false);
  const [update7, setUpdate7] = useState(false);
  const [accept7, setAccept7] = useState(false);
  const [update8, setUpdate8] = useState(false);
  const [accept8, setAccept8] = useState(false);
  const [update9, setUpdate9] = useState(false);
  const [accept9, setAccept9] = useState(false);
  const [delete9, setDelete9] = useState(false);

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <div>
            <CreateCase_step0
              setCaseId={setCaseId}
              caseExist
              setExist={setCaseExist}
              create={createCase}
              update={update}
              changed={changed}
              setChanged={setChanged}
              setAccept={setAccept}
            />
          </div>
        );
      case 1:
        return (
          <CaseIdentificationAndQC_step1
            caseId={caseId}
            update={update1}
            changed={changed}
            setAccept={setAccept1}
            setChanged={setChanged}
          />
        );
      case 2:
        return (
          <CaseProcessing_step2
            caseId={caseId}
            update={update2}
            changed={changed}
            setAccept={setAccept2}
            setChanged={setChanged}
          />
        );
      case 3:
        return (
          <DemographicsAndTimeline_step3
            caseId={caseId}
            update={update3}
            changed={changed}
            setAccept={setAccept3}
            setChanged={setChanged}
          />
        );
      case 4:
        return (
          <ClinicalHistoryAndMedSoc_step4
            caseId={caseId}
            update={update4}
            changed={changed}
            setAccept={setAccept4}
            setChanged={setChanged}
          />
        );
      case 5:
        return (
          <HospitalLabs_step5
            caseId={caseId}
            update={update5}
            changed={changed}
            setAccept={setAccept5}
            setChanged={setChanged}
          />
        );
      case 6:
        return (
          <AAb_step6
            caseId={caseId}
            exist={AAbExist}
            setExist={setAAbExist}
            create={createAAb}
            update={update6}
            changed={changed}
            setAccept={setAccept6}
            setChanged={setChanged}
          />
        );
      case 7:
        return (
          <HLA_step7
            caseId={caseId}
            exist={HLAExist}
            setExist={setHLAExist}
            create={createHLA}
            update={update7}
            changed={changed}
            setAccept={setAccept7}
            setChanged={setChanged}
          />
        );

      case 8:
        return (
          <RNA_step8
            caseId={caseId}
            exist={RNAExist}
            setExist={setRNAExist}
            create={createRNA}
            update={update8}
            changed={changed}
            setAccept={setAccept8}
            setChanged={setChanged}
          />
        );
      case 9:
        return (
          <Sample_step9
            caseId={caseId}
            exist={sampleExist}
            setExist={setSampleExist}
            create={createSample}
            update={update9}
            deleting={delete9}
            changed={changed}
            setAccept={setAccept9}
            setChanged={setChanged}
          />
        );
      default:
        return "Unknown step";
    }
  }

  const resetStepState = () => {
    setAccept(false);
    setAccept1(false);
    setAccept2(false);
    setAccept3(false);
    setCreateCase(false);
    setChanged(false);
    setUpdate(false);
    setUpdate1(false);
    setUpdate2(false);
    setUpdate3(false);
    setUpdate4(false);
    setAccept4(false);
    setUpdate5(false);
    setAccept5(false);
    setUpdate6(false);
    setAccept6(false);
    setUpdate7(false);
    setAccept7(false);
    setUpdate8(false);
    setAccept8(false);
    setUpdate9(false);
    setAccept9(false);
    setDelete9(false);
    setCreateAAb(false);
    setCreateHLA(false);
    setCreateRNA(false);
    setCreateSample(false);
  };

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    if (activeStep === 0) {
      if (accept) {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setCreateCase(false);
        setAccept(false);
        setUpdate1(false);
        setAccept1(false);
        setUpdate2(false);
        setAccept2(false);
        setUpdate3(false);
        setAccept3(false);
        setUpdate4(false);
        setAccept4(false);
        setUpdate5(false);
        setAccept5(false);
        setUpdate6(false);
        setAccept6(false);
        setUpdate7(false);
        setAccept7(false);
        setUpdate8(false);
        setAccept8(false);
        setUpdate9(false);
        setAccept9(false);
        setDelete9(false);
        setCreateAAb(false);
        setCreateHLA(false);
        setCreateRNA(false);
        setCreateSample(false);
        setChanged(false);
      }
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setUpdate1(false);
      setAccept1(false);
      setUpdate2(false);
      setAccept2(false);
      setUpdate3(false);
      setAccept3(false);
      setUpdate4(false);
      setAccept4(false);
      setUpdate5(false);
      setAccept5(false);
      setUpdate6(false);
      setAccept6(false);
      setUpdate7(false);
      setAccept7(false);
      setUpdate8(false);
      setAccept8(false);
      setUpdate9(false);
      setAccept9(false);
      setDelete9(false);
      setCreateAAb(false);
      setCreateHLA(false);
      setCreateRNA(false);
      setCreateSample(false);
      setChanged(false);
    }
  };

  const handleCreateCase = () => {
    setCreateCase(true);
    setChanged(false);
  };

  const handleCreateAAb = () => {
    setCreateAAb(true);
    setChanged(false);
  };

  const handleCreateHLA = () => {
    setCreateHLA(true);
    setChanged(false);
  };

  const handleCreateRNA = () => {
    setCreateRNA(true);
    setChanged(false);
  };

  const handleCreateSample = () => {
    setCreateSample(true);
    setChanged(false);
  };

  const handleDeleteSample = () => {
    setDelete9(true);
    setChanged(false);
  };

  const handleUpdate = () => {
    if (activeStep === 0) {
      setUpdate(true);
      if (caseExist) {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setCreateCase(false);
        setAccept(false);
        setUpdate1(false);
        setAccept1(false);
        setUpdate2(false);
        setAccept2(false);
        setUpdate3(false);
        setAccept3(false);
        setUpdate4(false);
        setAccept4(false);
        setUpdate5(false);
        setAccept5(false);
        setUpdate6(false);
        setAccept6(false);
        setUpdate7(false);
        setAccept7(false);
        setUpdate8(false);
        setAccept8(false);
        setUpdate9(false);
        setAccept9(false);
        setDelete9(false);
        setCreateAAb(false);
        setCreateHLA(false);
        setCreateRNA(false);
        setCreateSample(false);
        setChanged(false);
      }
    } else if (activeStep === 1) {
      setUpdate1(true);
    } else if (activeStep === 2) {
      setUpdate2(true);
    } else if (activeStep === 3) {
      setUpdate3(true);
    } else if (activeStep === 4) {
      setUpdate4(true);
    } else if (activeStep === 5) {
      setUpdate5(true);
    } else if (activeStep === 6) {
      setUpdate6(true);
    } else if (activeStep === 7) {
      setUpdate7(true);
    } else if (activeStep === 8) {
      setUpdate8(true);
    } else if (activeStep === 9) {
      setUpdate9(true);
    }

    setChanged(false);
  };

  const handleBack = () => {
    setCreateCase(false);
    setAccept(false);
    setUpdate1(false);
    setAccept1(false);
    setUpdate2(false);
    setAccept2(false);
    setUpdate3(false);
    setAccept3(false);
    setUpdate4(false);
    setAccept4(false);
    setUpdate5(false);
    setAccept5(false);
    setUpdate6(false);
    setAccept6(false);
    setUpdate7(false);
    setAccept7(false);
    setUpdate8(false);
    setAccept8(false);
    setAccept9(false);
    setDelete9(false);
    setCreateAAb(false);
    setCreateHLA(false);
    setCreateRNA(false);
    setCreateSample(false);
    setChanged(false);
    if (activeStep - 1 === 0) {
      setUpdate(false);
    }
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    if (activeStep !== 0) {
      setCreateCase(false);

      setAccept(false);
      setUpdate1(false);
      setAccept1(false);
      setUpdate2(false);
      setAccept2(false);
      setUpdate3(false);
      setAccept3(false);
      setUpdate4(false);
      setAccept4(false);
      setUpdate5(false);
      setAccept5(false);
      setUpdate6(false);
      setAccept6(false);
      setUpdate7(false);
      setAccept7(false);
      setUpdate8(false);
      setAccept8(false);
      setAccept9(false);
      setDelete9(false);
      setCreateAAb(false);
      setCreateHLA(false);
      setCreateRNA(false);
      setCreateSample(false);
      setActiveStep(step);
      setChanged(false);
    }
    if (step === 0) {
      setUpdate(false);
    }
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset1 = () => {
    setActiveStep(0);
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  return (
    <div>
      <Stepper
        nonLinear
        activeStep={activeStep}
        orientation="vertical"
        className={classes.stepper}
      >
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel
              icon={index == 0 ? "0" : index}
              onClick={handleStep(index)}
              completed={completed[index]}
              className={classes.stepLabel}
            >
              {label}
            </StepLabel>
            <StepContent>
              {getStepContent(index)}
              <div className={classes.actionsContainer}>
                <div>
                  {activeStep !== 0 ? (
                    <Button
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      className={classes.button}
                      variant="contained"
                      color="primary"
                    >
                      Back
                    </Button>
                  ) : null}
                  {activeStep !== 0 ? (
                    <Button
                      disabled={update === false}
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                      className={classes.button}
                    >
                      {activeStep === steps.length - 1 ? "Finish" : "Next"}
                    </Button>
                  ) : null}
                  {/* Case Create */}
                  {activeStep === 0 ? (
                    <Button
                      disabled={caseExist === true || caseId === ""}
                      onClick={handleCreateCase}
                      className={classes.button}
                      variant="contained"
                      color="secondary"
                    >
                      Create
                    </Button>
                  ) : null}
                  {/* AAb Create */}
                  {activeStep === 6 ? (
                    <Button
                      disabled={caseId === ""}
                      onClick={handleCreateAAb}
                      className={classes.button}
                      variant="contained"
                      color="secondary"
                    >
                      Create
                    </Button>
                  ) : null}
                  {/* HLA Create */}
                  {activeStep === 7 ? (
                    <Button
                      disabled={HLAExist === true || caseId === ""}
                      onClick={handleCreateHLA}
                      className={classes.button}
                      variant="contained"
                      color="secondary"
                    >
                      Create
                    </Button>
                  ) : null}
                  {/* RNA Create */}
                  {activeStep === 8 ? (
                    <Button
                      disabled={caseId === ""}
                      onClick={handleCreateRNA}
                      className={classes.button}
                      variant="contained"
                      color="secondary"
                    >
                      Create
                    </Button>
                  ) : null}
                  {/* Sample Create */}
                  {activeStep === 9 ? (
                    <Button
                      disabled={caseId === ""}
                      onClick={handleCreateSample}
                      className={classes.button}
                      variant="contained"
                      color="secondary"
                    >
                      Create
                    </Button>
                  ) : null}

                  <Button
                    disabled={
                      (caseExist === false && activeStep === 0) ||
                      (AAbExist === false && activeStep === 6) ||
                      (HLAExist === false && activeStep === 7) ||
                      (RNAExist === false && activeStep === 8) ||
                      (sampleExist === false && activeStep === 9) ||
                      caseId === ""
                    }
                    onClick={handleUpdate}
                    className={classes.button}
                    variant="contained"
                    color="secondary"
                  >
                    Update
                  </Button>
                  <Button
                    disabled={sampleExist !== true || activeStep !== 9}
                    onClick={handleDeleteSample}
                    className={classes.button}
                    variant="contained"
                    color="secondary"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} className={classes.button}>
            Reset
          </Button>
        </Paper>
      )}
    </div>
  );
}
