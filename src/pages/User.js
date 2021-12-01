import React, { useState, useEffect } from "react";
import { getItems } from "../utils/utils";
import ItemCard from "../components/ItemCard/ItemCard";
import Button from "@mui/material/Button";

function UserInformation() {
  const [items, setItems] = useState([]);
  const [users, setUsers] = useState({});
  const [throwaway, setThrowaway] = useState(false);

  const remove = (id) => {
    console.log("remove", id);
    if (window.confirm("Are you sure you want to remove this item?")) {
      const url = "http://localhost:8000";
      fetch(`${url}/item/${id}`, {
        method: "DELETE",
      }).then((response) => {
        console.log(response);
        setThrowaway(!throwaway);
      });
    }
  };

  const findUser = async (id) => {
    try {
      return fetch(`http://localhost:8000/user/${id}`, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchItems = async () => {
      const userQuery = new URLSearchParams(window.location.search).get("User");
      const getUser = async (item, query) => {
        const user = await findUser(item.user);
        return user.user[0].username === query;
      };

      const fetchByUser = async () => {
        const response = await getItems();
        const results = await Promise.all(
          response["items"].map((item) => getUser(item, userQuery))
        );
        return response["items"].filter((_v, index) => results[index]);
      };

      const newItems = await fetchByUser();
      let dict = {};
      for (let i = 0; i < newItems.length; i++) {
        const user = await findUser(newItems[0].user);
        dict[newItems[i]._id] = user.user[0];
      }

      setItems(newItems);
      setUsers(dict);
    };
    fetchItems();
  }, [throwaway]);

  return (
    <div className="UserInformationPage">
      <h1>Items You have Reported</h1>
      {items.map(({ _id, name, location, description, date, photo }) => (
        <center>
          <div>
            <ItemCard
              username={users[_id] === undefined ? " " : users[_id].username}
              item={name}
              location={location}
              contactInfo={
                users[_id] === undefined
                  ? ""
                  : `${users[_id].email} | ${users[_id].phone} `
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
            <Button
              onClick={() => remove(_id)}
              style={{ width: "200px", background: "red" }}
            >
              DELETE
            </Button>
          </div>
        </center>
      ))}
    </div>
  );
}

export default UserInformation;
