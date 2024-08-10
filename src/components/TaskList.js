import React from 'react';
import { List, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import { deleteTask } from '../store/tasksSlice';
import socket from '../socket';
import './TaskList.css';

function TaskList({ tasks }) {
  const dispatch = useDispatch();

  const handleDelete = (taskId) => {
    socket.emit('deleteTask', taskId);
    dispatch(deleteTask(taskId));
  };

  return (
    <List>
      {tasks.map((task) => (
        <ListItem key={task.id} secondaryAction={
          <IconButton edge="end" onClick={() => handleDelete(task.id)}>
            <DeleteIcon />
          </IconButton>
        }>
          <ListItemText
            primary={task.title}
            secondary={
              <>
                <div className="task-description">{task.description}</div>
                <div>Due: {task.dueDate}</div>
                <div>Staff: {task.taskStaff}</div>
              </>
            }
          />
        </ListItem>
      ))}
    </List>
  );
}

export default TaskList;
