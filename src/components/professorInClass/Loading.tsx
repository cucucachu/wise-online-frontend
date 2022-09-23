import * as React from "react";
const editIcon = require("../../Assets/images/edit-icon.png");

export const Loading: React.FC<{}> = () => {
  return (
    <div className="container">
      <img src={editIcon} className="page-icon" alt="login icon" />
      <div className="spacer-vertical" />
      <p>Loading...</p>
    </div>
  );
};
