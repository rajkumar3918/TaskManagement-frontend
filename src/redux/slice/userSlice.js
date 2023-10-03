import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";


const userSlice = createSlice({
    name: "AllUsers",
    initialState: {
        users:{},
        status: "pending",
        error: null
    },
    reducers:{},
    extraReducers: builder => builder
    .addCase(fetchUsers.pending,(state, action)=>{
        state.status = "pending";
    })
    .addCase(fetchUsers.rejected,(state, action)=>{
        state.status = "rejected";
        state.error = action.payload
    })
    .addCase(fetchUsers.fulfilled,(state, action)=>{
        state.status = "fulfilled";
        state.users = action.payload;
    }),

});

export const fetchUsers = createAsyncThunk("/fetchUsers", async ()=>{
    try {
        const data = await axios.get("https://taskmanagementapi-9do0.onrender.com/users/");
        return data;
    } catch (error) {
        return error.message
    }
});


export default userSlice;