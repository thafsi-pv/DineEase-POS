import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoIosCloseCircleOutline } from "react-icons/io";

function FormModal({ isOpen, onClose, children, modalWidth,bg='bg-white' }) {
  const modalVariants = {
    hidden: { opacity: 0, y: "-100%" }, // Slide down and fade out
    visible: { opacity: 1, y: "0%" }, // Slide up and fade in
  };
  const modalTransition = {
    duration: 0.5, // Adjust the duration (in seconds) to control speed
    ease: "easeInOut", // Adjust the easing function
  };
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-[#00000059] overflow-hidden">
          <motion.div
            initial="hidden"
            animate="visible"
            transition={modalTransition}
            exit="hidden"
            variants={modalVariants}>
            <div className="inset-0 bg-black opacity-50"></div>
            <div
              className={`relative z-10 ${bg} p-6 rounded-3xl shadow-md`}
              style={{ width: modalWidth }}>
              <div className="flex justify-end">
                <div className="relative -top-8 -right-8 h-fit bg-white rounded-full shadow-lg">
                  <a href="#" onClick={onClose}>
                    <IoIosCloseCircleOutline className="h-7 w-7 text-gray-600 hover:text-gray-800" />
                  </a>
                </div>
              </div>
              <div className={`mt-4 max-h-[80vh] overflow-y-auto `}>
                {children}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default FormModal;
