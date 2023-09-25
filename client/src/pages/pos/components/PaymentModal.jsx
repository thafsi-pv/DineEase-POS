import React, { useState } from "react";
import Card from "../../../components/card";
import { FaRupeeSign } from "react-icons/fa";
import { BsFillCreditCardFill } from "react-icons/bs";
import usePayment from "../../../hooks/usePayment";
import FormModal from "../../../components/modal/FormModal";
import InputField from "../../../components/fields/InputField";
import InvoicePrint1 from "../printFormats/InvoicePrint1";
import { motion } from "framer-motion";

function PaymentModal({ handlePrint, showModal, onClose, subTotalVal }) {
  const { paymentProcess } = usePayment(handlePrint);
  const [paymentMode, setPaymentMode] = useState(0);
  const [cashBtnTxt, setCashBtnTxt] = useState("Cash");

  const handleCashPayment = () => {
    setPaymentMode(1);
    setCashBtnTxt(`Pay ${subTotalVal}`);
  };

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <FormModal
      isOpen={showModal}
      modalWidth="730px"
      onClose={onClose}
      bg={"bg-gradient-to-r from-white to-green-500"}>
      <div className="flex justify-between h-full bg-none">
        <div className="h-full w-1/2">
          <InvoicePrint1 showSummary={false} />
        </div>
        <div className="pl-2 h-full  border-l w-1/2">
          <div className="mx-10">
            <div className="mb-5">
              <div className="flex justify-between space-x-3 px-2 py-1 items-center ">
                <p className="font-semibold text-xs text-gray-800">Customer</p>{" "}
                <span className="font-semibold text-sm text-gray-800">
                  Walk in customer
                </span>
              </div>
              <div className="flex justify-between space-x-3 px-2 py-1  ">
                <p className="font-semibold text-xs text-gray-800">
                Items
                </p>
                <span className="font-semibold text-sm text-gray-800">15</span>
              </div>
            </div>
            <div className="flex flex-col border rounded-lg mb-3 ">
              <div className="flex justify-between space-x-3 px-2 py-1  ">
                <p className="font-semibold text-xs text-gray-800">Sub Total</p>{" "}
                <span className="font-semibold text-sm text-gray-800">
                  {subTotalVal}
                </span>
              </div>
              <div className="flex justify-between space-x-3 px-2 py-1  ">
                <p className="font-semibold text-xs text-gray-800">Total Tax</p>{" "}
                <span className="font-semibold text-sm text-gray-800">
                  12.50
                </span>
              </div>
              <div className="flex justify-between space-x-3 px-2 py-1">
                <p className="font-semibold text-xs text-gray-800">Discount</p>{" "}
                <span className="font-semibold text-sm text-gray-800">
                  00.00
                </span>
              </div>
              <hr />
              <div className="flex justify-between space-x-3 bg-gray-900 bg-opacity-20 px-2 rounded-b-lg">
                <p className="text-lg font-semibold text-white">To Pay</p>
                <span className="text-lg font-semibold text-white">
                  {subTotalVal}
                </span>
              </div>
            </div>
            {paymentMode == 1 && (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeInVariants}
                transition={{ duration: 1 }} // Adjust the duration as needed
              >
                <div>
                  <div>
                    <InputField label="Cash" placeholder="Enter Amount" />
                  </div>
                  <div className="my-4">
                    <span className="text-base font-semibold">
                      Change:10.00
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
          <div className="flex justify-center w-full gap-2 pt-3 border-t border-green-500">
            <div className="flex-1">
              <button
                onClick={handleCashPayment}
                className="bg-[#068e77] hover:bg-[#068e77c9] text-white font-bold py-4 px-4 rounded-full w-full flex justify-center items-center gap-2">
                <FaRupeeSign />
                {cashBtnTxt}
                <p className="text-xs text-gray-300">Ctrl+c</p>
              </button>
            </div>
            {paymentMode !== 1 && (
              <div className="flex-1">
                <button
                  className="bg-[#068e77e5] hover:bg-[#068e77] text-white font-bold py-4 px-4 rounded-full w-full flex justify-center items-center gap-2"
                  onClick={() => paymentProcess(subTotalVal)}>
                  <BsFillCreditCardFill /> <p>Card</p>
                  <p className="text-xs text-gray-300">Ctrl+b</p>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </FormModal>
  );
}

export default PaymentModal;
