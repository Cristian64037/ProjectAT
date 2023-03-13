import useFetch from "../../hooks/useFetch";
import Files from "./Files";
import React from "react";

const Documents = () => {
    const {data:boxes , isPending , error}= useFetch( "http://localhost:8000/BoxCard");
    console.log(boxes);

    return (
        <div>

            <form action="save_file.php" encType="multipart/form-data" method="post">
                <div className="row row-cols-1 row-cols-md-4 vh-100 ">
                { isPending && <div>Loading...</div> }
                { error && <div>{ error }</div> }
                {boxes && boxes.map((box) => (
                    <div className="col"style={{marginBottom:5,marginTop:5}}>
                    <div className="card" style={{width:"18rem"}} key={box.BoxCardId}>
                        <img src={"JT.png"} className={"card-img-top"} alt={"Images"}/>

                        <div className="card-body">
                            <h5 className="card-title">{box.BoxCardName}</h5>
                            <p className="card-text">Store all your {box.BoxCardName} </p>
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