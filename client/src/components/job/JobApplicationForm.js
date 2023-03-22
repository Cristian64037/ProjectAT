import {useNavigate} from "react-router-dom";
import {useState} from "react";

const JobApplicationForm=()=>{
    const navigate = useNavigate();
    const [CompanyName,setCompanyName]= useState("");
    const [ApplyDate,setApplyDate]= useState("");
    const [JobTitle,setJobTitle]= useState("");
    const [JobStatus,setJobStatus]= useState("");
    const [InterviewRound,setInterviewRound]= useState("");
    const [Website,setWebsite]= useState("");
    const [MissionStatement,setMissionStatement]= useState("");
    const [Awards,setAwards]= useState("");
    const [ExpectedSalary,setExpectedSalary]= useState("");
    const [CoreValues,setCoreValues]= useState("");
    const [Notes,setNotes]= useState("");

    return(
        <div className="app-container">
            <header>Application Form</header>

            <form action="client/src/components/job/JobApplicationForm#">
                <div className="form first">
                    <div className="details Job">
                        <span className="title">Job Details</span>

                        <div className="fields">
                            <div className="input-field">
                                <label>Comapny Name</label>
                                <input type="text" placeholder="Enter Company name" required/>
                            </div>

                            <div className="input-field">
                                <label>Apply Date</label>
                                <input type="date" placeholder="Enter Apply date" required/>
                            </div>

                            <div className="input-field">
                                <label>Job Title</label>
                                <input type="text" placeholder="Enter Job Title" required/>
                            </div>


                            <div className="input-field">
                                <label>Status</label>
                                <select required>
                                    <option disabled selected>Select Status</option>
                                    <option>Applied</option>
                                    <option>Interview</option>
                                    <option>Accept</option>
                                    <option>Denied</option>
                                    <option>Rejected</option>
                                    <option>Response Pending</option>

                                </select>
                            </div>

                            <div className="input-field">
                                <label>Interview Round</label>
                                <input type="number" placeholder="Enter Interview Round" required/>
                            </div>
                            <div className="input-field">
                                <label>Interest Level</label>
                                <select required>
                                    <option disabled selected>Select Interest Level</option>
                                    <option>Low</option>
                                    <option>Medium</option>
                                    <option>High</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="details Company">
                        <span className="title">Company Details</span>

                        <div className="fields">
                            <div className="input-field">
                                <label>Website</label>
                                <input type="text" placeholder="Enter URL" required/>
                            </div>

                            <div className="input-field">
                                <label>Mission Statement</label>
                                <input type="text" placeholder="Enter Mission Statement" required/>
                            </div>

                            <div className="input-field">
                                <label>Core Values</label>
                                <input type="text" placeholder="Enter Core Values" required/>
                            </div>

                            <div className="input-field">
                                <label>Awards</label>
                                <input type="text" placeholder="Enter Awards" required/>
                            </div>

                            <div className="input-field">
                                <label>Expected Salary</label>
                                <input type="number" placeholder="Enter Expected Salary" required/>
                            </div>

                            <div className="input-field">
                                <label>Notes</label>
                                <input type="text" placeholder="Enter Notes" required/>
                            </div>
                        </div>

                        <button className="nextBtn">
                            <span className="btnText">Submit</span>
                            <i className="uil uil-navigator"/>
                        </button>
                    </div>
                </div>
            </form>
        </div>

);
}
export default JobApplicationForm;