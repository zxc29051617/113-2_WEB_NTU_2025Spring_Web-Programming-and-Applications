import React, { useState } from "react";

const Dropdown = ({ title, children }) => {
  return (
    <div className="dropdown">
      <button>{title} ▾</button>
      <div className="dropdown-content">
        {children}
      </div>
    </div>
  );
};

export default Dropdown;
