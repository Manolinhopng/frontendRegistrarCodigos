import "./App.css";
import Admin from "./components/admin";
import Login from "./components/login";
import NewAdmin from "./components/newAdmin";
import Register from "./components/newUser";
import User from "./components/user";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/user" element={<User />} />
        <Route path="/newAdmin" element={<NewAdmin />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
