import { useEffect, useRef, useState } from "react"
import "../styles/homepage.scss"
import { useDispatch, useSelector } from "react-redux"
import { PostTasks} from "../redux/slice/taskSlice";
import TasksSection from "../components/tasksSection";
import {MdDashboardCustomize,MdDoneAll,MdAccountBox} from "react-icons/md";
import { useNavigate } from "react-router";
import TaskForm from "../components/taskForm";
import CompleteTasks from "../components/completeTasks";
import { fetchUsers } from "../redux/slice/userSlice";
import Sidebar from "../components/sideBar";
import { fetchTasks } from "../redux/slice/taskSliceget";

const Homepage = ()=>{
    const dispatch = useDispatch();
    const formRef = useRef();
    const [show, setShow] = useState(false);
    const [details, setDetails] = useState();
    const [load, setLoad] = useState(false);
    const userDetails = sessionStorage.getItem("userData");
    const userData = JSON.parse(userDetails);
    const navigate = useNavigate();
    const scroll = useRef();

    const submitHandler = async (e)=>{
        e.preventDefault();
        setLoad(true);
        const data = {
            title: formRef.current.title.value,
            description: formRef.current.desc.value,
            userId: userData.userId,
            username: userData.username
        }
        await dispatch(PostTasks(data));
        setDetails(data)
        setShow(false)
        setLoad(false);
        await dispatch(fetchTasks());
        scroll.current.scrollTop = scroll.current.scrollHeight
    }; 


   const logout = ()=>{
    sessionStorage.removeItem("userData");
    navigate("/");
   }

   useEffect(()=>{
    if(typeof(userData) !== typeof({}) || !userData) {
        alert("Please login to make changes");
        navigate("/");
        return
    }
    dispatch(fetchUsers());
   },[])

    return(
        <div className="home-cont">
            <div className="navbar">
                <h3>Task Manager</h3>
                <button onClick={logout}>Logout</button>
            </div>
            <div className="body">
                <Sidebar pass={show} setPass={setShow}/>

                <div className="dashboard">
                    <h4 className="headline">Project Tasks</h4>
                <TasksSection pass={scroll} />
                <h4 className="com-task">Completed Tasks</h4>
                <CompleteTasks />
                </div>
                 <div className="taskForm-cont" style={show? {display:"flex"}:{display:"none"}}>
                        <TaskForm setPass={setShow} submit={submitHandler} passRef={formRef} pass={load} title="Add Task" edit="Add"/>
                </div>
            </div>
        </div>
    )
}

export default Homepage