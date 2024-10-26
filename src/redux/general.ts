import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const generalSlider = createSlice({
  name: 'general',
  initialState: {
    filter: {
      all: [],
    },
    reminderInformation: false,
  },
  reducers: {
    setAll(state: any, action: PayloadAction<{} | boolean>) {
      state.filter = action.payload;
    },
  },
});

export const {setAll} = generalSlider.actions;
export default generalSlider.reducer;
