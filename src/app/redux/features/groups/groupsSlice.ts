import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { editGroup, deleteGroup, addProductsToGroup, removeProductFromGroup } from "./groupsActions";

const initialState = {
  loadingGroups: false,
  groupsProducts: [],
  groups: [],
  error: { payload: null, status: false },
  response: false,
};

const groupsReducers = createSlice({
  name: "groups",
  initialState: initialState,
  reducers: {
    setGroups(state, action: PayloadAction<[]>) {
      state.groups = action.payload;
    },
    setGroupsProducts(state, action: PayloadAction<[]>) {
      state.groupsProducts = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loadingGroups = action.payload;
    },
  },
  extraReducers: (builder) => {
    // edit group
    builder.addCase(editGroup.pending,(state,action)=>{
      state.loadingGroups=true
    })

    builder.addCase(editGroup.fulfilled, (state, action) => {
      state.loadingGroups = false;
      state.response = true;
    });

    builder.addCase(editGroup.rejected, (state, action) => {
      state.loadingGroups = false;
      state.error = { payload: action.error as any, status: true };
    });

    // delete group

    builder.addCase(deleteGroup.pending, (state) => {
      state.loadingGroups = true;
    });
    builder.addCase(deleteGroup.fulfilled, (state, action) => {
      state.loadingGroups = false;
      state.response = true;
    });
    builder.addCase(deleteGroup.rejected, (state, action) => {
      state.loadingGroups = false;
      state.error = { payload: action.error as any, status: true };
    });

    // add products to groups

    builder.addCase(addProductsToGroup.pending, (state) => {
      state.loadingGroups = true;
    });
    builder.addCase(addProductsToGroup.fulfilled, (state, action) => {
      state.loadingGroups = false;
      state.response = true;
    });
    builder.addCase(addProductsToGroup.rejected, (state, action) => {
      state.loadingGroups = false;
      state.error = { payload: action.error as any, status: true };
    });

    // add products to groups

    builder.addCase(removeProductFromGroup.pending, (state) => {
      state.loadingGroups = true;
    });
    builder.addCase(removeProductFromGroup.fulfilled, (state, action) => {
      state.loadingGroups = false;
      state.response = true;
    });
    builder.addCase(removeProductFromGroup.rejected, (state, action) => {
      state.loadingGroups = false;
      state.error = { payload: action.error as any, status: true };
    });
  }
})

export const { setGroups, setLoading, setGroupsProducts } = groupsReducers.actions;
export default groupsReducers.reducer;