import {useEffect, useState} from "react";

const CreateBoard = () =>{

    const [boards, setBoards] = useState("");
    const [newBoard, setNewBoard] = useState("");

    async function fetchData() {
        await fetch("http://localhost:3306/api/board/3", {
            method: 'Get',
            headers: {
                'content-type': 'application/json'
            }
        }).then(async (data) => {
            var body = await data.json();
            setBoards(body);
        });
    }

    useEffect(() => {
        fetchData();

    }, []);

    function handleBoardChange(newBoard) {
        setNewBoard(newBoard)
        console.log(newBoard);
        alert(`Changed:${newBoard}`)
    }

    return(
        <div className="row create-board">
            <div className="col-6 createContainer">
                <img src="../../JT.png" alt="JT"/>
                <button className="btn">New Board</button>
            </div>

            <div className="col-6 createContainer">
                <img src="../../JT.png" alt="JT"/>

                <select className={"btn"} required onChange={e => (handleBoardChange(e.target.value))}>
                    <option disabled selected>Previous Boards</option>
                    {boards.length ? boards.map(e => (
                        <option value={e.JobBoardID} key={e.JobBoardID}>{e.BoardName}  </option> )): ""}
                </select>


                    </div>
        </div>
    );
}
export default CreateBoard;