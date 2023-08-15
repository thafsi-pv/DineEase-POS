import React, { useRef, useState } from "react";
import ImageCard from "./components/ImageCard";
import DropDownReactSelect from "../../components/dropdown/DropDownReactSelect";
import CheckTable from "../admin/default/components/CheckTable";
import { columnsDataCheck } from "../admin/default/variables/columnsData";
import tableDataCheck from "../admin/tables/variables/tableDataCheck.json";
import Card from "../../components/card";
import { handlePayment } from "../../utils/payment";
import { BsFillCreditCardFill, BsPrinter } from "react-icons/bs";
import { FaRupeeSign } from "react-icons/fa";
import menu from "../../const/menu.json";
import Modal from "../../components/modal/Modal";
import SelectedItemsTable from "./components/SelectedItemsTable";
import { useSelector } from "react-redux";
import { BsBoxSeam } from "react-icons/bs";
import { TfiHandStop } from "react-icons/tfi";
import { MdOutlineLoyalty } from "react-icons/md";
import {
  CiCalculator1,
  CiDiscount1,
  CiUser,
  CiCircleRemove,
  CiPercent,
  CiLock,
} from "react-icons/ci";
import InvoicePrint1 from "./printFormats/InvoicePrint1";
import { useReactToPrint } from "react-to-print";
import axios from "axios";
import { toast } from "react-hot-toast";
import { loadScript } from "../../utils/utils";

