import React, {useEffect, useRef, useState} from "react";
import { useNavigate } from "react-router";
import "../styles/register.scss";
import axios from "axios";
import Loading from "../components/loader";

const Register = ()=>{
    const formRef = useRef();
    const navigate = useNavigate();
    const [load, setLoad] = useState(false);

    const submitHandler = async (e)=>{
        e.preventDefault();
        setLoad(true)
        const data = {
            username: formRef.current.userName.value,
            email:formRef.current.email.value,
            password: formRef.current.password.value,
        }

        try {
            const {username, email, password} = data
            const postUser = await axios.post("https://taskmanagementapi-9do0.onrender.com/users/register",{
                username, email, password
            })
            console.log(postUser);
            navigate("/")
            setLoad(false);
            return postUser;
        } catch (error) {
            console.log(error.message);
        }
    };


    return(
        <div className="register-cont">
        <div className="sidebar">
            <h1>Task Management</h1>
        </div>
       
        <div className="form-cont">
            <div className="header">
            <h1>Register</h1>
            <p>Register to create a new account</p>
            </div>
            <form ref={formRef} onSubmit={submitHandler}>
                <label htmlFor="userName">User Name</label>
                <input name="userName" type="text" placeholder="User Name"/>
                <label htmlFor="email">Email address</label>
                <input name="email" type="email" placeholder="Ex: abc@gmail.com" required/>
                <label htmlFor="password">Password</label>
                <input name="password" type="password" placeholder="Password" required/>
                <button type="submit">{load? <Loading/>:"Submit"}</button>
            </form>
            <p>Do you have an account? <a style={{color:"blue"}} onClick={()=>navigate("/")}>Sign in</a></p>
           
        </div>
    </div>
    )
}

export default Register;
