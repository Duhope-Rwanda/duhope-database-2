import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserProps } from "../../../types/app.type";
import { PasswordResetEmail, getUserByUserId } from "./authThunk";

interface UserState {
  error: string | null | Object;
  token:string | null;
  user:  UserProps | null;
  loggedInUser: UserProps | null;
  resetError: string | null;
  resetSuccess: string | null;
  loading: boolean;
}

const initialState: UserState = {
  error: null,
  user: null,
  token: null,
  loggedInUser: null,
  resetError: null,
  loading: false,
  resetSuccess: null
};



const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    clearAuth: (state) => {
      state.user = null;
      state.token = null;
    },

    updateLoggedInUser(state, action: PayloadAction<UserProps[]>) {
    },
    updateUserProfile(state, action) {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    // password reset
    builder.addCase(PasswordResetEmail.pending, (state) => {
     state.resetError = null;
     state.loading = true;
     state.resetSuccess = null;
    })
    .addCase(PasswordResetEmail.fulfilled, (state,action) => {
      state.resetError = null;
      state.resetSuccess = 'link sent';
      state.loading = false;
    })
    .addCase(PasswordResetEmail.rejected, (state, action) => {
      state.resetError = action.error.message as any;
      state.loading = false;
      state.resetSuccess = null;
    })
    .addCase(getUserByUserId.pending, (state, action) =>{
      state.loading = true;
    })
    .addCase(getUserByUserId.fulfilled, (state, action) =>{
      state.loading = false;
      state.user = action.payload as unknown as UserProps
    })
    .addCase(getUserByUserId.rejected, (state, action) =>{
      state.loading = false;
      state.error = "Error";
    })
  }
});

export const { setUser, setToken, clearAuth, updateUserProfile, updateLoggedInUser } = authSlice.actions;
export default authSlice.reducer;
