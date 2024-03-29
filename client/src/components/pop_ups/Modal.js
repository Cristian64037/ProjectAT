import Listbox from "./Listbox";
import {createPortal} from "react-dom";

const Modal = ({closeModel, list: jobList, widthPct, editFlag}) => {
    return createPortal(
        <div className="modalBackground">
            <div className="modalContainer">
                <div className="titleCloseBtn">
                    <button className="btn btn-outline-dark" onClick={() => closeModel(false)}>X</button>
                </div>
                <div className="modalTitle">
                    <h3>Select a Job</h3>
                </div>
                <div className="modalBody">
                    <Listbox list={jobList} widthPct={widthPct} editFlag={editFlag}/>
                </div>
            </div>
        </div>,
        document.getElementById("portal")
    );
}
export default Modal;