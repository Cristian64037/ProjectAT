import {useState} from "react";
import {useNavigate} from "react-router-dom";

const HIGHLIGHT_COLOR = "rgba(114, 64, 0, 0.36)";

const Listbox = ({
                     list = [],
                     widthPct = 100,
                     editFlag = true,
                     maxHeight = "175px"
}) => {
    let navigate = useNavigate();

    function handleEdit(index) {
        try {

            navigate(`/JobApplicationForm`, {
                state: {
                    index
                }
            })
        } catch (error) {
            // code to handle the error
            return <div>Error: {error.message}</div>;
        }
    }

    function handleInterview(JobsID) {
        try {

            navigate(`/interviewPrep`, {
                state: {
                    JobsID
                }
            })
        } catch (error) {
            // code to handle the error
            return <div>Error: {error.message}</div>;
        }
    }

    const [filterText, setFilterText] = useState("");
    const [filteredList, setFilteredList] = useState(list);
    const [selectedValue, setSelectedValue] = useState("");
    const [selectedID, setSelectedID] = useState("");

    const onFilter = (filter) => {
        setFilterText(filter);
        if (!filter || filter === '') {
            setFilteredList(list);
            return;
        }

        setFilteredList(
            list.filter((item) => `${item.CompName} - ${item.PositionName}`.toLowerCase().includes(filter.toLowerCase()))
        )
    }

    const onSelect = (item) => {
        setSelectedValue(`${item.JobsID} - ${item.CompName} - ${item.PositionName}`);
        setSelectedID(item.JobsID);
        setFilterText('');
        onFilter('');
    }

    return(
        <div className="Listbox" style={{width: widthPct + '%'}}>
            <div className="block">
                <input
                    className="full-width full-width-input"
                    type="text"
                    onChange={(e) => onFilter(e.target.value)}
                    value={filterText}
                />
            </div>
            <ul className="full-width overflow-auto" style={{maxHeight: maxHeight}}>
                {filteredList.map((item, index) => {
                    return (
                        <li
                            key={index}
                            className="no-highlight"
                            style={{
                                backgroundColor: selectedValue === `${item.JobsID} - ${item.CompName} - ${item.PositionName}`
                                    ? HIGHLIGHT_COLOR :
                                    'white',}}
                            value={`${item.CompName} - ${item.PositionName}`}
                            onClick={() => onSelect(item)}
                        >
                            {`${item.CompName} - ${item.PositionName}`}
                        </li>
                    )
                })}
            </ul>
            <button className="btn btn-outline-dark btn-width" type="submit" onClick={(e) =>
                selectedID != "" && (editFlag ? handleEdit(selectedID) : handleInterview(selectedID))}>
                Select
            </button>
        </div>
    )
}
export default Listbox;