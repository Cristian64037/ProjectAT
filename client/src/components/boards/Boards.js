import {useNavigate} from "react-router";
import {useEffect, useState} from "react";

import Moment from 'moment';

const Boards = () => {
    let navigate = useNavigate();
    const [BoardName, setBoardName] = useState("New Board");
    const [jobs, setjobs] = useState("");
    const [isPending, setIspending] = useState(false);
    const [JobBoardId, setJobBoardId] = useState([]);
    const [boards, setBoards] = useState([]);
    const [lastUpdateDate, setLastUpdatedDate] = useState("");
    const [auth,setAuth]= useState(false);

    async function getBoardData() {
        const response = await fetch("http://localhost:3306/api/Latestboard/4", {
            method: 'Get',
            headers: {
                'content-type': 'application/json',
                "x-access-token" : localStorage.getItem("token")
            }
        });

        if (response) {
            console.log("============FETCHING BOARDS==============");
            return await response.json();
        }
    }

    async function fetchData() {
        const response = await fetch("http://localhost:3306/api/jobs/4", {
            method: 'Get',
            headers: {
                'content-type': 'application/json',
                "x-access-token" : localStorage.getItem("token")
            }
        });

        if (response) {
            console.log("============FETCHING JOBS==============");
            return await response.json();
        }
    }

    useEffect(() => {
        const checkAuth = async () => {
            const response = await fetch("http://localhost:3306/api/isAuth", {
                method: 'Get',
                headers: {
                    'content-type': 'application/json',
                    "x-access-token": localStorage.getItem("token")
                }
            });

            if (response) {
                console.log("============AUTHENTICATING==============");
                return await response.json();
            }
        }
        checkAuth().then(body => {
            console.log(body.auth);
            if (body.auth) {
                setAuth(true);
                fetchData().then(body => {
                    console.log(body);
                    setjobs(body);
                    setJobBoardId(body[0].JobBoardID);
                    setIspending(true);
                });
                getBoardData().then(body => {
                    console.log(body);
                    setBoardName(body[0].BoardName);
                    setLastUpdatedDate(body[0].LastUpdated);
                    jobs && FormatTable();
                });
            };
        });
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

        <div>
            {auth ?
                <div className="card mb-4">
                    <div className="card-header row">
                <span className="col-4">
                    <i className="fas fa-table me-2 fs-4"/>
                    <span style={{fontSize: '28px'}}>{BoardName}</span>
                </span>

                        <span style={{fontSize: '28px'}} className="flex-column text-center col-4">
                    Last update:{Moment(lastUpdateDate).format('MM-DD-YYYY')}
                </span>


                        <span className="col-4">
                    {/* Button to open the pop-up notepad */}
                            <button id="openBtn" className="float-lg-end  btn btn-outline-dark" onClick={OpenPad}>
                        Job Search Notes
                    </button>

                    <span className="float-lg-end">&nbsp;&nbsp;&nbsp;</span>

                            {/* Button to open the job form */}
                            <button id="myButton" className="float-lg-end  btn btn-outline-dark submit-button"
                                    onClick={GoToAppAdder}>
                        Add New Job
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
                </span>
                    </div>
                    <div className="card-body">
                        {isPending && <div> Loading...</div>}
                        <table className="table">
                            <thead>
                            <tr>
                                <th>Company Name</th>
                                <th>Position</th>
                                <th>Status</th>
                                <th>Interest Level</th>
                                <th>Salary</th>
                                <th>Date Applied</th>
                                <th></th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {jobs && jobs.map((job) => {
                                return (
                                    <tr key={job.id}>
                                        <td>{job.CompName}</td>
                                        <td>{job.PositionName}</td>
                                        <td>{job.Status}</td>
                                        <td>{job.Interest}</td>
                                        <td>{job.ExpectSalary}</td>
                                        <td>{Moment(job.AppliedDate).format('MM-DD-YYYY')}</td>
                                        <td>
                                            <button style={{backgroundColor: '#191c1f', color: 'white'}}>Edit Job
                                            </button>
                                        </td>
                                        <td>
                                            {job.Status == "Applied" ? <span/> :
                                                <button style={{backgroundColor: '#191c1f', color: 'white'}}>
                                                    Interview Notes
                                                </button>
                                            }
                                        </td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                    </div>
                </div>
                :<div> Not Authorized Please Sign IN</div>
            }
        </div>

    );
};
export default Boards;