import NavBar from './components/nav_foot/Navbar';
import FootEnd from './components/nav_foot/FootEnd2';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Documents from "./components/documents/Documents2";
import InterviewPrep from "./components/interview/InterviewHistory";
import JobApplicationForm from "./components/job/JobApplicationForm"
import CreateBoard from "./components/boards/CreateBoard";
import Login from "./components/sign_in/Login";
import CreateAccount from "./components/sign_in/CreateAccount";
import ForgetPassword from "./components/sign_in/ForgetPassword";
import Boards from "./components/boards/Boards";
import InterviewHistory from "./components/interview/InterviewHistory";
import Unauthorized from "./components/sign_in/Unauthorized";
import {useEffect, useState} from "react";

function App() {
    const [auth,setAuth] = useState(false);

    useEffect(() => {
        async function checkAuth() {
            try {
                const res = await fetch("http://localhost:3306/api/isAuth", {
                    method: 'GET',
                    headers: {
                        'content-type': 'application/json',
                        "x-access-token" : localStorage.getItem("token")
                    }
                });
                const data = await res.json();
                setAuth(data.auth);
            } catch (error) {
                console.log(error);
            }
        }
        checkAuth();
    }, []);

    return (
        <Router>
            <div className="App">
                <NavBar/>
                <div className="Content">
                    <Routes>
                        <Route exact path={"/documents"} element={<Documents/>}/>
                        <Route exact path={"/interviewPrep"} element={<InterviewPrep/>}/>
                        <Route exact path={"/boards"} element={<Boards/>}/>
                        <Route exact path={"/JobApplicationForm"} element={<JobApplicationForm/>}/>
                        <Route exact path={"/login"} element={<Login/>}/>
                        <Route exact path={"/account"} element={<CreateAccount/>}/>
                        <Route exact path={"/password"} element={<ForgetPassword/>}/>
                        <Route exact path={"/InterviewHistory"} element={<InterviewHistory/>}/>
                        <Route exact path={"/unauthorized"} element={<Unauthorized/>}/>
                        <Route exact path={"/"} element={<CreateBoard/>}/>
                        <Route exact path={"*"} element={<Unauthorized/>}/>
                    </Routes>
                </div>
                <FootEnd/>
            </div>
        </Router>
    );
}

export default App;
