import React from "react";
import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <nav>
        <Link to="/employees">Employees</Link> | <Link to="/teams">Teams</Link>
      </nav>
      <hr />
      {/* This renders nested routes */}
      <Outlet />
    </div>
  );
};

export default Layout;
