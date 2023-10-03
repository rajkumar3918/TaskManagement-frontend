import { configureStore } from "@reduxjs/toolkit";
import taskSlice from "./slice/taskSlice";
import taskSliceGet from "./slice/taskSliceget";
import userSlice from "./slice/userSlice";


const store = configureStore({
    reducer:{
        Tasks: taskSlice.reducer,
        Taskget: taskSliceGet.reducer,
        AllUsers: userSlice.reducer
    }
});

export default store;