import React from "react";

function index({ inputLabel }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-600">
        {inputLabel}
      </label>
      <label for="file-input" class="sr-only">
        Choose file
      </label>
      <input
        type="file"
        name="file-input"
        id="file-input"
        class="block w-full border border-gray-200 shadow-sm rounded-md text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400
            file:bg-transparent file:border-0
            file:bg-gray-100 file:mr-4
            file:py-3 file:px-4
            dark:file:bg-gray-700 dark:file:text-gray-400"
      />
    </div>
  );
}

export default index;
