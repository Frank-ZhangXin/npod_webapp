import React, { Children } from "react";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  title: {
    fontWeight: "900",
  },
}));

export default function CaseViewTitle(props) {
  const classes = useStyles();
  const { onClose, children } = props;
  return (
    <div>
      <MuiDialogTitle>
        <div>
          <Typography variant="h4" className={classes.title}>
            {children}
          </Typography>
        </div>
        <IconButton
          aria-label="close"
          onClick={onClose}
          className={classes.closeButton}
        >
          <CloseIcon />
        </IconButton>
      </MuiDialogTitle>
    </div>
  );
}
