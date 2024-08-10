import { createSlice } from '@reduxjs/toolkit';

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    columns: {
      toDo: [],
      inProgress: [],
      done: [],
    },
    staff: [],
  },
  reducers: {
    addTask: (state, action) => {
      state.columns.toDo.push(action.payload);
    },
    deleteTask: (state, action) => {
      const { taskId, columnId } = action.payload;
      state.columns[columnId] = state.columns[columnId].filter(task => task.id !== taskId);
    },
    assignTask: (state, action) => {
      const { taskId, assignedTo } = action.payload;
      const task = Object.values(state.columns).flat().find(task => task.id === taskId);
      if (task) {
        task.assignedTo = assignedTo;
        state.columns.toDo = state.columns.toDo.filter(task => task.id !== taskId);
        state.columns.inProgress.push(task);
      }
    },
    completeTask: (state, action) => {
      const { taskId } = action.payload;
      const task = Object.values(state.columns).flat().find(task => task.id === taskId);
      if (task) {
        state.columns.inProgress = state.columns.inProgress.filter(task => task.id !== taskId);
        state.columns.done.push(task);
      }
    },
    addStaff: (state, action) => {
      state.staff.push(action.payload);
    },
    updateTaskStatus: (state, action) => {
      const { taskId, sourceColumnId, destinationColumnId } = action.payload;
      const task = state.columns[sourceColumnId].find(task => task.id === taskId);
      if (task) {
        state.columns[sourceColumnId] = state.columns[sourceColumnId].filter(task => task.id !== taskId);
        state.columns[destinationColumnId].push(task);
      }
    },
  },
});

export const { addTask, deleteTask, assignTask, completeTask, addStaff, updateTaskStatus } = tasksSlice.actions;
export default tasksSlice.reducer;
