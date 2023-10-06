import React, { useRef } from "react";
import InputField from "../../../components/fields/InputField";
import image from "../../../assets/img/auth/lockScreen2.jpg";
import profile from "../../../assets/img/avatars/avatar8.png";
import { motion } from "framer-motion";
import { CiUnlock } from "react-icons/ci";

function LockWindow({ formik }) {
  const passwordRef = useRef(null);

  return (
    <motion.div
      className="flex flex-col h-screen w-screen bg-black bg-opacity-50"
      initial={{ opacity: 0, y: "-100%" }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: "-100%" }}
      transition={{ duration: 1 }}>
      <div className="">
        <div className="flex h-screen w-full flex-1">
          {/* <img src={image} alt="" className="bg-contain w-full" /> */}
          <div className="relative w-full aspect-w-16 aspect-h-9">
            <img src={image} alt="" className="object-cover w-full h-full" />
          </div>
          <div className="absolute flex flex-col h-screen w-full flex-1 justify-center items-center bg-[#000000d1] bg-opacity-25 ">
            <div className="mb-7 absolute top-10 left-10">
              <div className="flex flex-col leading-4">
                <div className="mt-1 ml-1 font-poppins text-[30px] font-bold uppercase text-gray-300 dark:text-white">
                  Dine<span className="text-green-600">Ease</span>
                </div>
                <p className="text-gray-700 p-0 w-ful text-right text-[12px]">
                  POS
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2 text-white mb-3">
              <img src={profile} className="w-32 h-32  rounded-full" alt="" />
              <p className="font-semibold text-xl">User Name</p>
            </div>
            <form action="" onSubmit={formik.handleSubmit} className="w-full">
              <div className="m-auto flex flex-col justify-center items-center gap-2">
                <div className="sm:50p md:w-30p flex flex-col gap-2 justify-center ">
                  <InputField
                    ref={passwordRef}
                    extra="w-full animate-pulse text-xl flex-1 text-white"
                    placeholder="Enter Password to unlock"
                    type="password"
                    variant="auth"
                    id="password"
                    state={
                      formik.touched.password && formik.errors.password
                        ? "error"
                        : ""
                    }
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                  />
                  <button
                    type="submit"
                    class=" text-center bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4
                     focus:outline-none focus:ring-green-300  shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80
                      text-gray-900 bg-green-200 hover:bg-gray-100 w-full   font-medium rounded-lg text-sm px-2 py-2 inline-flex 
                     justify-center items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 mr-2 mb-2">
                    <CiUnlock className="h-6 w-8 hover:text-green-200" />
                    Unlock
                  </button>
                </div>
                {/* {formik.touched.password && formik.errors.password ? (
                  <div className="text-red-400">{formik.errors.password}</div>
                ) : null} */}
              </div>
            </form>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default LockWindow;
