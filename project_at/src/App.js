import NavBar from './NavBar2';
import FootEnd from './FootEnd';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Documents from "./Documents";
import Boards from "./Boards";
import InterviewPrep from "./InterviewPrep";
import JobApplicationForm from "./JobApplicationForm"
import CreateBoard from "./CreateBoard";
import Login from "./Login";
import CreateAccount from "./CreateAccount";
import ForgetPassword from "./ForgetPassword";

function App() {

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
              <Route exact path={"/createBoard"} element={<CreateBoard/>}/>
              <Route exact path={"/login"} element={<Login/>}/>
              <Route exact path={"/account"} element={<CreateAccount/>}/>
              <Route exact path={"/password"} element={<ForgetPassword/>}/>
            </Routes>
          </div>
          <FootEnd/>

        </div>

      </Router>
  );
}

export default App;
