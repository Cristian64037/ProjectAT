import {useState, useEffect} from 'react';

const useGet = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    console.log(url);

    useEffect( () => {
        const abortCont = new AbortController();
        const fetchData = async () => {
            console.log("========IN FETCH DATA=======");
            await fetch(url, {
                method: 'Get',
                headers: {
                    'content-type': 'application/json',
                    "x-access-token": localStorage.getItem("token")
                },
                signal: abortCont.signal
            })
        }
        fetchData()
            .then(res => {
                console.log("========IN RES=======");
                if (!res.ok) { // error coming back from server
                    throw Error('could not fetch the data for that resource');
                }
                return res.json();
            })
            .then(data => {
                console.log("========IN DATA=======");
                setIsPending(false);
                setData(data);
                setError(null);
            })
            .catch(err => {
                console.log("========IN ERROR=======");
                if (err.name === 'AbortError') {
                    console.log('fetch aborted')
                } else {
                    // auto catches network / connection error
                    setIsPending(false);
                    setError(err.message);
                }
            })
        // abort the fetch
        return () => abortCont.abort();;
    }, [url]);
    return {data, isPending, error};
}
export default useGet;