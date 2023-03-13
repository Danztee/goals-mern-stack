import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "../components/Header";

function Root() {
  return (
    <>
      <div className="container">
        <Header />
        <Outlet />
      </div>
      <ToastContainer />
    </>
  );
}

export default Root;
