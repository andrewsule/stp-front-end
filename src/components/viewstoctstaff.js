import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "./spinner";

function ViewStockStaff() {
  const headers = {
    'x-auth-token': window.localStorage.getItem("staff_token")
  }
  const [loading, setloading] = useState(false);
  const [viewfilter, setViewfilter] = useState([]);
  const [search, setSearch] = useState("");
  const [lessthans, setLessthans] = useState("");
  const [stock, setStock] = useState({
    data: [],
    error: "",
  });

  useEffect(() => {
    setloading(true);
    let url = process.env.REACT_APP_URL
    axios
      .get(`${url}/viewstock`,{headers})
      .then((response) => {
        setStock({
          ...stock,
          data: response.data,
        });

        setloading(false);
      })
      .catch((error) => {
        setloading(false);
        setStock({
          ...stock,
          error: error.message,
        });
        console.log(error);
      });
  }, []);

  const searching = (event) => {
    const { value } = event.target;
    setSearch(value);

    const filteredProducts = stock.data.filter((product) => {
      return product.name.toLowerCase().includes(value.toLowerCase());
    });

    setViewfilter(filteredProducts);
  };

  const lessthan = (event) => {
    const { value } = event.target;
    setLessthans(value);

    const filteredProducts = stock.data.filter((product) => {
      return product.quantity < value;
    });

    setViewfilter(filteredProducts);
  };

  return (
    <React.Fragment>
      <div className="container">
        <h4 style={{ color: "red" }} className="mt-3">
          Stock Details
        </h4>

        <div className="row">
          <div className="col-6">
            <form className="form-group">
              <input
                className="form-control"
                type="text"
                name="search"
                value={search}
                onChange={searching}
                placeholder="Search item"
              />
            </form>
          </div>

          <div className="col-6">
            <form className="form-group">
              <input
                className="form-control"
                type="number"
                name="lessthans"
                value={lessthans}
                onChange={lessthan}
                placeholder="Products less than"
              />
            </form>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <table className="table table-striped table-sm table-responsive-sm">
              <thead className="table-dark">
                <tr>
                  <th>Name</th>
                  <th>Quantity</th>
                  <th>Sold by</th>
                  <th>Expiry Date</th>
                  <th>Buying (ssp)</th>
                  <th>Selling (ssp)</th>
                </tr>
              </thead>
              <tbody>
                {viewfilter.length > 0
                  ? viewfilter.map((data) => (
                      <tr key={data._id}>
                        <td>{data.name}</td>
                        <td>{data.quantity}</td>
                        <td>{data.sold_by}</td>
                        <td>
                          {new Date(data.expiry_date).toLocaleDateString()}
                        </td>
                        <td>{data.buying_price}</td>
                        <td>{data.selling_price}</td>
                      </tr>
                    ))
                  : stock.data.map((data) => (
                      <tr key={data._id}>
                        <td>{data.name}</td>
                        <td>{data.quantity}</td>
                        <td>{data.sold_by}</td>
                        <td>
                          {new Date(data.expiry_date).toLocaleDateString()}
                        </td>
                        <td>{data.buying_price}</td>
                        <td>{data.selling_price}</td>
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

export default ViewStockStaff;
