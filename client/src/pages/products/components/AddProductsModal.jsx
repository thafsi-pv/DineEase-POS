import React, { useRef, useState } from "react";
import DropDownReactSelect from "../../../components/dropdown/DropDownReactSelect";
import FileInput from "../../../components/fileInput";
import SwithField from "../../../components/fields/SwitchField";
import TextField from "../../../components/fields/TextField";
import InputField from "../../../components/fields/InputField";
import { useFormik } from "formik";
import AddPortion from "./AddPortion";
import SwitchField from "../../../components/fields/SwitchField";
import cuisinList from "../variables/cusineList.json";
import { PRODUCT_ADD_API } from "../../../axios/const";
import { toast } from "react-hot-toast";
import { productValidationSchema } from "../../../utils/validate";
import axiosInstance2 from "../../../axios/axiosInterceptor2";
import handleUploadImage from "../../../utils/uploadImage";

function AddProductsModal({
  setIsModalOpen,
  modalData,
  productList,
  setProductList,
  fromPos,
}) {
  const [image, setImage] = useState(null);
  const productFormRef = useRef(null);

  const handleImageUpload = (e) => {
    const uploadedImage = e.target.files[0];
    setImage(uploadedImage);
    productFormik.setFieldValue("imageUrl", uploadedImage.name);
  };

  const productFormik = useFormik({
    initialValues: modalData || {
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
    onSubmit: async (values, { resetForm }) => {
      try {
        if (image) {
          const cloudImgUrl = await handleUploadImage(image);
          values.imageUrl = cloudImgUrl;
        }
        const res = await axiosInstance2.post(PRODUCT_ADD_API, values);
        if (res.status == 201) {
          if (!fromPos) {
            if (values._id) {
              var newList = productList.map((item) =>
                item._id == values._id ? res?.data : item
              );
              setProductList(newList);
              toast.success("Product updated successfully 👍🏻");
              return true;
            } else {
              setProductList((prev) => [res?.data, ...prev]);
            }
          }
          toast.success("Product added successfully 👍🏻");
        }
      } catch (error) {
        toast.error("Something went wrong, please try again! 😞");
      } finally {
        setIsModalOpen(false);
      }
      resetForm();
    },
  });

  const handleHasPortionsChange = (e) => {
    productFormik.setFieldValue("hasPortions", e.target.checked);
  };

  const handleIsActiveChange = (e) => {
    productFormik.setFieldValue("isActive", e.target.checked);
  };

  const handleSelectCategory = (option) => {
    productFormik.setFieldValue("category", option);
  };

  const handleSelectCuisine = (option) => {
    productFormik.setFieldValue("cuisine", option);
  };

  const handleResetForm = () => {
    productFormik.resetForm;
  };

  return (
    <div>
      <form onSubmit={productFormik.handleSubmit} ref={productFormRef}>
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
                //values={selectedCategory}
                values={productFormik.values.category}
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
                //values={selectedCuisine}
                values={productFormik.values.cuisine}
              />
            </div>

            <div className="hs-tooltip flex items-center">
              <SwithField
                color="green"
                id="isActive"
                name="isActive"
                label="Active"
                desc="Product is currently serving or not"
                value={productFormik.values.isActive}
                onChange={handleIsActiveChange}
              />
            </div>
            <div className="mt-3">
              <TextField
                extra="w-full"
                color="green"
                label="Remarks"
                id="remarks"
                name="remarks"
                value={productFormik.values.remarks}
                onChange={productFormik.handleChange}
                onBlur={productFormik.handleBlur}
              />
            </div>
          </div>

          <div className="w-1/2">
            <div className="hs-tooltip flex items-center">
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
            type="button"
            onClick={handleResetForm}
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
