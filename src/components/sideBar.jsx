import {MdDashboardCustomize,MdDoneAll,MdAccountBox} from "react-icons/md";
import { useSelector } from "react-redux";

const Sidebar = (prop)=>{
    const Users = useSelector(state=>state.AllUsers.users);

    return(
        <div className="sideBar">
                    <p><MdDashboardCustomize className="icons"/> Dashboard</p>
                    <p><MdDoneAll className="icons"/> Completed Tasks</p>
                    <p><MdAccountBox className="icons"/> Account</p>
                    <button className="task-btn" onClick={()=> prop.pass? prop.setPass(false):prop.setPass(true)}>+Add Task</button>
                    <div className="all-users">
                        <p style={{fontWeight:"500", color:"#E55604", marginTop:"10px"}}>Users</p>
                        {Users.data && Users.data.map((e)=>{
                            return(
                                <div className="user">
                                    <p className="name">{e.username}</p>
                                    <p className="email">{e.email}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
    )
};

export default Sidebar;