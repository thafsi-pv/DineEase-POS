import React from "react";

function Badge({ label, color }) {
  // Define a mapping of color names to corresponding Tailwind CSS classes
  const colorClasses = {
    default: "bg-blue-100 text-blue-800",
    dark: "bg-gray-100 text-gray-800",
    red: "bg-red-100 text-red-800",
    green: "bg-green-100 text-green-800",
    yellow: "bg-yellow-100 text-yellow-800",
    indigo: "bg-indigo-100 text-indigo-800",
    purple: "bg-purple-100 text-purple-800",
    pink: "bg-pink-100 text-pink-800",
  };

  // Select the appropriate color class based on the prop
  const selectedColorClass = colorClasses[color] || colorClasses.default;

  return (
    <span
      className={`text-xs font-medium mr-2 px-2.5 py-0.5 rounded border mb-1 ${
        selectedColorClass
      } border-${color}-400 dark:bg-gray-700 dark:text-${color}-400 dark:border-${color}-400`}
    >
      {label}
    </span>
  );
}

export default Badge;
