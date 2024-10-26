import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const generalSlider = createSlice({
  name: 'general',
  initialState: {
    filter: {
      ranges: [18, 100],
      country: '',
      city: '',
      gender: 'GENDER.ALL',
      active: false,
      new_user: false,
      evaluation: false,
    },
    reminderInformation: false,
  },
  reducers: {
    setGeneralFilter(state: any, action: PayloadAction<{} | boolean>) {
      state.filter = action.payload;
    },
  },
});

export const {setGeneralFilter} = generalSlider.actions;
export default generalSlider.reducer;
