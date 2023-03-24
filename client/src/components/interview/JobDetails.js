import useFetch from "../../hooks/useFetch";
import {useEffect, useState} from "react";

const JobDetails = (JobId) => {
    const [job, setJob] = useState("");
    const [isPending, setIsPending] = useState(false);

    async function fetchData(){
        await fetch('http://localhost:3306/api/interview/job/' + JobId.JobId, {
            method: 'Get',
            headers: {
                'content-type': 'application/json'
            }
        }).then(async (data) => {
            var body = await data.json();
            setJob(body);
            setIsPending(true);
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
                    <h2>{job.CompName}</h2>
                    <p> Position Name {job.PositionName} </p>
                    <p> Applied Date {job.AppliedDate} </p>
                    <p> Status {job.StatusID} </p>
                    <p> Interview Round {job.InterviewRound} </p>
                    <p> Interest Level {job.InterestLevel} </p>
                </div>
            )}
        </div>
    );
}

export default JobDetails;