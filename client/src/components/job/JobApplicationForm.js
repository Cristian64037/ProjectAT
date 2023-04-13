import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import DatePicker from "react-datepicker";
import App from "../../App";
import {useLocation} from "react-router";

const JobApplicationForm=(e)=>{
    const navigate = useNavigate();
    const [jobId,setJobId]= useState(null);
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
    const [InterestLevelFromDb,setInterestLevelFromDb]= useState([]);
    const [resumeID,setResumeID]= useState([]);
    const { state } = useLocation();


    async function fetchSpecificJob(index) {
        setJobId(index);
        await fetch("http://localhost:3306/api/jobs/edit/" + index, {
            method: 'Get',
            headers: {
                'content-type': 'application/json',
                "x-access-token": localStorage.getItem("token")
            }
        }).then(async (data) => {
            var body = await data.json();
            console.log(body[0]);
            setCompanyName(body[0].CompName);
            setApplyDate(body[0].AppliedDate);
            setAwards(body[0].Awards);
            setCoreValues(body[0].CoreValues);
            setExpectedSalary(body[0].ExpectSalary);
            console.log(body[0].Expectsalary)
            setMissionStatement(body[0].MissionStatement);
            setJobTitle(body[0].PositionName);
            setJobStatus(body[0].StatusID);
            setWebsite(body[0].WebUrl);
            setInterestLevel(body[0].InterestLevel);
            setInterviewRound(body[0].InterviewRound);
            setNotes(body[0].InterviewNotes)




        });

    }

    async function getResumes() {
        await fetch("http://localhost:3306/api/getResumesJobBoard", {
            method: 'Get',
            headers: {
                'content-type': 'application/json',
                "x-access-token": localStorage.getItem("token")
            }
        }).then(async (data) => {
            console.log(data)
            if(data.status===400){


            }else{
            var body = await data.json();

            console.log(body)
            setResumeID(body);}


        });

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
        };

        checkAuth().then(body => {
            console.log(body.auth);
            if (body.auth) {
                fetchData()
                getResumes()
                try{
                    const { index } = state;
                    fetchSpecificJob(index);

                }catch (e) {

                }
            }
            else {
                navigate('/unauthorized')
            }
        });
        // Update the document title using the browser API


        }, []);

    async function fetchData(){
        await fetch("http://localhost:3306/api/JobStatus", {
            method: 'Get',
            headers: {
                'content-type': 'application/json',
                "x-access-token" : localStorage.getItem("token")
            }
        }).then(async (data) => {
            var body = await data.json();
            setJobStatFromDb(body);


        });
        await fetch("http://localhost:3306/api/InterestLevel", {
            method: 'Get',
            headers: {
                'content-type': 'application/json',
                "x-access-token" : localStorage.getItem("token")
            }
        }).then(async (data) => {
            var body = await data.json();
            setInterestLevelFromDb(body);


        });

    }


    async function handleSubmit(e) {
        e.preventDefault();
        if(jobId==null){
            alert("New Job");
            await fetch("http://localhost:3306/api/jobs", {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    "x-access-token" : localStorage.getItem("token")
                },
                body: JSON.stringify({

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
                    navigate("/boards")
                }else {
                    alert(body);
                }
            });

        }else{
            alert("Editing");
            await fetch("http://localhost:3306/api/jobs/edit/"+jobId, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json',
                    "x-access-token" : localStorage.getItem("token")
                },
                body: JSON.stringify({
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
                    alert("Successful Job Update");
                    navigate("/boards")
                }else {
                    alert(body);
                }
            });
            //Do a Edit to The Db route Here
        }


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

                                    <option disabled selected >Select Status</option>
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
                                       value={InterviewRound}


                                />
                            </div>
                            <div className="input-field" id={"InterestLevel"}>
                                <label>Interest Level</label>
                                <select required onChange={e => (
                                    setInterestLevel(e.target.value))} >
                                    <option disabled selected >Select Interest Level</option>
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
                                    setWebsite(e.target.value))} value={Website}

                                />
                            </div>

                            <div className="input-field">
                                <label>Mission Statement</label>
                                <input type="text" placeholder="Enter Mission Statement" required onChange={e => (
                                    setMissionStatement(e.target.value))}
                                       value={MissionStatement}

                                />
                            </div>

                            <div className="input-field">
                                <label>Core Values</label>
                                <input type="text" placeholder="Enter Core Values" required onChange={e => (
                                    setCoreValues(e.target.value))}
                                       value={CoreValues}
                                />
                            </div>

                            <div className="input-field">
                                <label>Awards</label>
                                <input type="text" placeholder="Enter Awards" required onChange={e => (
                                    setAwards(e.target.value))}
                                       value={Awards}
                                />
                            </div>

                            <div className="input-field">
                                <label>Expected Salary</label>
                                <input type="number" placeholder="Enter Expected Salary" required onChange={e => (
                                    setExpectedSalary(e.target.value))}
                                       value={ExpectedSalary}
                                />
                            </div>

                            <div className="input-field">
                                <label>Notes</label>
                                <input type="text" placeholder="Enter Notes" required onChange={e => (
                                    setNotes(e.target.value))}
                                       value={Notes}
                                />
                            </div>
                            <div className="input-field">
                                <label>Resume</label>
                                <select>
                                    <option disabled selected >Select Resume</option>
                                    {resumeID.length!==0? resumeID.map(e => (
                                            <option >{e.DocName}</option>
                                        )
                                    ):<option disabled> Upload to Documents First</option>
                                    }

                                </select>
                            </div>
                            <label/>
                            <button className="nextBtn">
                                <button type="submit" onClick={handleSubmit}>Submit</button>
                            </button>
                        </div>


                    </div>
                </div>
            </form>
        </div>

);
}
export default JobApplicationForm;