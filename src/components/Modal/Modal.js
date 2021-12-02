import "./Modal.css";
import React, { useState, useEffect } from "react";
const Modal = ({ image, showPhoto, setShowPhoto }) => {
  const [url, setURL] = useState("mp100.jpg");
  useEffect(() => {
    if (image !== undefined) setURL(image);
  }, [image]);
  return (
    <div className="modal" style={{ display: showPhoto ? "" : "none" }}>
      <div className="modal-content">
        <span className="close" onClick={() => setShowPhoto(false)}>
          &times;
        </span>

        <div className="modal-image">
          <img className="resize" src={url} alt="Item" />
          <div className="modal-footer">
            <p>{url}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
