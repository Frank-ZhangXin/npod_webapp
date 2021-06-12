import * as React from "react";
import { DataGrid } from "@material-ui/data-grid";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  title: {
    paddingBottom: theme.spacing(2),
  },
  content: {
    paddingTop: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.primary,
  },
  commment: {
    marginTop: theme.spacing(2),
    width: "70%",
  },
  submit: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(2),
  },
}));

function Comments(props) {
  const classes = useStyles();

  const columns = [
    { field: "date", headerName: "Date", width: 150 },
    { field: "value", headerName: "Value", width: 230 },
  ];

  const rows = [
    {
      id: 1,
      date: "2021-02-01",
      value: "This is an example comment.",
    }, // need mockup
    {
      id: 2,
      date: "2021-03-01",
      value: "This is an example comment2.",
    }, // need mockup
    {
      id: 3,
      date: "2021-04-01",
      value: "This is an example comment3.",
    }, // need mockup
  ];

  return (
    <div>
      <div>
        <Typography variant="h5" className={classes.title}>
          COMMENT
        </Typography>
      </div>
      <div style={{ height: "350px", width: "100%" }}>
        <DataGrid rows={rows} columns={columns} autoPageSize={true} />
      </div>
      <div>
        <form>
          <TextField
            label="Comment"
            variant="outlined"
            size="small"
            className={classes.commment}
          />
          <Button
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}

// Subscribe
const mapStateToProps = (state) => {
  return {
    // Filtered Data
    currentCase: state.explore.currentCase,
  };
};

export default connect(mapStateToProps, null)(Comments);
