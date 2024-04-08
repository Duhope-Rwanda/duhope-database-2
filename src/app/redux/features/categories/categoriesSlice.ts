import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { editCategory, deleteCategory } from "./categoriesActions";

const initialState = {
  loadingCategories: false,
  categories: [],
  error: { payload: null, status: false },
  response: false,
};

const categoriesReducers = createSlice({
  name: "categories",
  initialState: initialState,
  reducers: {
    setCategories(state, action: PayloadAction<[]>) {
      state.categories = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loadingCategories = action.payload;
    },
  },
  extraReducers: (builder) => {
    // edit category
    builder.addCase(editCategory.pending,(state)=>{
      state.loadingCategories=true
    })

    builder.addCase(editCategory.fulfilled, (state) => {
      state.loadingCategories = false;
      state.response = true;
    });

    builder.addCase(editCategory.rejected, (state, action) => {
      state.loadingCategories = false;
      state.error = { payload: action.error as any, status: true };
    });

    // delete category

    builder.addCase(deleteCategory.pending, (state) => {
      state.loadingCategories = true;
    });
    builder.addCase(deleteCategory.fulfilled, (state) => {
      state.loadingCategories = false;
      state.response = true;
    });
    builder.addCase(deleteCategory.rejected, (state, action) => {
      state.loadingCategories = false;
      state.error = { payload: action.error as any, status: true };
    });
  }
})
export const { setCategories, setLoading } = categoriesReducers.actions;
export default categoriesReducers.reducer;