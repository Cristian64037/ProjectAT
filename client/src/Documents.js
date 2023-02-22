import useFetch from "./useFetch";

const Documents = () => {
    const {data:boxes , isPending , error}= useFetch( "http://localhost:8000/BoxCard");
    console.log(boxes);

    return (
        <div>
            <form action="save_file.php" encType="multipart/form-data" method="post">
                { isPending && <div>Loading...</div> }
                { error && <div>{ error }</div> }
                {boxes && boxes.map((box) => (
                    <div className="doc-container" key={box.BoxCardId}>
                        <p><b>{box.BoxCardName}</b></p>
                        <div className="doc-box-container">
                            <div className="doc-wrapper">
                                <div className="doc-card">
                                    <p style={{fontSize: '12px'}}>December Resume</p>
                                </div>
                                <div className="doc-card">
                                    <p style={{fontSize: '12px'}}>January Resume</p>
                                </div>
                                <div className="doc-card">
                                    <p style={{fontSize: '12px'}}>February Resume</p>
                                </div>
                            </div>
                        </div>
                        <br/><br/>
                        <form className="doc-upload" action="save_file.php" encType="multipart/form-data" method="post">
                            <input type="file"/>
                        </form>
                    </div>
                ))}
            </form>
        </div>
    );
}
export default Documents;