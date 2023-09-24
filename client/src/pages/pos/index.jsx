import React, { useEffect, useRef, useState } from "react";
import ImageCard from "./components/ImageCard";
import DropDownReactSelect from "../../components/dropdown/DropDownReactSelect";
import CheckTable from "../admin/default/components/CheckTable";
import { columnsDataCheck } from "../admin/default/variables/columnsData";
import tableDataCheck from "../admin/tables/variables/tableDataCheck.json";
import Card from "../../components/card";
import { handlePayment } from "../../utils/payment";
import { BsFillCreditCardFill, BsPrinter } from "react-icons/bs";
import { FaRupeeSign } from "react-icons/fa";
// import menu from "../../const/menu.json";
import Modal from "../../components/modal/Modal";
import SelectedItemsTable from "./components/SelectedItemsTable";
import { useDispatch, useSelector } from "react-redux";
import InvoicePrint1 from "./printFormats/InvoicePrint1";
import { useReactToPrint } from "react-to-print";
import axios from "axios";
import { toast } from "react-hot-toast";
import usePayment from "../../hooks/usePayment";
import { motion, AnimatePresence } from "framer-motion";
import { GET_ALL_ACTIVE_PRODUCT_API } from "../../utils/const";
import { addToCart } from "../../redux/cartSlice";
import BottomMenu from "./components/BottomMenu";

function index() {
  const dispath = useDispatch();
  const printRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  const selectedItemListRef = useRef(null);
  const cartItems = useSelector((store) => store.cart);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalItem, setModalItem] = useState(null);
  const [subTotalVal, setsubTotalVal] = useState(0);
  const { paymentProcess } = usePayment(handlePrint);
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    document.addEventListener("keydown", detectKeyDown, true);
    getAllProducts();
    return () => {
      document.removeEventListener("keydown", detectKeyDown, true);
    };
  }, []);

  const getAllProducts = async () => {
    const menu = await axios.get(`${GET_ALL_ACTIVE_PRODUCT_API}?active=true`);
    setMenu(menu?.data);
    console.log("🚀 ~ file: index.jsx:58 ~ getAllProducts ~ menu:", menu);
  };

  useEffect(() => {
    const subtot = Math.round(
      cartItems.reduce((acc, item) => acc + item.unitRate * item.quantity, 0)
    ).toFixed(2);
    setsubTotalVal(subtot);
  }, [cartItems]);

  const detectKeyDown = (e) => {
    if (e.key === "b" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();

      // paymentbutton(subTotalVal);

      // Use the callback form of setsubTotalVal to access the latest state
      setsubTotalVal((prevSubTotal) => {
        paymentProcess(prevSubTotal);
        return prevSubTotal;
      });
    }
    if (e.key === "c" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handlePrint();
    }
  };

  const openModal = (item) => {
    console.log("🚀 ~ file: index.jsx:89 ~ openModal ~ item:", item);

    if (item.hasPortions) {
      setIsModalOpen(true);
      setModalItem(item);
      document.body.classList.add("modal-open"); // Add className to body
      return true;
    }
    const obj = {
      itemName: item.itemName,
      portion: "",
      quantity: 1,
      unitRate: item.price,
      totalRate: 1 * item.price,
    };
    dispath(addToCart(obj));
    toast.success("Item added to list 👍🏻");
    if (selectedItemListRef && selectedItemListRef.current) {
      selectedItemListRef.current.scrollTo({
        top: selectedItemListRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
    closeModal();
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

  return (
    <div className="w-full h-[85vh]  overflow-hidden py-5">
      <div className="grid grid-cols-5 grid-rows-6 gap-4 relative h-full  dark:!bg-navy-900 ">
        <div className="w-full h-full  col-span-3 row-span-6">
          <div className="h-full grid grid-rows-6 gap-4">
            <div className=" row-span-5">
              <Card extra={"w-full h-full sm:overflow-auto p-6"}>
                {/*product list div */}
                <div className=" overflow-y-scroll h-full">
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
                  <div className="w-full flex flex-wrap  ">
                    {menu?.map((item) => {
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
              <BottomMenu print={handlePrint} />
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
                          <td>Total: {subTotalVal}</td>
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
                      <p className="text-xs text-gray-300">Ctrl+c</p>
                    </button>
                  </div>
                  <div className="flex-1">
                    <button
                      className="bg-[#068e77e5] hover:bg-[#068e77] text-white font-bold py-2 px-4 rounded-full w-full flex justify-center items-center gap-2"
                      onClick={() => paymentProcess(subTotalVal)}>
                      <BsFillCreditCardFill /> <p>Card</p>
                      <p className="text-xs text-gray-300">Ctrl+b</p>
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
      <div className="hidden">
        <InvoicePrint1 printRef={printRef} />
      </div>
    </div>
  );
}

export default index;
