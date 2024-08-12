// src/components/Filters.js

import React from "react";

const Filters = ({ filters, setFilters }) => {
  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <label>
        Persona:
        <input type="text" name="persona" onChange={handleFilterChange} />
      </label>
      <label>
        Attribute:
        <input type="text" name="attribute" onChange={handleFilterChange} />
      </label>
    </div>
  );
};

export default Filters;
