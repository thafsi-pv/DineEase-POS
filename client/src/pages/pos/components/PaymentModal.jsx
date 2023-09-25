import React from "react";
import Card from "../../../components/card";
import { FaRupeeSign } from "react-icons/fa";
import { BsFillCreditCardFill } from "react-icons/bs";
import usePayment from "../../../hooks/usePayment";
import FormModal from "../../../components/modal/FormModal";

function PaymentModal({ handlePrint, showModal, onClose }) {
  const { paymentProcess } = usePayment(handlePrint);
  return (
    <FormModal isOpen={showModal} modalWidth="530px" onClose={onClose}>
      <Card>
        <div className="flex flex-col justify-center w-2/3">
          <div className="flex justify-between space-x-3">
            <p>Customer Name</p> <span>Walk in customer</span>
          </div>
          <div className="flex justify-between space-x-3">
            <p>Customer Name</p> <span>Walk in customer</span>
          </div>
        </div>
        <div className="flex justify-center w-full gap-2 pt-3">
          <div className="flex-1">
            <button
              onClick={handlePrint}
              className="bg-[#068e77] hover:bg-[#068e77c9] text-white font-bold py-4 px-4 rounded-full w-full flex justify-center items-center gap-2">
              <FaRupeeSign />
              Cash
              <p className="text-xs text-gray-300">Ctrl+c</p>
            </button>
          </div>
          <div className="flex-1">
            <button
              className="bg-[#068e77e5] hover:bg-[#068e77] text-white font-bold py-4 px-4 rounded-full w-full flex justify-center items-center gap-2"
              onClick={() => paymentProcess(subTotalVal)}>
              <BsFillCreditCardFill /> <p>Card</p>
              <p className="text-xs text-gray-300">Ctrl+b</p>
            </button>
          </div>
        </div>
      </Card>
    </FormModal>
  );
}

export default PaymentModal;
