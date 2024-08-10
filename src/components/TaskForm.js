import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';

const TaskForm = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Yeni Görev Oluştur</DialogTitle>
      <DialogContent>
        <TextField autoFocus margin="dense" label="Başlık" fullWidth />
        <TextField margin="dense" label="Tarih" type="date" fullWidth InputLabelProps={{ shrink: true }} />
        <TextField margin="dense" label="Açıklama" fullWidth multiline rows={4} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Kapat</Button>
        <Button onClick={onClose} color="primary">Kaydet</Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskForm;
