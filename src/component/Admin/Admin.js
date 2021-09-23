import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Header from "../Header";
import Container from "@material-ui/core/Container";
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
import AABCpeptideHistopathology_step6 from "./component/AABCpeptideHistopathology_step6";
import HLA_step7 from "./component/HLA_step7";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    backgroundImage: `url(${process.env.PUBLIC_URL + "/assets/adminPage.jpg"})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    paddingTop: "130px",
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
    "AAB, C-peptide, Histopathology",
    "HLA",
    "RNA",
  ];
}

export default function Admin() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const steps = getSteps();

  const [caseId, setCaseId] = useState(null);
  const [exist, setExist] = useState(false);
  const [create, setCreate] = useState(false);
  const [update, setUpdate] = useState(false);
  const [changed, setChanged] = useState(false);
  const [accept, setAccept] = useState(false);
  const [update1, setUpdate1] = useState(false);
  const [accept1, setAccept1] = useState(false);
  const [update2, setUpdate2] = useState(false);
  const [accept2, setAccept2] = useState(false);

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <div>
            <CreateCase_step0
              setCaseId={setCaseId}
              exist
              setExist={setExist}
              create={create}
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
        return <DemographicsAndTimeline_step3 />;
      case 4:
        return <ClinicalHistoryAndMedSoc_step4 />;
      case 5:
        return <HospitalLabs_step5 />;
      case 6:
        return <AABCpeptideHistopathology_step6 />;
      case 7:
        return <HLA_step7 />;
      default:
        return "Unknown step";
    }
  }

  const resetStepState = () => {
    setAccept(false);
    setAccept1(false);
    setAccept2(false);
    setCreate(false);
    setChanged(false);
    setUpdate(false);
    setUpdate1(false);
    setUpdate2(false);
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

  const handleSumbit = (step) => {
    switch (step) {
      case 0:
        return;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (activeStep === 0) {
      if (accept) {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setCreate(false);
        setAccept(false);
        setUpdate1(false);
        setAccept1(false);
        setUpdate2(false);
        setAccept2(false);
        setChanged(false);
      }
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setUpdate1(false);
      setAccept1(false);
      setUpdate2(false);
      setAccept2(false);
      setChanged(false);
    }

    // switch (activeStep) {
    //   case 0:
    //     if (accept) {
    //       setActiveStep((prevActiveStep) => prevActiveStep + 1);
    //       setCreate(false);
    //       //setUpdate(false);
    //       setUpdate1(false);
    //       setAccept(false);
    //       setAccept1(false);
    //       setChanged(false);
    //     }
    //   case 1:
    //     console.log("case 1 next was clicked.");
    //     setActiveStep((prevActiveStep) => prevActiveStep + 1);
    //     setUpdate1(false);
    //     setAccept1(false);
    //     setChanged(false);
    //   default:
    //     return;
    // }
  };

  const handleCreate = () => {
    setCreate(true);
    setChanged(false);
  };

  const handleUpdate = () => {
    if (activeStep === 0) {
      setUpdate(true);
      if (exist) {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setCreate(false);
        setAccept(false);
        setUpdate1(false);
        setAccept1(false);
        setUpdate2(false);
        setAccept2(false);
        setChanged(false);
      }
    } else if (activeStep === 1) {
      setUpdate1(true);
    } else if (activeStep === 2) {
      setUpdate2(true);
    }

    setChanged(false);
  };

  const handleBack = () => {
    setCreate(false);
    setAccept(false);
    setUpdate1(false);
    setAccept1(false);
    setUpdate2(false);
    setAccept2(false);
    if (activeStep - 1 === 0) {
      setUpdate(false);
    }
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    if (activeStep !== 0) {
      setCreate(false);

      setAccept(false);
      setUpdate1(false);
      setAccept1(false);
      setUpdate2(false);
      setAccept2(false);
      setActiveStep(step);
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
      <Header location="Admin Page" />
      <div className={classes.root}>
        <Container maxWidth="lg">
          <Stepper nonLinear activeStep={activeStep} orientation="vertical">
            {steps.map((label, index) => (
              <Step key={label}>
                {/* <StepLabel>{label}</StepLabel> */}
                <StepButton
                  onClick={handleStep(index)}
                  completed={completed[index]}
                >
                  {label}
                </StepButton>
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

                      {activeStep === 0 ? (
                        <Button
                          disabled={exist === true || caseId === ""}
                          onClick={handleCreate}
                          className={classes.button}
                          variant="contained"
                          color="secondary"
                        >
                          Create
                        </Button>
                      ) : null}

                      <Button
                        disabled={exist === false || caseId === ""}
                        onClick={handleUpdate}
                        className={classes.button}
                        variant="contained"
                        color="secondary"
                      >
                        Update
                      </Button>
                    </div>
                  </div>
                </StepContent>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length && (
            <Paper square elevation={0} className={classes.resetContainer}>
              <Typography>
                All steps completed - you&apos;re finished
              </Typography>
              <Button onClick={handleReset} className={classes.button}>
                Reset
              </Button>
            </Paper>
          )}
        </Container>
      </div>
    </div>
  );
}
