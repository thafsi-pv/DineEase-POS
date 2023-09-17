import React from "react";

function index({ inputLabel, id, disabled, state, onChange }) {
  return (
    <div className="mt-3">
      <label
        htmlFor={id}
        className={`text-sm text-navy-700 dark:text-white ml-3 font-bold `}>
        {inputLabel}
      </label>
      <label  class="sr-only">
        Choose file
      </label>
      <input
        onChange={onChange}
        type="file"
        name="file-input"
        id="file-input"
        className={`block w-full border border-gray-200 shadow-sm rounded-md text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400
            file:bg-transparent file:border-0
            file:bg-gray-100 file:mr-4
            file:py-3 file:px-4
            dark:file:bg-gray-700 dark:file:text-gray-400  items-center justify-center  bg-white/0   outline-none ${
              disabled === true
                ? "!border-none !bg-gray-100 dark:!bg-white/5 dark:placeholder:!text-[rgba(255,255,255,0.15)]"
                : state === "error"
                ? "border-red-500 text-red-500 placeholder:text-red-500 dark:!border-red-400 dark:!text-red-400 dark:placeholder:!text-red-400"
                : state === "success"
                ? "border-green-500 text-green-500 placeholder:text-green-500 dark:!border-green-400 dark:!text-green-400 dark:placeholder:!text-green-400"
                : "border-gray-200 dark:!border-white/10 dark:text-white"
            }`}
      />
    </div>
  );
}

export default index;
