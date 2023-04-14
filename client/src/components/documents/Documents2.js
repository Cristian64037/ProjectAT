import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {checkAuth} from "../../functions/checkAuth";
import useGet from "../../hooks/useGet";

const Documents = () => {
    const navigate = useNavigate();
    const {data: boxes, isPending, error} = useGet("http://localhost:3306/api/documents");

    useEffect(() => {
        checkAuth().then(body => {
            console.log(body.auth);
            if (!body.auth) {
                navigate('/unauthorized')
            }
        });
    }, []);

    return (
        <div style={{marginBottom: 400, marginTop: 10}}>

            <form action="save_file.php" encType="multipart/form-data" method="post">
                <div className="row row-cols-1 row-cols-md-4 vh-100 ">

                    {boxes && boxes.map((box) => (
                        <div className="col" style={{marginBottom: 5, marginTop: 5}}>
                            <div className="card" style={{width: "18rem"}} key={box.BoxCardId}>
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
                                    <form className="doc-upload" action="save_file.php" encType="multipart/form-data"
                                          method="post">
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