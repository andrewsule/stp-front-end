import React from "react";
import warningimg from "./assets/images/warning.jpg";
import { Link } from "react-router-dom";

function Warning(probs) {
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
              src={warningimg}
              className=" img-fluid"
              width={127}
              height={127}
            />
            <h4 className="mt-3">{probs.message}</h4>
            <p>
              {" "}
              You can go to
              <Link to="/update_stock" className="nav-link">
                {" "}
                Update page
              </Link>
              and update the stock
            </p>
            <button onClick={sendmsg} className="btn btn-md btn-warning">
              Ok
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default Warning;
