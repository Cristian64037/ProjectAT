import {useNavigate} from "react-router";

const CreateAccount = () => {
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
                Account Created Successfully
                <span className="close-btn" onClick={handleCloseAlert}>&times;</span>
            </div>
            <div className="log-container">
                <div className="log-form">
                    <form>
                        <h2>CREATE ACCOUNT</h2>
                        <input type="text" placeholder="Full Name"/>
                        <input type="email" placeholder="Email"/>
                        <input type="password" placeholder="Password"/>
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