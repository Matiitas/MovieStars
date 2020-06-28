import React from "react";
import "../assets/styles/orderbar.css";

function OrderBar(props) {
  return (
    <div className="orderbox-wrapper">
      <ul className="list-of-objects">
        <li className="orderbar-list-buttons">
          <h1 className="orderbar-title">Order by</h1>
          <OrderBarButton text="A-Z" />
          <OrderBarButton text="Release Date" />
          <OrderBarButton text="IMDB Rating" />
        </li>
      </ul>
    </div>
  );
}

function OrderBarButton(props) {
  return <button className="orderbar-button">{props.text}</button>;
}

export default OrderBar;
