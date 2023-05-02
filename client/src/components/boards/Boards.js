import {Route, useNavigate} from "react-router";
import {useEffect, useState} from "react";

import Moment from 'moment';
import {Link} from "react-router-dom";
import {checkAuth} from "../../functions/checkAuth";
import useGet from "../../hooks/useGet";
import Modal from "../pop_ups/Modal";

const Boards = () => {
    let navigate = useNavigate();
    const [BoardName, setBoardName] = useState("New Board");
    const [jobs, setjobs] = useState("");
    const [interviewJobs, setInterviewJobs] = useState("");
    const [isPending, setIspending] = useState(false);
    const [lastUpdateDate, setLastUpdatedDate] = useState("");
    const {data: boardData, isPending1, error1} = useGet("http://localhost:3306/api/Latestboard");
    const {data: jobsFromDB, isPending2, error2} = useGet("http://localhost:3306/api/jobs");
    const [auth, setAuth] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [editFlag, setEditFlag] = useState(false);

    async function getBoardData() {
        const response = await fetch("http://localhost:3306/api/Latestboard", {
            method: 'Get',
            headers: {
                'content-type': 'application/json',
                "x-access-token": localStorage.getItem("token")
            }
        });

        if (response) {
            console.log("============FETCHING BOARDS==============");
            return await response.json();
        }
    }

    async function fetchData() {
        const response = await fetch("http://localhost:3306/api/jobs", {
            method: 'Get',
            headers: {
                'content-type': 'application/json',
                "x-access-token": localStorage.getItem("token")
            }
        });

        if (response) {
            console.log("============FETCHING JOBS==============");
            return await response.json();
        }
    }

    useEffect(() => {
        checkAuth().then(body => {
            console.log(body.auth);
            if (body.auth) {
                setIspending(true);
                console.log("Beofre Fetch");
                setjobs(jobsFromDB);
                setBoardName(boardData[0].BoardName);
                setLastUpdatedDate(boardData[0].LastUpdated);
                setAuth(true);

                fetchData().then(body => {
                    let nonAppliedJobs = [];

                    for (let i = 0; i < body.length; i++) {
                        if (body[i].Status !== "Applied") {
                            nonAppliedJobs.push(body[i]);
                        }
                    }

                    setjobs(body);
                    setInterviewJobs(nonAppliedJobs);
                    FormatTable();
                });
                getBoardData().then(body => {
                    setBoardName(body[0].BoardName);
                    setLastUpdatedDate(body[0].LastUpdated);
                    setIspending(true);
                });
            } else {
                navigate('/unauthorized')
            }
        });
    }, [isPending,boardData,jobsFromDB, openModal]);


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
                    childNodes: tHead.childNodes[0].childNodes.map(
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
            {isPending ?
                <div className="card mb-4">
                    {openModal && <Modal closeModel={setOpenModal} list={editFlag ? jobs : interviewJobs} widthPct={80} editFlag={editFlag}/>}
                    <div className="card-header row">
                        <span className="col-3">
                            <i className="fas fa-table me-2 fs-4"/>
                            <span style={{fontSize: '24px'}}>{BoardName}</span>
                        </span>

                        <span className="col-6 d-flex justify-content-center">
                            {/* Button to open the job form */}
                            <button id="myButton" className="float-lg-end  btn btn-outline-dark submit-button" onClick={GoToAppAdder}>
                                Add New Job
                            </button>

                            <span className="float-lg-end">&nbsp;&nbsp;&nbsp;</span>

                            <button id="editButton" className="float-lg-end btn btn-outline-dark submit-button" onClick={() => {
                                setOpenModal(true);
                                setEditFlag(true);
                            }}>
                                Edit Job
                            </button>

                            <span className="float-lg-end">&nbsp;&nbsp;&nbsp;</span>

                            <button id="interviewButton" className="float-lg-end btn btn-outline-dark submit-button" onClick={() => {
                                setOpenModal(true);
                                setEditFlag(false);
                            }}>
                                Interview Notes
                            </button>

                            <span className="float-lg-end">&nbsp;&nbsp;&nbsp;</span>

                            {/* Button to open the pop-up notepad */}
                            <button id="openBtn" className="float-lg-end btn btn-outline-dark" onClick={OpenPad}>
                                Job Search Notes
                            </button>

                            {/* The overlay */}
                            <div className="overlay">
                                {/* The pop-up notepad */}
                                <div className="popup">
                                    <textarea id="notepad" rows={16} cols={58} defaultValue={""}/>
                                    <br/>
                                    <br/>
                                    {/* Button to close the pop-up notepad */}
                                    <button id="closeBtn">Close</button>
                                </div>
                             </div>
                        </span>

                        <span style={{fontSize: '24px'}} className="col-3 text-end">
                            Last update: {Moment(lastUpdateDate).format('MM-DD-YYYY')}
                        </span>
                    </div>
                    <div className="card-body">
                        <table className="table">
                            <thead>
                            <tr>
                                <th>Company Name</th>
                                <th>Position</th>
                                <th>Status</th>
                                <th>Interest Level</th>
                                <th>Salary</th>
                                <th>Date Applied</th>
                            </tr>
                            </thead>
                            <tbody>
                            {jobs && jobs.map((job, index) => {
                                return (

                                    /*Im Using Index So I can just pull the
                                     * job from the array versus potentially giving them the option from accessing a job
                                     * they dont' have access too by using inspect element. I will make the same changes to
                                     *Boards  */

                                    <tr key={index}>
                                        <td>{job.CompName}</td>
                                        <td>{job.PositionName}</td>
                                        <td>{job.Status}</td>
                                        <td>{job.Interest}</td>
                                        <td>{job.ExpectSalary}</td>
                                        <td>{Moment(job.AppliedDate).format('MM-DD-YYYY')}</td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                    </div>
                </div>
                : <> You have No Active Board. Please Create one <Link to={"/"}>first</Link></>}
        </div>

    );
};
export default Boards;