import React, { useState } from "react";
import { Link } from "react-router-dom";

const NavItem = (props) => {
  const [open, setOpen] = useState(false);

  return (
    <li className={props.name ? "nav-" + props.name : "nav-item"}>
      <Link
        to={props.to ? props.to : "#"}
        onClick={props.onClick ? props.onClick : () => setOpen(!open)}
      >
        {props.text ? (
          <span>{props.text}</span>
        ) : (
          <span>
            <img src={props.img} alt="svg-img" />
          </span>
        )}
      </Link>
      {open && props.children}
    </li>
  );
};

export default NavItem;
