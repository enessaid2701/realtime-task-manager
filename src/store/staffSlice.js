import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: []
};

const staffSlice = createSlice({
  name: 'staff',
  initialState,
  reducers: {
    addStaff: (state, action) => {
      state.list.push(action.payload);
    }
  }
});

export const { addStaff } = staffSlice.actions;

export default staffSlice.reducer;
