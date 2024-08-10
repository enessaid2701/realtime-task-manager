import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './/store/tasksSlice';

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
});

export default store;
