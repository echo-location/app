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
import ReportItem from "./pages/ReportItemPage";
import UserSettings from "./pages/UserSettings";
import Logout from "./pages/Logout";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Layout>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<HomePage />} />
          <Route path="Help" element={<Help />} />
          <Route path="LostItems" element={<LostItems />} />
          <Route path="ReportItem" element={<ReportItem />} />
          <Route path="Map" element={<Map />} />
          <Route path="User" element={<User />} />
          <Route path="Login" element={<Login />} />
          <Route path="Account" element={<Account />} />
          <Route path="UserSettings" element={<UserSettings />} />
          <Route path="Logout" element={<Logout />} />
        </Routes>
      </BrowserRouter>
    </Layout>
  );
}

export default App;
