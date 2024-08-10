import React from 'react';
import {Card, CardContent, IconButton, Typography } from '@mui/material';
import { MoreHoriz as MoreHorizIcon, Delete as DeleteIcon, Check as CheckIcon } from '@mui/icons-material';

const TaskColumn = ({ columnId, tasks, deleteTask, completeTask }) => {

  const handleComplete = (taskId) => {
    completeTask({ taskId });
  };

  const handleDelete = (taskId) => {
    deleteTask({ taskId, columnId });
  };

  return (
    <div style={{ flex: 1, margin: '0 10px', border: '1px solid #ccc', borderRadius: '4px', padding: '10px' }}>
      <Typography variant="h6" style={{ borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
        {columnId}
      </Typography>
      {tasks.map(task => (
        <Card key={task.id} style={{ marginBottom: '10px' }}>
          <CardContent>
            <Typography variant="h6">{task.title}</Typography>
            <Typography variant="body2" color="textSecondary">{task.date}</Typography>
            <Typography variant="body2">{task.description}</Typography>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
              <IconButton onClick={() => handleDelete(task.id)}><DeleteIcon /></IconButton>
              <IconButton onClick={() => handleComplete(task.id)}><CheckIcon /></IconButton>
              <IconButton><MoreHorizIcon /></IconButton>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TaskColumn;
