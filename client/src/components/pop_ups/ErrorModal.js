import {createPortal} from "react-dom";

const ErrorModal = ({closeModel, errMsg}) => {
    const errors = errMsg.split(",");

    return createPortal(
        <div className="modalBackground">
            <div className="modalContainer">
                <div className="titleCloseBtn">
                    <button className="btn btn-outline-dark" onClick={() => closeModel(false)}>X</button>
                </div>
                <div className="modalTitle">
                    <h5>Error</h5>
                </div>
                <div className="modalBody">
                    <ul>
                    {errors.map((error) => {
                        return(
                         <li>{error}</li>
                        )
                    })}
                    </ul>
                </div>
            </div>
        </div>,
        document.getElementById("portal")
    );
}
export default ErrorModal;