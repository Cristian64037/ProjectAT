import useFetch from "../../hooks/useFetch";
import {useEffect, useState} from "react";
import useGet from "../../hooks/useGet";
import Moment from 'moment';

const JobDetails = (JobId) => {
    const [job, setJob] = useState("");
    const [isPending, setIsPending] = useState(true);
    const {data: jobDataFromDB, isPending2, error2} = useGet("http://localhost:3306/api/interview/job/"+JobId.JobId);

    useEffect(() => {
        setIsPending(false);
        console.log(jobDataFromDB[0].AppliedDate)
    }, [jobDataFromDB,isPending]);

    return (
        <div className="blog-details">
            { isPending && <div>Loading...</div> }
            { jobDataFromDB && (
                <div className="blog-preview" key={job.JobsID}>
                    <h2>{jobDataFromDB[0].CompName}</h2>
                    <p> Position Name {jobDataFromDB[0].PositionName} </p>

                    <p> Applied Date {Moment(jobDataFromDB[0].AppliedDate).format('MM-DD-YYYY')} </p>

                    <p> Status {jobDataFromDB[0].StatusID} </p>
                    <p> Interview Round {jobDataFromDB[0].InterviewRound} </p>
                    <p> Interest Level {jobDataFromDB[0].InterestLevel} </p>
                </div>
            )}
        </div>
    );
}

export default JobDetails;