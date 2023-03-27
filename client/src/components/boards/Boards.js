import useFetch from "../../hooks/useFetch";
import {useNavigate} from "react-router";
import {useEffect, useState} from "react";

import Moment from 'moment';

const Boards = () => {
    let navigate = useNavigate();
    const [BoardName,setBoardName]= useState("New Board");
    const [jobs, setjobs] = useState("");
    const [isPending, setIspending] = useState(false);
    const [JobBoardId, setJobBoardId] = useState([]);
    const [boards, setBoards] = useState([]);
    const[lastUpdateDate,setLastUpdatedDate]=useState("");

    async function fetchData() {
        await fetch("http://localhost:3306/api/jobs/4", {
            method: 'Get',
            headers: {
                'content-type': 'application/json'
            }
        }).then(async (data) => {
            var body = await data.json();
            setjobs(body);
            //console.log(body[0].JobBoardID)
            setJobBoardId(body[0].JobBoardID);
            setIspending(true)
        });

            await fetch("http://localhost:3306/api/board/4", {
                method: 'Get',
                headers: {
                    'content-type': 'application/json'
                }
            }).then(async (data) => {
                var body = await data.json();
                setBoards(body);
                console.log(body);
                let number=body.filter(i=> i.JobBoardID===JobBoardId);


               //console.log(number[0].BoardName)
                setBoardName(number[0].BoardName);
                setLastUpdatedDate(number[0].LastUpdated);
                console.log(number[0].LastUpdated);

            });

    }

    useEffect(() => {

        fetchData();
        jobs && FormatTable();
    }, [isPending]);

    function FormatTable() {
        new window.simpleDatatables.DataTable("table", {
            perPageSelect: [5, 10, ["All", -1]],
            columns: [
                {
                    select: 2,
                    sortSequence: ["desc", "asc"]
                },
                {
                    select: 3,
                    sortSequence: ["desc"]
                }
            ],
            tableRender: (_data, table, type) => {
                if (type === "print") {
                    return table
                }
                const tHead = table.childNodes[0];

                const filterHeaders = {
                    nodeName: "TR",
                    childNodes: tHead.childNodes[0].childNodes.slice(0, 6).map(
                        (_th, index) => ({
                            nodeName: "TH",
                            childNodes: [
                                {
                                    nodeName: "INPUT",
                                    attributes: {
                                        class: "datatable-input",
                                        type: "search",
                                        size: "5px",
                                        "data-columns": `[${index}]`
                                    }
                                }
                            ]
                        })
                    )
                }
                tHead.childNodes.push(filterHeaders)
                return table
            }
        })
    }


    function OpenPad() {
        const openBtn = document.getElementById("openBtn");
        const closeBtn = document.getElementById("closeBtn");
        const overlay = document.querySelector(".overlay");

        openBtn.addEventListener("click", function () {
            overlay.style.display = "block";
        });

        closeBtn.addEventListener("click", function () {
            overlay.style.display = "none";
        });
    }

    function GoToAppAdder() {
        let path = `/JobApplicationForm`;
        navigate(path);
    }

    return (
        <div className="card mb-4">
            <div className="card-header">
                <i className="fas fa-table me-2 fs-4"/>
                <span style={{fontSize: '28px'}}>{BoardName} <br/> {lastUpdateDate.length>0 ?<> Last update:{Moment(lastUpdateDate).format('MM-DD-YYYY')}</>:<></>}</span>

                {/* Button to open the pop-up notepad */}
                <button id="openBtn" className="float-lg-end  btn btn-outline-dark" onClick={OpenPad}>Open Notepad
                </button>
                <span className="float-lg-end">&nbsp;&nbsp;&nbsp;</span>

                {/* Button to open the job form */}
                <button id="myButton" className="float-lg-end  btn btn-outline-dark submit-button"
                        onClick={GoToAppAdder}>Documents
                    Application
                </button>

                {/* The overlay */}
                <div className="overlay">
                    {/* The pop-up notepad */}
                    <div className="popup">
                        <textarea id="notepad" rows={16} cols={58} defaultValue={""}/>
                        <br/><br/>
                        {/* Button to close the pop-up notepad */}
                        <button id="closeBtn">Close</button>
                    </div>
                </div>
            </div>
            <div className="card-body">
                {isPending && <div> Loading...</div>}
                <table className="table">
                    <thead>
                    <tr>
                        <th>Company Name</th>
                        <th>Position</th>
                        <th>Status</th>
                        <th>Stage</th>
                        <th>Date Applied</th>
                        <th>Salary</th>
                        <th>Edit</th>
                    </tr>
                    </thead>
                    <tbody>
                    {jobs && jobs.map((job) => {

                        return (
                            <tr key={job.id}>
                                <td>{job.CompName}</td>
                                <td>{job.PositionName}</td>
                                <td> {job.Name}</td>
                                <td>{job.InterviewRound}</td>
                                <td>{Moment(job.AppliedDate).format('MM-DD-YYYY')}</td>
                                <td>{job.ExpectSalary}</td>
                                <td>
                                    <button style={{backgroundColor: '#191c1f', color: 'white'}}>Edit Job</button>
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default Boards;