import React from "react";
import "../assets/styles/modal.css";

const PopUp = (props) => {
  const handleClose = () => {
    props.onClick();
  };

  return (
    <div className="wrapper-popup">
      <div className="wrapper-modal-popup">
        <a href="#" className="close-modal" onClick={handleClose}></a>
        <h4>{props.message}</h4>
      </div>
    </div>
  );
};

export default PopUp;
