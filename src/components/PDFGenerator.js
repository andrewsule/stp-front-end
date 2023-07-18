import React, { useRef, useState } from "react";
import logo from "./assets/images/logo2.png";
import ReactToPrint from "react-to-print";
import { Navigate } from "react-router-dom";

// Create Document Component
const PDFGenerator = (props) => {
  const componentRef = useRef(); 

let go_back = ()=>{
  window.location.reload();
}
  return (
    <React.Fragment>
      <ReactToPrint
        trigger={() => <button className="btn btn-danger">Print this out! <i className="fa fa-print"></i></button>}
        content={() => componentRef.current}
      />
      <button onClick={go_back} className="btn btn-danger">Back</button>
      {
        <div className=" container " ref={componentRef}>
          <div className="text-center mt-2">
            <img src={logo} width={95} alt="Logo" className="mt-2" />
            <h4>Stella Tanganyika Pharmacy</h4>
            <h5>"We Care About Your Health"</h5>

            <h5>
              <b>Invoice</b>
            </h5>
          </div>

          <div className="container">
            <div className="row">
              <div className="col-12 mr-auto text-right">
                Date & Time: {new Date().toLocaleString()}
              </div>
            </div>
            <div className="row">
              <div className="col-12 mr-auto text-left">
                <b>Bill To:</b>
                <br />
                {props.name} <br />
                {props.phone}
              </div>
            </div>
            <p className="text-center"><b>Items Bought</b></p>
            <div className="row">
              <div className="col-12">
                <table className="table table-bordered text-center mt-2 table-responsive-sm">
                  <thead className="mt-2">
                    <tr>
                      <th>Product</th>
                      <th>Sold By</th>
                      <th>Quantity</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {props.items.map((item) => {
                      return (
                        <tr key={item._id}>
                          <td>{item.name}</td>
                          <td>{item.sold_by}</td>
                          <td>{item.quantity}</td>
                          <td>{item.selling_price}</td>
                        </tr>
                      );
                    })}

                    <tr>
                      <td colSpan="3">
                        <b>Total Amount:</b>
                      </td>
                      <td>{props.total}</td>
                    </tr>
                  </tbody>
                </table>
                <p className="text-center">
                  Thank you for choosing Stella Tanganyika Pharmacy.
                </p>
              </div>
            </div>
          </div>
        </div>
      }
    </React.Fragment>
  );
};

export default PDFGenerator;
