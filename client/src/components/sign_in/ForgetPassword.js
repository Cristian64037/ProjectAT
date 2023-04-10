import {useNavigate} from "react-router";
import {useState} from "react";

const ForgetPassword = () => {
    const nav = useNavigate();
    const [Username,setUsername]= useState("");
    const [Email,setEmail]= useState("");
    const [name,setName]= useState("");

    const handleAlert = (e) => {
        alert("Searching")

    }



    return (
        <div>

            <div className="log-container" id={"log-container"}>
                <div className="log-form">
                    <form>
                        <h2>FORGOT PASSWORD</h2>
                        <input type="email" placeholder="Recovery Email" onChange={e =>(
                            setEmail(e.target.value)
                        ) } value={Email}

                        />
                        <input type="text" placeholder="Username" onChange={e =>(
                            setUsername(e.target.value)
                        ) } value={Username}

                        />
                        <input type="text" placeholder="First Name" onChange={e =>(
                            setName(e.target.value)
                        ) } value={name}

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