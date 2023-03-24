import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

const CreateBoard = () =>{

    const [boards, setBoards] = useState([]);
    const [newBoard, setNewBoard] = useState("");
    const navigate = useNavigate();

    async function fetchData() {
        await fetch("http://localhost:3306/api/board/4", {
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


    async function handleBoardChange(newBoard) {
        setNewBoard(newBoard)
        console.log(newBoard);
        alert(`Changed:${newBoard}`)
        const isFound = boards.some(e => {
            console.log(e.JobBoardID)
            console.log(newBoard.valueOf())
            return e.JobBoardID === parseInt(newBoard);
        });
        if(isFound){
            alert("Hitting DB RN");
            await fetch("http://localhost:3306/api/board", {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    "LogInID": 4,
                    "JobBoardID": newBoard,
                })
            }).then(async (data) => {
                var body = await data.text();
                navigate('/boards');
            });
        }else{
            alert("Inspect Elemnt Detected Please Refresh")
        }
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