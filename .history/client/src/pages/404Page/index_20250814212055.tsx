import React from "react";
import img from "../../common/img/not_found.png";

const NotFound: React.FC = function () {
  return (
    <div>
      <img src={img} />
      <h1>404</h1>
    </div>
  );
};

export default NotFound;
