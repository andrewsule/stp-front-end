import React from "react";
import failureimg from "./assets/images/failure.png";

function Failure(probs) {
  const sendmsg = () => {
    const data = false;
    probs.sendmsg(data);
  };
  return (
    <React.Fragment>
      <div className="success  animated jello">
        <div className="card">
          <div className=" card-body">
            <img
              src={failureimg}
              className=" img-fluid"
              width={127}
              height={127}
            />
            <h4 className="mt-3">{probs.message}</h4>
            <p>Please try again later!</p>
            <button onClick={sendmsg} className="btn btn-sm btn-danger">
              Ok
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default Failure;
