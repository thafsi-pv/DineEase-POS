import React, { useEffect, useState } from "react";
import Card from "../../../components/card";
import { FaRupeeSign } from "react-icons/fa";
import { BsFillCreditCardFill } from "react-icons/bs";
import usePayment from "../../../hooks/usePayment";
import FormModal from "../../../components/modal/FormModal";
import InputField from "../../../components/fields/InputField";
import InvoicePrint1 from "../printFormats/InvoicePrint1";
import { AnimatePresence, motion } from "framer-motion";
import { BiArrowBack } from "react-icons/bi";
import { useFormik } from "formik";
import axios from "axios";
import {
  ORDER_CREATE_API,
  REWARD_POINT_BYCUSTOMER_ID_API,
} from "../../../utils/const";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";

var change = "";
function PaymentModal({
  handlePrint,
  showModal,
  onClose,
  subTotalVal,
  selectedCustomer,
  setOrderDetails,
}) {
  console.log(
    "🚀 ~ file: PaymentModal.jsx:29 ~ selectedCustomer:",
    selectedCustomer
  );
  const cartItems = useSelector((store) => store.cart);
  console.log("🚀 ~ file: PaymentModal.jsx:25 ~ cartItems:", cartItems);
  const { paymentProcess, paymentId } = usePayment(handlePrint);
  const [paymentMode, setPaymentMode] = useState(0);
  const [cashBtnTxt, setCashBtnTxt] = useState("Cash");
  const [customerRewardPoint, setCustomerRewardPoint] = useState();

  useEffect(() => {
    getCustomerLoyaltyPoints();
  }, [showModal]);

  useEffect(() => {
    if (paymentId) {
      createPayment();
    }
  }, [paymentId]);

  const getCustomerLoyaltyPoints = async () => {
    const response = await axios.get(
      REWARD_POINT_BYCUSTOMER_ID_API + "?customerId=" + selectedCustomer.value
    );
    console.log(
      "🚀 ~ file: PaymentModal.jsx:47 ~ getCustomerLoyaltyPoints ~ response:",
      response
    );
    setCustomerRewardPoint(response?.data[0].totalPoints);
  };

  const handleCashPayment = () => {
    setPaymentMode(1);
    setCashBtnTxt(`Pay ${subTotalVal}`);
  };

  const handleBack = () => {
    setPaymentMode(0);
    setCashBtnTxt(`Cash`);
  };

  const validate = (values) => {
    const errors = {};

    if (
      parseFloat(values.amount) < subTotalVal ||
      values.amount == "" ||
      values.amount == null
    ) {
      errors.amount = "Must be greater than or equal to subtotal";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      amount: null,
    },
    validate,
    onSubmit: (values, { resetForm }) => {
      // alert(JSON.stringify(values, null, 2));
      createPayment(values);
      resetForm();
    },
  });

  const createPayment = async () => {
    const productList = cartItems?.cart.map((item) => {
      return {
        product: item.id,
        portion: item.portion,
        quantity: item.quantity,
        price: item.totalRate,
      };
    });
    const currentDateTime = new Date();
    const pay = {
      customer: selectedCustomer.value,
      items: productList,
      totalAmount: subTotalVal,
      totalTax: 12.4,
      paymentType: paymentMode.toString(),
      transactionId: paymentId,
      orderDate: currentDateTime.toLocaleString(),
      status: "Completed",
    };
    const response = await axios.post(ORDER_CREATE_API, pay);
    if (response.status == 200) {
      setOrderDetails(() => ({
        orderNumber: response?.data?.orderNumber,
        rewardPoints: response?.data?.loyaltyPoint,
        totalPoints: response?.data?.totalPoint,
      }));
      // handlePrint();
      toast.success("Order Created Successfully ✌🏻");
      handleCloseModal();
    }
  };

  const handleAmountChange = (e) => {
    change = e.target.value - subTotalVal;
    formik.handleChange(e);
  };

  const totalItems = () => {
    return cartItems.cart.reduce((acc, item) => acc + item.quantity, 0);
  };
  // const subTotal = () => {
  //   return Math.round(
  //     cartItems.cart.reduce(
  //       (acc, item) => acc + item.unitRate * item.quantity,
  //       0
  //     )
  //   ).toFixed(2);
  // };

  const handleCloseModal = () => {
    onClose();
    handleBack();
  };

  return (
    <FormModal
      isOpen={showModal}
      modalWidth="730px"
      onClose={handleCloseModal}
      bg={"bg-gradient-to-r from-white to-green-500"}>
      <div className="flex justify-between min-h-[300px] bg-none overflow-x-hidden">
        <div className="h-full w-1/2">
          {paymentMode != 0 && (
            <BiArrowBack
              className="h-5 w-5 cursor-pointer hover:text-green-500"
              onClick={handleBack}
            />
          )}
          <InvoicePrint1 showSummary={false} />
        </div>
        <div className="pl-2 h-full  border-l w-1/2">
          <div className="mx-10">
            <div className="mb-5">
              <div className="flex justify-between space-x-3 px-2 py-1 items-center ">
                <p className="font-semibold text-xs text-gray-800">Customer</p>{" "}
                <span className="font-semibold text-sm text-gray-800">
                  {selectedCustomer?.label}
                </span>
              </div>
              <div className="flex justify-between space-x-3 px-2 py-1  ">
                <p className="font-semibold text-xs text-gray-800">Items</p>
                <span className="font-semibold text-sm text-gray-800">
                  {totalItems()}
                </span>
              </div>
            </div>
            <div className="flex flex-col border rounded-lg mb-3 ">
              <div className="flex justify-between space-x-3 px-2 py-1  ">
                <p className="font-semibold text-xs text-gray-800">Sub Total</p>
                <span className="font-semibold text-sm text-gray-800">
                  {subTotalVal}
                </span>
              </div>
              <div className="flex justify-between space-x-3 px-2 py-1  ">
                <p className="font-semibold text-xs text-gray-800">Total Tax</p>
                <span className="font-semibold text-sm text-gray-800">
                  12.50
                </span>
              </div>
              <div className="flex justify-between space-x-3 px-2 py-1">
                <p className="font-semibold text-xs text-gray-800">Discount</p>
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
            <AnimatePresence>
              {paymentMode == 1 && (
                <motion.div
                  key="animation-div"
                  initial={{ x: "100%" }} // Starting position (right side)
                  animate={{ x: 0 }} // Ending position (center of the screen)
                  exit={{ x: "116%" }} // Exit animation (back to the right side)
                  transition={{ type: "spring", stiffness: 120, damping: 20 }}
                  className="overflow-none" // Animation settings
                >
                  <form onSubmit={formik.handleSubmit}>
                    <div>
                      <InputField
                        min={0}
                        type="number"
                        label="Cash"
                        id="amount"
                        state={
                          formik.touched.amount && formik.errors.amount
                            ? "error"
                            : null
                        }
                        onChange={handleAmountChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.amount}
                        placeholder="Enter Amount"
                      />
                    </div>
                    {formik.touched.amount && formik.errors.amount ? (
                      <div className="font-thin float-right text-xs text-red-500">
                        {formik.errors.amount}
                      </div>
                    ) : null}
                    <div className="flex justify-start space-x-3 px-2 my-4 items-center ">
                      <p className="font-semibold text-lg text-black">
                        Change:
                      </p>
                      <span className="font-semibold text-lg text-black">
                        {change}
                      </span>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
            {paymentMode == 0 && !selectedCustomer?.isDefault && (
              <div className="flex flex-col mt-4 font-semibold text-xs text-gray-800 gap-2 bg-green-300 p-2 rounded-md">
                <div className="flex justify-between items-center">
                  <span>DE Reward</span>
                  <span>{customerRewardPoint}</span>
                  <button
                    className="btn bg-green-400 p-2 rounded-md shadow-md hover:bg-green-200"
                    type="button ">
                    Redeem
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="flex justify-center w-full gap-2 mt-10 pt-3 border-t border-green-500">
            <div className="flex-1 mb-2">
              <button
                type="submit"
                onClick={
                  paymentMode == 0 ? handleCashPayment : formik.handleSubmit
                }
                className="shadow-md bg-[#068e77] hover:bg-[#068e77c9] text-white font-bold py-4 px-4 rounded-full w-full flex justify-center items-center gap-2">
                <FaRupeeSign />
                {cashBtnTxt}
                <p className="text-xs text-gray-300">Ctrl+c</p>
              </button>
            </div>
            {paymentMode !== 1 && (
              <div className="flex-1">
                <button
                  className="shadow-md bg-[#068e77e5] hover:bg-[#068e77] text-white font-bold py-4 px-4 rounded-full w-full flex justify-center items-center gap-2"
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
