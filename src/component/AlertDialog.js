import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function AlertDialog({
  title,
  contentText,
  open,
  setOpen,
  btn1Name,
  btn2Name,
  callBack,
  onCloseCallback,
}) {
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    if (onCloseCallback) {
      onCloseCallback();
    }
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{contentText}</DialogContentText>
        </DialogContent>
        <DialogActions>
          {btn1Name && !btn2Name ? (
            <Button
              onClick={handleClose}
              color="primary"
              variant="contained"
              autoFocus
            >
              {btn1Name}
            </Button>
          ) : (
            <>
              <Button onClick={handleClose} color="primary">
                {btn1Name}
              </Button>
              <Button onClick={callBack} color="primary" autoFocus>
                {btn2Name}
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
