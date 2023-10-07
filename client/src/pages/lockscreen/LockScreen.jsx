import React, { useEffect, useState } from "react";
import SignIn from "../auth/SignIn";
import LockWindow from "./components/LockWindow";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-hot-toast";
import axiosInstance2 from "../../utils/axiosInterceptor2";

const LockScreen = ({ children }) => {
  const [isLocked, setIsLocked] = useState(false);
  useEffect(() => {
    let inactivityTimer;
    const handleUserActivity = () => {
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => {
        setIsLocked(true);
      }, 120000);
    };

    // Add event listeners on component mount
    document.addEventListener("mousemove", handleUserActivity);
    document.addEventListener("mousedown", handleUserActivity);
    document.addEventListener("keydown", handleUserActivity);
    document.addEventListener("touchstart", handleUserActivity);

    // Start the initial timer
    inactivityTimer = setTimeout(() => {
      setIsLocked(true);
    }, 120000);

    // Clean up event listeners on component unmount
    return () => {
      document.removeEventListener("mousemove", handleUserActivity);
      document.removeEventListener("mousedown", handleUserActivity);
      document.removeEventListener("keydown", handleUserActivity);
      document.removeEventListener("touchstart", handleUserActivity);
      clearTimeout(inactivityTimer);
    };
  }, []);

  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(8, "Must be 8 characters or more")
        .required("Required"),
    }),
    onSubmit: (values, { resetForm }) => {
      verifyUser(values);
      resetForm();
    },
  });

  const verifyUser = async (values) => {
    try {
      const data = { password: values.password };
      const response = await axiosInstance2.post("/auth/unlock", data);
      if (response.status == 200) {
        setIsLocked(false);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div>{isLocked ? <LockWindow formik={formik} /> : <> {children}</>}</div>
  );
};

export default LockScreen;
