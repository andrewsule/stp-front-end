import React, { useEffect, useState } from "react";
import Axios from "axios";
import Success from "./success";
import Failure from "./failure";
import Warning from "./warning";
import Spinner from "./spinner";

function UpdateEmployees(props) {
  const headers = {
    'x-auth-token': window.localStorage.getItem("admin_token")
  }
  const [loading, setloading] = useState(false);
  const [search, setSearch] = useState("");
  const [employees, setEmployees] = useState({
    employees: [],
    id: "",
    employee: {},
    filtered: [],
    error_message: "",
  });

  useEffect(() => {
    setloading(true);
    Axios.get("http://127.0.0.1:3001/viewemployees",{headers})
      .then((response) => {
        setEmployees({
          ...employees,
          employees: response.data,
        });
        setloading(false);
      })
      .catch((error) => {
        setloading(false);
        setEmployees({
          ...employees,
          error: error.message,
        });
      });
  }, []);

  const getValuesearch = (event) => {
    const inputValue = event.target.value;
    setSearch(inputValue);

    const filtered = employees.employees.filter((emp) => {
      return emp.uid.toLowerCase().includes(inputValue.toLowerCase());
    });

    setEmployees({
      ...employees,
      employee: filtered[0],
      filtered: filtered,
    });
  };

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

  let getValues = (event) => {
    setEmployees({
      ...employees,
      employee: {
        ...employees.employee,
        [event.target.name]: event.target.value,
      },
    });
  };
  let handleImageChange = async (event) => {
    setloading(true);
    let imagefile = event.target.files[0];
    let uimage = await base64(imagefile);
    setEmployees({
      ...employees,
      employee: {
        ...employees.employee,
        image: uimage,
      },
    });
    setloading(false);
  };
  let base64 = (imagefile) => {
    return new Promise((resolve, reject) => {
      let fileReader = new FileReader();
      fileReader.readAsDataURL(imagefile);
      fileReader.addEventListener("load", () => {
        if (fileReader.result) {
          resolve(fileReader.result);
        } else {
          reject("error occured");
        }
      });
    });
  };

  const updateSubmit = async (event) => {
    event.preventDefault();
    setloading(true);
    let dataurl = `http://127.0.0.1:3001/update_employee/${employees.employee._id}`;
    await Axios.put(dataurl, employees.employee,{headers})
      .then((response) => {
        setalert_message({
          ...alert_message,
          show_success: true,
          message: response.data.message,
        });

        setEmployees({
          ...employees,
          choice: false,
        });
        setloading(false);
      })
      .catch((error) => {
        setloading(false);
        setalert_message({
          ...alert_message,
          show_failure: true,
          message: "Unexpexted error occured please try updating later",
        });

        setEmployees({
          ...employees,
          choice: false,
        });
      });
  };

  return (
    <React.Fragment>
      <div className="container">
        <h4 style={{ color: "red" }} className="mt-3">
          Update Employee
        </h4>

        <div className="row">
          <div className="col-md-6 col-sm-12">
            <form className="form-group">
              <input
                className="form-control"
                type="text"
                name="search"
                value={search}
                onChange={getValuesearch}
                placeholder="search employee BY UID"
              />
            </form>
          </div>
        </div>
      </div>
      {employees.filtered.length > 0 ? (
        <div className="col-12">
          <form className=" form-group " onSubmit={updateSubmit}>
            <table className="table table-striped table-responsive-sm">
              <tr>
                <td>
                  <label>First Name</label>
                  <input
                    type="text"
                    name="first_name"
                    value={employees.employee.first_name}
                    onChange={getValues}
                    className="form-control"
                    placeholder="Enter First Name"
                    required
                  />
                </td>

                <td>
                  <label>Last Name</label>
                  <input
                    type="text"
                    name="last_name"
                    value={employees.employee.last_name}
                    onChange={getValues}
                    className="form-control"
                    placeholder="Enter Last Name"
                    required
                  />
                </td>

                <td>
                  <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    value={employees.employee.password}
                    onChange={getValues}
                    className="form-control"
                    placeholder="Enter to be used by employee"
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>Phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={employees.employee.phone}
                    onChange={getValues}
                    className="form-control"
                    placeholder="Enter employee`s phone number"
                    required
                  />
                </td>

                <td>
                  <label>Position</label>
                  <select
                    className="form-control "
                    name="position"
                    onChange={getValues}
                    required
                  >
                    <option value={employees.employee.position}>
                      {employees.employee.position}
                    </option>
                    <option value="Administrator">Administrator</option>
                    <option value="Staff">Staff</option>
                  </select>
                </td>

                <td>
                  <label>Salary</label>
                  <input
                    type="number"
                    name="salary"
                    value={employees.employee.salary}
                    onChange={getValues}
                    className="form-control"
                    placeholder="Enter Cost"
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>Address</label>
                  <input
                    type="text"
                    name="address"
                    value={employees.employee.address}
                    onChange={getValues}
                    className="form-control"
                    placeholder="Enter Address"
                    required
                  />
                </td>
                <td>
                  <label>Next of Kin</label>
                  <input
                    type="text"
                    name="next_of_kin"
                    value={employees.employee.next_of_kin}
                    onChange={getValues}
                    className="form-control"
                    placeholder="Enter Next of Kin Name"
                    required
                  />
                </td>
                <td>
                  <label>Nof Contact</label>
                  <input
                    type="text"
                    name="nof_contact"
                    value={employees.employee.nof_contact}
                    onChange={getValues}
                    className="form-control"
                    placeholder="Enter Next of Kins Contact"
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>Picture</label>
                  <br />
                  <input type="file" onChange={handleImageChange} />
                </td>
              </tr>
            </table>
            <p className=" text-warning">
              NOTE:
              <br />
              Password must be changed on every upadate
            </p>
            <button type="submit" className="btn btn-danger">
              Update
            </button>
          </form>
        </div>
      ) : null}

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

export default UpdateEmployees;