function index() {
  const printRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  const selectedItemListRef = useRef(null);
  const cartItems = useSelector((store) => store.cart);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalItem, setModalItem] = useState(null);

  const openModal = (item) => {
    setIsModalOpen(true);
    setModalItem(item);
    document.body.classList.add("modal-open"); // Add className to body
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.classList.remove("modal-open"); // Remove className from body
  };

  const openCalculator = () => {
    // Open the system calculator on macOS
    window.open(
      "x-apple.systempreferences:com.apple.preference.security?Calc",
      "_blank"
    );
  };

  const subTotal = () => {
    return Math.round(
      cartItems.reduce((acc, item) => acc + item.unitRate * item.quantity, 0)
    ).toFixed(2);
  };

  const paymentbutton = async () => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      toast.error("Razorpay SDK failed to load. Are you online?");
      return;
    }
    const subtot = subTotal();
    // const res = await handlePayment(subtot);
    if (subtot==0) {
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
            handlePrint();
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

    const handlePayment = async (subtot) => {
      try {
        console.log("Start handlePayment");

        const orderUrl = "http://localhost:8080/api/payment/orders";
        const { data } = await axios.post(orderUrl, { amount: subtot });
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
    handlePayment(subtot);
  };

  return (
    <div className="w-full md:h-[500px] sm:h-[100px] lg:h-[700px] 2xl:h-[650px] 3xl:h-[700px]  overflow-hidden mt-5">
      <div className="grid grid-cols-5 grid-rows-6 gap-4 relative h-full  dark:!bg-navy-900 ">
        <div className="w-full h-full  col-span-3 row-span-6">
          <div className="h-full grid grid-rows-6 gap-4">
            <div className=" row-span-5">
              <Card extra={"w-full h-full sm:overflow-auto p-6"}>
                {/*product list div */}
                <div className=" overflow-y-scroll">
                  <div className="w-full gap-2 flex sticky top-0 z-10 bg-white dark:!bg-navy-900  pb-3 rounded-xl">
                    <div className="flex w-full">
                      <DropDownReactSelect ph="Select Table" />
                    </div>
                    <div className="flex w-full">
                      <DropDownReactSelect ph="Select Category" />
                    </div>
                    <div className="flex w-full">
                      <DropDownReactSelect ph="Select Customer" />
                    </div>
                  </div>
                  <div className="w-full flex flex-wrap  h-full">
                    {menu.restaurant_items.map((item) => {
                      return (
                        <div
                          key={item.id}
                          className="w-1/6 p-2 cursor-pointer"
                          onClick={() => openModal(item)}>
                          <ImageCard item={item} />
                        </div>
                      );
                    })}

                    {/* <div className="w-1/6 p-2">
                <ImageCard />
              </div> */}
                  </div>
                </div>
              </Card>
            </div>
            <div className=" row-span-1">
              <Card extra={"w-full h-full p-3 pt-4"}>
                <div className="flex flex-row-reverse w-full gap-3 items-center align-middle">
                  <div className=" flex flex-col justify-center items-center hover:bg-gray-200 p-1 rounded-xl text-gray-400 hover:text-gray-800 cursor-pointer">
                    <CiCircleRemove className="h-10 w-10" />
                    <p className="p-0 m-0 text-xs">Close</p>
                  </div>
                  <div className=" flex flex-col justify-center items-center hover:bg-gray-200 p-1 rounded-xl text-gray-400 hover:text-gray-800 cursor-pointer">
                    <CiLock className="h-10 w-10" />
                    <p className="p-0 m-0 text-xs">Screen Lock</p>
                  </div>
                  <div
                    className=" flex flex-col justify-center items-center  hover:bg-gray-200 p-1 rounded-xl text-gray-400 hover:text-gray-800 cursor-pointer"
                    onClick={handlePrint}>
                    <BsPrinter className="h-10 w-10" />
                    <p className="p-0 m-0 text-xs">Print Order</p>
                  </div>
                  <div className=" flex flex-col justify-center items-center  hover:bg-gray-200 p-1 rounded-xl text-gray-400 hover:text-gray-800 cursor-pointer">
                    <TfiHandStop className="h-10 w-10" />
                    <p className="p-0 m-0 text-xs">Hold</p>
                  </div>
                  <div className=" flex flex-col justify-center items-center  hover:bg-gray-200 p-1 rounded-xl text-gray-400 hover:text-gray-800 cursor-pointer">
                    <CiCalculator1
                      className="h-10 w-10"
                      onClick={openCalculator}
                    />
                    <p className="p-0 m-0 text-xs">Calculator</p>
                  </div>
                  <div className=" flex flex-col justify-center items-center  hover:bg-gray-200 p-1 rounded-xl text-gray-400 hover:text-gray-800 cursor-pointer">
                    <CiDiscount1 className="h-10 w-10" />
                    <p className="p-0 m-0 text-xs">Discount</p>
                  </div>
                  <div className=" flex flex-col justify-center items-center  hover:bg-gray-200 p-1 rounded-xl text-gray-400 hover:text-gray-800 cursor-pointer">
                    <CiUser className="h-10 w-10" />
                    <p className="p-0 m-0 text-xs">Add Customer</p>
                  </div>
                  <div className=" flex flex-col justify-center items-center  hover:bg-gray-200 p-1 rounded-xl text-gray-400 hover:text-gray-800 cursor-pointer">
                    <BsBoxSeam className="h-10 w-10" />
                    <p className="p-0 m-0 text-xs">Add Product</p>
                  </div>
                  <div className=" flex flex-col justify-center items-center  hover:bg-gray-200 p-1 rounded-xl text-gray-400 hover:text-gray-800 cursor-pointer">
                    <MdOutlineLoyalty className="h-10 w-10" />
                    <p className="p-0 m-0 text-xs">Loayalty Card</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
        <div className=" col-span-2 row-span-6 h-full">
          {/*selected items div */}
          <div className="grid grid-rows-6 h-full gap-4">
            <div className="overflow-y-scroll row-span-6 ">
              <SelectedItemsTable
                cartItems={cartItems}
                selectedItemListRef={selectedItemListRef}
              />
            </div>
            <div className="">
              {/*summary div */}
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
                          <td>Total Payable:</td>
                          <td>{subTotal()}</td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </header>
                <div className="flex justify-center w-full gap-2 pt-3">
                  <div className="flex-1">
                    <button
                      onClick={handlePrint}
                      className="bg-[#068e77] hover:bg-[#068e77c9] text-white font-bold py-2 px-4 rounded-full w-full flex justify-center items-center gap-2">
                      <FaRupeeSign />
                      Cash
                    </button>
                  </div>
                  <div className="flex-1">
                    <button
                      className="bg-[#068e77e5] hover:bg-[#068e77] text-white font-bold py-2 px-4 rounded-full w-full flex justify-center items-center gap-2"
                      onClick={paymentbutton}>
                      <BsFillCreditCardFill /> <p>Card</p>
                    </button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
      {/* Render the modal component */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        item={modalItem}
        selectedItemListRef={selectedItemListRef}
      />
      <InvoicePrint1 printRef={printRef} />
    </div>
  );
}

export default index;
