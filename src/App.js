import { useState, useEffect } from "react";
import "./App.css";
import React from "react";
import BarDrawer from "./BarDrawer";

const getUsers = async () => {
  const url = "https://echolocation-api.herokuapp.com/";
  const response = await fetch(`${url}user`, {
    method: "GET",
  });
  console.log(response);
  return response.json();
};

const getItems = async (query) => {
  //waiting for backend to implement items search
  const url = "https://echolocation-api.herokuapp.com/";
  const response = await fetch(`${url}user`, {
    method: "GET",
    // body: JSON.stringify({ query }),
  });
  console.log(response);
  return response.json();
};

function App() {
  const [users, setUsers] = useState([]);
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("");

  const search = async () => {
    const results = await getItems(query);
    console.log(`Search query: ${query}`);
    setItems(results);
  };

  const updateQuery = (newQuery) => {
    setQuery(newQuery.target.value);
  };

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
        <input
          id="query"
          type="text"
          placeholder="Search"
          onChange={updateQuery}
        />
        <button onClick={search}>Search for Items</button>
      </div>
    </div>
  );
}

export default App;
