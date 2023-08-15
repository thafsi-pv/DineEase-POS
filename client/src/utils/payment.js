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
    handler: async (response) => {
      try {
        const verifyUrl = "http://localhost:8080/api/payment/verify";
        const { data } = await axios.post(verifyUrl, response);
        console.log("verify", data);
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    theme: {
      color: "#3399cc",
    }
  };
  //const rzp1 = new window.Razorpay(options);
  //rzp1.open();

  // Wrap the Razorpay open method in a Promise
  // return new Promise((resolve, reject) => {
  //   //const rzp1 = new window.Razorpay(options);
  //   console.log("inside promise");
  //   rzp1.open({
  //     ...options,
  //     handler: async (response) => {
  //       console.log("🚀 ~ file: payment.js:36 ~ handler: ~ response:", response)
  //       try {
  //         console.log("before verify");
  //         const verifyUrl = "http://localhost:8080/api/payment/verify";
  //         const { data } = await axios.post(verifyUrl, response);
  //         console.log("verify", data);
  //         resolve(data); // Resolve the promise with the payment verification data
  //         console.log('after resolve')
  //       } catch (error) {
  //         console.log(error);
  //         reject(error); // Reject the promise if there's an error
  //       }
  //     },
  //   });
  // });




};

// const handlePayment = async (price) => {
//   try {
//     const orderUrl = "http://localhost:8080/api/payment/orders";
//     const { data } = await axios.post(orderUrl, { amount: price });
//     console.log(data);
//     data.data.name = "DineEase POS";
    
//     const res = await initPayment(data.data);
//     console.log("Payment result:", res);
//    //return res;

//   } catch (error) {
//     console.log(error);
//     throw error; // Rethrow the error to propagate it further
//   }
// };

const handlePayment = async (price) => {
  try {
    console.log("Start handlePayment");

    const orderUrl = "http://localhost:8080/api/payment/orders";
    const { data } = await axios.post(orderUrl, { amount: price });
    console.log("Order data:", data);

    data.data.name = "DineEase POS";

    console.log("Before calling initPayment");
    const res = await initPayment(data.data);
    console.log("After calling initPayment");

    console.log("Payment result:", res);

    return res;

  } catch (error) {
    console.log(error);
    throw error; // Rethrow the error to propagate it further
  }
};


export { handlePayment };
