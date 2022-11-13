import React, { useState, useEffect } from "react";
import { Typography, Paper, Box, Button, TextField } from "@material-ui/core";
import { Storage } from "aws-amplify";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import { Autocomplete } from "@material-ui/lab";
import LinearProgress from "@material-ui/core/LinearProgress";
import Alert from "@material-ui/lab/Alert";
import Fade from "@material-ui/core/Fade";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Checkbox from "@material-ui/core/Checkbox";
import AlertDialog from "../../../../../../AlertDialog";
import useSaveChange from "./component/useSaveChange";
import useGetAllExistingCaseIds from "./component/useGetAllExistingCaseIds";
import useGetAllFolders from "./component/useGetAllFolders";
import { CheckBox } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  folderOption: {
    marginLeft: "50px",
  },
  folderOptionRadio: {
    marginTop: "15px",
  },
  removeCheckBoxGroup: {
    marginTop: "30px",
  },
  removeCheckbox: {
    marginLeft: "20px",
    marginRight: "5px",
  },
  ablumBase: {
    marginTop: "50px",
    width: "1000px",
    minHeight: "600px",
  },
  ablumBox: {
    margin: "20px",
    display: "flex",
    flexWrap: "wrap",
  },
  ablumImageBox: {
    position: "relative",
    margin: "5px",
    width: "150px",
    height: "200px",
    border: "1px solid grey",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  ablumAddBox: {
    position: "relative",
    margin: "5px",
    width: "150px",
    height: "200px",
    border: "1px solid grey",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "&:hover": {
      cursor: "pointer",
    },
  },
  ablumImagePaper: {
    margin: "5px",
    width: "150px",
    display: "flex",
  },
  ablumImage: {
    width: "150px",
    maxHeight: "200px",
  },
  ablumRemoveButton: {
    position: "absolute",
    top: "2%",
    left: "90%",
    fontSize: "small",
    "&:hover": {
      cursor: "pointer",
    },
  },
  ablumRemoveMark: {
    position: "absolute",
    fontWeight: "600",
    color: "#fff",
    textShadow: "0 0 20px black",
  },
  progressBar: {
    width: "1000px",
  },
  saveButton: {
    marginTop: "50px",
    width: "100px",
  },
  resetButton: {
    marginTop: "50px",
    marginLeft: "10px",
    width: "100px",
  },
  alert: {
    marginTop: "5px",
    marginBottom: "5px",
    width: "1000px",
  },
}));

