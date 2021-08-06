import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Viewer from "react-viewer";

const useStyles = makeStyles((theme) => ({
  imageList: {
    display: "flex",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    padding: "4px",
  },
  imageItem: {
    height: "150px",
    width: "150px",
    padding: "2px",
  },
  img: {
    height: "100%",
    width: "100%",
    cursor: "pointer",
  },
  viewer: {
    height: "55vh",
  },
  viewerContainer: {
    height: "55vh",
    padding: "2px",
  },
}));

const imageArray = [];

function TissueQualityImageViewer(props) {
  useEffect(() => {
    setImages(
      importAll(
        require.context(
          "../../../../../assets/tempCaseImage/6546/Tissue Quality/",
          false,
          /\.(png|jpe?g|svg)$/
        )
      )
    );

    function importAll(r) {
      return r.keys().map((r) => {
        const image =
          require("../../../../../assets/tempCaseImage/6546/Tissue Quality/" +
            r.slice(2)).default;
        return { src: image };
      });
    }
  }, []);
  const classes = useStyles();
  const [images, setImages] = useState([]);
  const [visible, setVisible] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  console.log(images);

  return (
    <div>
      <div id="viewerContainer" className={classes.viewerContainer} />
      <div className={classes.imageList}>
        {images.map((item, index) => {
          return (
            <div key={index.toString()} className={classes.imageItem}>
              <img
                src={item.src}
                onClick={() => {
                  setVisible(true);
                  setActiveIndex(index);
                }}
                className={classes.img}
              />
            </div>
          );
        })}
      </div>

      <Viewer
        visible={visible}
        noClose
        activeIndex={activeIndex}
        zoomSpeed={0.5}
        images={images}
        container={document.getElementById("viewerContainer")}
        className={classes.viewer}
      />
    </div>
  );
}

// const rootElement = document.getElementById("root");
// ReactDOM.render(<TissueQualityImageViewer />, rootElement);

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

export default connect(mapStateToProps, null)(TissueQualityImageViewer);
