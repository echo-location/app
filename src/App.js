import React, { useState, useEffect } from "react";
import "./App.css";
import BarDrawer from "./BarDrawer";

const getPosts = async () => {
  const url = "https://echolocation-api.herokuapp.com/";
  const response = await fetch(`${url}user`, {
    method: "GET",
  });
  console.log(response);
  return response.json();
};

function App() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    getPosts().then((posts2) => {
      //const copy = JSON.parse(JSON.stringify(posts2["users"]));
      setPosts(posts2["users"]);
      console.log(posts2["users"]);
    });
  }, []);

  return (
    <div className="App">
      <BarDrawer />
      <div className="Items">
        <h1>Items</h1>
        {posts.map((user) => (
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
      </div>
    </div>
  );
}

export default App;
