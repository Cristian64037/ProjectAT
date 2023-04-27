import {Link, redirect} from "react-router-dom";
import {useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
import {checkAuth} from "../../functions/checkAuth";



const Login=()=>{
    const navigate = useNavigate();
    const [User,setUser]= useState("");
    const [Password,setPass]= useState("");
    const [logInresult,setLogInResult]= useState("");
    const [loginStatus, setLoginStatus] = useState(false);

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

        }).then(async (data) => {
            var body = await data.json();
            if(body.auth){
                localStorage.setItem("token", body.token);
                setLoginStatus(true);
                navigate('/');
            }else {
                setLoginStatus(false);
                setLogInResult(body.message);

            }
        });
    }

    async function userAuth(e) {
        e.preventDefault();


        await fetch("http://localhost:3306/api/isAuth", {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                "x-access-token" : localStorage.getItem("token")
            }
        }).then(async (data) => {
            console.log(await data.json());
        });
    }
    useEffect(() => {


        checkAuth().then(body => {
            console.log(body.auth)
            if (body.auth) {
                navigate("/boards")
            }
        });

    }, []);



    return(
        <div className="log-container">



            <div className="log-form">
                <form onSubmit={userAuth}>
                    <h2>LOGIN</h2>
                    <input type="text" placeholder="User Name" onChange={e =>(
                        setUser(e.target.value)
                    ) }
                    />
                    <input type="password" placeholder="Password" onChange={e =>(
                        setPass(e.target.value))}/>
                    <div className="form-actions">
                        <button type="submit" onClick={handleSubmit} >Login</button>
                        <Link to={"/account"}><button type="button"> <Link to={"/account"}/>Create Account</button></Link>
                        <Link to={"/password"}><button type="button"> Forgot Password?</button></Link>
                    </div>
                </form>
            </div>
            <div className="log-image">
                <img src="../../JT.png"/>
                <div style={{backgroundColor:"Red"}}>{logInresult}</div>
            </div>

        </div>
    );
}
export default Login;