import { createSlice,createAsyncThunk  } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
    isLoading: false,
    listOfMovies: [],
    totalPages:0
  };

// add Product Image 
  export const addProductImage = createAsyncThunk(
    "/admin/image",
    async (image) => {
      const response = await axios.post(
        `http://localhost:5000/api/v1/admin/upload`,
        { image }
      );
      return response.data;
    }
  );

// add product 

export const addMovie = createAsyncThunk(
  "/movie/add",
  async (formData) => {
    const response = await axios.post(
      `http://localhost:8000/api/v1/movies/add`,
      
      formData, // Send formData directly
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );   

return  response.data
    
  }
);

// edit product 
export const editMovie = createAsyncThunk(
  "/movie/edit",
  async ({ id,formData }) => {
    console.log("id",id)
    
    console.log("formData",formData)

    const result = await axios.put(
      `http://localhost:8000/api/v1/movies/edit/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(result.data)
    return result.data;
  }
);



// delete product 

// export const deleteProduct = createAsyncThunk(
//   "/product/delete",
//   async (id, { rejectWithValue }) => {
//     try {
//       console.log(id);
//       const response = await axios.delete(
//         `http://localhost:5000/api/v1/admin/delete/${id}`
//       );
//       const data = response.data;
//       return data;
//     } catch (error) {
//       console.error("Error deleting product:", error);
//       return rejectWithValue(error.response?.data || "Something went wrong");
//     }
//   }
// );




// fetch product 
export const getAllMovies = createAsyncThunk(
  "/products/getProduct",
  async (page) => {
    const result = await axios.get(
      `http://localhost:8000/api/v1/movies/all-movies/?page=${page}`
    );
    return result.data;
  }
);

// export const getProductDetail = createAsyncThunk(
//   "/products/getSingleProduct",
//   async (id) => {
//     // console.log("id in slice",id)
//     const result = await axios.get(
//       `http://localhost:5000/api/v1/admin/single/${id}`
//     );
// // console.log(result)
//     return result.data;
//   }
// );





  
const MoviesSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {},
extraReducers:(builder)=>{
  builder.addCase(getAllMovies.pending,(state)=>{
    state.isLoading=true
  }).addCase(getAllMovies.fulfilled,(state,{payload})=>{
    state.isLoading=false
    state.listOfMovies=payload?.data
    state.totalPages=payload?.totalPages


  }).addCase(getAllMovies.rejected,(state,{paylaod})=>{
state.isLoading=false
state.listOfMovies=paylaod?.data
  })
}


  });
  
  export default MoviesSlice.reducer;