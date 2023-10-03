import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTasks } from "../redux/slice/taskSliceget";
import {FiEdit} from "react-icons/fi";
import {MdDelete} from "react-icons/md";
import axios from "axios";
import TaskForm from "./taskForm";


const TasksSection = (prop)=>{
    const userDetails = sessionStorage.getItem("userData");
    const userData = JSON.parse(userDetails);
    const taskData = useSelector(state=>state.Taskget.value);
    const dispatch = useDispatch();
    const [details,setDetails] = useState({})
    const [done, setDone]=useState(false);
    const formRef = useRef();
    const [show, setShow] = useState(false);


    const submitHandler = (e,event)=>{
        event.preventDefault();
        show? setShow(false):setShow(true)
        setDetails(e);
        return
    };
    const fetchUpdate = async(e)=>{
        const data = {
            taskId: details._id,
            title: formRef.current.title.value,
            description: formRef.current.desc.value,
        }
        try {
            const {taskId, title, description} = data
            return await axios.patch("https://taskmanagementapi-9do0.onrender.com/tasks/updateTask",{taskId, title, description})
        } catch (error) {
            console.log(error);
        }
    }

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
        <div>
            <div className="taskForm-cont" style={show? {right:"0px"}:{right:"-340px"}}>
                <TaskForm setPass={setShow} submit={fetchUpdate} passRef={formRef} title="Edit Task" edit="Edit"/>
            </div>
            <div className="task-cont" ref={prop.pass}>
                        {taskData.data && taskData.data.map((e)=>{
                           if(!e.complete) return (
                                <div className="task-items" style={e.complete?{backgroundColor:"rgb(200, 249, 200)"}:{}}>
                                    <p className="admin">Created by: {e.username == userData.username? "You":e.username}</p>
                                    <div className="title-cont">
                                    <p className="title">{e.title}<span className="_id">{e._id}</span></p>
                                    <p className="desc">{e.description}</p>
                                    </div>
                                    {e.complete? <p style={{fontSize:"small"}}>complete</p>:<input type="checkbox" onChange={(event)=>handleChange(e,event)}/>}
                                    {e.complete?"":<FiEdit className="edit" onClick={(event)=>submitHandler(e,event)}/>}
                                    <MdDelete className="delete" onClick={()=>fetchDelete(e)}/>
                                    
                                </div>
                            )
                        })}
            </div>

        </div>
    )
}

export default TasksSection