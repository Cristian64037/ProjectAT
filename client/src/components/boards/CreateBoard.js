import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Popup from "reactjs-popup";
import {checkAuth} from "../../functions/checkAuth";
import useGet from "../../hooks/useGet";

const CreateBoard = () => {

    const [boards, setBoards] = useState([]);
    const [newBoardName, setNewBoardName] = useState("");
    const navigate = useNavigate();
    const {data: Boards, isPending2, error2} = useGet("http://localhost:3306/api/board");

    useEffect(() => {
        checkAuth().then(body => {
            console.log(body.auth);
            if (body.auth) {
                setBoards(Boards.data);

            }
            else {
                navigate('/unauthorized')
            }
        });
    }, [Boards]);


    async function handleBoardChange(selectedFromDropDown) {
        try {console.log(boards[selectedFromDropDown].JobBoardID);
            await fetch("http://localhost:3306/api/board", {


                method: 'PUT',
                headers: {
                    'content-type': 'application/json',
                    "x-access-token": localStorage.getItem("token")
                },
                body: JSON.stringify({
                    "JobBoardID": boards[selectedFromDropDown].JobBoardID,
                })
            }).then(async (data) => {
                var body = await data.text();
                navigate('/boards');
            });


        } catch (error) {
            // code to handle the error
            alert("Error Refresh Page")
        }

    }

    async function handleNewBoard() {

        await fetch("http://localhost:3306/api/board", {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                "x-access-token": localStorage.getItem("token")
            },
            body: JSON.stringify({
                "JobBoardName": newBoardName
            })
        }).then(async (data) => {
            var body = await data.text();

            navigate('/boards');
        });
        //navigate('/boards');
    }

    return (
        <div className="row create-board">
            <div className="col-6 createContainer">
                <img src="../../JT.png" alt="JT"/>
                <Popup trigger=
                           {<button className={"btn"}> New Board </button>}
                       position=" right">
                    <div style={{backgroundColor: "blue"}}>
                        <div> New Board Name</div>
                        <input type="text" required onChange={e => (
                            setNewBoardName(e.target.value))} value={newBoardName}
                        />
                        <button onClick={handleNewBoard}>Submit</button>
                    </div>
                </Popup>
            </div>

            <div className="col-6 createContainer">
                <img src="../../JT.png" alt="JT"/>

                <select className={"btn"} required onChange={e => (handleBoardChange(e.target.value))}>
                    <option disabled selected>Previous Boards</option>
                    {boards.length ? boards.map((e, index) => (
                        <option value={index}>{e.BoardName}
                        </option>)) : ""}
                </select>
            </div>
        </div>
    );
}
export default CreateBoard;