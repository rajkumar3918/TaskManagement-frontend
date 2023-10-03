import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";


const taskSliceGet = createSlice({
    name: "Taskget",
    initialState: {
        value:{},
        status: "pending",
        error: null
    },
    reducers:{},
    extraReducers: builder => builder
    .addCase(fetchTasks.pending,(state, action)=>{
        state.status = "pending";
    })
    .addCase(fetchTasks.rejected,(state, action)=>{
        state.status = "rejected";
        state.error = action.payload
    })
    .addCase(fetchTasks.fulfilled,(state, action)=>{
        state.status = "fulfilled";
        state.value = action.payload;
    }),

});

export const fetchTasks = createAsyncThunk("/fetchTask", async ()=>{
    try {
        const data = await axios.get("https://taskmanagementapi-9do0.onrender.com/tasks/getAll");
        return data;
    } catch (error) {
        return error.message
    }
});


export default taskSliceGet;