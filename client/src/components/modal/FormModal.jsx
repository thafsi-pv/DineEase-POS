import React, { useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";

function FormModal({ isOpen, onClose, children }) {
  // Function to close the modal
  //   const closeModal = () => {
  //     setIsModalOpen(false);
  //     onClose();
  //   };

  return (
    <>
      {isOpen && (
        <div className=" fixed inset-0 flex items-center justify-center z-50 bg-[#00000059] overflow-hidden ">
          <div className=" inset-0 bg-black opacity-50"></div>
          <div className="relative z-10 bg-white p-6 rounded-3xl shadow-md">
            <div className="flex justify-end">
              <div className="relative -top-8 -right-8 h-fit bg-white rounded-full shadow-lg">
                <a href="#" onClick={onClose}>
                  <IoIosCloseCircleOutline className="h-7 w-7 text-gray-600 hover:text-gray-800" />
                </a>
              </div>
            </div>
            <div className="mt-4">{children}</div>
          </div>
        </div>
      )}
    </>
  );
}

export default FormModal;
