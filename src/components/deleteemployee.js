import React, { useState } from "react";
import axios from "axios";
import Success from "./success";
import Failure from "./failure";
import Spinner from "./spinner";

function DeleteEmployee() {
  const headers = {
    'x-auth-token': window.localStorage.getItem("admin_token")
  }
  const [loading, setloading] = useState(false);
  const [alert_message, setalert_message] = useState({
    show_success: false,
    show_failure: false,
    message: "",
  });

  const fromalert = (data) => {
    setalert_message({
      show_success: data,
      show_failure: data,
    });
  };
  let [id, setid] = useState("");

  let getValues = (event) => {
    setid(event.target.value);
  };

  let delete_employee = async (event) => {
    event.preventDefault();
    setloading(true);
    await axios
      .delete(`http://127.0.0.1:3001/delete/${id}`,{headers})
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
        console.log(error.message);
        setalert_message({
          ...alert_message,
          show_failure: true,
          message: "Unexpexted error occured",
        });
      });
  };

  return (
    <React.Fragment>
      <div className="container mt-5">
        <div className="row">
          <div className="col-12">
            <h4 style={{ color: "red" }}>Delete Employee</h4>
            <form onSubmit={delete_employee} className=" form-group mt-3">
              <label>Employee`s ID</label>
              <input
                type="text"
                name="id"
                value={id}
                onChange={getValues}
                className="form-control"
                placeholder="Enter Employees ID"
                required
              />
              <button type="submit" className="btn btn-danger btn-sm mt-3">
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
      {loading ? <Spinner /> : null}
    </React.Fragment>
  );
}

export default DeleteEmployee;
