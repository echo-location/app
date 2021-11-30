import React from "react";
import "./App.css";
import LostItems from "./pages/LostItems";
import Map from "./pages/Map";
import Account from "./pages/Account";
import Login from "./pages/Login";
import User from "./pages/User";
import Help from "./pages/Help";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<LostItems />} />
        <Route path="Help" element={<Help />} />
        <Route path="LostItems" element={<LostItems />} />
        <Route path="Map" element={<Map />} />
        <Route path="User" element={<User />} />
        <Route path="Login" element={<Login />} />
        <Route path="Account" element={<Account />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
