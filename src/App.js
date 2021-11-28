import React from "react";
import "./App.css";
import LostItemsPage from "./LostItemsPage";
import Map from "./Map";
import CreateAccount from "./CreateAccountPage";
import Login from "./LoginPage";
import UserInformation from "./UserInformation";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Help from "./Help";

function App() {
  //Routing, default is Lost Page for now
  return (
      <BrowserRouter>
        <Routes>
          <Route path="" element= { <LostItemsPage />} />
          <Route path="/Help" element= {<Help />} />
          <Route path="LostItemsPage" element= { <LostItemsPage />} />
          <Route path="Map" element= { <Map />} />
          <Route path="UserInformation" element= { <UserInformation />} />
          <Route path="Login" element = {<Login/>} />
          <Route path="CreateAccount" element = {<CreateAccount/>} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
