import React, { useState } from "react";
import DropDownReactSelect from "../../../components/dropdown/DropDownReactSelect";
import FileInput from "../../../components/fileInput";
import SwithField from "../../../components/fields/SwitchField";
import TextField from "../../../components/fields/TextField";
import InputField from "../../../components/fields/InputField";
import Card from "../../../components/card";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { IoAddCircleOutline } from "react-icons/io5";
import { FiCheckCircle } from "react-icons/fi";
import { CiCirclePlus, CiEdit, CiEraser, CiTrash } from "react-icons/ci";
import { useFormik } from "formik";
import * as Yup from "yup";
import { genricError } from "../../../utils/genricError";

function AddProductsModal() {
  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState("");
  const [portions, setPortions] = useState([]);
  console.log(
    "🚀 ~ file: AddProductsModal.jsx:20 ~ AddProductsModal ~ portions:",
    portions
  );
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [image, setImage] = useState(null);

  const handlePortionChange = (e, index) => {
    const newPortions = [...portions];
    newPortions[index] = e.target.value;
    setPortions(newPortions);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleCuisineChange = (e) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setSelectedCuisine(selectedOptions);
  };

  const handleImageUpload = (e) => {
    // Handle image upload logic here
    const uploadedImage = e.target.files[0];
    setImage(uploadedImage);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Product details submitted:", {
      itemName,
      price,
      portions,
      selectedCategory,
      selectedCuisine,
      isActive,
      image,
    });
    // Reset form fields
    setItemName("");
    setPrice("");
    setPortions([]);
    setSelectedCategory("");
    setSelectedCuisine([]);
    setIsActive(false);
    setImage(null);
  };
  const portionsValidationSchema = Yup.object().shape({
    portion: Yup.string().required("Portion is required"),
    price: Yup.number().required("Price is required").min(0),
  });
  const productValidationSchema = Yup.object().shape({
    itemName: Yup.string().required("Portion is required"),
    category: Yup.number().required("category is required"),
    imageUrl: Yup.string().required("Image is required"),
  });
  const portionFormik = useFormik({
    initialValues: {
      portion: "",
      price: "",
    },
    validationSchema: portionsValidationSchema,
    onSubmit: (values, { resetForm }) => {
      // Handle form submission and add to the table here
      console.log("Submitted:", values);
      console.log(
        "🚀 ~ file: AddProductsModal.jsx:83 ~ AddProductsModal ~ values:",
        values
      );
      setPortions([...portions, values]);
      // Add logic to add the data to the table
      // Then reset the form
      resetForm();
    },
  });

  const productFormik = useFormik({
    initialValues: {
      itemName: "",
      price: "",
      category: "",
      cussine: [],
      isActive: true,
      remarks: "",
      hasPortions: false,
      portions: [],
      imageUrl: "",
    },
    validationSchema: portionsValidationSchema,
    onSubmit: (values, { resetForm }) => {
      // Handle form submission and add to the table here
      console.log("ProductSubmitted:", values);

      // Add logic to add the data to the table
      // Then reset the form
      resetForm();
    },
  });

  return (
    <div>
      <form onSubmit={productFormik.handleSubmit}>
        <div className="flex columns-2 justify-center w-full gap-3">
          <div className="w-1/2 p-2">
            <div className="mb-2">
              <InputField
                label="Item Name"
                variant=""
                id="itemName"
                extra=""
                type="text"
                placeholder="Enter Item Name"
                onChange={productFormik.handleChange}
                onBlur={productFormik.handleBlur}
                value={productFormik.values.itemName}
                state={
                  productFormik.touched.itemName &&
                  productFormik.errors.itemName
                    ? "error"
                    : "success"
                }
              />
            </div>
            <div className="mb-2">
              <InputField
                label="Price"
                variant=""
                id="itemPrice"
                extra=""
                type="number"
                placeholder="Enter Item Price"
              />
            </div>
            <div className="mb-4">
              <DropDownReactSelect
                ph="Select Category"
                label="Category"
                id="ddlCategory"
              />
            </div>
            <div className="mb-4">
              <DropDownReactSelect
                ph="Select Cusine"
                label="Cusine"
                id="ddlCusine"
                isMulti={true}
              />
            </div>

            <div class="hs-tooltip flex items-center">
              <SwithField
                color="green"
                label="Active"
                desc="Product is currently serving or not"
              />
            </div>
            <div class="mt-3">
              <TextField extra="w-full" color="green" label="Remarks" />
            </div>
          </div>

          <div className="w-1/2">
            <form onSubmit={portionFormik.handleSubmit}>
              <div className="mb-4">
                <div class="hs-tooltip flex items-center">
                  <SwithField
                    color="green"
                    label="Has Portions"
                    desc="Add required portion if available"
                  />
                </div>
                <div className="flex gap-2 w-full">
                  <div className="flex flex-col flex-1">
                    <InputField
                      type="text"
                      name="portion"
                      label="Portion"
                      state={
                        portionFormik.touched.portion &&
                        portionFormik.errors.portion
                          ? "error"
                          : "success"
                      }
                      id="portion"
                      extra="w-full  rounded-md py-2"
                      placeholder="Enter Portion"
                      onChange={portionFormik.handleChange}
                      onBlur={portionFormik.handleBlur}
                      value={portionFormik.values.portion}
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
                      state={
                        portionFormik.touched.price &&
                        portionFormik.errors.price
                          ? "error"
                          : "success"
                      }
                      id="price"
                      label="Price"
                      extra="w-full  rounded-md py-2"
                      placeholder="Enter Portion Price"
                      onChange={portionFormik.handleChange}
                      onBlur={portionFormik.handleBlur}
                      value={portionFormik.values.price}
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
                    onClick={() => setPortions([...portions, ""])}>
                    <CiEraser /> <span className="text-xs">Clear</span>
                  </button>
                </div>
              </div>
            </form>
            <div className="w-full">
              <table className="w-full bg-gray-50 dark:!bg-navy-700 border  rounded-lg overflow-hidden">
                <thead className="bg-gray-200 dark:!bg-gray-700">
                  <tr>
                    <th className="py-2 px-4 border text-sm text-left">
                      Portion
                    </th>
                    <th className="py-2 px-4 border text-sm text-left">Rate</th>
                    <th className="py-2 px-4 border text-sm text-left">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {portions.map((item) => (
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
            <FileInput inputLabel="Select Image" />
          </div>
        </div>

        <div className="mt-3 float-right">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddProductsModal;
