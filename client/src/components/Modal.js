import Listbox from "./Listbox";

const Modal = ({closeModel, list:jobList, widthPct, editFlag}) => {
    return (
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
        </div>
    )
}
export default Modal;