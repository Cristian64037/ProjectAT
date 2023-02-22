import {Link} from "react-router-dom";

const NavBar=()=>{
    return(
        <nav className={"navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow"}>
            <div className="navbar-nav">
                <div className="nav-item text-nowrap">
                    <Link to={"/boards"} className="nav-link px-3" >Boards</Link>
                </div>
            </div>
            <div className="navbar-nav">
                <div className="nav-item text-nowrap">
                    <Link to={"/documents"} className="nav-link px-3" >Documents</Link>
                </div>
            </div>
            <div className="navbar-nav">
                <div className="nav-item text-nowrap">
                    <Link to={"/interviewPrep"} className="nav-link px-3" >Interview Prep</Link>
                </div>
            </div>
            <div className="navbar-nav">
                <div className="nav-item text-nowrap logout">
                    <Link to={"/boards"} className="nav-link px-3" >Sign Out</Link>
                </div>
            </div>
        </nav>

    );
}
export default NavBar;