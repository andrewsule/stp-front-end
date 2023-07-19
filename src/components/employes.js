import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import Spinner from "./spinner";

function Employees() {
  const headers = {
    'x-auth-token': window.localStorage.getItem("admin_token")
  }
  const [loading, setloading] = useState(false);
  const [search, setSearch] = useState("");
  const [employees, setEmployees] = useState({
    employees: [],
    error: "",
    filtered: [],
  });

  const getValues = (event) => {
    const inputValue = event.target.value;
    setSearch(inputValue);

    const filtered = employees.employees.filter((emp) => {
      return emp.uid.toLowerCase().includes(inputValue.toLowerCase());
    });

    setEmployees({
      ...employees,
      filtered: filtered,
    });
  };

  useEffect(() => {
    setloading(true);
    let url = process.env.REACT_APP_URL
    Axios.get(`${url}/viewemployees`,{headers})
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

  return (
    <React.Fragment>
      <div className="container">
        <h4 style={{ color: "red" }} className="mt-3">
          Expense Records
        </h4>

        <div className="row">
          <div className="col-md-6 col-sm-12">
            <form className="form-group">
              <input
                className="form-control"
                type="text"
                name="search"
                value={search}
                onChange={getValues}
                placeholder="search employee by UID"
              />
            </form>
          </div>

          <div className="col-md-6 col-sm-12 mb-xsm-2 justify-content-end">
            <Link
              to="/add_employee"
              className="bg-danger text-white p-2 mr- btn"
            >
              {" "}
              Add Employee{" "}
            </Link>
            <Link
              to="/delete_employee"
              className="bg-danger text-white p-2 mr-2 btn"
            >
              {" "}
              Delete Employee{" "}
            </Link>
            <Link
              to="/update_employee"
              className="bg-danger text-white p-2 btn"
            >
              {" "}
              Update Employee{" "}
            </Link>
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-12">
            <table className="table table-striped table-sm table-responsive-sm">
              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Image</th>
                  <th>Position</th>
                  <th>Phone</th>
                  <th>Salary(ssp)</th>
                  <th>Address</th>
                  <th>Next of Kin</th>
                  <th>NoK Contact</th>
                </tr>
              </thead>
              <tbody>
                {employees.filtered.length > 0
                  ? employees.filtered.map((emp) => (
                      <tr key={emp._id}>
                        <td>{emp.uid}</td>
                        <td>{emp.first_name}</td>
                        <td>{emp.last_name}</td>
                        <td>
                          <img src={emp.image} alt="" width="30" height="30" />
                        </td>
                        <td>{emp.position}</td>
                        <td>{emp.phone}</td>
                        <td>{emp.salary}</td>
                        <td>{emp.address}</td>
                        <td>{emp.next_of_kin}</td>
                        <td>{emp.nof_contact}</td>
                      </tr>
                    ))
                  : employees.employees.map((emp) => (
                      <tr key={emp._id}>
                        <td>{emp.uid}</td>
                        <td>{emp.first_name}</td>
                        <td>{emp.last_name}</td>
                        <td>
                          <img src={emp.image} alt="" width="30" height="30" />
                        </td>
                        <td>{emp.position}</td>
                        <td>{emp.phone}</td>
                        <td>{emp.salary}</td>
                        <td>{emp.address}</td>
                        <td>{emp.next_of_kin}</td>
                        <td>{emp.nof_contact}</td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {loading ? <Spinner /> : null}
    </React.Fragment>
  );
}

export default Employees;
