import React from "react";
import PropTypes from "prop-types";

const Link = ({ active, children, onClick }) => {
  if (active) {
    return (
      <span
        style={{
          color: "blue",
          fontWeight: "500",
          fontStyle: "italic",
          textDecoration: "underline",
          cursor: "pointer",
          marginRight: "4px",
        }}
      >
        {children}
      </span>
    );
  }

  return (
    <span
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      style={{ cursor: "pointer", marginRight: "4px" }}
    >
      {children}
    </span>
  );
};

Link.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Link;
