import React, { useState } from "react";
import adminpic from "./assets/images/administratorlogin.png";
import Information from "./information";
import Axios from "axios";
import Spinner from "./spinner";
import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { admin_user } from "./redux/project.actions";

const LoginAdministrator = () => {
  let dispach = useDispatch()
  const [loading, setloading] = useState(false);
  let [administrator, setAdministrator] = useState({
    id: "",
    password: "",
  });

let getValuesAdministrator = (event) => {
    setAdministrator({
      ...administrator,
      [event.target.name]: event.target.value,
    });
  };

  let [message, setmessage] = useState("");
  let [admin,setadmin]=useState({
    data:null,
    authenticated:false
  })

  async function submit(event) {
    event.preventDefault();
    setloading(true);
    let url = process.env.REACT_APP_URL
    await Axios.post(`${url}/administratorlogin`,administrator)
      .then((response) => {
        const { token } = response.data;
        if (token) {
          setloading(false);
          window.localStorage.setItem("admin_token", token);
          dispach(admin_user({data:response.data.user,authenticated:true}))
          setadmin({
            ...admin,
            data:response.data.user
            ,authenticated: true
          })
        }
        setloading(false);
      })
      .catch((errors) => {
        setloading(false);
        setmessage(errors.response.data.message);
        console.error(errors);
      });
  }

  return (
    <React.Fragment>
    {admin.authenticated && <Navigate to={"/sales"}/>}
    {console.log(admin.authenticated)}
      <div className="wrapper-login  justify-content-center ">
        <div className="add_opacity">
          <div className="container">
            <div className="row mb-5  justify-content-center text-center">
              <span>
                <h4 className=" display-5 mt-3 text-white">
                  <i>Login Page</i>
                </h4>
              </span>
            </div>
            <div className="row">
              <div className="col-md-6  offset-sm-0 offset-md-3 col-sm-12">
                <div className="card mb-2 border-danger mb-3 ">
                  <div className="card-header">
                    <span>
                      <img src={adminpic} alt="Admin" />
                    </span>

                    <i className="card-title ml-2  display-5 font-weight-bolder">
                      Administrator{" "}
                    </i>
                  </div>
                  <div className="card-body">
                    <span className=" text-danger">{message}</span>
                    <br />
                    <form onSubmit={submit} className="form-group">
                      <label>User ID:</label>
                      <input
                        name="id"
                        value={administrator.id}
                        onChange={getValuesAdministrator}
                        type="text"
                        className="form-control"
                      />

                      <label>Password</label>
                      <input
                        name="password"
                        value={administrator.password}
                        onChange={getValuesAdministrator}
                        type="password"
                        className="form-control"
                      />

                      <br />

                      <input
                        type="submit"
                        className="form-contol btn btn-danger"
                      />
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Information />
        </div>
      </div>
      {loading ? <Spinner /> : null}
    </React.Fragment>
  );
};
export default LoginAdministrator;
