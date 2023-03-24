import useFetch from '../../hooks/useFetch';
import {useEffect, useState} from "react";
import JobDetails from "./JobDetails";
function InterviewPrep(){
    const [jobs, setJobs] = useState("");
    const [isPending, setIsPending] = useState(false)
    const [Selected,SetSelected]=useState(false);
    const [searchItem,setSearchItem]=useState("");


    function showMeAvailable(v) {
        setSearchItem(v.target.value);

        SetSelected(true);
    }

    async function fetchData(){
        await fetch('http://localhost:3306/api/interview/3', {
            method: 'Get',
            headers: {
                'content-type': 'application/json'
            }
        }).then(async (data) => {
            var body = await data.json();
            setJobs(body);
            setIsPending(true);

        });
    }

    useEffect(() => {
        // Update the document title using the browser API
        fetchData();
    }, [isPending]);

    return(
        <div className="container-fluid height-full " >
            <div className="row">
                <div className="col-5">
                    <h2> Welcome To The Interview Page</h2>
                    <p> Please select a job from the dropdown. On submission, a table will populate with
                        corresponding information on the right side</p>
                    <label htmlFor="Items">Choose an Item:</label>
                    {jobs && <select name="Items" id="Items" onChange={showMeAvailable} >
                        <option>Select Job</option>
                        {jobs.map((jobs) => (
                            <option value={jobs.JobsID} key={jobs.JobsID}> {`${jobs.CompName} (${jobs.PositionName})`}</option>
                        ))}
                    </select>
                    }
                </div>
                {Selected && <JobDetails JobId={searchItem}/>}
            </div>
        </div>
    )
}
export default InterviewPrep;