import React from "react";

function Information() {
  return (
    <React.Fragment>
      <div className="container mt-5 text-white border border-danger font-weight-light  border-left-0 border-right-0" style={{fontFamily:"system-ui"}} >
        <div className="row">
          <div className="col-4 text-left">
            <h4 className="display-5">About Us</h4>
            <p>
             Stella Tanganyika Pharmacy is a trusted pharmaceutical establishment
             committed to delivering exceptional healthcare services to the community. </p>
             <p>
              With a rich heritage of commited staff, our pharmacy takes pride 
              in offering a wide range of high-quality medications, health products, and personalized care.
            </p>
          </div>

          <div className="col-4 text-left">
            <h4>Mission and Vision</h4>
            <h5>Mission</h5>
            <p>
            To provide a safe, efficient, and economical health care system 
            medication distribution system in outpatient and inpatient settings.
            </p>
            <h5>Vision</h5>
            <p>
                To continue to be a leader in providing quality pharmaceutical
                care.
            </p>
          </div>

          <div className="col-4 text-left">
            <h4>Contact Info</h4>
            <ul className="list-group list-group-flush  ">
              <li className=" list-group-item bg-transparent">
                <span className=" fa fa-phone "></span> : +255 699 537 324
              </li>
              <li className=" list-group-item bg-transparent">
                <span className=" fa fa-envelope"></span> : P.O.Box 79
              </li>
              <li className=" list-group-item bg-transparent">
                <span className=" fa fa-map-marker"></span> :Dar es Saalam | Ilala | Gongo La Mboto | 
                 Plot No.21
              </li>
            </ul>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default Information;
