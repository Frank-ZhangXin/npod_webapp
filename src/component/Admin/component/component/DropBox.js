import React, { useState } from "react";
import Select from "react-select";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  select: {
    width: "220px",
    //height: "25px",
    marginLeft: "4px",
    marginBottom: "5px",
  },
}));

export default function DropBox({ value, setValue, setChanged, ops }) {
  const classes = useStyles();
  const [defaultValue, setDefaultValue] = useState(null);
  const handleChange = (selected) => {
    setDefaultValue(selected);
    setValue(selected.value);
    setChanged(true);
  };

  return (
    <div>
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
    </div>
  );
}
