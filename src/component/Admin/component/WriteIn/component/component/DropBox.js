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
}));

export default function DropBox({ name, value, setValue, setChanged, ops }) {
  const classes = useStyles();
  const [defaultValue, setDefaultValue] = useState(null);
  const handleChange = (selected) => {
    setDefaultValue(selected);
    setValue(selected.value);
    setChanged(true);
  };

  return (
    <div>
      <Box display="flex" alignItems="center">
        <Box>
          <label>{name}:</label>
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
