import { useNavigate } from 'react-router-dom';
import {useState} from "react";



const CreateAccount = () => {
    const navigate = useNavigate();
    const [Username,setUsername]= useState("");
    const [Password,setPassword]= useState("");
    const [email,setEmail]= useState("");
    const [firstName,setFirstName]= useState("");
    const [lastName,setLastName]= useState("");
    const [result,setResult]= useState("");

    async function handleSubmit(e) {
        e.preventDefault();

        await fetch("http://localhost:3306/api/login", {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                "username": Username,
                "password": Password,
                "firstName": firstName,
                "lastName": lastName,
                "email": email,
            })
        }).then(async (data) => {
            var body = await data.text();
            if(data.status===201){
                alert("Success");
                navigate('/login');


            }else {
                alert(body);
            }
        });
    }

    return (
        <div>

            <div className="log-container">
                <div className="log-form">
                    <form>
                        <h2>CREATE ACCOUNT</h2>
                        <input type="text" placeholder="First Name" onChange={e =>(
                            setFirstName(e.target.value)
                        ) } value={firstName}

                        />
                        <input type="text" placeholder="Last Name" onChange={e =>(
                            setLastName(e.target.value)
                        ) } value={lastName}
                        />
                        <input type="text" placeholder="User name" onChange={e =>(
                            setUsername(e.target.value)
                        ) } value={Username}
                        />
                        <input type="password" placeholder="Password" onChange={e =>(
                            setPassword(e.target.value)
                        ) } value={Password}
                        />
                        <input type="email" placeholder="Recovery Email" onChange={e =>(
                            setEmail(e.target.value)
                        ) } value={email}
                        />


                            <button type="submit" onClick={handleSubmit}>CREATE ACCOUNT</button>

                    </form>
                </div>
            </div>
        </div>
    );
}
export default CreateAccount;