import { Outlet, Navigate } from "react-router-dom";

const Protectedstaff = () => {
  let authentication={'token':window.localStorage.getItem("staff_token")}
  return (authentication.token? ( <Outlet/>) : (<Navigate to="/login/staff"/>));
};

export default Protectedstaff;