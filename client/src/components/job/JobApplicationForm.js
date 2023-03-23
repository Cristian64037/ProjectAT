import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import DatePicker from "react-datepicker";
import App from "../../App";

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
    const [InterestLevelFromDb,setInterestLevelFromDb]= useState([])


    useEffect(() => {
        // Update the document title using the browser API
        fetchData();
        }, []);

    async function fetchData(){
        await fetch("http://localhost:3306/api/JobStatus", {
            method: 'Get',
            headers: {
                'content-type': 'application/json'
            }
        }).then(async (data) => {
            var body = await data.json();
            setJobStatFromDb(body);


        });
        await fetch("http://localhost:3306/api/InterestLevel", {
            method: 'Get',
            headers: {
                'content-type': 'application/json'
            }
        }).then(async (data) => {
            var body = await data.json();
            setInterestLevelFromDb(body);


        });

    }


    async function handleSubmit(e) {
        e.preventDefault();

        await fetch("http://localhost:3306/api/jobs", {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                "board": 7,
                "company": CompanyName,
                "posName": JobTitle,
                "appDate": ApplyDate,
                "jobStatus": JobStatus,
                "interviewRound": InterviewRound,
                "interest": InterestLevel,
                "coreValues": CoreValues,
                "mission": MissionStatement,
                "webLink": Website,
                "awards": Awards,
                "salary": ExpectedSalary,
                "notes": Notes,

            })
        }).then(async (data) => {
            var body = await data.text();
            if(data.status===201){
                alert("Successful Job Input");
            }else {
                alert(body);
            }
        });
    }






    return(
        <div className="app-container">
            <header>Application Form</header>

            <form>
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

                               <input type="date" placeholder="yyyy-mm-dd"  required onChange={e => (
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
                                <select required onChange={e => (
                                    setJobStatus(e.target.value))}>

                                    <option disabled selected>Select Status</option>
                                    {JobStatFromDb.map(e => (
                                        <option value={e.StatusID} >{e.Name}</option>
                                        )
                                    )
                                    }


                                </select>
                            </div>

                            <div className="input-field">
                                <label>Interview Round</label>
                                <input type="number" placeholder="Enter Interview Round" required onChange={e => (
                                    setInterviewRound(e.target.value))}


                                />
                            </div>
                            <div className="input-field" id={"InterestLevel"}>
                                <label>Interest Level</label>
                                <select required onChange={e => (
                                    setInterestLevel(e.target.value))} >
                                    <option disabled selected>Select Interest Level</option>
                                    {InterestLevelFromDb.map(e => (
                                    <option value={e.InterestLevelID} >{e.Name}</option>
                                        )
                                    )
                                    }

                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="details Company">
                        <span className="title">Company Details</span>

                        <div className="fields">
                            <div className="input-field">
                                <label>Website</label>
                                <input type="text" placeholder="Enter URL" required onChange={e => (
                                    setWebsite(e.target.value))}

                                />
                            </div>

                            <div className="input-field">
                                <label>Mission Statement</label>
                                <input type="text" placeholder="Enter Mission Statement" required onChange={e => (
                                    setMissionStatement(e.target.value))}

                                />
                            </div>

                            <div className="input-field">
                                <label>Core Values</label>
                                <input type="text" placeholder="Enter Core Values" required onChange={e => (
                                    setCoreValues(e.target.value))}
                                />
                            </div>

                            <div className="input-field">
                                <label>Awards</label>
                                <input type="text" placeholder="Enter Awards" required onChange={e => (
                                    setAwards(e.target.value))}
                                />
                            </div>

                            <div className="input-field">
                                <label>Expected Salary</label>
                                <input type="number" placeholder="Enter Expected Salary" required onChange={e => (
                                    setExpectedSalary(e.target.value))}
                                />
                            </div>

                            <div className="input-field">
                                <label>Notes</label>
                                <input type="text" placeholder="Enter Notes" required onChange={e => (
                                    setNotes(e.target.value))}
                                />
                            </div>
                        </div>

                        <button className="nextBtn">
                            <button type="submit" onClick={handleSubmit}>Submit</button>
                        </button>
                    </div>
                </div>
            </form>
        </div>

);
}
export default JobApplicationForm;