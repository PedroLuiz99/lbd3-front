import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function AlertDialog({
  open,
  title,
  description,
  customValues,
  handleAgree = () => {},
  handleDisagree = () => {},
  handleClose = () => {},
  agreeButtonText = "Yes",
  disagreeButtonText = "No",
}) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      keepMounted={false}
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={async (e) => {
            await handleDisagree(e, customValues);
            handleClose();
          }}
          color="primary"
        >
          {disagreeButtonText}
        </Button>
        <Button
          onClick={async (e) => {
            await handleAgree(e, customValues);
            handleClose();
          }}
          color="primary"
        >
          {agreeButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
