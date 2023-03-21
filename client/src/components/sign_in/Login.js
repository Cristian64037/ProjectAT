import {Link, redirect} from "react-router-dom";
import {useState} from "react";
import { useNavigate } from 'react-router-dom';



const Login=()=>{
    const navigate = useNavigate();
    const [User,setUser]= useState("");
    const [Password,setPass]= useState("");
    const [result,setResult]= useState("");
    async function handleSubmit(e) {
        e.preventDefault();

        await fetch("http://localhost:3306/api/auth", {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                "User": User,
                "Pass": Password
            })
        }).then((data) => {
            setResult(data.statusText);
            if(data.statusText==="Not Found"){
                alert("Invalid Log In");
            }else {
                alert("Success");
                navigate('/boards');
            }
        });
    }



    return(
        <div className="log-container">



            <div className="log-form">
                <form onSubmit={handleSubmit}>
                    <h2>LOGIN</h2>
                    <input type="text" placeholder="User Name" onChange={e =>(
                        setUser(e.target.value)
                    ) }
                    />
                    <input type="password" placeholder="Password" onChange={e =>(
                        setPass(e.target.value))}/>
                    <div className="form-actions">
                        <button type="submit" >Login</button>
                        <Link to={"/account"}><button type="button"> <Link to={"/account"}/>Create Account</button></Link>
                        <Link to={"/password"}><button type="button"> Forgot Password?</button></Link>
                    </div>
                </form>
            </div>
            <div className="log-image">
                <img src="../../JT.png"/>
            </div>
        </div>
    );
}
export default Login;