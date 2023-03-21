import {useNavigate} from "react-router";
import {useState} from "react";

const CreateAccount = () => {
    const nav = useNavigate();
    const [Username,setUsername]= useState("");
    const [Password,setPassword]= useState("");
    const [firstName,setFirstName]= useState("");
    const [lastName,setLastName]= useState("");
    const [result,setResult]= useState("");

    const handleAlert = (e) => {
        e.preventDefault();
        document.getElementById("alert").style.display = "flex";
    }

    const handleCloseAlert = () => {
        document.getElementById("alert").style.opacity = "0";
        document.getElementById("alert").style.display = "none";
        nav("/login");
    }

    return (
        <div>
            <div id="alert" className="alert">
                Account Created Successfully
                <span className="close-btn" onClick={handleCloseAlert}>&times;</span>
            </div>
            <div className="log-container">
                <div className="log-form">
                    <form>
                        <h2>CREATE ACCOUNT</h2>
                        <input type="text" placeholder="First Name" onChange={e =>(
                            setFirstName(e.target.value)
                        ) }

                        />
                        <input type="text" placeholder="Last Name" onChange={e =>(
                            setLastName(e.target.value)
                        ) }
                        />
                        <input type="email" placeholder="Username" onChange={e =>(
                            setUsername(e.target.value)
                        ) }
                        />
                        <input type="password" placeholder="Password" onChange={e =>(
                            setLastName(e.target.value)
                        ) }
                        />
                        <div className="form-actions">
                            <button type="submit" onClick={handleAlert}>CREATE ACCOUNT</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default CreateAccount;