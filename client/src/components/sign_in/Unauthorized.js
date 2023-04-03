import {Link, useNavigate} from "react-router-dom";

const Unauthorized = () => {
    const navigate = useNavigate();
    async function handleClick() {
        navigate('/login');
    }

    return(
        <div className="unauthorized">
            <h1>Unauthorized to use this page</h1>
            <h3>Please sign-in</h3>
            <button onClick={handleClick}>Login</button>
        </div>
    );
}
export default Unauthorized;