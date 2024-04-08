import { createSlice } from "@reduxjs/toolkit";
import { fetchProducts,addProduct,fetchProduct,deleteProduct,updateProduct,fetchProductsByGroup,removeGroupFromProduct} from "./productActions";

const initialState = {
  products: [],
  featureProducts:[],
  loading: false,
  error: { payload: null, status: false },
  selectedProduct: {},
  selectLoading: false,
  response: false,
  isAdding: false,
  addResponse: '',
  loadingGroups: false,
  groups: [],
  productByCategory: [],
  sections: [],
};

const productsReducer = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload as any;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = { payload: action.error as any, status: true };
    });
    builder.addCase(addProduct.pending, (state) => {
      state.isAdding = true;
      state.addResponse = '';
    });
    builder.addCase(addProduct.fulfilled, (state, action) => {

      state.isAdding = false;
      state.response = true;
        state.addResponse ='Product added successfully';
    });
    builder.addCase(addProduct.rejected, (state, action) => {
      state.isAdding = false;
      state.error = { payload: action.error as any, status: true };
      state.addResponse = '';
    });

    builder.addCase(fetchProduct.pending, (state) => {
      state.selectLoading = true;
    });
    builder.addCase(fetchProduct.fulfilled, (state, action) => {
      state.selectLoading = false;
      state.selectedProduct = action.payload as any;
    });
    builder.addCase(fetchProduct.rejected, (state, action) => {
      state.selectLoading = false;
      state.error = { payload: action.error as any, status: true };
    });
    
    builder.addCase(deleteProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.response = true;
    });
    builder.addCase(deleteProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = { payload: action.error as any, status: true };
    });

    builder.addCase(updateProduct.pending,(state)=>{
      state.loading = true;
    })

    builder.addCase(updateProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.response = true;
    });

    builder.addCase(updateProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = { payload: action.error as any, status: true };
    });

    builder.addCase(fetchProductsByGroup.pending, (state) => {

      state.loading = true;
    });
    
    builder.addCase(fetchProductsByGroup.fulfilled, (state, action) => {
      state.loading = false;
      state.productByCategory = action.payload as any;

    });

    builder.addCase(fetchProductsByGroup.rejected, (state, action) => {
      state.loading = false;
      state.error = { payload: action.error as any, status: true };
    });

    builder.addCase(removeGroupFromProduct.pending, (state) => {

      state.loading = true;
    });

    builder.addCase(removeGroupFromProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.response = true;
    });

    builder.addCase(removeGroupFromProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = { payload: action.error as any, status: true };
    });
  },
});

export default productsReducer.reducer;