import React, { useRef, useState} from "react";
import "../styles/register.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const Signin = ()=>{
    const formRef = useRef();
    const navigate = useNavigate();
    const [err, setErr] = useState(false);
    
    const submitHandler = async(e)=>{
        e.preventDefault();
        const data = {
            email: formRef.current.email.value,
            password: formRef.current.password.value,
        }
        try {
            const {email, password} = data
            const loginFetch = await axios.post("https://taskmanagementapi-9do0.onrender.com/users/login" , {
                email, password
            });
            console.log(loginFetch)
            const res = loginFetch.data
            const userDetails = JSON.stringify(res)
            sessionStorage.setItem("userData", userDetails);
            if(typeof(res) == typeof({})) navigate("/home") 
            else setErr(true);
            
        } catch (error) {
            console.log(error.message)
        }
        
    }
    
    return(
        <div className="register-cont">
        <div className="sidebar">
            <h1>Task Management</h1>
        </div>
       
        <div className="form-cont">
            <div className="header">
            <h1>Sign in</h1>
            <p>Sign in to your account</p>
            </div>
            <form ref={formRef} onSubmit={submitHandler}>
                <label htmlFor="email">Email address</label>
                <input name="email" type="email" placeholder="Ex: abc@gmail.com" required/>
                <label htmlFor="password">Password</label>
                <input name="password" type="password" placeholder="Password" required/>
                <p style={err?{display:"block",color:"red"}:{display:"none"}}>Somthing went wrong</p>
                <button type="submit">Sign in</button>
            </form>

            <p>Don't have an account? <a style={{color:"blue"}} onClick={()=>navigate("/register")}>Register</a></p>
        </div>
    </div>
    )
}

export default Signin;