import React from "react";
import "./App.css";
import LostItems from "./pages/LostItems";
import Map from "./pages/Map";
import Account from "./pages/Account";
import Login from "./pages/Login";
import User from "./pages/User";
import Help from "./pages/Help";
import HomePage from "./pages/HomePage";
import Layout from "./components/Layout/Layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Layout>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<HomePage />} />
          <Route path="Help" element={<Help />} />
          <Route path="LostItems" element={<LostItems />} />
          <Route path="Map" element={<Map />} />
          <Route path="User" element={<User />} />
          <Route path="Login" element={<Login />} />
          <Route path="Account" element={<Account />} />
        </Routes>
      </BrowserRouter>
    </Layout>
  );
}

export default App;
