import React, { useState, useEffect } from "react";
import { getItems } from "../utils/utils";
import ItemCard from "../components/ItemCard/ItemCard";
import AlertDialog from "../components/Dialog/AlertDialog";
import "./User.css";
import { isLoggedIn } from "../utils/firebase";

function goToSettings() {
  const username = new URLSearchParams(window.location.search).get("User");
  const userid = new URLSearchParams(window.location.search).get("UserID");
  window.location.href = `UserSettings?User=${username}&UserID=${userid}`;
}
function UserInformation() {
  const [items, setItems] = useState([]);
  const [users, setUsers] = useState({});
  const [throwaway, setThrowaway] = useState(false);
  // const [timeout] = useState(setTimeout(() => { window.location.href = "http://localhost:3000/Login" }, 1000));

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
        if (user.user[0] === undefined) {
          return false;
        }
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
  if (isLoggedIn() === false) {
    window.location.href = "http://localhost:3000/Login?Page=User";
  }

  return (
    <div className="UserInformationPage">
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <AlertDialog type="Logout" />
      </div>
      <div className="items">
        <div className="side-section">
          <h1 className="sub-heading">Report</h1>
          <h1 className="heading">Found something? Report it!</h1>
          <p className="text">
            Welcome to your items. <br />
            You can monitor what items you've current have on display, with some
            helpful features.
            <br /> <br />
            We rely on your service to help users find the item they need, so
            thanks in advance!
            <br /> <br />
            If you've received confirmation from a recipient, you can feel free
            to delete your entry off our platform.
          </p>
        </div>
        <div className="main-section">
          {items.map(({ _id, name, location, description, date, photo }) => (
            <div style={{ display: "flex" }}>
              <div style={{ width: "98.5%", padding: "1rem 0" }}>
                <ItemCard
                  username={
                    users[_id] === undefined ? " " : users[_id].username
                  }
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
              </div>
              <div style={{ width: "1rem", margin: "1rem" }}>
                <AlertDialog
                  type="item"
                  throwaway={throwaway}
                  setThrowaway={setThrowaway}
                  id={_id}
                >
                  Delete Item
                </AlertDialog>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserInformation;
