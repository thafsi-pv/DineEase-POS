import React from "react";
import InputField from "../../../components/fields/InputField";
import image from "../../../assets/img/auth/9122407.jpg";
import { motion } from "framer-motion";
import { CiUnlock } from "react-icons/ci";

function LockWindow({ formik }) {
  return (
    <motion.div
      className="flex flex-col h-screen w-screen"
      initial={{ opacity: 0, y: "-100%" }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: "-100%" }}
      transition={{ duration: 1 }}>
      <div className="">
        <div className="flex h-screen w-full flex-1">
          <img src={image} alt="" />
          <div className="absolute flex flex-col h-screen w-full flex-1 justify-center items-center bg-[#000000d1] bg-opacity-25 ">
            <div className="mb-7">
              <div className="flex flex-col leading-6">
                <div className="mt-1 ml-1 font-poppins text-[46px] font-bold uppercase text-gray-300 dark:text-white">
                  Dine<span className="text-green-600">Ease</span>
                </div>
                <p className="text-gray-700 p-0 w-ful text-right text-[20px]">
                  POS
                </p>
              </div>
            </div>

            <form action="" onSubmit={formik.handleSubmit} className="w-full">
              <div className="m-auto flex flex-col justify-center items-center gap-2">
                <div className="w-30p flex gap-2 justify-center ">
                  <InputField
                    extra="w-40p animate-pulse text-xl flex-1"
                    placeholder="Enter Password to unlock screen"
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
                    className="text-white border rounded-full p-2 hover:bg-green-700">
                    <CiUnlock className="h-8 w-8 hover:text-green-200" />
                  </button>
                </div>
                {formik.touched.password && formik.errors.password ? (
                  <div className="text-red-400">{formik.errors.password}</div>
                ) : null}
              </div>
            </form>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default LockWindow;
