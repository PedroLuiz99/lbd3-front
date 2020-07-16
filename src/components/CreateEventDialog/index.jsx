import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import moment from "moment";
import { parseToSQL } from "../../services/parseDate";
import { useToasts } from "react-toast-notifications";

export default function CreateEventDialog({
  open,
  handleAgree = () => {},
  handleDisagree = () => {},
  handleClose = () => {},
  agreeButtonText = "Save",
  disagreeButtonText = "Cancel",
}) {
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [endDate, setEndDate] = useState(moment());
  const [startDate, setStartDate] = useState(moment());

  const { addToast } = useToasts();

  const handleAgreeModal = async () => {
    try {
      const newEvent = {
        event_name: eventName,
        event_description: eventDescription,
        end_date: parseToSQL(endDate.toISOString()),
        start_date: parseToSQL(startDate.toISOString()),
      };

      if (!newEvent.event_name || !newEvent.event_description) {
        return addToast("Please, complete all required fields", {
          appearance: "error",
          autoDismiss: true,
        });
      }

      await handleAgree(null, newEvent);
      handleClose();
    } catch (error) {
      console.warn(error);
    }
  };

  useEffect(() => {
    if (!open) {
      setEventName("");
      setEventDescription("");
      setEndDate(moment());
      setStartDate(moment());
    }
  }, [open]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      keepMounted={false}
    >
      <DialogTitle id="form-dialog-title">Creating</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To create an event, fill the fields and click after in `save` button
        </DialogContentText>
        <Grid container style={{ marginTop: 15 }}>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Event name"
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid container style={{ marginTop: 15 }}>
          <TextField
            id="standard-multiline-static"
            label="Event description"
            multiline
            fullWidth
            rows={4}
            value={eventDescription}
            onChange={(e) => setEventDescription(e.target.value)}
          />
        </Grid>
        <Grid container style={{ marginTop: 15 }}>
          <TextField
            id="datetime-local"
            label="Start date"
            type="datetime-local"
            value={
              (startDate &&
                startDate.toISOString() &&
                startDate.toISOString().substring(0, 16)) ||
              ""
            }
            onChange={(e) => {
              setStartDate(moment.utc(e.target.value));
            }}
          />
        </Grid>
        <Grid container style={{ marginTop: 15 }}>
          <TextField
            id="datetime-local"
            label="End date"
            type="datetime-local"
            value={
              (endDate &&
                endDate.toISOString() &&
                endDate.toISOString().substring(0, 16)) ||
              ""
            }
            onChange={(e) => setEndDate(moment.utc(e.target.value))}
          />
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={async (e) => {
            await handleDisagree(e);
            handleClose();
          }}
          color="primary"
        >
          {disagreeButtonText}
        </Button>
        <Button onClick={handleAgreeModal} color="primary">
          {agreeButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
