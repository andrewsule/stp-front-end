import React, {  useState } from "react";
import Axios from "axios";
import Success from "./success";
import Failure from "./failure";
import Warning from "./warning";
import Spinner from "./spinner";

function  AddEmployee() {
  const headers = {
    'x-auth-token': window.localStorage.getItem("admin_token")
  }
  const [loading,setloading] = useState(false)
  let [addemployee, setAddemloyee] = useState({
    first_name: "",
    last_name: "",
    password: "",
    image: "",
    phone: "",
    salary: "",
    position: "",
    address: "",
    next_of_kin: "",
    nof_contact: "",
  });
 
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
    setAddemloyee({
      ...addemployee,
      [event.target.name]: event.target.value,
    });
  };
  let handleImageChange = async (event) => {
    let imagefile = event.target.files[0];
    setloading(true)
    let uimage = await base64(imagefile);
    setAddemloyee({
      ...addemployee,
      image: await uimage,
    });
    setloading(false)
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

  let  submitemployee =  async (event) => {
    event.preventDefault();
    setloading(true)
    let url = process.env.REACT_APP_URL
    await Axios.post(`${url}/addemployee`,  addemployee,{headers})
      .then((response) => {
        setloading(false)
        setalert_message({
          ...alert_message,
          show_success: true,
          message: response.data,
        });
        
      })
      .catch((error) => {
        setloading(false)
        console.log(error);
        setalert_message({
          ...alert_message,
          show_failure: true,
          message: "Unexpexted error occured",
        });
      });
    setAddemloyee({
      first_name: "",
      last_name: "",
      password: "",
      image: "",
      phone: "",
      salary: "",
      position: "",
      address: "",
      next_of_kin: "",
      nof_contact: "",
    });
  };

  return (
    <React.Fragment>
      <div className="container mt-5">
        <div className="row">
          <div className="col-12">
            <h4 style={{ color: "red" }}>Enter Employees Details</h4>
            <form className=" form-group " onSubmit={submitemployee}>
              <table className="table table-striped table-responsive-sm">
                <tr>
                  <td>
                    <label>First Name</label>
                    <input
                      type="text"
                      name="first_name"
                      value={addemployee.first_name}
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
                      value={addemployee.last_name}
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
                      value={addemployee.password}
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
                      value={addemployee.phone}
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
                      <option value="">Select expense type</option>
                      <option value="Administrator">Administrator</option>
                      <option value="Staff">Staff</option>
                    </select>
                  </td>

                  <td>
                    <label>Salary</label>
                    <input
                      type="number"
                      name="salary"
                      value={addemployee.salary}
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
                      value={addemployee.address}
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
                      value={addemployee.next_of_kin}
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
                      value={addemployee.nof_contact}
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

              <button type="submit" className="btn btn-danger">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
      {alert_message.show_success ? (
        <Success message={alert_message.message} sendmsg={fromalert} />
      ) : null}
      {alert_message.show_failure ? (
        <Failure message={alert_message.message} sendmsg={fromalert} />
      ) : null}
      {alert_message.show_warning ? (
        <Warning message={alert_message.message} sendmsg={fromalert} />
      ) : null}
      {loading?<Spinner/>:null}
    </React.Fragment>
  );
}

export default AddEmployee;
