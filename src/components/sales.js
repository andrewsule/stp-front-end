import React, { useEffect, useState } from "react";
import Axios from "axios";
import Spinner from "./spinner";

function Sales() {
  const headers = {
    "x-auth-token": window.localStorage.getItem("admin_token"),
  };

  const [loading, setloading] = useState(false);
  const [expense, setExpense] = useState({
    data: [],
    error: "",
    total: "",
    filteredexpense: "",
  });

  let [sales, setSales] = useState({
    from: "",
    to: "",
    search: "",
    sales: [],
    filteredsales: [],
    error_message: "",
    less: "",
    total: "",
    totalbuying: "",
  });

  let getValues = (event) => {
    setSales({
      ...sales,
      [event.target.name]: event.target.value,
    });
  };
  useEffect(() => {
    setloading(true);
    Axios.get("http://127.0.0.1:3001/viewsales", { headers })
      .then((response) => {
        let total = 0;
        for (const sale of response.data) {
          total += sale.selling_price;
        }
        let totalbuying = 0;
        for (const sale of response.data) {
          totalbuying += sale.buying_price*sale.quantity;
        }
        setSales({
          ...sales,
          sales: response.data,
          total: total,
          totalbuying: totalbuying,
        });
        setloading(false);
      })
      .catch((error) => {
        setloading(false);
        setSales({
          ...Sales,
          error_message: error.message,
        });
      });
    setloading(true);
    Axios.get("http://127.0.0.1:3001/viewexpenses", { headers })
      .then((response) => {
        let total = 0;
        for (const expeense of response.data) {
          total += expeense.cost;
        }
        setExpense({
          ...expense,
          data: response.data,
          total: total,
        });
        setloading(false);
      })
      .catch((error) => {
        setloading(false);
        setExpense({
          data: [],
          error: error.message,
        });
        console.log(error);
      });
  }, []);

  let searching = (event) => {
    let search = event.target.value;
    let filteredsales = sales.sales.filter((sale) => {
      return sale.name.toLowerCase().includes(search.toLowerCase());
    });

    const total = filteredsales.reduce((total, sale) => {
      return total + sale.selling_price;
    }, 0);

    const totalbuying = filteredsales.reduce((total, sale) => {
      return total + sale.buying_price*sale.quantity;
    }, 0);

    setSales({
      ...sales,
      filteredsales: filteredsales,
      total: total,
      totalbuying: totalbuying,
    });
  };

  let filterdate = () => {
    const from = sales.from;
    const to = sales.to;

    const filteredSales = sales.sales.filter((sale) => {
      const saleDate = sale.date.substring(0, sale.date.indexOf("T"));
      return saleDate >= from && saleDate <= to;
    });

    const total = filteredSales.reduce((total, sale) => {
      return total + sale.selling_price;
    }, 0);


    setSales({
      ...sales,
      filteredsales: filteredSales,
      total: total,
    });

    const filteredbuying_price = sales.sales.filter((sale) => {
      const saleDate = sale.date.substring(0, sale.date.indexOf("T"));
      return saleDate >= from && saleDate <= to;
    });

    const totalbuying = filteredbuying_price.reduce((total, sale) => {
      return total + sale.buying_price*sale.quantity;
    }, 0);

    setSales({
      ...sales,
      filteredsales: filteredbuying_price,
      totalbuying: totalbuying,
    });

    const filteredexpense = expense.data.filter((expense) => {
      const expeenseDate = expense.date.substring(0, expense.date.indexOf("T"));
      return expeenseDate >= from && expeenseDate <= to;
    });

    const totalexpense = filteredexpense.reduce((total, expeense) => {
      return total + expeense.cost;
    }, 0);

    setExpense({
      ...expense,
      filteredexpense: filteredexpense,
      total: totalexpense,
    });
  };
  let [summary, setSummary] = useState({
    show: false,
    arrow: "fa fa-caret-down",
  });
  let showsummary = () => {
    if (summary.show === false) {
      setloading(true);
      setSummary({ show: true, arrow: "fa fa-caret-up" });
      setloading(false);
    } else {
      setSummary({ show: false, arrow: "fa fa-caret-down" });
    }
  };

  return (
    <React.Fragment>
      <div className="container">
        <h4 style={{ color: "red" }} className="mt-3">
          Sales
        </h4>

        <div className="row">
          <div className="col-md-5 col-sm-12">
            <input
              type="text"
              name="search"
              onChange={searching}
              className="input-group mt-2"
              placeholder="Search by product name"
            />
          </div>

          <div className="col-md-7 col-sm-12  d-flex ml-auto">
            <label htmlFor="search" className="me-2">
              From:
            </label>
            <input
              type="date"
              name="from"
              value={sales.from}
              onChange={getValues}
              className="input-group mt-2 form-control-sm"
            />

            <label htmlFor="search" className="me-2">
              To:
            </label>
            <input
              type="date"
              name="to"
              value={sales.to}
              onChange={getValues}
              className="input-group mt-2 form-control-sm"
            />

            <button
              onClick={filterdate}
              className="btn btn-danger btn-sm"
              data-mdb-ripple-color="dark"
            >
              Search
            </button>
          </div>
        </div>

        <h5
          onClick={showsummary}
          style={{ color: "red", cursor: "pointer" }}
          className="mt-3"
        >
          Summary <span className={summary.arrow} />
        </h5>
        {summary.show && (
          <div className="row mt-2 mb-2">
            <div className="col-4">
              <div className="card">
                <div className="card-header  bg-dark text-white">Sales</div>
                <div className="card-body text-center ">
                  <h4>{sales.total}</h4>
                </div>
              </div>
            </div>

            <div className="col-4">
              <div className="card">
                <div className="card-header bg-dark text-white">Expenses</div>
                <div className="card-body text-center ">
                  <h4>{expense.total}</h4>
                </div>
              </div>
            </div>

            <div className="col-4">
              <div className="card">
                <div className="card-header bg-dark text-white">Divident</div>
                <div className="card-body text-center ">
                  <h4>
                    {sales.total - (expense.total + sales.totalbuying)}
                  </h4>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="row">
          <div className="col-12 mt-3">
            <table className="table table-striped table-sm table-responsive-sm">
              <thead className="table-dark">
                <tr>
                  <th>Customer</th>
                  <th>Cus_contact</th>
                  <th>Product</th>
                  <th>Sold by</th>
                  <th>Quantity</th>
                  <th>Buying_price</th>
                  <th>Selling (TZsh)</th>
                  <th>Date of Sale</th>
                </tr>
              </thead>
              <tbody>
                {sales.filteredsales.length > 0 ? (
                  <React.Fragment>
                    {sales.filteredsales.map((sale) => {
                      return (
                        <tr key={sale._id}>
                          <td>{sale.customer_name}</td>
                          <td>{sale.customer_phone}</td>
                          <td>{sale.name}</td>
                          <td>{sale.sold_by}</td>
                          <td>{sale.quantity}</td>
                          <td>{sale.buying_price}</td>
                          <td>{sale.selling_price}</td>
                          <td>{sale.date}</td>
                        </tr>
                      );
                    })}
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    {sales.sales.map((sale) => {
                      return (
                        <tr key={sale._id}>
                          <td>{sale.customer_name}</td>
                          <td>{sale.customer_phone}</td>
                          <td>{sale.name}</td>
                          <td>{sale.sold_by}</td>
                          <td>{sale.quantity}</td>
                          <td>{sale.buying_price}</td>
                          <td>{sale.selling_price}</td>
                          <td>{sale.date}</td>
                        </tr>
                      );
                    })}
                  </React.Fragment>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {loading ? <Spinner /> : null}
    </React.Fragment>
  );
}
export default Sales;
