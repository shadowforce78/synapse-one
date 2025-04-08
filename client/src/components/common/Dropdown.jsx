import React from 'react';

const Dropdown = ({ options, onSelect, label }) => {
  const handleSelect = (event) => {
    onSelect(event.target.value);
  };

  return (
    <div className="dropdown">
      <label>{label}</label>
      <select onChange={handleSelect}>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;