import {useNavigate} from "react-router";
import {useState} from "react";

const ForgetPassword = () => {
    const nav = useNavigate();
    const [Username,setUsername]= useState("");
    const [Email,setEmail]= useState("");
    const [Result,setResult]= useState("G");

    const handleAlert = (e) => {
        e.preventDefault();





        document.getElementById("alert").style.display = "flex";
        //log-container
       /* document.getElementById("log-container").style.opacity = "0";
        document.getElementById("log-container").style.display = "none";*/
    }

    const handleCloseAlert = () => {
        document.getElementById("alert").style.opacity = "0";
        document.getElementById("alert").style.display = "none";
        nav("/login");
    }

    return (
        <div>
            <div id="alert" className="alert">
                {Result}
            </div>
            <div className="log-container" id={"log-container"}>
                <div className="log-form">
                    <form>
                        <h2>FORGOT PASSWORD</h2>
                        <input type="email" placeholder="Email" onChange={e =>(
                            setEmail(e.target.value)
                        ) } value={Email}


                        />
                        <input type="text" placeholder="Username" onChange={e =>(
                            setUsername(e.target.value)
                        ) } value={Username}

                        />


                        <div className="form-actions">
                            <button type="submit" onClick={handleAlert}>SUBMIT</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default ForgetPassword;