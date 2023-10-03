import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";


const taskSlice = createSlice({
    name: "Task",
    initialState: {
        post:{},
        status: "pending",
        error: null
    },
    reducers:{},

    extraReducers:builder=>builder
    .addCase(PostTasks.pending,(state, action)=>{
        state.status = "pending";
    })
    .addCase(PostTasks.rejected,(state, action)=>{
        state.status = "rejected";
        state.error = action.payload
    })
    .addCase(PostTasks.fulfilled,(state, action)=>{
        state.status = "fulfilled";
        state.post = action.payload;
    }),
});


export const PostTasks = createAsyncThunk("/addTask", async (args)=>{
    const {title, description, userId, username} = args;
    try {
        const data = await axios.post("https://taskmanagementapi-9do0.onrender.com/tasks/addTask",{
            title, description, userId, username
        });
        return data;
    } catch (error) {
        return error.message
    }
});

export default taskSlice;