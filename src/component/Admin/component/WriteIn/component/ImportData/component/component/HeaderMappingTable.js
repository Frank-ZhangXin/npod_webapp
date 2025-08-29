import React, { useState, useEffect } from "react";

import {
  Typography,
  TextField,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Autocomplete,
  Box,
} from "@mui/material";

// import { Autocomplete } from "@material-ui/lab";

function StyledPaper(props) {
  return (
    <Paper
      variant="outlined"
      sx={{
        width: "80%",
        maxHeight: 400,
        overflow: "auto",
        marginTop: 1,
        marginBottom: 2,
      }}
    >
      {props.children}
    </Paper>
  );
}

export default function HeaderMappingTable({
  tableHeaders,
  fileHeaders,
  setMapping,
}) {
  useEffect(() => {
    tableHeaders.forEach((header) =>
      setMapping((prevValues) => {
        return { ...prevValues, [header]: null };
      })
    );
  }, [tableHeaders]);

  const handleSelectHeader = (theFileHeader, theTableHeader) => {
    setMapping((prevValues) => {
      return { ...prevValues, [theTableHeader]: theFileHeader };
    });
  };

  return (
    <div>
      <Typography variant="h6" sx={{ marginTop: 2 }}>
        Database and File Headers Mapping
      </Typography>
      <TableContainer component={StyledPaper}>
        <Table stickyHeader>
          <TableHead>
            <TableRow
              sx={{ "& th": { fontWeight: 600, backgroundColor: "#e6e6e6" } }}
            >
              <TableCell sx={{ width: "50%" }}>TABLE HEADER</TableCell>
              <TableCell>FILE HEADER</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableHeaders ? (
              tableHeaders.map((tHeader, index) => {
                return (
                  <TableRow id={index}>
                    <TableCell>{tHeader}</TableCell>
                    <TableCell>
                      <Autocomplete
                        options={fileHeaders}
                        onChange={(event, fHeader) =>
                          handleSelectHeader(fHeader, tHeader)
                        }
                        key={fileHeaders} // <========= The dropdown will reset when fileHeader got changed
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Choose Header"
                            variant="outlined"
                          />
                        )}
                      />
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell>pending</TableCell>
                <TableCell>pending</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
