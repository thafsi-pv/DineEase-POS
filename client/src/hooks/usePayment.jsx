import React, { useState } from "react";
import { loadScript } from "../utils/utils";
import { toast } from "react-hot-toast";
import axios from "axios";

function usePayment(callback) {
  const [payAmount, setPayAmount] = useState();

  const paymentProcess = async (payableAmount) => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      toast.error("Razorpay SDK failed to load. Are you online?");
      return;
    }
    // const res = await handlePayment(subtot);
    if (payableAmount == 0) {
      return toast.error("Total payable amount is 0");
    }

    const initPayment = (data) => {
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: data.amount,
        currency: data.currency,
        name: data.name,
        description: "Test Transaction",
        image:
          "https://images-na.ssl-images-amazon.com/images/I/817tHNcyAgL.jpg",
        order_id: data.id,
        handler: async (response) => {
          try {
            const verifyUrl = "http://localhost:8080/api/payment/verify";
            const { data } = await axios.post(verifyUrl, response);
            console.log("verify", data);
            callback();
            toast.success("payment completed Successfully ✅");
          } catch (error) {
            console.log(error);
          }
        },
        theme: {
          color: "#3399cc",
        },
      };
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    };

    const handlePayment = async () => {
      try {
        const orderUrl = "http://localhost:8080/api/payment/orders";
        const { data } = await axios.post(orderUrl, { amount: payableAmount });
        data.data.name = "DineEase POS";
        const res = await initPayment(data.data);
        return res;
      } catch (error) {
        console.log(error);
        throw error; // Rethrow the error to propagate it further
      }
    };
    handlePayment();
  };

  return { paymentProcess };
}

export default usePayment;