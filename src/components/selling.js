import React, { useEffect, useState } from "react";
import Axios from "axios";
import PDFGenerator from "./PDFGenerator";
import Success from "./success";
import Failure from "./failure";
import Spinner from "./spinner";


function Selling() {
  const headers = {
    "x-auth-token": window.localStorage.getItem("staff_token"),
  };

  const [loading, setloading] = useState(false);
  const [alert_message, setalert_message] = useState({
    show_success: false,
    show_failure: false,
    accepted_message: "",
  });
  const fromalert = (data) => {
    setalert_message({
      show_success: data,
      show_failure: data,
    });
  };
  const [download, setdownload] = useState({ button: false, pdf: false ,page:true });
  const [customer, setcustomer] = useState({
    name: "",
    phone: "",
  });
  let update = (event) => {
    setcustomer({
      ...customer,
      [event.target.name]: event.target.value,
    });
  };
  const [sell, setselling] = useState({
    products: [],
    id: "",
    filteredproduct: [],
    sell: [],
    display: [],
    product: {},
    error_message: "",
    total: 0,
    recept: false,
  });

  useEffect(() => {
    setloading(true);
    let url = process.env.REACT_APP_URL
    Axios.get(`${url}/viewstock`, { headers })
      .then((response) => {
        let display = response.data.slice();
        setselling((prevSell) => ({
          ...prevSell,
          products: response.data,
          display: display,
        }));
        setloading(false);
      })
      .catch((error) => {
        setselling((prevSell) => ({
          ...prevSell,
          error_message: error.message,
        }));
        setloading(false);
      });
  }, []);

  let submitsale = async (event) => {
    event.preventDefault();
    setloading(true);
    const data = sell.sell.map((product) => {
      return {
        name: product.name,
        quantity: product.quantity,
        selling_price: product.selling_price,
        buying_price: product.buying_price * product.quantity,
        sold_by: product.sold_by,
        date: new Date(),
      };
    });
    let allData = [data, customer];
    let url = process.env.REACT_APP_URL
    await Axios.post(`${url}/addingsales`, allData, {
      headers,
    })
      .then((response) => {
        setselling((prevSell) => ({
          ...prevSell,
        }));
        setalert_message({
          ...alert_message,
          show_success: true,
          accepted_message: response.data,
        });
        setdownload({
          ...download,
          button: true,
        });
        setloading(false);
      })
      .catch((error) => {
        setloading(false);
        setalert_message({
          ...alert_message,
          show_failure: true,
          accepted_message: "failed to add sales",
        });
      });

    setselling((prevSell) => ({
      ...prevSell,
      sell: "",
    }));

    setselling({
      ...sell,
      recept: true,
    });
  };

  let add = (id) => {
    let filteredSell = sell.sell.filter((product) => {
      return product._id === id;
    });

    let displayItem = sell.display.filter((item) => {
      return item._id === id;
    })[0];

    filteredSell.forEach((product) => {
      if (product.initialquantity < displayItem.quantity) {
        product.initialquantity += 1;
        product.selling_price =
          displayItem.selling_price * product.initialquantity;
        product.quantity = product.initialquantity;
      }
    });

    const total = sell.sell.reduce((total, sale) => {
      return total + sale.selling_price;
    }, 0);

    setselling((prevSell) => ({
      ...prevSell,
      total: total,
      sell: [...sell.sell],
    }));
  };

  let subtract = (id) => {
    let filteredSell = sell.sell.filter((product) => {
      return product._id === id;
    });

    let displayItem = sell.display.filter((item) => {
      return item._id === id;
    })[0];

    filteredSell.forEach((product) => {
      if (product.initialquantity >= 2) {
        product.initialquantity -= 1;
        product.selling_price =
          product.selling_price - displayItem.selling_price;
        product.quantity = product.initialquantity;
      }
    });

    const total = sell.sell.reduce((total, sale) => {
      return total + sale.selling_price;
    }, 0);

    setselling((prevSell) => ({
      ...prevSell,
      total: total,
      sell: [...sell.sell],
    }));
  };

  let remove = (productID) => {
    let filteredSell = sell.sell.filter((product) => {
      return product._id !== productID;
    });

    const total = filteredSell.reduce((total, sale) => {
      return total + sale.selling_price;
    }, 0);

    setselling((prevSell) => ({
      ...prevSell,
      sell: filteredSell,
      total: total,
    }));
  };

  const selecting = async (productID) => {
    setloading(true);
    let dataurl = `${process.env.REACT_APP_URL}/update/${productID}`;
    try {
      const response = await Axios.get(dataurl, { headers });
      const newItem = response.data;
  
      // Check if the productID is already in sell.sell
      const isProductAlreadyInSell = sell.sell.some((product) => product._id === productID);
  
      if (!isProductAlreadyInSell) {
        let updatedSell = [...sell.sell, newItem];
        updatedSell.forEach((product) => {
          product.quantity = 1;
        });
  
        const total = updatedSell.reduce((total, sale) => {
          return total + sale.selling_price;
        }, 0);
  
        setselling((prevSell) => ({
          ...prevSell,
          product: newItem,
          id: productID,
          sell: updatedSell,
          total: total,
        }));
      }
  
      setloading(false);
    } catch (error) {
      setloading(false);
      setselling((prevSell) => ({
        ...prevSell,
        error_message: error.message,
      }));
    }
  };
  

  let searching = (event) => {
    let search = event.target.value;
    let filteredproduct = sell.products.filter((product) => { 
      return product.name.toLowerCase().includes(search.toLowerCase());
    });

    if (search === "") {
      setselling((prevSell) => ({
        ...prevSell,
        filteredproduct: [],
      }));
    } else {
      setselling((prevSell) => ({
        ...prevSell,
        filteredproduct: filteredproduct,
      }));
    }
  };
  let go_to_recept=()=>{
    setdownload({
      ...download,
      pdf:true,
      page:false
    })
  }

  return (
    <React.Fragment>
      {download.page && <div className="container ">
        <h3 style={{ color: "red", fontWeight: "bolder" }} className="mt-3">
          Make Sales
        </h3>
        <div className="row">
          <div className="col-md-7 col-sm-12 mt-2">
            <input
              type="text"
              name="search"
              onChange={searching}
              className="input-group mt-2"
              placeholder="Search by name"
            />
            <h5 style={{ color: "red", fontWeight: "bolder" }} className="mt-3">
              Product List
            </h5>
            <table className="table table-striped table-responsive-sm ">
              <thead className=" table-dark">
                <tr>
                  <th scope="col">Product</th>
                  <th scope="col">Sold By</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Expiry Date</th>
                  <th scope="col">Selling Price</th>
                </tr>
              </thead>
              <tbody>
                {sell.filteredproduct.length > 0 ? (
                  <React.Fragment>
                    {sell.filteredproduct.map((product) => {
                      if(product.quantity>0){
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
                          <td className="td_link">{product.selling_price}</td>
                        </tr>
                      );}
                    })}
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    {sell.products.slice(0, 10).map((product) => {
                      if(product.quantity>0){
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
                          <td className="td_link">{product.selling_price}</td>
                        </tr>
                      );}
                    })}
                  </React.Fragment>
                )}
              </tbody>
            </table>
          </div>

          <React.Fragment>
            <div className="col-md-5 col-sm-12 mt-2 ">
              <div>
                <form onSubmit={submitsale} className=" form-group form-inline">
                  <input
                    type="text"
                    onChange={update}
                    name="name"
                    placeholder="customer name"
                    required
                    className=" form-control mr-auto mb-2  "
                  />

                  <input
                    type="text"
                    onChange={update}
                    placeholder="phone Number"
                    name="phone"
                    required
                    className=" form-control ml-auto mb-2"
                  />
                </form>
              </div>
              <h5 style={{ color: "red", fontWeight: "bolder" }}>
                Selected to Purchase
              </h5>

              <table className="table table-striped">
                <thead className=" table-dark">
                  <tr>
                    <th scope="col">Product</th>
                    <th scope="col">Sold By</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Price</th>
                    <th scope="col">Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {sell.sell.length > 0 ? (
                    <React.Fragment>
                      {sell.sell.map((product) => {
                        return (
                          <tr key={product._id}>
                            <td style={{ fontWeight: "bold" }}>
                              {product.name}
                            </td>
                            <td style={{ fontWeight: "bold" }}>
                              {product.sold_by}
                            </td>
                            <td>
                              <i
                                onClick={() => subtract(product._id)}
                                className="fas fa-minus-circle mx-1"
                              />
                              {product.initialquantity}
                              <i
                                onClick={() => add(product._id)}
                                className="fas fa-plus-circle mx-1"
                              />
                            </td>
                            <td style={{ fontWeight: "bold" }}>
                              {product.selling_price}
                            </td>
                            <td>
                              <button
                                type="button"
                                className="btn btn-danger btn-sm"
                                onClick={() => remove(product._id)}
                              >
                                Remove
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </React.Fragment>
                  ) : null}
                </tbody>
              </table>
              <h5 style={{ color: "red", fontWeight: "bolder" }}>
                Total: {sell.total}
              </h5>
              {sell.sell.length > 0 &&
                customer.name.length >= 4 &&
                customer.phone.length >= 10 && (
                  <button
                    type="button"
                    onClick={submitsale}
                    className="btn btn-danger"
                  >
                    PAY
                  </button>
                )}
                {download.button && <button className="btn btn-sm btn-danger" 
                  onClick={go_to_recept}>Go to recept</button>}


            </div>
          </React.Fragment>
        </div>
      </div>}
      {alert_message.show_success ? (
        <Success message={alert_message.accepted_message} sendmsg={fromalert} />
      ) : null}
      {alert_message.show_failure ? (
        <Failure message={alert_message.accepted_message} sendmsg={fromalert} />
      ) : null}
      {loading ? <Spinner /> : null}

      {download.pdf &&<div >
                <PDFGenerator
                  total={sell.total}
                  items={sell.sell}
                  name={customer.name}
                  phone={customer.phone}
                  triger={download.pdf}
                />
              </div>}
    </React.Fragment>
    
  );
}

export default Selling;
