import React from "react";
import not_present from "./assets/images/page_not_present.jpg";

function NullPage() {
  return (
    <React.Fragment>
      <div className=" text-center">
        <img src={not_present} style={{ width: "500px", height: "500px" }} />
        <h1 className="text-center mt-3">404 Page Not Found</h1>
      </div>
    </React.Fragment>
  );
}
export default NullPage;
