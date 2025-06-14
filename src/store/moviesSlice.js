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
        `https://movies-server-tau.vercel.app/api/v1/movies/upload`,
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
      `https://movies-server-tau.vercel.app/api/v1/movies/add`,
      
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

    const result = await axios.put(
      `https://movies-server-tau.vercel.app/api/v1/movies/edit/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return result.data;
  }
);







// fetch product 
export const getAllMovies = createAsyncThunk(
  "/products/getProduct",
  async (page) => {
    const result = await axios.get(
      `https://movies-server-tau.vercel.app/api/v1/movies/all-movies/?page=${page}`
    );
    return result.data;
  }
);






  
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