import {useNavigate} from "react-router";

const ForgetPassword = () => {
    const nav = useNavigate();

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
                Email was sent
                <span className="close-btn" onClick={handleCloseAlert}>&times;</span>
            </div>
            <div className="log-container">
                <div className="log-form">
                    <form>
                        <h2>FORGOT PASSWORD</h2>
                        <input type="email" placeholder="Email"/>
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