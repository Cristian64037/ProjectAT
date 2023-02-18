import NavBar from './NavBar2';
import FootEnd from './FootEnd';

import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Documents from "./Documents";
import Boards from "./Boards";
import InterviewPrep from "./InterviewPrep";
import JobApplicationForm from "./JobApplicationForm"

function App() {

  return (
      <Router>
        <div className="App">
          <NavBar/>
          <div className="Content">
            <Routes>
              <Route exact path={"/documents"} element={<Documents/>}>  </Route>
              <Route exact path={"/interviewPrep"} element={<InterviewPrep/>}>  </Route>
              <Route exact path={"/boards"} element={<Boards/>}>  </Route>
              <Route exact path={"/JobApplicationForm"} element={<JobApplicationForm/>}>  </Route>
            </Routes>
          </div>
          <FootEnd/>

        </div>

      </Router>
  );
}

export default App;
