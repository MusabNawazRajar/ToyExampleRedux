import { createSlice } from '@reduxjs/toolkit';

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: [],
  reducers: {
    addTask: (state, action) => {
      state.push(action.payload);
    },
    deleteTask: (state, action) => {
      return state.filter((task, index) => index !== action.payload);
    },
    editTask: (state, action) => {
      const { index, newText } = action.payload;
      state[index] = newText;
    },
  },
});

export const { addTask, deleteTask, editTask } = tasksSlice.actions;
export default tasksSlice.reducer;
