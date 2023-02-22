import useFetch from "./useFetch";
import Boardss from "./Jobs.js"

const Boards=()=>{
    const {data:jobs,isPending,error}= useFetch( "http://localhost:8000/Jobs");
    return(
        <div>
           <Boardss/>
        </div>
    );
}
export default Boards;