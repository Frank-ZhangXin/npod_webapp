import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import CaseViewTitle from "./component/CaseViewTitle";
import TabView from "./component/TabView/TabView";
import GetAppIcon from "@material-ui/icons/GetApp";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    margin: "auto",
    width: "fit-content",
  },
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 120,
  },
  formControlLabel: {
    marginTop: theme.spacing(1),
  },
  dialogBackground: {
    height: "90vh",
    maxHeight: "95vh",
  },
  dialogContent: {
    height: "50vh",
    maxHeight: "60vh",
  },
}));

function CaseView(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("xl");

  const handleClose = () => {
    props.setDialogue(false);
  };

  return (
    <div>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={props.open}
        onClose={handleClose}
        aria-labelledby="donnor-case-dialog-title"
        classes={{ paper: classes.dialogBackground }}
      >
        <CaseViewTitle onClose={handleClose}>
          NPOD CASE ID: {props.currentCase.case_id}
        </CaseViewTitle>

        <DialogContent dividers>
          {/* <DialogContentText></DialogContentText> */}
          <TabView />
        </DialogContent>
        <DialogActions>
          <Button color="primary">
            <GetAppIcon />
            Download All
          </Button>
        </DialogActions>
      </Dialog>
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

export default connect(mapStateToProps, null)(CaseView);
