import React from "react";
import "../assets/styles/modal.css";

const PopUp = (props) => {
  const handleClose = () => {
    props.onClick();
  };

  return (
    <div className="wrapper-popup">
      <div className="wrapper-modal-popup">
        <span className="close-modal" onClick={handleClose}></span>
        <h4>{props.message}</h4>
      </div>
    </div>
  );
};

export default PopUp;
