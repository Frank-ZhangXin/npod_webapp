import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import { Storage } from "aws-amplify";
import NpodImageGallery from "../../component/NpodImageGallery";

const useStyles = makeStyles((theme) => ({
  title: {
    paddingBottom: theme.spacing(2),
  },
  title2: {
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
  helpText: {
    padding: "10px",
    textShadow: "0 0 20px white",
  },
}));

const ImageViewerTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    color: "#000000",
    border: "1px solid #dadde9",
    maxWidth: "420px",
    fontSize: 15,
  },
}))(Tooltip);

function FunctionalAssayImageViewer(props) {
  const [fileUrlList, setFileUrlList] = useState([]);
  const [imageUrlList, setImageUrlList] = useState([]);
  useEffect(() => {
    async function getFile(fileKey) {
      try {
        await Storage.get(fileKey).then((url) => {
          setFileUrlList((oldList) => [...oldList, { url }]);
          setImageUrlList((oldList) => [
            ...oldList,
            { original: url, thumbnail: url },
          ]);
          if (currentImageUrl === "") {
            setCurrentImageUrl(url);
          }
        });
      } catch (error) {
        console.error("[S3]Get file error", error);
      }
    }

    async function getFileList() {
      try {
        await Storage.list(
          "cases/" + props.currentCase.case_id + "/Functional Assay/"
        ).then((fileKeyList) => {
          if (fileKeyList.length !== 0) {
            for (let i = 0; i < fileKeyList.length; i++) {
              // filter out folder
              if (fileKeyList[i].size) {
                getFile(fileKeyList[i].key);
              }
            }
          }
        });
      } catch (error) {
        console.error("[S3]Get file list error", error);
      }
    }
    getFileList();
  }, [props.currentCase.case_id]);

  const classes = useStyles();

  const [currentImageUrl, setCurrentImageUrl] = useState("");

  const helpText = (
    <React.Fragment>
      <div className={classes.helpText}>
        Hint:
        <br />
        Single click to zoom-in image. Click once more to zoom-out.
        <br />
        Click left and right arrow button to browse gallery.
      </div>
    </React.Fragment>
  );

  //console.log("Image viewer file list", imageUrlList);

  return (
    <div>
      <div>
        <Typography variant="h5" className={classes.title}>
          Image Viewer
        </Typography>
        <Typography variant="body1" className={classes.title2}>
          How-to-use{"  "}
          <ImageViewerTooltip title={helpText} placement="right">
            <HelpOutlineIcon className={classes.helpIcon} />
          </ImageViewerTooltip>
        </Typography>
      </div>
      <div>
        <NpodImageGallery urlList={imageUrlList} />
      </div>
    </div>
  );
}

// Subscribe
const mapStateToProps = (state) => {
  return {
    // Filtered Data
    currentCase: state.explore.currentCase,

    // Donor Types (map)
    donorTypesMap: state.explore.donorTypesMap,

    // Cause of Deaht map
    causeOfDeathMap: state.explore.causeOfDeathMap,
  };
};

export default connect(mapStateToProps, null)(FunctionalAssayImageViewer);
