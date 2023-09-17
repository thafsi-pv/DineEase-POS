import { IoAddCircleOutline } from "react-icons/io5";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { FiCheckCircle } from "react-icons/fi";
import { IoIosCloseCircleOutline } from "react-icons/io";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

const Modal = ({ isOpen, onClose, item, selectedItemListRef }) => {
  console.log("🚀 ~ file: Modal.jsx:7 ~ Modal ~ item:", item);
  const [quantity, setQuantity] = useState(1);
  if (!isOpen) return null;

  const dispath = useDispatch();

  const handleAddItem = (i) => {
    const obj = {
      itemName: item.itemName,
      portion: i.itemName,
      quantity: quantity,
      unitRate: i.price,
      totalRate: quantity * i.price,
    };
    dispath(addToCart(obj));
    toast.success("Item added to list 👍🏻");
    if (selectedItemListRef && selectedItemListRef.current) {
      selectedItemListRef.current.scrollTo({
        top: selectedItemListRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
    onClose();
  };

  const handleQuantity = (val) => {
    setQuantity((prev) => prev + val);
  };
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
      <div className=" fixed inset-0 flex items-center justify-center z-50 bg-[#00000059] overflow-hidden ">
        <motion.div
          initial="hidden"
          animate="visible"
          transition={modalTransition}
          exit="hidden"
          variants={modalVariants}
          className="bg-white dark:!bg-navy-900 dark:text-white rounded-3xl shadow-xl flex absolute">
          {/* Modal content */}
          <div className="w-full h-96 rounded-3xl">
            <img
              className="object-cover h-full w-full max-w-md rounded-l-3xl"
              src={item.imageUrl}
              alt=""
            />
            <div className="relative bottom-[72px] rounded-bl-3xl text-white w-full text-center bg-gradient-to-t  from-[#000000c8]">
              <p className="relative p-5 text-2xl font-bold">{item.itemName}</p>
            </div>
          </div>
          <div className="p-6">
            <p>Select required portion</p>
            <div className="w-full">
              <table className="w-full bg-gray-50 dark:!bg-navy-700 border  rounded-lg overflow-hidden">
                <thead className="bg-gray-200 dark:!bg-gray-700">
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
                        {item.portionName}
                      </td>
                      <td className="py-2 px-4 border">
                        <div className="flex items-center space-x-2">
                          <AiOutlineMinusCircle
                            className="w-8 h-7"
                            onClick={() => handleQuantity(-1)}
                          />
                          <input
                            type="number"
                            className="rounded-lg w-20 p-2 font-bold text-lg border text-center"
                            value={quantity}
                          />
                          <IoAddCircleOutline
                            className="w-8 h-7"
                            onClick={() => handleQuantity(1)}
                          />
                        </div>
                      </td>
                      <td className="py-2 px-4 border font-semibold">
                        {item.price}
                      </td>
                      <td className="py-2 px-4 border">
                        <button
                          className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded flex items-center gap-1"
                          onClick={() => handleAddItem(item)}>
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
          <div className="relative -top-2 -right-2 h-fit bg-white rounded-full shadow-lg">
            <a href="#" onClick={onClose}>
              <IoIosCloseCircleOutline className="h-7 w-7 text-gray-800" />
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default Modal;
