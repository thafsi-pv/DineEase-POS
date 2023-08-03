import React, { useState } from "react";
import Select from "react-select";

const options = [
  { value: "1", label: "Table 1" },
  { value: "2", label: "Table 2" },
  { value: "3", label: "Table 3" },
];

function DropDownReactSelect({ ph }) {
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <div className="App w-full">
      <Select
        placeholder={ph}
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={options}
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            // borderColor: state.isFocused ? "grey" : "red",
            backgroundColor:"dark:bg-navy-500 bg-white",
            textColor:"text-white"
          }),
        }}
      />
    </div>
  );
}

export default DropDownReactSelect;
