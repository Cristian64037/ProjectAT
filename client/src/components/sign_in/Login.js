import {Link, redirect} from "react-router-dom";
import {useState} from "react";
import { useNavigate } from 'react-router-dom';



const Login=()=>{
    const navigate = useNavigate();
    const [User,setUser]= useState("");
    const [Password,setPass]= useState("");
    const [result,setResult]= useState("");
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
           //console.log(body);

            if(body.auth){
                alert("Successful Log in");
                localStorage.setItem("token", body.token);
                setLoginStatus(true);
                navigate('/');
            }else {
                setLoginStatus(false);
                alert("Bad Log in");
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
            </div>
        </div>
    );
}
export default Login;