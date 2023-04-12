import { BrowserRouter, Route, Navigate, Router } from "react-router-dom";
import AdminLayout from "./layouts/admin/index";
import Admin from "./layouts/auth";
import AuthLayout from "./layouts/auth/index";

function App() {
  return (
    <BrowserRouter basename="/">
      <AdminLayout />
      {/* <AuthLayout /> */}
    </BrowserRouter>
  );
}

export default App;
