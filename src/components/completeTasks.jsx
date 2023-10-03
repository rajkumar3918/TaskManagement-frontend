import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTasks } from "../redux/slice/taskSliceget";
import {FiEdit} from "react-icons/fi";
import {MdDelete} from "react-icons/md";
import axios from "axios";

const CompleteTasks = ()=>{
    const taskData = useSelector(state=>state.Taskget.value);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(fetchTasks());
    },[]);

    const fetchDelete = async(e)=>{
        const data = {taskId : e._id}
        try {
            await axios.delete("https://taskmanagementapi-9do0.onrender.com/tasks/deleteTask",{data})
            dispatch(fetchTasks());
            return
        } catch (error) {
            console.log(error);
        }

    };
    
    const handleChange = async (e,event)=>{
        const check = event.target.checked
        const data = {taskId : e._id, status: check}
        console.log(data)
        try {
            const {taskId, status} = data;
           await axios.patch("https://taskmanagementapi-9do0.onrender.com/tasks/completeTask",{taskId, status})
           dispatch(fetchTasks());
           return
        

        } catch (error) {
            console.log(error.message)
        }
        
    }
    return(
        <div className="task-cont">
            
        {taskData.data && taskData.data.map((e)=>{
           if (e.complete) return (
                <div className="task-items" style={e.complete?{backgroundColor:"rgb(200, 249, 200)"}:{backgroundColor:"white"}}>
                    <p className="admin" style={{fontSize:"medium", left:"10px",}}>Undo</p>
                    <input type="checkBox" checked={true} onChange={(event)=>handleChange(e,event)}/>
                    <div className="title-cont">
                    <p className="title">{e.title}<span className="_id">{e._id}</span></p>
                    <p className="desc">{e.description}</p>
                    </div>
                    <p style={{fontSize:"small"}}>complete</p>
                    <MdDelete className="delete" onClick={()=>fetchDelete(e)}/>
                </div>
            )
        })}
</div>
    )
}

export default CompleteTasks;