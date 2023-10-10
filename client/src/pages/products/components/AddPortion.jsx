import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import SwitchField from "../../../components/fields/SwitchField";
import InputField from "../../../components/fields/InputField";
import { CiCirclePlus, CiEdit, CiEraser, CiTrash } from "react-icons/ci";

function AddPortion({ formi, state }) {
  const [portion, setPortion] = useState({ portionName: "", price: "" });
  const [error, setError] = useState({ portionName: "", price: "" });

  const addPortion = () => {
    if (portion.portionName != "" && portion.price != "") {
      formi.setFieldValue("portions", [...formi.values.portions, portion]);
      setPortion({ portionName: "", price: "" });
    } else if (portion.portionName == "") {
      setError({ ...error, portionName: "Portion Name is required" });
    } else if (portion.price == "") {
      setError({ ...error, price: "Price is required" });
    }
  };

  const handlePortionValue = (e) => {
    const { name, value } = e.target;
    setPortion({ ...portion, [name]: value });
  };

  return (
    <div
      className={`border p-1 rounded-lg  ${
        state == "error" ? "border-red-500" : ""
      }`}>
      <div>
        <div className="mb-4">
          <div className="flex gap-2 w-full">
            <div className="flex flex-col flex-1">
              <InputField
                type="text"
                name="portionName"
                label="Portion"
                state={error.portionName != "" ? "error" : "success"}
                id="portion"
                extra="w-full  rounded-md py-2"
                placeholder="Enter Portion"
                onChange={handlePortionValue}
                // onBlur={portionFormik.handleBlur}
                value={portion.portionName}
              />
              {error.portionName != "" ? (
                <div className="text-red-500 text-xs float-right w-full">
                  {error.portionName}
                </div>
              ) : null}
            </div>
            <div className="flex flex-col flex-1">
              <InputField
                type="number"
                name="price"
                state={error.price != "" ? "error" : "success"}
                id="price"
                label="Price"
                extra="w-full  rounded-md py-2"
                placeholder="Enter Portion Price"
                onChange={handlePortionValue}
                // onBlur={portionFormik.handleBlur}
                value={portion.price}
              />
              {error.price != "" ? (
                <div className="text-red-500 text-xs">{error.price}</div>
              ) : null}
            </div>
          </div>

          <div className="flex justify-end space-x-2 my-2">
            <button
              onClick={addPortion}
              type="button"
              className="bg-green-500 text-white py-2 mt-1 space-x-1 px-2 rounded-md flex justify-center items-center">
              <CiCirclePlus /> <span className="text-xs">Add</span>
            </button>
            <button
              className="bg-gray-500 text-white py-2  mt-1 space-x-1 px-2 rounded-md flex justify-center items-center"
              onClick={() => ""}>
              <CiEraser /> <span className="text-xs">Clear</span>
            </button>
          </div>
        </div>
      </div>
      <div className="w-full">
        <table className="w-full bg-gray-50 dark:!bg-navy-700 border  rounded-lg overflow-hidden">
          <thead className="bg-gray-200 dark:!bg-gray-700">
            <tr>
              <th className="py-2 px-4 border text-sm text-left">Portion</th>
              <th className="py-2 px-4 border text-sm text-left">Rate</th>
              <th className="py-2 px-4 border text-sm text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {formi?.values?.portions?.map((item) => (
              <tr>
                <td className="py-2 px-4 border font-semibold">
                  {item.portionName}
                </td>
                <td className="py-2 px-4 border font-semibold">
                  $ {item.price}
                </td>
                <td className="py-2 px-4 border">
                  <div className="flex gap-2 justify-center w-full">
                    <span className="text-green-500 hover:text-green-600 hover:cursor-pointer">
                      <CiEdit className="h-5 w-5" />
                    </span>
                    <span className="text-red-500 hover:text-red-600 hover:cursor-pointer">
                      <CiTrash className="h-5 w-5" />
                    </span>
                  </div>
                </td>
              </tr>
            ))}
            {/* Add more rows as needed */}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AddPortion;
