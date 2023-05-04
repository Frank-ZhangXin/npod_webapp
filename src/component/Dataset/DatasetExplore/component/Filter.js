import React, { useState, useEffect } from "react";
import {
  Container,
  FormControlLabel,
  Box,
  Checkbox,
  FormControl,
  FormLabel,
  FormGroup,
  Chip,
  Autocomplete,
  TextField,
  Typography,
} from "@mui/material";

export default function Filter({ filterSelected, setFilterSelected }) {
  // Usage filter setting
  const [usage, setUsage] = useState({
    RNASeq: true,
    sequenceSpecificDNABinding: true,
    transcriptomicData: true,
  });
  const { RNASeq, sequenceSpecificDNABinding, transcriptomicData } = usage;

  const handleUsageChange = (event) => {
    setUsage(() => ({
      ...usage,
      [event.target.name]: event.target.checked,
    }));
  };

  // Dataset Type filter setting
  const [datasetType, setDatasetType] = useState({
    transcriptomicDataSet: false,
    genomicDataset: false,
    epigennomicDataset: false,
  });
  const { transcriptomicDataSet, genomicDataset, epigennomicDataset } =
    datasetType;
  const hanldeDatasetTypeChange = (event) => {
    setDatasetType(() => ({
      ...datasetType,
      [event.target.name]: event.target.checked,
    }));
  };

  // Type filter
  const [type, setType] = useState({
    genetics: false,
    transcriptomics: false,
    proteomics: false,
    metabolomics: false,
    imaging: false,
  });

  const { genetics, transcriptomics, proteomics, metabolomics, imaging } = type;

  const handleTypeChange = (event) => {
    setType(() => ({
      ...type,
      [event.target.name]: event.target.checked,
    }));
  };

  // Case ID filter
  const [caseId, setCaseId] = useState([]);
  const handleCaseIdChange = (event) => {
    console.log("event name", event.name);
    console.log("event target value", event.target.value);
  };

  // Re-render after filters changed
  useEffect(() => {
    setFilterSelected({ usageFilter: usage, datasetTypeFilter: datasetType });
  }, [usage, datasetType]);

  const usageSubFilter = (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      {/* ------Usage filter------ */}
      {/* <FormControl sx={{ m: 3 }}>
        <FormLabel>Usage</FormLabel>
        <FormGroup sx={{ ml: 2 }}>
          <FormControlLabel
            label="RNA-Seq"
            control={
              <Checkbox
                checked={RNASeq}
                onChange={handleUsageChange}
                name="RNASeq"
              />
            }
          />
          <FormControlLabel
            label="sequence-specific DNA binding"
            control={
              <Checkbox
                checked={sequenceSpecificDNABinding}
                onChange={handleUsageChange}
                name="sequenceSpecificDNABinding"
              />
            }
          />
          <FormControlLabel
            label="transcriptomic data"
            control={
              <Checkbox
                checked={transcriptomicData}
                onChange={handleUsageChange}
                name="transcriptomicData"
              />
            }
          />
        </FormGroup>
      </FormControl> */}
      {/* ------Dataset Type filter------ */}
      {/* <FormControl sx={{ m: 3 }}>
        <FormLabel>Dataset Type</FormLabel>
        <FormGroup sx={{ ml: 2 }}>
          <FormControlLabel
            label="Transcriptomics Dataset"
            control={
              <Checkbox
                checked={transcriptomicDataSet}
                onChange={hanldeDatasetTypeChange}
                name="transcriptomicDataSet"
              />
            }
          />
          <FormControlLabel
            label="Genomics Dataset "
            control={
              <Checkbox
                checked={genomicDataset}
                onChange={hanldeDatasetTypeChange}
                name="genomicDataset"
              />
            }
          />
          <FormControlLabel
            label=" Epigenomics Dataset"
            control={
              <Checkbox
                checked={epigennomicDataset}
                onChange={hanldeDatasetTypeChange}
                name="epigennomicDataset"
              />
            }
          />
        </FormGroup>
      </FormControl> */}
      {/* ------Type filter------ */}
      <Typography variant="h5" sx={{ marginTop: 3, marginLeft: 2 }}>
        FOR DEMO ONLY
      </Typography>
      <FormControl sx={{ m: 3 }}>
        <FormLabel>Type</FormLabel>
        <FormGroup sx={{ ml: 2 }}>
          <FormControlLabel
            label="Genetics"
            control={
              <Checkbox
                checked={genetics}
                onChange={handleTypeChange}
                name="genetics"
              />
            }
          />
          <FormControlLabel
            label="Transcriptomics"
            control={
              <Checkbox
                checked={transcriptomics}
                onChange={handleTypeChange}
                name="transcriptomics"
              />
            }
          />
          <FormControlLabel
            label="Proteomics"
            control={
              <Checkbox
                checked={proteomics}
                onChange={handleTypeChange}
                name="proteomics"
              />
            }
          />
          <FormControlLabel
            label="Metabolomics"
            control={
              <Checkbox
                checked={metabolomics}
                onChange={handleTypeChange}
                name="metabolomics"
              />
            }
          />
          <FormControlLabel
            label="Imaging"
            control={
              <Checkbox
                checked={imaging}
                onChange={handleTypeChange}
                name="imaging"
              />
            }
          />
        </FormGroup>
      </FormControl>
      {/* ------Case ID filter------ */}
      <FormControl sx={{ m: 3 }}>
        <FormLabel>Case ID</FormLabel>
        <Autocomplete
          sx={{ paddingLeft: 2 }}
          multiple
          id="case-id-filter"
          options={[
            { name: 6110 },
            { name: 6111 },
            { name: 6112 },
            { name: 6113 },
          ]}
          getOptionLabel={(option) => option.name}
          // defaultValue={[caseIdOptions[0]]}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              label="Specify Case ID"
              placeholder="Select or type Case ID"
            />
          )}
        />
      </FormControl>
    </Box>
  );

  return <Container maxWidth="md">{usageSubFilter}</Container>;
}
