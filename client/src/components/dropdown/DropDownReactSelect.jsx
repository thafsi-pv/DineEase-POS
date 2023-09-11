import React, { useState } from "react";
import Select from "react-select";

const options = [
  { value: "1", label: "Table 1" },
  { value: "2", label: "Table 2" },
  { value: "3", label: "Table 3" },
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
  // const [selectedOption, setSelectedOption] = useState(null);

  // const handleSelectChange = (option) => {
  //   setSelectedOption(option);
  // };

  return (
    <div className="App w-full">
      <label
        htmlFor={id}
        className={`text-sm text-navy-700 dark:text-white ${
          variant === "auth" ? "ml-1.5 font-medium" : "ml-3 font-bold"
        }`}>
        {label}
      </label>
      <Select
        isMulti={isMulti}
        placeholder={ph}
        defaultValue={values}
        onChange={onChange}
        options={data || options}
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            // borderColor: state.isFocused ? "grey" : "red",
            backgroundColor: "dark:bg-navy-500 bg-white",
            textColor: "text-white",
            borderRadius: "10px",
            padding: "3px",
          }),
        }}
      />
    </div>
  );
}

export default DropDownReactSelect;
