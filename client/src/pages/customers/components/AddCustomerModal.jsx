import React, { useRef, useState } from "react";
import DropDownReactSelect from "../../../components/dropdown/DropDownReactSelect";
import FileInput from "../../../components/fileInput";
import SwithField from "../../../components/fields/SwitchField";
import TextField from "../../../components/fields/TextField";
import InputField from "../../../components/fields/InputField";
import { useFormik } from "formik";
import { CUSTOMER_ADD_API } from "../../../axios/const";
import { toast } from "react-hot-toast";
import { customerValidationSchema } from "../../../utils/validate";
import { useDispatch } from "react-redux";
import { keyMappings, renameKeys } from "../../../utils/utils";
import axiosInstance2 from "../../../axios/axiosInterceptor2";

function AddCustomerModal({
  setIsModalOpen,
  modalData,
  customerList,
  setCustomerList,
  fromPos,
  customerDDSet,
}) {
  const customerFormRef = useRef(null);
  const dispatch = useDispatch();

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
        const res = await axiosInstance2.post(CUSTOMER_ADD_API, values);
        if (res.status == 201) {
          if (!fromPos) {
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
          } else {
            const newArray = renameKeys(res?.data, keyMappings);
            // dispatch(selectCustomer(newArray));
            customerDDSet(newArray);
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
  const handleLoyaltyCardChange = (e) => {
    customerFormik.setFieldValue("loyaltyCard", e.target.checked);
  };

  const handleResetForm = () => {
    customerFormik.resetForm;
  };

  return (
    <div>
      <form onSubmit={customerFormik.handleSubmit} ref={customerFormRef}>
        <div className="flex columns-2 justify-center w-full gap-3">
          <div className="w-full p-2 border-gray-300 ">
            <div className="flex w-full gap-2">
              <div className="mb-2 flex-1">
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
              <div className="mb-2 flex-1">
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
            </div>
            <div className="flex gap-2">
              <div className="mb-2 flex-1">
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
                    customerFormik.touched.mobile &&
                    customerFormik.errors.mobile
                      ? "error"
                      : "success"
                  }
                />
                {customerFormik.touched.mobile &&
                customerFormik.errors.mobile ? (
                  <div className="text-red-500 text-xs float-right animate-pulse">
                    {customerFormik.errors.mobile}
                  </div>
                ) : null}
              </div>
              <div className="mb-2 flex-1">
                <InputField
                  label="Email"
                  variant=""
                  id="email"
                  extra=""
                  type="text"
                  placeholder="Enter Email"
                  onChange={customerFormik.handleChange}
                  onBlur={customerFormik.handleBlur}
                  value={customerFormik.values.email}
                />
              </div>
            </div>
            <div className="flex">
              <div className="hs-tooltip flex items-center flex-1">
                <SwithField
                  color="green"
                  id="isActive"
                  name="isActive"
                  label="Active"
                  desc="Customer is currently active or not"
                  value={customerFormik.values.isActive}
                  onChange={handleIsActiveChange}
                />
              </div>
              <div className="hs-tooltip flex items-center flex-1">
                <SwithField
                  color="green"
                  id="loyaltyCard"
                  name="loyaltyCard"
                  label="Loyalty Card"
                  desc="Customer is eligible for loyalty program"
                  value={customerFormik.values.loyaltyCard}
                  onChange={handleLoyaltyCardChange}
                />
              </div>
            </div>
            <div className="mt-3">
              <TextField
                extra="w-full"
                color="green"
                label="Address"
                id="address"
                name="address"
                rows={5}
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
