import React from "react";
import img from "../../common/img/not_found.png";
import "./404Page.less";

const NotFound: React.FC = function () {
  return (
    <div className="container">
      <img src={img} />
      <h1>404</h1>
    </div>
  );
};

export default NotFound;
