import React, { useState, useEffect, Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ImageGallery from "react-image-gallery";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

class NpodImageGallery extends Component {
  constructor() {
    super();
  }

  _imageRender(item) {
    const imgStyle = {
      maxWidth: "600px",
    };

    return (
      <div>
        <Zoom>
          <img src={item.original} style={imgStyle} />
        </Zoom>
      </div>
    );
  }

  render() {
    const no_image_available = [
      {
        original: process.env.PUBLIC_URL + "/assets/image-not-found.jpeg",
        thumbnail: process.env.PUBLIC_URL + "/assets/image-not-found.jpeg",
      },
    ];
    const properties = {
      items:
        this.props.urlList.length === 0
          ? no_image_available
          : this.props.urlList,
      showPlayButton: false,
      showFullscreenButton: false,
      renderItem: this._imageRender.bind(this),
    };

    return (
      <div>
        <ImageGallery {...properties} />
      </div>
    );
  }
}

export default NpodImageGallery;