export default function UploadImageFile() {
  const classes = useStyles();
  const [filesToUpload, setFilesToUpload] = useState([]);
  const [filesToRemove, setFilesToRemove] = useState([]);
  const [removeFolder, setRemoveFolder] = useState(false); // whether to remove the selected folder
  const [saveButtonClicked, setSaveButtonClicked] = useState(0);
  const [resetButtongClicked, setResetButtonClicked] = useState(0);
  const [currUploadFile, setCurrUploadFile] = useState(null); // this variable is used to display current uploading one, be set in "SAVE" action
  const [uploadProgress, setUploadProgress] = useState(0);
  const [updateError, setUpdateError] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(null);
  const [allCaseIds, setAllCaseIds] = useState([]);
  const [currCaseFolders, setCurrCaseFolders] = useState([]);
  const [selectedCaseId, setSelectedCaseId] = useState(null);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [folderSelectMode, setFolderSelectMode] = useState("existing");
  const [disableSaveButton, setDiaableSaveButton] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState("Remove Alert");
  const [alertContent, setAlertCotent] = useState(
    "This action will remove the entire folder and all files in it. Are you sure?"
  );

  // get all existing case IDs

  useGetAllExistingCaseIds(setAllCaseIds, resetButtongClicked);
  console.log("all cases list", allCaseIds);

  // getCaseList();
  useGetAllFolders(selectedCaseId, setCurrCaseFolders);
  console.log(
    `Selected case is case ${selectedCaseId} and selected folder is ${selectedFolder}`
  );

  // get one case one folder all images
  const [imageFileList, setImageFileList] = useState([]);
  const [remoteImageFiles, setRemoteImageFiles] = useState([]);

  async function getOneCaseOneFolderAllImages(caseId, folderName) {
    try {
      const path = "cases/" + caseId + "/" + folderName;
      const path2 = "testing/";
      await Storage.list(path).then((fileList) => {
        console.log("testing folder file list", fileList);
        if (fileList) {
          fileList.forEach((file) => {
            if (file.key.match(/\.[0-9a-z]+$/i)) {
              getOneCaseOneFolderOneImage(file.key);
            }
          });
        }
      });
    } catch (error) {
      console.error("[S3] Get one case one folder images error.", error);
    }
  }

  async function getOneCaseOneFolderOneImage(fileKey) {
    try {
      await Storage.get(fileKey, { expires: 60 }).then((url) => {
        setRemoteImageFiles((images) => [...images, [fileKey, url]]);
      });
    } catch (error) {
      console.error("[S3] Get one case one folder one image error", error);
    }
  }

  useEffect(() => {
    if (
      selectedCaseId !== null &&
      selectedFolder !== null &&
      folderSelectMode === "existing"
    ) {
      setRemoteImageFiles([]);
      setFilesToUpload([]);
      setFilesToRemove([]);
      getOneCaseOneFolderAllImages(selectedCaseId, selectedFolder);
      setRemoveFolder(false);
    }
    if (folderSelectMode === "new") {
      setRemoteImageFiles([]);
      setFilesToUpload([]);
      setFilesToRemove([]);
      setCurrUploadFile(null);
      setUploadProgress(0);
      setUpdateError(null);
      setUpdateSuccess(null);
      setRemoveFolder(false);
    }
  }, [
    selectedCaseId,
    selectedFolder,
    updateError,
    updateSuccess,
    folderSelectMode,
  ]);

  // select a specific case
  const handleSelectCase = (value) => {
    setRemoteImageFiles([]);
    setCurrCaseFolders([]);
    if (value !== null) {
      setSelectedCaseId(value.caseId);
    } else {
      setSelectedCaseId(null);
      setSelectedFolder(null);
    }
  };

  // select a specific folder
  const handleSelectFolder = (value) => {
    setRemoteImageFiles([]);
    setFilesToUpload([]);
    setFilesToRemove([]);
    if (value !== null) {
      setSelectedFolder(value.folderName);
    } else {
      setSelectedFolder(null);
    }
  };

  // select a specific folder to remove
  const handleSelectFolderToRemove = (event) => {
    setRemoveFolder(event.target.checked);
    setOpenAlert(event.target.checked);
  };

  const handleCancelFolderToRemove = () => {
    setRemoveFolder(false);
    setOpenAlert(false);
  };

  // select files to upload
  const handleSelectFiles = (event) => {
    setFilesToUpload((files) => [...files, ...event.target.files]);
  };
  console.log("selected files to upload", filesToUpload);

  // deselect files to upload
  const handleDeslectFiles = (event, deselectedFileName) => {
    setFilesToUpload(
      filesToUpload.filter((item) => item.name !== deselectedFileName)
    );
  };

  // upload new files or remove remote existing files
  const handleSaveButtonClick = (event) => {
    setSaveButtonClicked((click) => click + 1);
  };

  // remove remote existing files
  const handleRemove = (event, imageIndex) => {
    const fileKey = remoteImageFiles[imageIndex][0];
    if (filesToRemove.includes(fileKey)) {
      setFilesToRemove(filesToRemove.filter((item) => item !== fileKey));
    } else {
      setFilesToRemove((files) => [...files, fileKey]);
    }
  };
  console.log("files to remove", filesToRemove);
  console.log("foler to remove or not", removeFolder);

  // handle folder select mode change
  const handleFolderSelectMode = (event) => {
    setFolderSelectMode(event.target.value);
    setSelectedFolder(null);
  };

  const handleNewFolder = (event) => {
    setSelectedFolder(event.target.value);
  };

  const handleReset = (event) => {
    setFilesToUpload([]);
    setFilesToRemove([]);
    setCurrUploadFile(null);
    setUploadProgress(0);
    setUpdateError(null);
    setUpdateSuccess(null);
    setAllCaseIds([]);
    setCurrCaseFolders([]);
    setSelectedCaseId(null);
    setSelectedFolder(null);
    setFolderSelectMode("existing");
    setRemoteImageFiles([]);
    setResetButtonClicked((click) => click + 1);
    setRemoveFolder(false);
    setDiaableSaveButton(false);
  };

  // set timers for "Save" action alerts
  useEffect(() => {
    if (updateError !== null || updateSuccess !== null) {
      const timer = setTimeout(() => {
        setUpdateError(null);
        setUpdateSuccess(null);
      }, 5000);
    }
  }, [updateError, updateSuccess]);

  useSaveChange(
    filesToUpload,
    filesToRemove,
    removeFolder,
    setRemoveFolder,
    selectedCaseId,
    selectedFolder,
    saveButtonClicked,
    setUploadProgress,
    setCurrUploadFile,
    setUpdateError,
    setUpdateSuccess,
    handleReset
  );

  return (
    <div>
      <AlertDialog
        title={alertTitle}
        contentText={alertContent}
        open={openAlert}
        setOpen={setOpenAlert}
        btn1Name="Yes"
        btn2Name="No"
        callBack={handleCancelFolderToRemove}
      />
      <Box style={{ display: "flex", flexDirection: "row" }}>
        <Autocomplete
          options={allCaseIds}
          getOptionLabel={(option) => option.caseId}
          style={{ width: 300, marginTop: "20px" }}
          key={resetButtongClicked}
          renderInput={(params) => (
            <TextField {...params} label="Choose Case" variant="outlined" />
          )}
          onChange={(event, value) => handleSelectCase(value)}
        />
        <FormControl component="fieldset" className={classes.folderOption}>
          <RadioGroup
            value={folderSelectMode}
            onChange={handleFolderSelectMode}
          >
            <FormControlLabel
              value="existing"
              control={<Radio />}
              className={classes.folderOptionRadio}
              label={
                <Autocomplete
                  options={currCaseFolders}
                  getOptionLabel={(option) => option.folderName}
                  style={{
                    width: 300,
                    marginTop: "5px",
                    marginLeft: "20px",
                  }}
                  key={selectedCaseId} // clear selected case ID will trigger re-render this component
                  disabled={folderSelectMode !== "existing"}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Choose Folder to Edit"
                      variant="outlined"
                    />
                  )}
                  onChange={(event, value) => handleSelectFolder(value)}
                />
              }
            />
            <FormControlLabel
              value="new"
              control={<Radio />}
              className={classes.folderOptionRadio}
              label={
                <TextField
                  label="Create New Folder"
                  variant="outlined"
                  key={selectedCaseId} // clear selected case ID will trigger re-render this component
                  style={{ marginLeft: "20px", width: 300 }}
                  disabled={
                    folderSelectMode !== "new" || selectedCaseId === null
                  }
                  onChange={handleNewFolder}
                />
              }
            />
          </RadioGroup>
        </FormControl>
        <FormControl
          className={classes.removeCheckBoxGroup}
          component="fieldset"
        >
          <FormControlLabel
            control={
              <Checkbox
                className={classes.removeCheckbox}
                color="primary"
                name="removeFolder"
                key={selectedFolder}
                checked={removeFolder}
                disabled={
                  folderSelectMode !== "existing" || selectedFolder === null
                }
                onChange={handleSelectFolderToRemove}
              />
            }
            label="Remove whole FOLDER and FILES"
          />
          <p style={{ color: "red", marginLeft: "60px" }}>
            (Be Careful with this option)
          </p>
        </FormControl>
      </Box>

      <Paper variant="outlined" className={classes.ablumBase}>
        <Typography variant="h6" style={{ padding: "10px" }}>
          File Browser
        </Typography>
        <Typography variant="subtitle1" style={{ padding: "10px" }}>
          Note: Only *.JPG and *.PNG file can be uploaded. After click "SAVE"
          button, please wait bottom notification disappeared before next file
          change.
        </Typography>
        <Box className={classes.ablumBox} key={selectedCaseId}>
          {/* imageInfo: [fileKey, url] */}
          {remoteImageFiles.map((imageInfo, imageIndex) => (
            <Box key={imageIndex} className={classes.ablumImageBox}>
              <img src={imageInfo[1]} className={classes.ablumImage}></img>
              <CloseIcon
                className={classes.ablumRemoveButton}
                onClick={(e) => handleRemove(e, imageIndex)}
              />
              {filesToRemove.includes(imageInfo[0]) ? (
                <Typography variant="h5" className={classes.ablumRemoveMark}>
                  REMOVE
                </Typography>
              ) : null}
            </Box>
          ))}
          {filesToUpload.map((file, fileIndex) => (
            <Box key={fileIndex} className={classes.ablumImageBox}>
              <img
                src={window.URL.createObjectURL(file)}
                className={classes.ablumImage}
              />
              <CloseIcon
                className={classes.ablumRemoveButton}
                onClick={(e) => handleDeslectFiles(e, file.name)}
              />
            </Box>
          ))}
          <Box className={classes.ablumAddBox} component="label">
            <AddIcon fontSize="large" />
            <input
              hidden
              accept="image/*"
              multiple
              type="file"
              onChange={handleSelectFiles}
            />
          </Box>
        </Box>
      </Paper>
      {currUploadFile !== null ? <h3>Upload {currUploadFile}</h3> : null}
      {uploadProgress !== 0 ? (
        <LinearProgress
          variant="determinate"
          value={uploadProgress}
          className={classes.progressBar}
        />
      ) : null}

      <Button
        variant="contained"
        color="primary"
        className={classes.saveButton}
        onClick={handleSaveButtonClick}
        disabled={disableSaveButton}
      >
        Save
      </Button>
      <Button
        variant="contained"
        color="secondary"
        className={classes.resetButton}
        onClick={handleReset}
      >
        RESET
      </Button>
      <Fade in={updateError !== null}>
        <Alert variant="filled" severity="error" className={classes.alert}>
          {updateError}
        </Alert>
      </Fade>
      <Fade in={updateSuccess !== null}>
        <Alert variant="filled" severity="success" className={classes.alert}>
          {updateSuccess}
        </Alert>
      </Fade>
    </div>
  );
}
