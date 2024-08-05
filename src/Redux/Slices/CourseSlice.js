import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast"
import axiosInstance from "../../Helpers/axiosInstance";

const initialState = {
    courseData:[]
}

export const getAllCourses = createAsyncThunk("/course/get", async ()=> {
    try{
        const response = axiosInstance.get("/courses");
        toast.promise(response, {
            loading: "loading course data...",
            success: "courses loded successfully",
            error: "Failed to get the courses",
        });
        return (await response).data.courses

    } catch(err) {
        toast.error(err?.response?.data?.message);
    }
})

const courseSlice = createSlice({
    name: "courses",
    initialState,
    reducers:{},
    extraReducers: (builder) =>{
        builder.addCase(getAllCourses.fulfilled,(state,action) =>{
            if(action.payload) {
                state.courseData = [...action.payload];
            }
        })

    } 
})

export default courseSlice.reducer;