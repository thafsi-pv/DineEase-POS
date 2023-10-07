import Card from "../../../../components/card";
import React, { useEffect, useState } from "react";
import FileInput from "../../../../components/fileInput";
import TextInput from "../../../../components/fields/InputField";
import TextField from "../../../../components/fields/TextField";
import { useFormik } from "formik";
import MiniCalendar from "../../../../components/calendar/MiniCalendar";
import { validateProfileSchema } from "../../../../utils/validate";
import Calendar from "react-calendar";
import { UPDATE_PROFILE_API } from "../../../../utils/const";
import axiosInstance2 from "../../../../utils/axiosInterceptor2";
import handleUploadImage from "../../../../utils/uploadImage";
import { genricError } from "../../../../utils/genricError";
import DropDownReactSelect from "../../../../components/dropdown/DropDownReactSelect";
import genderList from "../variables/gender.json";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const General = ({ user }) => {
  console.log("🚀 ~ file: General.jsx:19 ~ General ~ user:", user)
  const [image, setImage] = useState(null);

  const profileformik = useFormik({
    initialValues: user || {
      firstName: "iio",
      lastName: "",
      email: "",
      mobile: "",
      alternateNo: "",
      gender: "",
      dob: "",
      address: "",
      imageUrl: "",
    },
    enableReinitialize: true,
    validationSchema: validateProfileSchema,
    onSubmit: async (values) => {
      console.log("🚀 ~ file: General.jsx:36 ~ onSubmit: ~ values:", values);
      try {
        if (image) {
          const cloudImgUrl = await handleUploadImage(image);
          values.imageUrl = cloudImgUrl;
        }
        const response = await axiosInstance2.post(UPDATE_PROFILE_API, values);
        if ((response.status = 200)) {
          toast.success("Profile updated successfully 🤝");
        }
      } catch (error) {
        genricError(error);
      }
    },
  });

  const handleGenderChange = (option) => {
    profileformik.setFieldValue("gender", option);
  };
  const handleDobChange = (dob) => {
    profileformik.setFieldValue("dob", dob);
  };

  const handleImageUpload = (e) => {
    const uploadedImage = e.target.files[0];
    setImage(uploadedImage);
    // profileformik.setFieldValue("imageUrl", uploadedImage.name);
  };
  console.log(
    "🚀 ~ file: General.jsx:181 ~ General ~ profileformik.values.gender:",
    profileformik.values.gender
  );

  return (
    <div className="mt-2 mb-8 w-full">
      {/* Cards */}
      <form onSubmit={profileformik.handleSubmit}>
        <div className="grid grid-cols-2 gap-4 px-2">
          <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
            <p className="text-sm text-gray-600">First Name</p>
            <TextInput
              extra="w-full"
              variant="auth"
              state={
                profileformik.touched.firstName &&
                profileformik.errors.firstName
                  ? "error"
                  : ""
              }
              placeholder="First Name"
              id="firstName"
              type="text"
              onChange={profileformik.handleChange}
              onBlur={profileformik.handleBlur}
              value={profileformik.values.firstName}
            />
            {profileformik.touched.firstName &&
            profileformik.errors.firstName ? (
              <div>
                <span className="text-red-500 text-xs">
                  {profileformik.errors.firstName}
                </span>
              </div>
            ) : null}
          </div>
          <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
            <p className="text-sm text-gray-600">Last Name</p>
            <TextInput
              extra="w-full"
              variant="auth"
              state={
                profileformik.touched.lastName && profileformik.errors.lastName
                  ? "error"
                  : ""
              }
              placeholder="Last Name"
              id="lastName"
              type="text"
              onChange={profileformik.handleChange}
              onBlur={profileformik.handleBlur}
              value={profileformik.values.lastName}
            />
            {profileformik.touched.lastName && profileformik.errors.lastName ? (
              <div>
                <span className="text-red-500 text-xs">
                  {profileformik.errors.lastName}
                </span>
              </div>
            ) : null}
          </div>
          <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
            <p className="text-sm text-gray-600">Email</p>
            <TextInput
              extra="w-full"
              variant="auth"
              state={
                profileformik.touched.email && profileformik.errors.email
                  ? "error"
                  : ""
              }
              placeholder="Email"
              id="email"
              type="text"
              onChange={profileformik.handleChange}
              onBlur={profileformik.handleBlur}
              value={profileformik.values.email}
            />
            {profileformik.touched.email && profileformik.errors.email ? (
              <div>
                <span className="text-red-500 text-xs">
                  {profileformik.errors.email}
                </span>
              </div>
            ) : null}
          </div>
          <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
            <p className="text-sm text-gray-600">Mobile</p>
            <TextInput
              extra="w-full"
              variant="auth"
              state={
                profileformik.touched.mobile && profileformik.errors.mobile
                  ? "error"
                  : ""
              }
              placeholder="Mobile"
              id="mobile"
              type="number"
              onChange={profileformik.handleChange}
              onBlur={profileformik.handleBlur}
              value={profileformik.values.mobile}
            />
            {profileformik.touched.mobile && profileformik.errors.mobile ? (
              <div>
                <span className="text-red-500 text-xs">
                  {profileformik.errors.mobile}
                </span>
              </div>
            ) : null}
          </div>
          <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
            <p className="text-sm text-gray-600">Gender</p>
            <DropDownReactSelect
              data={genderList}
              ph="Select Gender"
              id="gender"
              isMulti={false}
              onChange={handleGenderChange}
              values={profileformik.values.gender}
            />
            <br />
            <p className="text-sm text-gray-600">Alternate Contact Number</p>
            <TextInput
              extra="w-full"
              variant="auth"
              placeholder="Alternate Contact Number"
              id="alternateNo"
              type="number"
              onChange={profileformik.handleChange}
              onBlur={profileformik.handleBlur}
              value={profileformik.values.alternateNo}
            />
            <br />
            <p className="text-sm text-gray-600">Image</p>
            <FileInput margint={"mt-0 w-full"} onChange={handleImageUpload} />
            <br />
            <p className="text-sm text-gray-600">Address</p>
            <TextField
              extra="w-full"
              variant="auth"
              placeholder="Address"
              id="address"
              type="text"
              rows={4}
              onChange={profileformik.handleChange}
              onBlur={profileformik.handleBlur}
              value={profileformik.values.address}
            />
          </div>
          <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
            <p className="text-sm text-gray-600">DOB</p>
            {/* <MiniCalendar /> */}
            {profileformik?.values?.dob && (
              <Calendar
                onChange={handleDobChange}
                value={profileformik.values.dob}
                maxDate={new Date()}
                tileClassName=""
              />
            )}
          </div>

          {/* <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Image</p>
          <FileInput margint={"mt-0"} />
        </div> */}
        </div>
        <div className=" p-3 ">
          <button
            type="submit"
            className=" bg-green-500 w-full p-4 rounded-lg text-lg font-semibold hover:bg-green-600 shadow-lg text-white">
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default General;
