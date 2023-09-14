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
import cuisinList from "../variables/cusineList.json";

function AddProductsModal() {
  const [portions, setPortions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState([]);
  const [image, setImage] = useState(null);

  const handleImageUpload = (e) => {
    // Handle image upload logic here
    const uploadedImage = e.target.files[0];
    console.log(
      "🚀 ~ file: AddProductsModal.jsx:28 ~ handleImageUpload ~ uploadedImage:",
      uploadedImage.name
    );
    productFormik.setFieldValue("imageUrl", uploadedImage.name);
  };

  const productValidationSchema = Yup.object().shape({
    itemName: Yup.string().required("Item name is required"),
    price: Yup.number()
      .required("Price is required")
      .positive("Price must be a positive number"),
    hasPortions: Yup.boolean(),
    portions: Yup.array().when(["hasPortions"], (hasPortions, schema) => {
      if (hasPortions[0] == true) {
        return schema.min(1, "At least one portion is required");
      }
      return schema;
    }),
    // category: Yup.string(),
    // cuisine: Yup.array(),
    // isActive: Yup.boolean(),
    // remarks: Yup.string(),
    imageUrl: Yup.string().required("Select item image"),
  });

  const productFormik = useFormik({
    initialValues: {
      itemName: "",
      price: "",
      category: {},
      cuisine: [],
      isActive: true,
      remarks: "",
      hasPortions: false,
      portions: [],
      imageUrl: "",
    },
    validationSchema: productValidationSchema,
    onSubmit: (values, { resetForm }) => {
      // // Handle form submission and add to the table here
      const errors = {};
      productValidationSchema
        .validate(values, { abortEarly: false })
        .catch((validationErrors) => {
          validationErrors.inner.forEach((error) => {
            errors[error.path] = error.message;
          });
        });

      console.log("Validation errors:", errors);

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

  const handleSelectCategory = (option) => {
    //setSelectedCategory(option);
    productFormik.setFieldValue("category", option);
  };
  const handleSelectCuisine = (option) => {
    setSelectedCuisine(option);
  };

  return (
    <div>
      <form onSubmit={productFormik.handleSubmit}>
        <div className="flex columns-2 justify-center w-full gap-3">
          <div className="w-1/2 p-2 border-r-[1px] border-dashed border-gray-300 ">
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
                id="price"
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
              {productFormik.touched.price && productFormik.errors.price ? (
                <div className="text-red-500 text-xs float-right animate-pulse">
                  {productFormik.errors.price}
                </div>
              ) : null}
            </div>
            <div className="mb-4">
              <DropDownReactSelect
                ph="Select Category"
                label="Category"
                id="category"
                onChange={handleSelectCategory}
                values={selectedCategory}
              />
            </div>
            <div className="mb-4">
              <DropDownReactSelect
                ph="Select Cuisine"
                label="Cuisine"
                id="ddlCuisine"
                isMulti={true}
                data={cuisinList}
                onChange={handleSelectCuisine}
                values={selectedCuisine}
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
              <AddPortion
                formi={productFormik}
                state={
                  productFormik.touched.portions &&
                  productFormik.errors.portions
                    ? "error"
                    : "success"
                }
              />
            )}
            {productFormik.touched.portions && productFormik.errors.portions ? (
              <div className="text-red-500 text-xs float-right">
                {productFormik.errors.portions}
              </div>
            ) : null}
            <FileInput
              inputLabel="Select Image"
              state={
                productFormik.touched.imageUrl && productFormik.errors.imageUrl
                  ? "error"
                  : "success"
              }
              onChange={handleImageUpload}
            />
            {productFormik.touched.imageUrl && productFormik.errors.imageUrl ? (
              <div className="text-red-500 text-xs float-right">
                {productFormik.errors.imageUrl}
              </div>
            ) : null}
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
