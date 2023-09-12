import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import SwitchField from "../../../components/fields/SwitchField";
import InputField from "../../../components/fields/InputField";
import { CiCirclePlus, CiEdit, CiEraser, CiTrash } from "react-icons/ci";

function AddPortion({ portions, setPortions, formi }) {
  const [portion, setPortion] = useState({ portionName: "", price: "" });

  //   const portionsValidationSchema = Yup.object().shape({
  //     portion: Yup.string().required("Portion is required"),
  //     price: Yup.number().required("Price is required").min(0),
  //   });
  //   const portionFormik = useFormik({
  //     initialValues: {
  //       portion: "",
  //       price: "",
  //     },
  //     validationSchema: portionsValidationSchema,
  //     onSubmit: (values, { resetForm }) => {
  //       // Handle form submission and add to the table here
  //       console.log("Submitted:", values);
  //       console.log(
  //         "🚀 ~ file: AddProductsModal.jsx:83 ~ AddProductsModal ~ values:",
  //         values
  //       );
  //       setPortions([...portions, values]);
  //       // Add logic to add the data to the table
  //       // Then reset the form
  //       //resetForm();
  //     },
  //   });

  const addPortion = () => {
    //portionFormik.handleSubmit();
    formi.setFieldValue("portions", portion);
  };

  const handlePortionValue = () => {
    const { name, value } = e.target;
    setPortion({ ...portion, [name]: value });
  };

  return (
    <div className="border rounded-tl-none p-1 rounded-lg mb-3">
      <div onClick={addPortion}>
        <div className="mb-4">
          <div className="flex gap-2 w-full">
            <div className="flex flex-col flex-1">
              <InputField
                type="text"
                name="portion"
                label="Portion"
                // state={
                //   portionFormik.touched.portion && portionFormik.errors.portion
                //     ? "error"
                //     : "success"
                // }
                id="portion"
                extra="w-full  rounded-md py-2"
                placeholder="Enter Portion"
                onChange={handlePortionValue}
                // onBlur={portionFormik.handleBlur}
                value={portion.portionName}
              />
              {/* {portionFormik.touched.portion && portionFormik.errors.portion ? (
          <div className="text-red-500 text-sm">
            {portionFormik.errors.portion}
          </div>
        ) : null} */}
            </div>
            <div className="flex flex-col flex-1">
              <InputField
                type="number"
                name="price"
                // state={
                //   portionFormik.touched.price && portionFormik.errors.price
                //     ? "error"
                //     : "success"
                // }
                id="price"
                label="Price"
                extra="w-full  rounded-md py-2"
                placeholder="Enter Portion Price"
                onChange={handlePortionValue}
                // onBlur={portionFormik.handleBlur}
                value={portion.price}
              />
              {/* {portionFormik.touched.price && portionFormik.errors.price ? (
          <div className="text-red-500 text-sm">
            {portionFormik.errors.price}
          </div>
        ) : null} */}
            </div>
          </div>

          <div className="flex justify-end space-x-2 my-2">
            <button
              type="submit"
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
            {formi?.values?.portion?.map((item) => (
              <tr>
                <td className="py-2 px-4 border font-semibold">
                  {item.portion}
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
