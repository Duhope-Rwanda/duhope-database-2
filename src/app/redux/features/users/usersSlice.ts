import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "./usersActions";

const initialState = {
  users: [],
  loadingUser: false,
  error: { payload: null, status: false },
};

const usersReducer = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.loadingUser = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loadingUser = false;
      state.users = action.payload as any;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loadingUser = false;
      state.error = { payload: action.error as any, status: true };
    });
  },
});

export default usersReducer.reducer;