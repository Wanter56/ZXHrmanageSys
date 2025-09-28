import React from "react";
import img from "@assets/imgs/鸽鸽.jfif";
import "./404Page.less";

const NotFound: React.FC = function () {
  return (
    <div className="container">
      <img src={img} />
    </div>
  );
};

export default NotFound;
