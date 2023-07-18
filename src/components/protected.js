import { Outlet, Navigate } from "react-router-dom";

const Protected = () => {
  let authentication={'token':window.localStorage.getItem("admin_token")}
  return (authentication.token? ( <Outlet/>) : (<Navigate to="/login/administrator"/>));
};

export default Protected;

