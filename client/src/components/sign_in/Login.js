import {useNavigate} from "react-router";

const Login=()=>{
    const nav = useNavigate();

    return(
        <div className="log-container">
            <div className="log-form">
                <form>
                    <h2>LOGIN</h2>
                    <input type="text" placeholder="User Name"/>
                    <input type="password" placeholder="Password"/>
                    <div className="form-actions">
                        <button type="submit" onClick={() => nav("/boards")}>Login</button>
                        <button type="button" onClick={() => nav("/account")}>Create Account</button>
                        <button type="button" onClick={() => nav("/password")}>Forgot Password?</button>
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