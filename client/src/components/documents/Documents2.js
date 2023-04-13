import useFetch from "../../hooks/useFetch";
import Files from "./Files";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {checkAuth} from "../../functions/checkAuth";

const Documents = () => {
    const navigate = useNavigate();
    const [boxes2,setBoxes]= useState([]);
    //const {data:boxes , isPending , error}= useFetch( "http://localhost:8000/BoxCard");
    //console.log(boxes);
    async function fetchData() {
        await fetch("http://localhost:3306/api/documents", {
            method: 'Get',
            headers: {
                'content-type': 'application/json',
                "x-access-token" : localStorage.getItem("token")
            }
        }).then(async (data) => {
            var body = await data.json();
            setBoxes(body);
            console.log(boxes2);
        });



    }
    useEffect(() => {
        checkAuth().then(body => {
            console.log(body.auth);
            if (body.auth) {
                fetchData()
            }
            else {
                navigate('/unauthorized')
            }
        });


    }, []);

    return (
        <div style={{marginBottom:400,marginTop:10}}>

            <form action="save_file.php" encType="multipart/form-data" method="post">
                <div className="row row-cols-1 row-cols-md-4 vh-100 ">

                {boxes2 && boxes2.map((box) => (
                    <div className="col"style={{marginBottom:5,marginTop:5}}>
                    <div className="card" style={{width:"18rem"}} key={box.BoxCardId}>
                        <img src={"Documents.png"} className={"card-img-top"} alt={"Images"}/>

                        <div className="card-body">
                            <h5 className="card-title">{box.BoxName}</h5>
                            {/*<p className="card-text">Store all your {box.BoxName} </p>*/}
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">Download</li>
                            <li className="list-group-item">Download 2</li>
                            <li className="list-group-item">Download 3</li>

                        </ul>


                        <div className="card-body">
                            <form className="doc-upload" action="save_file.php" encType="multipart/form-data" method="post">
                                <input type="file"/>
                            </form>
                        </div>
                    </div>

                    </div>
                ))}


                </div>
            </form>


        </div>
    );
}
export default Documents;