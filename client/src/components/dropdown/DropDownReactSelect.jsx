import React, { useState } from "react";
import Select from "react-select";

const options = [
  { value: "1", label: "Non-Veg" },
  { value: "2", label: "Veg" },
  { value: "3", label: "Sweets and Desserts" },
  { value: "4", label: "Beverages" },
  { value: "5", label: "Sandwiches and Burgers" },
  { value: "6", label: "Coffee and Tea" },
  { value: "7", label: "Soups" },
  { value: "8", label: "Appetizers or Starters" },
];

function DropDownReactSelect({
  ph,
  label,
  id,
  variant,
  isMulti,
  data,
  onChange,
  values,
}) {
  return (
    <div className="App w-full">
      {label && (
        <label
          htmlFor={id}
          className={`text-sm text-navy-700 dark:text-white ${
            variant === "auth" ? "ml-1.5 font-medium" : "ml-3 font-bold"
          }`}>
          {label}
        </label>
      )}
      <Select
        isClearable
        isSearchable
        id={id}
        isMulti={isMulti}
        placeholder={ph}
        defaultValue={values || "Select"}
        onChange={onChange}
        options={data || options}
        menuPlacement="auto"
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            // borderColor: state.isFocused ? "grey" : "red",
            backgroundColor: "dark:bg-navy-500 bg-white",
            textColor: "text-white",
            borderRadius: "10px",
            padding: "3px",
            minWidth: "250px",
          }),
        }}
      />
    </div>
  );
}

export default DropDownReactSelect;
