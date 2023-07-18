import React from "react";
import successimg from "./assets/images/success.png";

function Success(probs) {
  const sendmsg = () => {
    const data = false;
    probs.sendmsg(data);
  };
  return (
    <React.Fragment>
      <div className="success  animated jello">
        <div className="card">
          <div className=" card-body">
            <img src={successimg} className=" img-fluid" />
            <h4 className="mt-3">{probs.message}</h4>
            <button onClick={sendmsg} className="btn btn-sm btn-danger">
              Ok
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default Success;
