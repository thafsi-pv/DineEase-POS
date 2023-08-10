import { IoAddCircleOutline } from "react-icons/io5";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { FiCheckCircle } from "react-icons/fi";
import { CgCloseO } from "react-icons/cg";
import React from "react";

const Modal = ({ isOpen, onClose, item }) => {
  console.log("🚀 ~ file: Modal.jsx:7 ~ Modal ~ item:", item);
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-[#00000059] overflow-hidden ">
      <div className="bg-white rounded-3xl shadow-lg flex absolute">
        {/* Modal content */}
        <div className="w-full h-96 rounded-3xl">
          <img
            className="object-fill h-full w-90p rounded-l-3xl"
            src={item.image_url}
            alt=""
          />
        </div>
        <div className="py-6">
          <p>Select required portion</p>
          <div className="w-full">
            <table className="w-full bg-white border  rounded-lg overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2 px-4 border text-left">Portion</th>
                  <th className="py-2 px-4 border text-left">Quantity</th>
                  <th className="py-2 px-4 border text-left">Rate</th>
                  <th className="py-2 px-4 border text-left">Select</th>
                </tr>
              </thead>
              <tbody>
                {item.portions.map((item) => (
                  <tr key={item.id}>
                    <td className="py-2 px-4 border font-semibold">
                      {item.name}
                    </td>
                    <td className="py-2 px-4 border">
                      <div className="flex items-center space-x-2">
                        <AiOutlineMinusCircle className="w-8 h-7" />
                        <input
                          type="number"
                          className="rounded-lg w-20 p-2 font-bold text-lg border text-center"
                        />
                        <IoAddCircleOutline className="w-8 h-7" />
                      </div>
                    </td>
                    <td className="py-2 px-4 border font-semibold">
                      {item.rate}
                    </td>
                    <td className="py-2 px-4 border">
                      <button className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded flex items-center gap-1">
                        <FiCheckCircle />
                        Add
                      </button>
                    </td>
                  </tr>
                ))}
                {/* Add more rows as needed */}
              </tbody>
            </table>
          </div>
          {/* <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={onClose}>
            Close
          </button> */}
        </div>
        <div className="relative -top-2 -right-2 h-fit bg-white p-1 rounded-full shadow-lg">
          <a href="#" onClick={onClose}>
            <CgCloseO className="h-5 w-5 text-gray-800"/>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Modal;
