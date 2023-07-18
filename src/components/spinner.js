import React from "react";
import spinner from "./assets/images/spinner.gif"

function Spinner() {
  return (
    <React.Fragment>
      <div className="spinner">
        <img src={spinner}/>
      </div>
    </React.Fragment>
  );
}
export default Spinner;