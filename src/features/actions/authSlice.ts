import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../../types/user";

interface ActionsState {
  user: User;
  alert: {
    title: string;
    message: string;
    showAlert: boolean;
  };
}

const initialState: ActionsState = {
  user: { email: "", password: "", isAdmin: false },
  alert: { title: "", message: "", showAlert: false },
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    alert: (
      state,
      action: PayloadAction<{ title: string; message: string }>,
    ) => {
      state.alert.title = action.payload.title;
      state.alert.message = action.payload.message;
      state.alert.showAlert = true;
    },
    closeAlert: (state) => {
      state.alert.showAlert = false;
    },
    loginUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    logoutUser: (state) => {
      localStorage.removeItem("token");
      state.user = { email: "", password: "", isAdmin: false };
    },
  },
});

export const { loginUser, logoutUser, alert, closeAlert } = authSlice.actions;
export default authSlice.reducer;
