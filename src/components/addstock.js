import React, { useState } from "react";
import Success from "./success";
import Warning from "./warning";
import Failure from "./failure";
import Axios from "axios";
import Spinner from "./spinner";

const AddStock = () => {
  const headers = {
    'x-auth-token': window.localStorage.getItem("staff_token")
  }
  const [loading, setloading] = useState(false);
  const [stock, setStock] = useState({
    name: "",
    sold_by: "",
    quantity: "",
    expiry_date: "",
    buying_price: "",
    selling_price: "",
  });
  const [alert_message, setalert_message] = useState({
    show_success: false,
    show_failure: false,
    show_warning: false,
    message: "",
  });

  let update = (event) => {
    setStock({
      ...stock,
      [event.target.name]: event.target.value,
    });
  };

  const fromalert = (data) => {
    setalert_message({
      show_success: data,
      show_failure: data,
      show_warning: data,
    });
  };

  let submitStock = async (event) => {
    event.preventDefault();
    setloading(true);
    let url = process.env.REACT_APP_URL
    await Axios.post(`${url}/addstock`, stock,{headers})
      .then((response) => {
        if (response.data === "present") {
          setloading(false);
          setalert_message({
            ...alert_message,
            show_warning: true,
            message: response.data,
          });
        } else {
          setloading(false);
          setalert_message({
            ...alert_message,
            show_success: true,
            message: response.data,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        setloading(false);
        setalert_message({
          ...alert_message,
          show_failure: true,
          message: "Unexpexted error occured",
        });
      });

    setStock({
      name: "",
      sold_by: "",
      quantity: "",
      expiry_date: "",
      buying_price: "",
      selling_price: "",
    });
  };

  return (
    <React.Fragment>
      <div className="addwrapper">
        <div className="container mt-4 ">
          <div className="row">
            <div className="col-12 mt-2">
              <h4 style={{ color: "red", fontWeight: "bolder" }}>
                Stock Taking
              </h4>

              <form onSubmit={submitStock}>
                <div className="form-group">
                  <label>Medicine/Costimetic Name</label>
                  <input
                    type="text"
                    name="name"
                    value={stock.name}
                    onChange={update}
                    className="form-control"
                    placeholder="Enter Medicine/Costimetic Name"
                    required
                  />

                  <label>Sold by</label>
                  <select
                    className="form-control "
                    name="sold_by"
                    onChange={update}
                    required
                  >
                    <option value="">
                      Enter How the product is to be sold
                    </option>
                    <option value="Bottle">Bottle</option>
                    <option value="Strip">Strip</option>
                    <option value="Tube">Tube</option>
                    <option value="Litre">Litre</option>
                    <option value="Tablet">Tablet</option>
                    <option value="Unit">Unit</option>
                  </select>

                  <label>Quntity</label>
                  <input
                    type="number"
                    name="quantity"
                    value={stock.quantity}
                    onChange={update}
                    className="form-control"
                    placeholder="Enter of items"
                    required
                  />

                  <label>Expiry Date</label>
                  <input
                    type="date"
                    name="expiry_date"
                    value={stock.expiry_date}
                    onChange={update}
                    className="form-control"
                    required
                  />

                  <label>Buying Price</label>
                  <input
                    type="number"
                    name="buying_price"
                    value={stock.buying_price}
                    onChange={update}
                    className="form-control"
                    placeholder="Enter Buying price"
                    required
                  />

                  <label>Selling Price</label>
                  <input
                    type="number"
                    name="selling_price"
                    value={stock.selling_price}
                    onChange={update}
                    className="form-control"
                    placeholder="Enter Selling Price"
                    required
                  />

                  <button type="submit" className="btn btn-danger">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {alert_message.show_success ? (
        <Success message={alert_message.message} sendmsg={fromalert} />
      ) : null}
      {alert_message.show_failure ? (
        <Failure message={alert_message.message} sendmsg={fromalert} />
      ) : null}
      {alert_message.show_warning ? (
        <Warning message={alert_message.message} sendmsg={fromalert} />
      ) : null}
      {loading ? <Spinner /> : null}
    </React.Fragment>
  );
};
export default AddStock;
