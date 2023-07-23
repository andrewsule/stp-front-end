import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Protected from "./components/protected";
import React, { useEffect,} from "react";
import Employees from "./components/employes";
import Expenses from "./components/expenses";
import AddExpense from "./components/addexpense";
import AddEmployee from "./components/addemployee";
import Sales from "./components/sales";
import DeleteEmployee from "./components/deleteemployee";
import UpdatePrice from "./components/updateprice";
import UpdateEmployees from "./components/updateemployee";
import LoginAdministrator from "./components/administratorlogin";
import LoginStaff from "./components/stafflogin";
import AddStock from "./components/addstock";
import Selling from "./components/selling";
import UpdateStock from "./components/updatestock";
import ViewStock from "./components/viewstock";
import Protectedstaff from "./components/protectedstaff";
import ViewStockStaff from "./components/viewstoctstaff";
import NavbarLogin from "./components/navbarlogin";
import { Provider, useDispatch,} from "react-redux";
import { store } from "./components/redux/store";
import Axios from "axios";
import { admin_user, staff_user } from "./components/redux/project.actions";


const App = () => {
  let dispach = useDispatch();

  useEffect(() => {
    const headers_staff = {
      "x-auth-token": window.localStorage.getItem("staff_token"),
    };
    let url = process.env.REACT_APP_URL
    Axios.get(`${url}/user_staff`, { headers: headers_staff })
      .then((response) => {
        dispach(staff_user({ data: response.data.user, authenticated: true }));
      })
      .catch((errors) => {
        console.error(errors);
      });

    const headers_admin = {
      "x-auth-token": window.localStorage.getItem("admin_token"),
    };

    Axios.get(`${url}/user_admin`, { headers: headers_admin })
      .then((response) => {
        dispach(admin_user({ data: response.data.user, authenticated: true }));
      })
      .catch((errors) => {
        console.error(errors);
      });
  }, []);


  return (
    <React.Fragment>
      <Router>
      {console.log(process.env.REACT_APP_URL)}
        <Provider store={store}>
          <NavbarLogin />
        </Provider>
        <div className="App">
          <Routes>
            <Route
              path="/login/administrator"
              element={
                <Provider store={store}>
                  <LoginAdministrator />
                </Provider>
              }
            />

            <Route
              path="/login/staff"
              element={
                <Provider store={store}>
                  <LoginStaff />
                </Provider>
              }
            />
            <Route
              path="/"
              element={
                <Provider store={store}>
                  <LoginStaff />
                </Provider>
              }
            />

            <Route element={<Protected />}>
              <Route path="/view_stock_admin" element={<ViewStock />} />

              <Route path="/employees" element={<Employees />} />

              <Route path="/add_employee" element={<AddEmployee />} />

              <Route path="/expenses" element={<Expenses />} />

              <Route path="/add_expenses" element={<AddExpense />} />

              <Route path="/sales" element={<Sales />} />

              <Route path="/delete_employee" element={<DeleteEmployee />} />

              <Route path="/update_price" element={<UpdatePrice />} />

              <Route path="/update_employee" element={<UpdateEmployees />} />
            </Route>
            <Route element={<Protectedstaff />}>
              <Route path="/view_stock" element={<ViewStockStaff />} />
              <Route path="/add_stock" element={<AddStock />} />

              <Route path="/sell_item" element={<Selling />} />

              <Route path="/update_stock" element={<UpdateStock />} />
              <Route path="*" element={<h4>Page not found</h4>} />
            </Route>
          </Routes>
        </div>
      </Router>
    </React.Fragment>
  );
};

export default App;
