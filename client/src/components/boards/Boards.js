import useFetch from "../../hooks/useFetch";
import {useNavigate} from "react-router";

const Boards = () => {
    let navigate = useNavigate();
    const {data: jobs, isPending, error} = useFetch("http://localhost:8000/Jobs");

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
                    childNodes: tHead.childNodes[0].childNodes.slice(0,6).map(
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
                <span style={{fontSize: '28px'}}>Applications</span>
                {/* Button to open the pop-up notepad */}
                <button id="openBtn" className="float-lg-end  btn btn-outline-dark" onClick={OpenPad}>Open Notepad
                </button>
                <span className="float-lg-end">&nbsp;&nbsp;&nbsp;</span>
                {/* Button to open the job form */}
                <button id="myButton" className="float-lg-end  btn btn-outline-dark submit-button"
                        onClick={GoToAppAdder}>Documents
                    Application
                </button>
                {/*Format Table*/}
                <button id="myButton" className="float-lg-end  btn btn-outline-dark submit-button"
                        onClick={FormatTable}>Format
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
                                <td>{job.StatusID}</td>
                                <td>{job.InterviewRound}</td>
                                <td>{job.AppliedDate}</td>
                                <td>{job.InterestLevel}</td>
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