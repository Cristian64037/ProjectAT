import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

const JobApplicationForm=()=>{
    const navigate = useNavigate();
    const [CompanyName,setCompanyName]= useState("");
    const [ApplyDate,setApplyDate]= useState("");
    const [JobTitle,setJobTitle]= useState("");
    const [JobStatus,setJobStatus]= useState("");
    const [InterestLevel,setInterestLevel]= useState("");
    const [InterviewRound,setInterviewRound]= useState("");
    const [Website,setWebsite]= useState("");
    const [MissionStatement,setMissionStatement]= useState("");
    const [Awards,setAwards]= useState("");
    const [ExpectedSalary,setExpectedSalary]= useState("");
    const [CoreValues,setCoreValues]= useState("");
    const [Notes,setNotes]= useState("");
    const [JobStatFromDb,setJobStatFromDb]= useState([])

    const InterestLevelFromDb=[];
    useEffect(() => {
        // Update the document title using the browser API
        fetchData();
        async function fetchData(){
        await fetch("http://localhost:3306/api/JobStatus", {
            method: 'Get',
            headers: {
                'content-type': 'application/json'
            }
        }).then(async (data) => {
            var body = await data.json();
            setJobStatFromDb(body);

            console.log(JobStatFromDb)

        });

    }
    });







    return(
        <div className="app-container">
            <header>Application Form</header>

            <form action="client/src/components/job/JobApplicationForm#">
                <div className="form first">
                    <div className="details Job">
                        <span className="title">Job Details</span>

                        <div className="fields">
                            <div className="input-field">
                                <label>Company Name</label>
                                <input type="text" placeholder="Enter Company name" required onChange={e => (
                                    setCompanyName(e.target.value))} value={CompanyName}
                                />
                            </div>


                            <div className="input-field">
                                <label>Apply Date</label>
                                <input type="date" placeholder="Enter Apply date" required onChange={e => (
                                    setApplyDate(e.target.value))} value={ApplyDate}

                                />
                            </div>

                            <div className="input-field">
                                <label>Job Title</label>
                                <input type="text" placeholder="Enter Job Title" required  onChange={e => (
                                    setJobTitle(e.target.value))} value={JobTitle}
                                />
                            </div>


                            <div className="input-field">
                                <label>Status</label>
                                <select required>

                                    <option disabled selected>Select Status</option>
                                    {JobStatFromDb.map(e => (
                                        <option value={e.StatusID}>{e.Name}</option>
                                        )
                                    )
                                    }


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