import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface ActionsState {
  value: number;
}

const initialState: ActionsState = {
  value: 0,
};

const actionsSlice = createSlice({
  name: "actions",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      if (state.value === 0) return;
      state.value -= 1;
    },
    setValue: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
  },
});

export const { increment, decrement, setValue } = actionsSlice.actions;
export default actionsSlice.reducer;
