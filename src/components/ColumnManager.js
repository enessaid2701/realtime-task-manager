import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addColumn, updateColumnName } from '../store/tasksSlice';
import { TextField, Button, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ColumnManager = () => {
  const [newColumnName, setNewColumnName] = useState('');
  const [editColumnId, setEditColumnId] = useState(null);
  const [editColumnName, setEditColumnName] = useState('');

  const columns = useSelector(state => state.tasks.columns);
  const dispatch = useDispatch();

  const handleAddColumn = () => {
    if (newColumnName.trim()) {
      dispatch(addColumn(newColumnName));
      setNewColumnName('');
    }
  };

  const handleEditColumn = (id, name) => {
    setEditColumnId(id);
    setEditColumnName(name);
  };

  const handleUpdateColumnName = () => {
    if (editColumnName.trim()) {
      dispatch(updateColumnName({ id: editColumnId, newName: editColumnName }));
      setEditColumnId(null);
      setEditColumnName('');
    }
  };

  return (
    <div>
      <TextField
        label="New Column Name"
        value={newColumnName}
        onChange={(e) => setNewColumnName(e.target.value)}
      />
      <Button onClick={handleAddColumn}>Add Column</Button>

      {columns.map(column => (
        <div key={column.id}>
          {editColumnId === column.id ? (
            <>
              <TextField
                value={editColumnName}
                onChange={(e) => setEditColumnName(e.target.value)}
              />
              <Button onClick={handleUpdateColumnName}>Update</Button>
            </>
          ) : (
            <>
              <h3>{column.name}</h3>
              <IconButton onClick={() => handleEditColumn(column.id, column.name)}>
                <EditIcon />
              </IconButton>
              <IconButton>
                <DeleteIcon />
              </IconButton>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default ColumnManager;
