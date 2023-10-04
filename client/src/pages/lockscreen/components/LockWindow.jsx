import React from "react";
import InputField from "../../../components/fields/InputField";
import image from "../../../assets/img/auth/2252808.jpg";
import { motion } from "framer-motion";

function LockWindow() {
  return (
    <motion.div
      className="flex flex-col h-screen w-screen"
      initial={{ opacity: 0, y: "-100%" }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: "-100%" }}
      transition={{ duration: 1 }}>
      <div className="flex items-center justify-center absolute top-20 left-72"></div>
      <div className="flex">
        <div className="flex flex-col h-screen w-full flex-1 justify-center items-center bg-gradient-to-r from-green-200 to-[#6163e6]">
          <div>
            <div className="flex flex-col leading-6">
              <div className="mt-1 ml-1 font-poppins text-[46px] font-bold uppercase text-navy-700 dark:text-white">
                Dine<span className="text-green-600">Ease</span>
              </div>
              <p className="text-gray-700 p-0 w-ful text-right text-[20px]">
                POS
              </p>
            </div>
          </div>
          <InputField
            extra="w-1/2 animate-pulse"
            placeholder="Enter Password to unlock screen"
          />
        </div>
        <div className="flex h-screen w-full flex-1">
          <img src={image} alt="" srcset="" />
        </div>
      </div>
    </motion.div>
  );
}

export default LockWindow;
