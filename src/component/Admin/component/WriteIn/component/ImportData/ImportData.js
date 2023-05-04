import React from "react";
import { Typography } from "@material-ui/core";
import ImportHLADataFile from "./component/ImportHLADataFile";
import ImportRNADataFile from "./component/ImportRNADataFile";

export default function ImportData() {
  return (
    <div>
      <ImportHLADataFile />
      {/* <ImportRNADataFile /> */}
    </div>
  );
}
