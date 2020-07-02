import React from "react";
import "../assets/styles/orderbar.css";

function OrderBar(props) {
  return (
    <div className="orderbox-wrapper">
      <ul className="list-of-objects">
        <li className="orderbar-list-buttons">
          <h1 className="orderbar-title">Order by</h1>
          <OrderBarButton
            onClick={props.onClick}
            text="A-Z"
            order="alphabetic"
          />
          <OrderBarButton
            onClick={props.onClick}
            text="Year ↑"
            order="yearAsc"
          />
          <OrderBarButton
            onClick={props.onClick}
            text="Year ↓"
            order="yearDesc"
          />
          <OrderBarButton
            onClick={props.onClick}
            text="IMDB ↑"
            order="imdbRatingAsc"
          />
          <OrderBarButton
            onClick={props.onClick}
            text="IMDB ↓"
            order="imdbRatingDesc"
          />
        </li>
      </ul>
    </div>
  );
}

function OrderBarButton(props) {
  const handleClick = () => {
    props.onClick(props.order);
  };

  return (
    <button className="orderbar-button" onClick={handleClick}>
      {props.text}
    </button>
  );
}

export default OrderBar;
