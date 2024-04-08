import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchWomen, addWoman, editWoman, deleteWoman, getWomanById } from "./womenActions";

const initialState = {
  loadingWomen: false,
  women: [],
  selectedWomen: {} as any,
  error: { payload: null, status: false },
  response: false,
};

const womenReducers = createSlice({
  name: "women",
  initialState: initialState,
  reducers: {
    setWomen(state, action: PayloadAction<[]>) {
      state.women = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loadingWomen = action.payload;
    },
  },
  extraReducers: (builder) => {
    // fetch women
    builder.addCase(fetchWomen.pending, (state) => {
      state.loadingWomen = true;
    });
    builder.addCase(fetchWomen.fulfilled, (state, action) => {
      state.loadingWomen = false;
    });
    builder.addCase(fetchWomen.rejected, (state, action) => {
      state.loadingWomen = false;
      state.error = { payload: action.error as any, status: true };
    });

    // get women by Id
    builder.addCase(getWomanById.pending, (state) => {
      state.loadingWomen = true;
    });
    builder.addCase(getWomanById.fulfilled, (state, action) => {
      state.loadingWomen = false;
      state.selectedWomen = action.payload as any;
    });
    builder.addCase(getWomanById.rejected, (state, action) => {
      state.loadingWomen = false;
      state.error = { payload: action.error as any, status: true };
    });

    // add women
    builder.addCase(addWoman.pending,(state,action)=>{
      state.loadingWomen=true
    })
    builder.addCase(addWoman.fulfilled, (state, action) => {
      state.loadingWomen = false;
      state.response = true;
    });
    builder.addCase(addWoman.rejected, (state, action) => {
      state.loadingWomen = false;
      state.error = { payload: action.error as any, status: true };
    });

    // edit women
    builder.addCase(editWoman.pending,(state,action)=>{
      state.loadingWomen=true
    })
    builder.addCase(editWoman.fulfilled, (state, action) => {
      state.loadingWomen = false;
      state.response = true;
    });
    builder.addCase(editWoman.rejected, (state, action) => {
      state.loadingWomen = false;
      state.error = { payload: action.error as any, status: true };
    });

    // delete women
    builder.addCase(deleteWoman.pending, (state) => {
      state.loadingWomen = true;
    });
    builder.addCase(deleteWoman.fulfilled, (state, action) => {
      state.loadingWomen = false;
      state.response = true;
    });
    builder.addCase(deleteWoman.rejected, (state, action) => {
      state.loadingWomen = false;
      state.error = { payload: action.error as any, status: true };
    });
  }
})

export const { setWomen, setLoading } = womenReducers.actions;
export default womenReducers.reducer;