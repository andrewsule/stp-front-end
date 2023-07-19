import React, { useState } from "react";
import Axios from "axios";
import Success from "./success";
import Failure from "./failure";
import Warning from "./warning";
import Spinner from "./spinner";

function AddExpense() {
  const headers = {
    'x-auth-token': window.localStorage.getItem("admin_token")
  }
  const [loading, setloading] = useState(false);
  let [addexpense, setsaddexpense] = useState({
    cost: "",
    name: "",
  });

  const [alert_message, setalert_message] = useState({
    show_success: false,
    show_failure: false,
    show_warning: false,
    message: "",
  });

  const fromalert = (data) => {
    setalert_message({
      show_success: data,
      show_failure: data,
      show_warning: data,
    });
  };

  let submitexpense = async (event) => {
    event.preventDefault();
    setloading(true);
    let url = process.env.REACT_APP_URL
    await Axios.post(`${url}/addexpense`, addexpense,{headers})
      .then((response) => {
        setloading(false);
        setalert_message({
          ...alert_message,
          show_success: true,
          message: response.data,
        });
      })
      .catch((error) => {
        setloading(false);
        console.log(error);
        setalert_message({
          ...alert_message,
          show_failure: true,
          message: "Unexpexted error occured",
        });
      });
    setsaddexpense({
      name: "",
      cost: "",
    });
  };

  let getValues = (event) => {
    setsaddexpense({
      ...addexpense,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <React.Fragment>
      <div className="container mt-5">
        <div className="row">
          <div className="col-12">
            <h4 style={{ color: "red" }}>Expense Entry Point</h4>
            <form className=" form-group" onSubmit={submitexpense}>
              <label>Expense Type</label>
              <select
                className="form-control "
                name="name"
                onChange={getValues}
                required
              >
                <option value="">Select expense type</option>
                <option value="Tax">Tax</option>
                <option value="Electricity">Electricity</option>
                <option value="Water">Water</option>
                <option value="Salary">Salary</option>
                <option value="Transport">Transport</option>
                <option value="Security">Security</option>
                <option value="Community fee">Community fee</option>
                <option value="Food">Food</option>
                <option value="Cleaning">Cleaning</option>
                <option value="Service Levy">Service Levy</option>
                <option value="Garbage Collection">Garbage Collection</option>
                <option value="Internet">Internet</option>
              </select>

              <label>Cost</label>
              <input
                type="number"
                name="cost"
                value={addexpense.cost}
                onChange={getValues}
                className="form-control"
                placeholder="Enter Cost"
                required
              />

              <button type="submit" className="btn btn-danger">
                Submit
              </button>
            </form>
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
}

export default AddExpense;
