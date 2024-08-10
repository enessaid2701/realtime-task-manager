import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, deleteTask, assignTask, completeTask } from '../store/tasksSlice';
import { Button, Card, CardContent, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField, Typography, Box } from '@mui/material';
import { MoreHoriz as MoreHorizIcon, Delete as DeleteIcon, Check as CheckIcon } from '@mui/icons-material';

const TaskManager = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(state => state.tasks.columns);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskStaff, setTaskStaff] = useState('');
  const [taskDialogOpen, setTaskDialogOpen] = useState(false);

  const handleOpenTaskDialog = () => setTaskDialogOpen(true);
  const handleCloseTaskDialog = () => setTaskDialogOpen(false);

  const handleAddTask = () => {
    if (taskTitle.trim() && taskDate && taskDescription.trim()) {
      dispatch(addTask({
        id: Date.now().toString(),
        title: taskTitle,
        date: taskDate,
        description: taskDescription,
        taskStaff:taskStaff,
        assignedTo: ''
      }));
      setTaskTitle('');
      setTaskDate('');
      setTaskDescription('');
      setTaskStaff('');
      handleCloseTaskDialog();
    } else {
      alert('Lütfen tüm alanları doldurun');
    }
  };

  const handleDeleteTask = (taskId, columnId) => {
    dispatch(deleteTask({ taskId, columnId }));
  };

  const handleAssignTask = (taskId, assignedTo) => {
    dispatch(assignTask({ taskId, assignedTo }));
  };

  const handleCompleteTask = (taskId) => {
    dispatch(completeTask({ taskId }));
  };

  return (
    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', margin: 1 }}>
      <Box sx={{ display: 'flex', overflowX: 'auto', flex: 1 }}>
        {Object.keys(tasks).map(columnId => (
          <Box key={columnId} sx={{ flex: 1, margin: 1, border: '1px solid #ccc', borderRadius: '4px', padding: 2 }}>
            <Typography variant="h6" sx={{ borderBottom: '1px solid #ccc', paddingBottom: 1 }}>
              {columnId}
            </Typography>
            {tasks[columnId].map(task => (
              <Card key={task.id} sx={{ marginBottom: 1 }}>
                <CardContent>
                  <Typography variant="h6">{task.title}</Typography>
                  <Typography variant="body2" color="textSecondary">Date: {task.date}</Typography>
                  <Typography variant="body2">Description: {task.description}</Typography>
                  <Typography variant="body2">Staff: {task.taskStaff}</Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 1 }}>
                    <IconButton onClick={() => handleDeleteTask(task.id, columnId)}><DeleteIcon /></IconButton>
                    {columnId === 'toDo' && (
                      <IconButton onClick={() => handleAssignTask(task.id, 'staffMember')}><MoreHorizIcon /></IconButton>
                    )}
                    {columnId === 'inProgress' && (
                      <IconButton onClick={() => handleCompleteTask(task.id)}><CheckIcon /></IconButton>
                    )}
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        ))}
      </Box>
      <Button variant="contained" color="primary" onClick={handleOpenTaskDialog} sx={{ marginTop: 2 }}>
        New Task
      </Button>
      <Dialog open={taskDialogOpen} onClose={handleCloseTaskDialog}>
        <DialogTitle>New Task</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            type="text"
            fullWidth
            variant="standard"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Date"
            type="date"
            fullWidth
            variant="standard"
            InputLabelProps={{ shrink: true }}
            value={taskDate}
            onChange={(e) => setTaskDate(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Staff"
            type="text"
            fullWidth
            variant="standard"
            value={taskStaff}
            onChange={(e) => setTaskStaff(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseTaskDialog}>Cancel</Button>
          <Button onClick={handleAddTask}>Add</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TaskManager;
