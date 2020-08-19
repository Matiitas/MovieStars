import React from "react";
import { Link } from "react-router-dom";
import { SlideDown } from "react-slidedown";

const DropdownMenu = (props) => {
  function DropdownItem(props) {
    return (
      <Link
        to={props.to ? props.to : "#"}
        onClick={props.onClick ? props.onClick : null}
        className="menu-item"
      >
        {props.children}
      </Link>
    );
  }

  const isAuthenticated = (handleClick) => {
    return (
      <React.Fragment>
        <DropdownItem to="/profile">Profile</DropdownItem>
        <DropdownItem onClick={handleClick} to="#">
          Logout
        </DropdownItem>
      </React.Fragment>
    );
  };

  const isGuest = () => {
    return (
      <React.Fragment>
        <DropdownItem to="/login">Login</DropdownItem>
        <DropdownItem to="/register">Register</DropdownItem>
      </React.Fragment>
    );
  };

  return (
    <SlideDown className="drop-hamburger">
      <DropdownItem to="/about">About</DropdownItem>
      {props.isAuthenticated ? isAuthenticated(props.onClick) : isGuest()}
    </SlideDown>
  );
};

export default DropdownMenu;
