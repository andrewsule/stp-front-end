import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Spinner from "./spinner";

function Expenses() {
  const headers = {
    'x-auth-token': window.localStorage.getItem("admin_token")
  }
  const [loading, setloading] = useState(false);
  const [viewfilter, setViewfilter] = useState([]);
  let [search, setsearch] = useState("");
  const [expense, setexpense] = useState({
    data: [],
    error: "",
  });

  useEffect(() => {
    setloading(true);
    let url = process.env.REACT_APP_URL
    axios
      .get(`${url}/viewexpenses`,{headers})
      .then((response) => {
        setexpense({
          ...expense,
          data: response.data,
        });
        setloading(false);
      })
      .catch((error) => {
        setloading(false);
        setexpense({
          ...expense,
          error: error.message,
        });
        console.log(error);
      });
  }, []);

  let getValues = (event) => {
    const { value } = event.target;
    setsearch(value);

    const filteredexpense = expense.data.filter((product) => {
      return product.name.toLowerCase().includes(value.toLowerCase());
    });

    setViewfilter(filteredexpense);
  };

  return (
    <React.Fragment>
      <div className="container">
        <h4 style={{ color: "red" }} className="mt-3">
          Expense Records
        </h4>

        <div className="row">
          <div className="col-6">
            <form className="form-group">
              <input
                className="form-control"
                type="text"
                name="search"
                value={search}
                onChange={getValues}
                placeholder="search item"
              />
            </form>
          </div>

          <div className="col-6 justify-content-end">
            <Link
              to="/add_expenses"
              className=" bg-danger text-white p-2"
            >
              {" "}
              Add Expense{" "}
            </Link>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <table className="table table-striped table-sm">
              <thead className=" table-dark ">
                <tr>
                  <th>Name</th>
                  <th>Date</th>
                  <th>Cost (TZsh)</th>
                </tr>
              </thead>
              <tbody>
                {viewfilter.length > 0
                  ? viewfilter.map((data) => (
                      <tr key={data._id}>
                        <td>{data.name}</td>
                        <td>{data.date}</td>
                        <td>{data.cost}</td>
                      </tr>
                    ))
                  : expense.data.map((data) => (
                      <tr key={data._id}>
                        <td>{data.name}</td>
                        <td>{data.date}</td>
                        <td>{data.cost}</td>
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
export default Expenses;
