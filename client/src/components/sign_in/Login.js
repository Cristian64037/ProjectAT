import {Link} from "react-router-dom";

const Login=()=>{
    function handleSubmit(e) {
        e.preventDefault();
        const user = document.getElementById("User").value;
        const password = document.getElementById("Pass").value;

        fetch("http://localhost:3306/api/auth", {
            method: 'POST',
            headers: {
                'content-type':'application/json'
            },
            body: JSON.stringify({
                "User" : user,
                "Pass" : password
            })
        }).then((data) => {
            console.log(data);
        });
    }

    return(
        <div className="log-container">
            <div className="log-form">
                <form onSubmit={handleSubmit}>
                    <h2>LOGIN</h2>
                    <input type="text" placeholder="User Name" id="User"/>
                    <input type="password" placeholder="Password" id="Pass"/>
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