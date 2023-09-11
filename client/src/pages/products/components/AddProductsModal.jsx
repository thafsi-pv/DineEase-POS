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
import AddPortion from "./AddPortion";
import SwitchField from "../../../components/fields/SwitchField";

function AddProductsModal() {
  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState("");
  const [portions, setPortions] = useState([]);
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

  const productValidationSchema = Yup.object().shape({
    itemName: Yup.string().required("Item name is required"),
    price: Yup.number().required("Price is required").min(0),
    category: Yup.number().required("category is required"),
    imageUrl: Yup.string().required("Image is required"),
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
    validationSchema: productValidationSchema,
    onSubmit: (values, { resetForm }) => {
      // Handle form submission and add to the table here
      console.log("ProductSubmitted:", values);

      // Add logic to add the data to the table
      // Then reset the form
      resetForm();
    },
  });

  const handleHasPortionsChange = (e) => {
    productFormik.setFieldValue("hasPortions", e.target.checked);
  };

  return (
    <div>
      <form onSubmit={productFormik.handleSubmit}>
        <div className="flex columns-2 justify-center w-full gap-3">
          <div className="w-1/2 p-2 border-r-2">
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
              {productFormik.touched.itemName &&
              productFormik.errors.itemName ? (
                <div className="text-red-500 text-xs float-right animate-pulse">
                  {productFormik.errors.itemName}
                </div>
              ) : null}
            </div>
            <div className="mb-2">
              <InputField
                label="Price"
                variant=""
                id="itemPrice"
                extra=""
                type="number"
                placeholder="Enter Item Price"
                onChange={productFormik.handleChange}
                onBlur={productFormik.handleBlur}
                value={productFormik.values.price}
                state={
                  productFormik.touched.price && productFormik.errors.price
                    ? "error"
                    : "success"
                }
              />
              {productFormik.touched.price &&
              productFormik.errors.price ? (
                <div className="text-red-500 text-xs float-right animate-pulse">
                  {productFormik.errors.price}
                </div>
              ) : null}
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
                ph="Select Cuisine"
                label="Cuisine"
                id="ddlCuisine"
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
            <div class="hs-tooltip flex items-center">
              <SwitchField
                color="green"
                label="Has Portions"
                desc="Add required portion if available"
                onChange={handleHasPortionsChange}
                value={productFormik.values.hasPortions}
              />
            </div>
            {/* //portion component */}
            {productFormik.values.hasPortions && (
              <AddPortion portions={portions} setPortions={setPortions} />
            )}
            <FileInput inputLabel="Select Image" />
          </div>
        </div>

        <div className="mt-3 float-right flex gap-2">
          <button
            type="submit"
            className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddProductsModal;
