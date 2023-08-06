import axios from "axios";

const initPayment = (data) => {
  const options = {
    key: import.meta.env.VITE_RAZORPAY_KEY,
    amount: data.amount,
    currency: data.currency,
    name: data.name,
    description: "Test Transaction",
    image: "https://images-na.ssl-images-amazon.com/images/I/817tHNcyAgL.jpg",
    order_id: data.id,
    handler: async (response) => {},
    theme: {
      color: "#3399cc",
    },
  };
  const rzp1 = new window.Razorpay(options);
  rzp1.open();
};

const handlePayment = async (price) => {
  try {
    const orderUrl = "http://localhost:8080/api/payment/orders";
    const { data } = await axios.post(orderUrl, { amount: price });
    console.log(data);
    data.data.name="DineEase POS"
    initPayment(data.data);
  } catch (error) {
    console.log(error);
  }
};

export { handlePayment };
