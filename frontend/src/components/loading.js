import React from "react";
import "../assets/styles/loading.css";

function Loading() {
  return (
    <div className="global-wrapper-loading">
      <div className="wrapper-loading">
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="shadow"></div>
        <div className="shadow"></div>
        <div className="shadow"></div>
      </div>
    </div>
  );
}

export default Loading;
