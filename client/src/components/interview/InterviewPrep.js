import useFetch from '../../hooks/useFetch';
import {useState} from "react";
import JobDetails from "./JobDetails";
function InterviewPrep(){
    const {data : Jobs, isPending, error } = useFetch('http://localhost:8000/Jobs');
    const [Selected,SetSelected]=useState(false);
    const [searchItem,setSearchItem]=useState("");
    function showMeAvailable(v) {
        setSearchItem(v.target.value);
        SetSelected(true);
    }
    return(
        <div className="container-fluid height-full " >
            <div className="row">
                <div className="col-5">
                    <h2> Welcome To The Interview Page</h2>
                    <p> Please select a job from the dropdown. On submission, a table will populate with
                        corresponding information on the right side</p>
                    <label htmlFor="Items">Choose an Item:</label>
                    {Jobs && <select name="Items" id="Items" onChange={showMeAvailable} >
                        <option> </option>
                        {Jobs.map((jobs) => (
                            <option value={jobs.id} key={jobs.id}> {jobs.CompName}</option>
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