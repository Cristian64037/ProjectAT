import useFetch from "./useFetch";
import {useState} from "react";

const JobDetails = (JobId) => {
    const newJob =JobId.JobId;

    console.log(newJob);

    const { data: jobs, error, isPending } = useFetch('http://localhost:8000/Jobs/' + newJob);


    return (
        <div className="blog-details">
            { isPending && <div>Loading...</div> }
            { error && <div>{ error }</div> }
            { jobs && (
                <div className="blog-preview" key={jobs.id}>
                    <h2>{jobs.CompName}</h2>
                    <p> Position Name {jobs.PositionName} </p>
                    <p> Applied Date {jobs.AppliedDate} </p>
                    <p> Status {jobs.StatusID} </p>
                    <p> Interview Round {jobs.InterviewRound} </p>
                    <p> Interest Level {jobs.InterestLevel} </p>

                </div>
            )}
        </div>
    );
}

export default JobDetails;