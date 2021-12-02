import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteIcon from "@mui/icons-material/Delete";
import { logout } from "../../utils/firebase";

function AlertDialog({ type, throwaway, setThrowaway, id }) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  function logoutUser() {
    // console.log("LOGOUT!") // needs to be implemented
    logout();
    window.location.href = "Logout";
  }
  function deleteUser() {
    const userID = new URLSearchParams(window.location.search).get("UserID");
    fetch(`http://localhost:8000/user/${userID}`, { method: "DELETE" }).then(
      (response) => {
        if (response.ok) {
          console.log(response);
          handleClose();
          window.alert(
            "You have successfully deleted your account. Redirecting back to lost items page."
          );
          setTimeout(() => (window.location.href = "LostItems"), 2000);
        } else {
          throw new Error("Please try again.");
        }
      }
    );
  }
  const remove = (id) => {
    console.log("remove", id);
    fetch(`http://localhost:8000/item/${id}`, {
      method: "DELETE",
    }).then((response) => {
      if (response.ok) {
        console.log(response, throwaway);
        setThrowaway(!throwaway);
      } else {
        throw new Error("please try again");
      }
    });
    handleClose();
  };

  if (type === "User") {
    return (
      <div>
        <Button variant="contained" onClick={handleClickOpen}>
          Delete Account
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Are you sure you want to delete your account? "}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              This is permanent!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>No</Button>
            <Button
              onClick={() => {
                deleteUser();
              }}
              autoFocus
            >
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  } else if (type === "item") {
    return (
      <>
        <div className="sidemenu">
          <DeleteIcon
            color="primary"
            fontSize="large"
            sx={{ padding: "0.5rem" }}
            onClick={handleClickOpen}
          />
        </div>
        <div className="dialog">
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Are you sure you want to delete this item?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                This is permanent!
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>No</Button>
              <Button onClick={() => remove(id)} autoFocus>
                Yes
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </>
    );
  } else {
    return (
      <div>
        <Button variant="outlined" onClick={handleClickOpen}>
          Logout
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Are you sure you want to logout?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              You will need to sign back in to access your items again.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>No</Button>
            <Button onClick={() => logoutUser()} autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default AlertDialog;
