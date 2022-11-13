import React from "react";
import { Typography } from "@material-ui/core";
import UploadImageFile from "./component/UploadImageFile";

export default function UploadImage() {
  return (
    <div>
      <Typography variant="h4">Select File and Upload</Typography>
      <UploadImageFile />
    </div>
  );
}
