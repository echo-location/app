import React, { useState, useEffect } from "react";
import "../App.css";
import { getItems } from "../utils/utils";
import SearchBar from "../components/SearchBar/SearchBar";
import ItemCard from "../components/ItemCard/ItemCard";
import { styled } from "@mui/material/styles";

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
      <div className="Items">
        <h1>Lost Items</h1>
        <center>
          <SearchBar setItems={setItems} />
        </center>
        {items.map(({ _id, name, location, description, date, photo }) => (
          <center>
            <div>
              <br />
              <ItemCard
                username={users[_id] === undefined ? " " : users[_id].username}
                item={name}
                location={location}
                contactInfo="123-456-7890 | example@ucla.edu" // TODO
                description={description}
                dateFound={`Found: ${new Date(date).toLocaleDateString([], {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}`}
                image="" //TODO if no image, then use "" and ItemCard will handle it
                userId={users[_id] === undefined ? "" : users[_id].username}
                itemId={_id}
              />
            </div>
          </center>
        ))}
      </div>
    </div>
  );
};

export default LostItems;
