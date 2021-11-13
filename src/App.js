import React, { useState, useEffect } from "react";
import "./App.css";
import BarDrawer from "./BarDrawer";

const getUsers = async () => {
  const url = "https://echolocation-api.herokuapp.com/";
  const response = await fetch(`${url}user`, {
    method: "GET",
  });
  console.log(response);
  return response.json();
};

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers().then((response) => {
      setUsers(response["users"]);
      console.log(response["users"]);
    });
  }, []);

  return (
    <div className="App">
      <BarDrawer />
      <div className="Items">
        <h1>Items</h1>
        {users.map((user) => (
          <div>
            {user.username}
            <b>
              {user.items.map((item) => (
                <div>
                  <i>{item}</i> <br />
                </div>
              ))}
            </b>
          </div>
        ))}
        <br />
      </div>
    </div>
  );
}

export default App;
