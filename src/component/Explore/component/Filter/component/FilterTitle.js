import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
  },
  title: {
    paddingTop: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  Button: {
    paddingTop: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
}));

function FilterTitle(props) {
  const classes = useStyles();

  return (
    <div>
      <Box display="flex">
        <Box className={classes.title} flexGrow={1}>
          <Typography variant="h4" className={classes.root}>
            FILTERS
          </Typography>
        </Box>
        <Box className={classes.Button}>
          <Button
            variant="contained"
            color="primary"
            className={classes.root}
            onClick={(e) => props.setReset()}
          >
            RESET
          </Button>
        </Box>
      </Box>
    </div>
  );
}

// update
const mapDispatchToProps = (dispatch) => {
  return {
    setReset: () => dispatch({ type: "SET_RESET", value: null }),
  };
};

export default connect(null, mapDispatchToProps)(FilterTitle);
