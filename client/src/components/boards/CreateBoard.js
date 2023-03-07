const CreateBoard = () =>{
    return(
        <div className="row create-board">
            <div className="col-6 createContainer">
                <img src="../../JT.png" alt="JT"/>
                <button className="btn">New Board</button>
            </div>
            <div className="col-6 createContainer">
                <img src="../../JT.png" alt="JT"/>
                <button className="btn">Previous Board</button>
            </div>
        </div>
    );
}
export default CreateBoard;