import NavBar from './NavBarCS';
import FootEnd from './FootEnd';
import Home from "./Home";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Documents from "./Documents";
import BlogDetails from "./BlogDetails";
import Boards from "./Boards";
import InterviewPrep from "./InterviewPrep";

function App() {

  return (
      <Router>
        <div className="App">
          <NavBar/>
          <div className="Content">
            <Routes>
              <Route exact path={"/"} element={<Home/>}>  </Route>
              <Route  path={"/blogs/:id"} element={<BlogDetails/>}>  </Route>
              <Route exact path={"/documents"} element={<Documents/>}>  </Route>
              <Route exact path={"/interviewPrep"} element={<InterviewPrep/>}>  </Route>
              <Route exact path={"/boards"} element={<Boards/>}>  </Route>
            </Routes>
          </div>
          <FootEnd/>

        </div>

      </Router>
  );
}

export default App;
