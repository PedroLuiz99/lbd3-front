import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import { DateTimePicker, KeyboardDateTimePicker } from "@material-ui/pickers";

export default function EditEventDialog({
  open,
  event,
  handleAgree = () => {},
  handleDisagree = () => {},
  handleClose = () => {},
  agreeButtonText = "Salvar",
  disagreeButtonText = "Cancelar",
}) {
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [endDate, setEndDate] = useState(null);
  const [startDate, setStartDate] = useState(null);

  const resetStates = () => {
    setEventName("");
    setEventDescription("");
    setEndDate(null);
    setStartDate(null);
  };

  const eventToStates = (provided) => {
    setEventName(provided.event_name || "");
    setEventDescription(provided.event_description || "");
    setEndDate(new Date(provided.end_date));
    setStartDate(new Date(provided.start_date));
  };

  useEffect(() => {
    if (!event) {
      return resetStates();
    }

    eventToStates(event);
  }, [event]);

  console.log({ eventName, eventDescription, endDate, startDate });

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      keepMounted={false}
    >
      <DialogTitle id="form-dialog-title">Editando</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Para editar um evento, altere as informações necessárias e clique em
          salvar.
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
            label="Multiline"
            multiline
            fullWidth
            rows={4}
            value={eventDescription}
            onChange={(e) => setEventDescription(e.target.value)}
          />
        </Grid>
        <Grid container style={{ marginTop: 15 }}>
          <KeyboardDateTimePicker
            variant="inline"
            fullWidth
            label="Start date"
            value={startDate}
            onChange={setStartDate}
            onError={console.log}
            format="yyyy/MM/DD HH:mm A"
          />
        </Grid>
        <Grid container style={{ marginTop: 15 }}>
          <KeyboardDateTimePicker
            variant="inline"
            fullWidth
            label="End date"
            value={endDate}
            onChange={setEndDate}
            onError={console.log}
            format="yyyy/MM/DD HH:mm A"
          />
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={async (e) => {
            await handleDisagree(e, event);
            handleClose();
          }}
          color="primary"
        >
          {disagreeButtonText}
        </Button>
        <Button
          onClick={async (e) => {
            await handleAgree(e, event);
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
