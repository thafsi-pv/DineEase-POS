import React, { useRef, useState } from "react";
import DropDownReactSelect from "../../../components/dropdown/DropDownReactSelect";
import FileInput from "../../../components/fileInput";
import SwithField from "../../../components/fields/SwitchField";
import TextField from "../../../components/fields/TextField";
import InputField from "../../../components/fields/InputField";
import { useFormik } from "formik";

import axios from "axios";
import { PRODUCT_ADD_API } from "../../../utils/const";
import { toast } from "react-hot-toast";
import { customerValidationSchema } from "../../../utils/validate";

function AddCustomerModal({
  setIsModalOpen,
  modalData,
  customerList,
  setCustomerList,
  fromPos,
}) {
  const [image, setImage] = useState(null);
  const customerFormRef = useRef(null);

  const handleImageUpload = (e) => {
    const uploadedImage = e.target.files[0];
    setImage(uploadedImage);
    customerFormik.setFieldValue("imageUrl", uploadedImage.name);
  };

  const customerFormik = useFormik({
    initialValues: modalData || {
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      isActive: true,
      loyaltyCard: true,
      address: "",
    },
    validationSchema: customerValidationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const res = await axios.post(PRODUCT_ADD_API, values);
        if (res.status == 201) {
          if (values._id) {
            var newList = customerList.map((item) =>
              item._id == values._id ? res?.data : item
            );
            setCustomerList(newList);
            toast.success("Customer updated successfully 👍🏻");
            return true;
          } else {
            setCustomerList((prev) => [res?.data, ...prev]);
          }
          toast.success("Customer added successfully 👍🏻");
        }
      } catch (error) {
        toast.error("Something went wrong, please try again! 😞");
      } finally {
        setIsModalOpen(false);
      }
      resetForm();
    },
  });

  const handleIsActiveChange = (e) => {
    customerFormik.setFieldValue("isActive", e.target.checked);
  };

  const handleResetForm = () => {
    customerFormik.resetForm;
  };

  return (
    <div>
      <form onSubmit={customerFormik.handleSubmit} ref={customerFormRef}>
        <div className="flex columns-2 justify-center w-full gap-3">
          <div className="w-1/2 p-2 border-r-[1px] border-dashed border-gray-300 ">
            <div className="mb-2">
              <InputField
                label="First Name"
                variant=""
                id="firstName"
                extra=""
                type="text"
                placeholder="Enter First Name"
                onChange={customerFormik.handleChange}
                onBlur={customerFormik.handleBlur}
                value={customerFormik.values.firstName}
                state={
                  customerFormik.touched.firstName &&
                  customerFormik.errors.firstName
                    ? "error"
                    : "success"
                }
              />
              {customerFormik.touched.firstName &&
              customerFormik.errors.firstName ? (
                <div className="text-red-500 text-xs float-right animate-pulse">
                  {customerFormik.errors.firstName}
                </div>
              ) : null}
            </div>
            <div className="mb-2">
              <InputField
                label="Last Name"
                variant=""
                id="lastName"
                extra=""
                type="text"
                placeholder="Enter Last Name"
                onChange={customerFormik.handleChange}
                onBlur={customerFormik.handleBlur}
                value={customerFormik.values.lastName}
              />
            </div>
            <div className="mb-2">
              <InputField
                label="Mobile"
                variant=""
                id="mobile"
                extra=""
                type="number"
                placeholder="Enter Item Mobile"
                onChange={customerFormik.handleChange}
                onBlur={customerFormik.handleBlur}
                value={customerFormik.values.mobile}
                state={
                  customerFormik.touched.mobile && customerFormik.errors.mobile
                    ? "error"
                    : "success"
                }
              />
              {customerFormik.touched.mobile && customerFormik.errors.mobile ? (
                <div className="text-red-500 text-xs float-right animate-pulse">
                  {customerFormik.errors.mobile}
                </div>
              ) : null}
            </div>

            <div className="hs-tooltip flex items-center">
              <SwithField
                color="green"
                id="isActive"
                name="isActive"
                label="Active"
                desc="Customer is currently serving or not"
                value={customerFormik.values.isActive}
                onChange={handleIsActiveChange}
              />
            </div>
            <div className="mt-3">
              <TextField
                extra="w-full"
                color="green"
                label="Address"
                id="address"
                name="address"
                value={customerFormik.values.address}
                onChange={customerFormik.handleChange}
                onBlur={customerFormik.handleBlur}
              />
            </div>
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

export default AddCustomerModal;
