import React, { useEffect, useState } from "react";
import SignIn from "../auth/SignIn";
import LockWindow from "./components/LockWindow";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-hot-toast";
import axiosInstance2 from "../../utils/axiosInterceptor2";
import { useDispatch, useSelector } from "react-redux";
import useReduxPersistant from "../../hooks/useReduxPersistant";

const LockScreen = ({ children }) => {
  const { updateField, getField, getAllField } = useReduxPersistant();
  const dispatch = useDispatch();
  //const persistentData = useSelector((store) => store.persistent);
  const persistentData = getAllField();
  console.log(
    "🚀 ~ file: LockScreen.jsx:16 ~ LockScreen ~ persistentData:",
    persistentData
  );
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    let inactivityTimer;
    const handleUserActivity = () => {
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => {
        //setIsLocked(true);
        //dispatch(setField({ field: "isLocked", value: true }));
        updateField("isLocked", true);
      }, 120000);
    };

    // Add event listeners on component mount
    document.addEventListener("mousemove", handleUserActivity);
    document.addEventListener("mousedown", handleUserActivity);
    document.addEventListener("keydown", handleUserActivity);
    document.addEventListener("touchstart", handleUserActivity);

    // Start the initial timer
    inactivityTimer = setTimeout(() => {
      //setIsLocked(true);
      //dispatch(setField({ field: "isLocked", value: true }));
      updateField("isLocked", true);
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
        //setIsLocked(false);
        //dispatch(setField({ field: "isLocked", value: false }));
        updateField("isLocked", false);
      }
    } catch (error) {
      console.log("🚀 ~ file: LockScreen.jsx:72 ~ verifyUser ~ error:", error);
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div>
      {persistentData.isLocked ? (
        <LockWindow formik={formik} persistentData={persistentData} />
      ) : (
        <> {children}</>
      )}
    </div>
  );
};

export default LockScreen;
