import useFetch from "../../hooks/useFetch";
import {useEffect, useState} from "react";

const JobDetails = (JobId) => {
    const [job, setJob] = useState("");
    const [isPending, setIsPending] = useState(true);
    console.log(JobId);

    async function fetchData(){
        await fetch('http://localhost:3306/api/interview/job/' + JobId.JobId, {
            method: 'Get',
            headers: {
                'content-type': 'application/json',
                "x-access-token" : localStorage.getItem("token")
            }
        }).then(async (data) => {
            var body = await data.json();
            setJob(body);
            console.log(job)
            setIsPending(false);
        });
    }

    useEffect(() => {
        // Update the document title using the browser API
        fetchData();
    }, [isPending]);

    return (
        <div className="blog-details">
            { isPending && <div>Loading...</div> }
            { job && (
                <div className="blog-preview" key={job.JobsID}>
                    <h2>{job[0].CompName}</h2>
                    <p> Position Name {job[0].PositionName} </p>
                    <p> Applied Date {job[0].AppliedDate} </p>
                    <p> Status {job[0].StatusID} </p>
                    <p> Interview Round {job[0].InterviewRound} </p>
                    <p> Interest Level {job[0].InterestLevel} </p>
                </div>
            )}
        </div>
    );
}

export default JobDetails;