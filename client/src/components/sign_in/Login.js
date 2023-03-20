import {useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";

const Login=()=>{
    const [User,setEmail]= useState("");
    const [Pass,setPassword]= useState("");
    const [response,setResponse]= useState("");

    const handleSubmit = async event => {
        /*event.preventDefault();*/

        console.log("SUBM");
       /* await axios({
            method: 'POST',
            url: 'http://localhost:3306/api/auth',
            data: {
                User: User,
                Pass: Pass
            },
            withCredentials: true
        })*/

       /* fetch('http://localhost:3306/api/login', {
            method: 'post',
            body: {
                id: "768",
            },
        })
            .then((response) => response.json())
            .catch((error) => {
                console.error(error);
            });*/

    }

    return(
        <div className="log-container">
            <div className="log-form">
                <form action={"http://localhost:3306/api/auth"} method={"POST"}>
                    <h2>LOGIN</h2>
                    <input type="text" placeholder="User Name" name={"User"}
                    onChange={(e)=>setEmail(e.target.value)} value={User}/>
                    <input type="password" placeholder="Password" name={"Pass"}
                           onChange={(e)=>setPassword(e.target.value)} value={Pass}/>
                    <div className="form-actions">
                        <button type="submit"  >Login</button>
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