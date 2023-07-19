import React, { useEffect, useState } from "react";
import Axios from "axios";
import Success from "./success";
import Failure from "./failure";
import Spinner from "./spinner";

function UpdatePrice() {
  const headers = {
    'x-auth-token': window.localStorage.getItem("admin_token")
  }
  const [loading, setloading] = useState(false);
  const [stock, setStock] = useState({
    products: [],
    id: "",
    filteredproduct: [],
    product: {},
    choice: false,
    error_message: "",
  });

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

  useEffect(() => {
    setloading(true);
    let url = process.env.REACT_APP_URL
    Axios.get(`${url}/viewstock`,{headers})
      .then((response) => {
        setStock({
          ...stock,
          products: response.data,
        });
        setloading(false);
      })
      .catch((error) => {
        setStock({
          ...stock,
          error_message: error.message,
        });
        setloading(false);
      });
  }, []);

  const selecting = async (productID) => {
    let dataurl = `${process.env.REACT_APP_URL}/update/${productID}`;
    setloading(true);
    await Axios.get(dataurl,{headers})
      .then((response) => {
        setStock({
          ...stock,
          product: response.data,
          id: productID,
          choice: true,
        });
        setloading(false);
      })
      .catch((error) => {
        setloading(false);
        setStock({
          ...stock,
          error_message: error.message,
        });
      });
  };

  const updateInput = (event) => {
    setStock({
      ...stock,
      product: {
        ...stock.product,
        [event.target.name]: event.target.value,
      },
    });
  };

  const updateSubmit = async (event) => {
    event.preventDefault();
    setloading(true);
    let dataurl = `${process.env.REACT_APP_URL}/update/${stock.id}`;
    await Axios.put(dataurl, stock.product)
      .then((response) => {
        setalert_message({
          ...alert_message,
          show_success: true,
          message: response.data.message,
        });

        setStock({
          ...stock,
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

        setStock({
          ...stock,
          choice: false,
        });
      });
  };

  const searching = (event) => {
    let search = event.target.value;
    let filteredproduct = stock.products.filter((product) => {
      return product.name.toLowerCase().includes(search.toLowerCase());
    });

    if (search === "") {
      setStock({
        ...stock,
        filteredproduct: [],
      });
    } else {
      setStock({
        ...stock,
        filteredproduct: filteredproduct,
      });
    }
  };

  return (
    <React.Fragment>
      <div className="container">
        <h4 style={{ color: "red", fontWeight: "bolder" }} className="mt-3">
          Update Price
        </h4>
        <div className="row">
          <div className="col-md-8 mt-2 col-sm-12">
            <input
              type="text"
              name="search"
              onChange={searching}
              className="input-group mt-2"
              placeholder="Search by name"
            />
            <h5 style={{ color: "red", fontWeight: "bolder" }}>Product List</h5>
            <table className="table table-striped table-responsive-sm">
              <thead className="table-dark">
                <tr>
                  <th scope="col">Product</th>
                  <th scope="col">Sold By</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Expiry Date</th>
                  <th scope="col">Buying Price</th>
                  <th scope="col">Selling Price</th>
                </tr>
              </thead>
              <tbody>
                {stock.filteredproduct.length > 0 ? (
                  <React.Fragment>
                    {stock.filteredproduct.map((product) => {
                      return (
                        <tr
                          key={product._id}
                          onClick={() => selecting(product._id)}
                          className="cursor"
                        >
                          <td className="td_link">{product.name}</td>
                          <td className="td_link">{product.sold_by}</td>
                          <td className="td_link">{product.quantity}</td>
                          <td className="td_link">{product.expiry_date}</td>
                          <td className="td_link">{product.buying_price}</td>
                          <td className="td_link">{product.selling_price}</td>
                        </tr>
                      );
                    })}
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    {stock.products.slice(0, 10).map((product) => {
                      return (
                        <tr
                          key={product._id}
                          onClick={() => selecting(product._id)}
                          className="cursor"
                        >
                          <td className="td_link">{product.name}</td>
                          <td className="td_link">{product.sold_by}</td>
                          <td className="td_link">{product.quantity}</td>
                          <td className="td_link">{product.expiry_date}</td>
                          <td className="td_link">{product.buying_price}</td>
                          <td className="td_link">{product.selling_price}</td>
                        </tr>
                      );
                    })}
                  </React.Fragment>
                )}
              </tbody>
            </table>
          </div>
          {stock.choice ? (
            <React.Fragment>
              <div className="col-md-4 mt-2 col-sm-12 ">
                <h5 style={{ color: "red", fontWeight: "bolder" }}>
                  Update Price
                </h5>
                <form onSubmit={updateSubmit}>
                  <div className="form-group">
                    <label>Buying Price</label>
                    <input
                      type="number"
                      name="buying_price"
                      value={stock.product.buying_price}
                      onChange={updateInput}
                      className="form-control"
                    />

                    <label>Selling Price</label>
                    <input
                      type="number"
                      name="selling_price"
                      value={stock.product.selling_price}
                      onChange={updateInput}
                      className="form-control"
                    />

                    <button type="submit" className="btn btn-danger">
                      UPDATE
                    </button>
                  </div>
                </form>
              </div>
            </React.Fragment>
          ) : null}
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

export default UpdatePrice;
