import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import RegisterOrg from "./pages/RegisterOrg";
import Employees from "./pages/Employees";
import Teams from "./pages/Teams";
import Layout from "./components/Layout";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        {/* <Route path="/register" element={<RegisterOrg />} /> */}

        {/* Protected routes */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route path="employees" element={<Employees />} />
          <Route path="teams" element={<Teams />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
