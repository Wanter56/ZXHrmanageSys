import React from "react";
import img from "../../common/img/鸽鸽.jfif";
import "./404Page.less";

const NotFound: React.FC = function () {
  return (
    <div className="container">
      <img src={img} />
    </div>
  );
};

export default NotFound;
