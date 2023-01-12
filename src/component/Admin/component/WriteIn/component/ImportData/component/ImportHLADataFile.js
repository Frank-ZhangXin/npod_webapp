import React from "react";
import { Button, Typography, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";

export default function ImportHLADataFile() {
  return (
    <div>
      <Typography variant="h5">HLA Data Import</Typography>
      <Autocomplete
        options={[{ caseId: "6430" }, { caseId: "6431" }, { caseId: "6439" }]}
        getOptionLabel={(option) => option.caseId}
        style={{ width: 300, marginTop: "20px" }}
        renderInput={(params) => (
          <TextField {...params} label="Choose Case" variant="outlined" />
        )}
      />

      <Button variant="outlined" component="label" style={{ marginTop: 10 }}>
        Choose File
        <input hidden accept="image/*" multiple type="file" />
      </Button>
      <br></br>
      <Button variant="contained" color="primary" style={{ marginTop: 10 }}>
        Upload
      </Button>
    </div>
  );
}
