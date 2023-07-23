import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate,useNavigate} from "react-router-dom";
import { admin_user, staff_user } from "./redux/project.actions";

let NavbarLogin = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);
 

  let dispatch = useDispatch();
  let navigate = useNavigate()

  let admin = useSelector((state) => {
    return state["admin"];
  });

  let staff = useSelector((state) => {
    return state["staff"];
  });

  let [back, setBack] = useState(false);

  let logout = () => {
    setBack(true);
    window.localStorage.clear("admin_token");
    window.localStorage.clear("staff_token");
    dispatch(staff_user({ data: null, authenticated: false }));
    dispatch(admin_user({ data: null, authenticated: false }));
    navigate('/login/staff')
  };
  useEffect(()=>{
    
  
  },[])

  return (
    <React.Fragment>
      <div
        className="navbar navbar-dark bg-danger navbar-expand-md"
        style={{ fontFamily: "system-ui" }}
      >
        <h4 className="display-5 navbar-brand">STP Management System</h4>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          onClick={handleNavCollapse}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className={`${isNavCollapsed ? "collapse" : ""} navbar-collapse`}
          id="navbarCollapse"
        >
          {/*LOG IN*/}
          {!admin.user.authenticated && !staff.user.authenticated &&  (
            <ul className="navbar-nav ml-5">
              <li className="nav-item">
                <Link to="/login/administrator" className="nav-link">
                  Administrator
                </Link>
              </li>

              <li className="nav-item ">
                <Link to="/login/staff" className="nav-link ">
                  Staff
                </Link>
              </li>
            </ul>
          )}

          {/*ADMINISTRATOR*/}
          {back && <Navigate to={"/login/administrator"} />}
          {admin.user.authenticated &&  (
            <ul className="navbar-nav ml-5">
              <li className="nav-item">
                <Link to="/sales" className="nav-link">
                  Sales
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/view_stock_admin" className="nav-link">
                  View Stock
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/employees" className="nav-link">
                  Employees
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/expenses" className="nav-link">
                  Expenses
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/update_price" className="nav-link">
                  Update Price
                </Link>
              </li>
            </ul>
          )}
          {/*STAFF*/}
          {back && <Navigate to={"/login/staff"} />}
          {staff.user.authenticated && (
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to="/sell_item" className="nav-link">
                  Sell
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/add_stock" className="nav-link">
                  Add
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/update_stock" className="nav-link">
                  Update
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/view_stock" className="nav-link">
                  View
                </Link>
              </li>
            </ul>
          )}
          {/*ADMINISTRATOR*/}
          {admin.user.authenticated &&  (
            <ul className="navbar-nav navbar-brand ml-md-auto mr-sm-5   navbar-dark">
              <li className="nav-item">
                <span className="display-5 mr-2 navbar-brand pt-3" style={{fontSize:"15px",fontWeight:"20px"}}>
                  {admin.user.data.first_name.toUpperCase()}{" "}
                  {admin.user.data.last_name.toUpperCase()}
                </span>

                {
                  <img
                    className="profile"
                    src={admin.user.data?.image}
                    alt=""
                    width="35"
                    height="35"
                  />
                }
              </li>
              
              <li className="nav-item">
                <Link to="" className="nav-link" onClick={logout}>
                  {" "}
                  Log out{" "}
                </Link>
              </li>
            </ul>
          )}
          {/*STAFF*/}
          {staff.user.authenticated && (
            <ul className="navbar-nav navbar-brand ml-md-auto mr-sm-5   navbar-dark">
              <li className="nav-item">
                <span  className="display-5 mr-2 navbar-brand pt-3" style={{fontSize:"15px",fontWeight:"20px"}}>
                  {staff.user.data?.first_name.toUpperCase()} {staff.user.data?.last_name.toUpperCase()}
                </span>
                {
                  <img
                    className="profile"
                    src={staff.user.data?.image}
                    alt=""
                    width="35"
                    height="35"
                  />
                }
              </li>

              <li className="nav-item">
                <Link to="" className="nav-link" onClick={logout}>
                  {" "}
                  Log out{" "}
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};
export default NavbarLogin;
