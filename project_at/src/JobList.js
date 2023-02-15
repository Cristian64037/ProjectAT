const JobList=({jobs,title})=>{
    return(
        <div className={"blog-list"}>
            <h2> {title}</h2>
            {jobs.map((jobs)=>(
                <div className="blog-preview" key={jobs.id}>
                    <h2>{jobs.CompName}</h2>
                    <p> Position Name {jobs.PositionName} </p>
                    <p> Applied Date {jobs.AppliedDate} </p>
                    <p> Status {jobs.StatusID} </p>
                    <p> Interview Round {jobs.InterviewRound} </p>
                    <p> Interest Level {jobs.InterestLevel} </p>

                </div>
            ))}
        </div>
    )
}
export default JobList;