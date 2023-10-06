import Card from "../../../../components/card";
import React, { useState } from "react";
import FileInput from "../../../../components/fileInput";
import TextInput from "../../../../components/fields/InputField";
import TextField from "../../../../components/fields/TextField";
import { useFormik } from "formik";
import MiniCalendar from "../../../../components/calendar/MiniCalendar";
import { validateProfile } from "../../../../utils/validate";
import Calendar from "react-calendar";

const General = () => {
  const [value, onChange] = useState(new Date());
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      alternateNo: "",
      dob: "",
      address: false,
      imageUrl: "",
    },
    validateProfile,
    onSubmit: async (values) => {
      try {
        const response = await axiosInstance2.post(SIGN_UP_API, values);
        if ((response.status = 200)) {
          toast.success("Successfully registered, SignIn now 🤝");
          navigate("/auth/sign-in");
        }
      } catch (error) {
        genricError(error);
      }
    },
  });
  return (
    <div className="mt-2 mb-8 w-full">
      {/* Cards */}
      <div className="grid grid-cols-2 gap-4 px-2">
        <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">First Name</p>
          <TextInput
            extra="w-full"
            variant="auth"
            state={
              formik.touched.firstName && formik.errors.firstName ? "error" : ""
            }
            placeholder="First Name"
            id="firstName"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.firstName}
          />
        </div>
        <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Last Name</p>
          <TextInput
            extra="w-full"
            variant="auth"
            state={
              formik.touched.lastName && formik.errors.lastName ? "error" : ""
            }
            placeholder="Last Name"
            id="lastName"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.lastName}
          />
        </div>
        <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Email</p>
          <TextInput
            extra="w-full"
            variant="auth"
            state={formik.touched.email && formik.errors.email ? "error" : ""}
            placeholder="First Name"
            id="email"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
        </div>
        <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Mobile</p>
          <TextInput
            extra="w-full"
            variant="auth"
            state={formik.touched.mobile && formik.errors.mobile ? "error" : ""}
            placeholder="Mobile"
            id="mobile"
            type="number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.mobile}
          />
        </div>
        <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Alternate Contact Number</p>
          <TextInput
            extra="w-full"
            variant="auth"
            state={
              formik.touched.alternateNo && formik.errors.alternateNo
                ? "error"
                : ""
            }
            placeholder="Alternate Contact Number"
            id="alternateNo"
            type="number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.alternateNo}
          />
          <br />
          <p className="text-sm text-gray-600">Image</p>
          <FileInput margint={"mt-0 w-full"} />
          <br />
          <p className="text-sm text-gray-600">Address</p>
          <TextField
            extra="w-full"
            variant="auth"
            state={
              formik.touched.address && formik.errors.address ? "error" : ""
            }
            placeholder="Address"
            id="address"
            type="text"
            rows={5}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.address}
          />
        </div>
        <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">DOB</p>
          <MiniCalendar />
          {/* <Calendar onChange={onChange} value={value} /> */}
        </div>

        {/* <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Image</p>
          <FileInput margint={"mt-0"} />
        </div> */}
      </div>
      <div className=" p-3 ">
        <button className=" bg-green-500 w-full p-4 rounded-lg text-lg font-semibold hover:bg-green-600 shadow-lg text-white">
          Save
        </button>
      </div>
    </div>
  );
};

export default General;
