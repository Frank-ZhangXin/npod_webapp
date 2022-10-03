import React, { useState } from "react";
import Select from "react-select";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  select: {
    width: "220px",
    //height: "25px",
    marginLeft: "4px",
    marginBottom: "5px",
  },
  labelColored: {
    backgroundColor: "#fae7cf",
    padding: "3px",
  },
  label: {
    padding: "3px",
  },
}));

export default function DropBox({ name, value, setValue, setChanged, ops }) {
  const classes = useStyles();
  const [defaultValue, setDefaultValue] = useState(null);
  const [labelChanged, setLabelChanged] = useState(false);
  const handleChange = (selected) => {
    setDefaultValue(selected);
    setValue(selected.value);
    // Dropdown list for selecting AAb and RNA table record doesn't need to be set as "changed"
    if (
      name !== "RNA ID List" &&
      name !== "AAb ID List" &&
      name !== "Vial ID List"
    ) {
      setLabelChanged(true);
      setChanged(true);
    }
  };

  return (
    <div>
      <Box display="flex" alignItems="center">
        <Box>
          <label
            className={labelChanged ? classes.labelColored : classes.label}
          >
            {name}:
          </label>
        </Box>
        <Box>
          <Select
            className={classes.select}
            value={
              defaultValue
                ? defaultValue
                : ops.map((op) => {
                    if (op.value === value) {
                      return op;
                    }
                  })
            }
            onChange={handleChange}
            options={ops}
          />
        </Box>
      </Box>
    </div>
  );
}
