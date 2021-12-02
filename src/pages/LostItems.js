import React, { useState, useEffect } from "react";
// import "../App.css";
import "./LostItems.css";
import { getItems } from "../utils/utils";
import SearchBar from "../components/SearchBar/SearchBar";
import ItemCard from "../components/ItemCard/ItemCard";

const LostItems = () => {
  const [items, setItems] = useState([]);
  const [users, setUsers] = useState({});

  const findUser = async (id) => {
    try {
      return fetch(`http://localhost:8000/user/${id}`, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => data.user[0]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchItems = async () => {
      const response = await getItems();
      const newItems = response["items"];

      let dict = {};
      for (let i = 0; i < newItems.length; i++) {
        const data = await findUser(newItems[i].user);
        dict[newItems[i]._id] = data;
      }
      setItems(response["items"]);
      setUsers(dict);
    };
    fetchItems();
  }, []);

  return (
    <div>
      <div className="items">
        <div className="side-section">
          <h1 className="sub-heading">Lost Items</h1>
          <h1 className="heading">Looking for an item?</h1>
          <p className="text">
            We've got you covered. <br />
            Try scrolling through our list of items that's been reported from
            our users, and see if there's a match!
            <br /> <br />
            With our users providing an item's location, a picture, and their
            contact information, rest assured our application will be a one-stop
            for quickly searching through your items!
            <br /> <br />
            Feeling overwhelmed? Look for your specific item through the
            searchbar!
          </p>
          <div className="layout">
            <div
              onClick={() => {
                window.location.href = "Login";
              }}
              className="button"
            >
              Login
            </div>
            <div
              onClick={() => {
                window.location.href = "Map";
              }}
              className="button"
            >
              Map
            </div>
            <div
              onClick={() => {
                window.location.href = "Register";
              }}
              className="button"
            >
              Register
            </div>
          </div>
        </div>
        <div className="main-section">
          <center>
            <SearchBar setItems={setItems} />
          </center>
          {items.map(({ _id, name, location, description, date, photo }) => (
            <div>
              <br />
              <ItemCard
                username={users[_id] === undefined ? " " : users[_id].username}
                item={name}
                location={location}
                contactInfo={
                  users[_id] === undefined
                    ? " "
                    : `${users[_id].phone} | ${users[_id].email}`
                }
                description={description}
                dateFound={`Found: ${new Date(date).toLocaleDateString([], {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}`}
                image={photo}
                userId={users[_id] === undefined ? "" : users[_id].username}
                itemId={_id}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LostItems;
