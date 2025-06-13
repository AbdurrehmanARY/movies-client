import { createSlice,createAsyncThunk, isRejectedWithValue } from '@reduxjs/toolkit'

import axios from "axios"

const initialState = {
isAuthenticated:false,
isLoading:false,
user:null
}


// register user
export const registerUser = createAsyncThunk(
  "/auth/register",
  async ( formData) => {

    try {
      const response = await axios.post(
        // "https://movies-client-tau.vercel.app/api/v1/auth/register"
        "https://movies-server-tau.vercel.app/api/v1/auth/register"
        ,
        formData,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.error("Error during registration:", error.response?.data);
      return thunkAPI.rejectWithValue({
        message: error.response?.data?.message || "Registration failed",
        success: error.response?.data?.success ,
      });
    }
  }
);




// login user 
export const loginUser = createAsyncThunk(
  "/auth/login",

  async (formData) => {
    console.log('formData',formData)
   try{
 const response = await axios.post(
      "https://movies-server-tau.vercel.app/api/v1/auth/login",
      formData,
      {
        withCredentials: true,
      }
    );

    return response.data;

   }
   catch(error){
    console.error("Error during login:", error);
    return error.response
   }
  }
);


export const logoutUser = createAsyncThunk(
  "/auth/logout",

  async () => {
  
    try{
      const response = await axios.post(
      "https://movies-server-tau.vercel.app/api/v1/auth/logout",
     
      {},
      {
        withCredentials: true,
      }
    );
    return response.data
    }
    catch(error){
      console.error("Error during logout:", error);
      return error.response
    }
  }
);


export const myProfile = createAsyncThunk(
  "/auth/my-profile",
  async () => {
    try{
      const response = await axios.get(
        "https://movies-server-tau.vercel.app/api/v1/auth/my-profile",
        { withCredentials: true }
      );
      return response.data; // <-- Only return the serializable data
    }
    catch(error){
      // Optionally, return a serializable error object
      return {
        success: false,
        message: error?.response?.data?.message || "Error fetching profile"
      }
    }
  }
);


const authSlice=createSlice({
  name:"auth",
  initialState,
  extraReducers:(builder)=>{
  //   builder.addCase(registerUser.fulfilled,(state,action)=>{
  //     state.isLoading=false
  //     state.isAuthenticated=false
  //     state.user=null
  //   }).
  //   addCase(registerUser.pending,(state,action)=>{
  //     state.isLoading=true
  //   }).
  // addCase(registerUser.rejected,(state,action)=>{
  //     state.isLoading=false
  //     state.isAuthenticated=false
  //     state.user=null
      
  //   }).
   builder.addCase(loginUser.pending,(state)=>{
      state.isLoading=true
     }).
    addCase(loginUser.fulfilled,(state,{payload})=>{
 state.isLoading=false
 state.isAuthenticated=true
 state.user=payload.success ?payload.user: null
}).
addCase(loginUser.rejected,(state)=>{
  state.isLoading=false
  state.isAuthenticated=false
  state.user=null
 }).
 addCase(myProfile.pending,(state)=>{
  state.isLoading=true
 }).
 addCase(myProfile.fulfilled,(state,{payload})=>{
  state.isLoading = false;
  state.isAuthenticated = payload.success;
  state.user = payload.success ? payload.user : null;
}).
 addCase(myProfile.rejected,(state)=>{
  state.isLoading=false
  state.isAuthenticated=false
  state.user=null
 }).
 addCase(logoutUser.fulfilled,(state,{payload})=>{
  state.isLoading=false
  state.isAuthenticated=false
  state.user=null
 })
    
  }
})
export default authSlice.reducer