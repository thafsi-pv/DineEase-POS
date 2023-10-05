import React, { useEffect, useState } from "react";
import SignIn from "../auth/SignIn";
import LockWindow from "./components/LockWindow";
import axiosInstance from "../../utils/axiosInterceptor";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-hot-toast";

const LockScreen = ({ children }) => {
  // State to keep track of whether the screen should be locked
  const [isLocked, setIsLocked] = useState(false);
  console.log("🚀 ~ file: LockScreen.jsx:6 ~ LockScreen ~ isLocked:", isLocked);

  useEffect(() => {
    let inactivityTimer;

    // Event listener to detect user activity
    const handleUserActivity = () => {
      clearTimeout(inactivityTimer);
      //verifyUser();
      //setIsLocked(false);
      // Set the timer again after user activity

      inactivityTimer = setTimeout(() => {
        setIsLocked(true);
      }, 2000); // 1 minute in milliseconds
    };

    // Add event listeners on component mount
    document.addEventListener("mousemove", handleUserActivity);
    document.addEventListener("mousedown", handleUserActivity);
    document.addEventListener("keydown", handleUserActivity);
    document.addEventListener("touchstart", handleUserActivity);

    // Start the initial timer
    inactivityTimer = setTimeout(() => {
      setIsLocked(true);
    }, 2000); // 1 minute in milliseconds

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
      // alert(JSON.stringify(values, null, 2));
      //setIsLocked(false);
      verifyUser(values);
      resetForm();
    },
  });

  const verifyUser = async (values) => {
    try {
      const data = { password: values.password };
      const response = await axiosInstance.post("/auth/unlock", data);
      console.log(
        "🚀 ~ file: LockScreen.jsx:28 ~ verifyUser ~ response:",
        response
      );
      if (response.status == 200) {
        setIsLocked(false);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div>
      {isLocked ? (
        <LockWindow formik={formik} />
      ) : (
        // Render your main content here
        <> {children}</>
      )}
    </div>
  );
};

export default LockScreen;
