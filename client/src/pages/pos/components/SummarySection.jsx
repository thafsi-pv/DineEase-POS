import React, { useState } from "react";
import Card from "../../../components/card";
import { BsFillCreditCardFill } from "react-icons/bs";
import PaymentModal from "./PaymentModal";
import FormModal from "../../../components/modal/FormModal";
import { toast } from "react-hot-toast";

function SummarySection({ subTotalVal, handlePrint }) {
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleStartPayment = () => {
    if (subTotalVal > 0) {
      setShowModal(true);
    } else {
      toast.error("Cart is empty.😒");
    }
  };

  return (
    <div>
      <Card extra={"w-full h-full sm:overflow-auto p-6 pt-2"}>
        <header className="relative flex items-center justify-between pt-4">
          <div className="text-xl font-bold text-navy-700 dark:text-white w-full text-right">
            <table className="w-full p-3 pb-3">
              <tr className="text-sm">
                <td>
                  <p>Discount:</p>
                </td>
                <td>00.00</td>
              </tr>
              <tr className="text-sm">
                <td>
                  <p>Total Tax:</p>
                </td>
                <td>12.50</td>
              </tr>
              <tfoot className="border-t">
                <tr>
                  <td>To Pay:</td>
                  <td>{subTotalVal}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </header>
        <div className="flex justify-center w-full gap-2 pt-3">
          <div className="flex-1">
            <button
              className="bg-[#068e77e5] hover:bg-[#068e77] text-white font-bold py-3 px-4 rounded-full w-full flex justify-center items-center gap-2"
              onClick={handleStartPayment}>
              <BsFillCreditCardFill /> <p className="text-lg">Pay</p>
              <p className="text-xs text-gray-300">Ctrl+b</p>
            </button>
          </div>
        </div>
      </Card>
      <PaymentModal
        handlePrint={handlePrint}
        showModal={showModal}
        onClose={handleCloseModal}
        subTotalVal={subTotalVal}
      />
    </div>
  );
}

export default SummarySection;
