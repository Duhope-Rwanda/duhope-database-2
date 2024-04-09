import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { editCohort, deleteGroup } from "./cohortsActions";

const initialState = {
  loadingCohorts: false,
  cohorts: [],
  error: { payload: null, status: false },
  response: false,
};

const cohortsReducers = createSlice({
  name: "cohorts",
  initialState: initialState,
  reducers: {
    setCohorts(state, action: PayloadAction<[]>) {
      state.cohorts = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loadingCohorts = action.payload;
    },
  },
  extraReducers: (builder) => {
    // edit cohort
    builder.addCase(editCohort.pending,(state,action)=>{
      state.loadingCohorts=true
    })

    builder.addCase(editCohort.fulfilled, (state, action) => {
      state.loadingCohorts = false;
      state.response = true;
    });

    builder.addCase(editCohort.rejected, (state, action) => {
      state.loadingCohorts = false;
      state.error = { payload: action.error as any, status: true };
    });

    // delete group

    builder.addCase(deleteGroup.pending, (state) => {
      state.loadingCohorts = true;
    });
    builder.addCase(deleteGroup.fulfilled, (state, action) => {
      state.loadingCohorts = false;
      state.response = true;
    });
    builder.addCase(deleteGroup.rejected, (state, action) => {
      state.loadingCohorts = false;
      state.error = { payload: action.error as any, status: true };
    });
  }
})

export const { setCohorts, setLoading } = cohortsReducers.actions;
export default cohortsReducers.reducer;