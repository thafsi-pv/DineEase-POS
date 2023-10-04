import React, { useEffect, useRef, useState } from "react";
import ImageCard from "./components/ImageCard";
import DropDownReactSelect from "../../components/dropdown/DropDownReactSelect";
import Card from "../../components/card";
// import menu from "../../const/menu.json";
import Modal from "../../components/modal/Modal";
import SelectedItemsTable from "./components/SelectedItemsTable";
import { useDispatch, useSelector } from "react-redux";
import InvoicePrint1 from "./printFormats/InvoicePrint1";
import { useReactToPrint } from "react-to-print";
import axios from "axios";
import { toast } from "react-hot-toast";
import usePayment from "../../hooks/usePayment";
import { GET_ALL_ACTIVE_PRODUCT_API } from "../../utils/const";
import { addToCart, clearCart } from "../../redux/cartSlice";
import BottomMenu from "./components/BottomMenu";
import SummarySection from "./components/SummarySection";
import CategoriesTab from "./components/CategoriesTab";
import { motion } from "framer-motion";

function index() {
  const dispath = useDispatch();
  const printRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  const CustomerSelectRef = useRef(null);
  const selectedItemListRef = useRef(null);
  const cartItems = useSelector((store) => store.cart);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalItem, setModalItem] = useState(null);
  const [subTotalVal, setsubTotalVal] = useState(0);
  const { paymentProcess } = usePayment(handlePrint);
  const [menu, setMenu] = useState([]);
  const [addProductModal, setAddProductModal] = useState(false);
  const [addCustomerModal, setAddCustomerModal] = useState(false);
  const [orderNumber, setOrderNumber] = useState(null);

  useEffect(() => {
    document.addEventListener("keydown", detectKeyDown, true);
    //getAllProducts();
    return () => {
      document.removeEventListener("keydown", detectKeyDown, true);
    };
  }, []);

  const getAllProducts = async () => {
    const menu = await axios.get(`${GET_ALL_ACTIVE_PRODUCT_API}?active=true`);
    setMenu(menu?.data);
  };

  useEffect(() => {
    getAllProducts();
  }, [addProductModal]);

  useEffect(() => {
    const subtot = Math.round(
      cartItems.cart.reduce(
        (acc, item) => acc + item.unitRate * item.quantity,
        0
      )
    ).toFixed(2);
    setsubTotalVal(subtot);
  }, [cartItems]);

  useEffect(() => {
    if (orderNumber) {
      handlePrint();
      dispath(clearCart('all'));
    }
  }, [orderNumber]);

  const detectKeyDown = (e) => {
    if (e.key === "b" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      setsubTotalVal((prevSubTotal) => {
        paymentProcess(prevSubTotal);
        return prevSubTotal;
      });
    }
    if (e.key === "c" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handlePrint();
    }
    if (e.key === "p" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      setAddProductModal(true);
    }
    if (e.key === "r" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      setAddCustomerModal(true);
    }
  };

  const handleAddItem = (item) => {
    if (item.hasPortions) {
      setIsModalOpen(true);
      setModalItem(item);
      document.body.classList.add("modal-open"); // Add className to body
      return true;
    }
    const obj = {
      id: item._id,
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

  return (
    <div className="w-full h-[85vh]  overflow-hidden py-5">
      <div className="grid grid-cols-5 grid-rows-6 gap-4 relative h-full  dark:!bg-navy-900 ">
        <div className="w-full h-full  col-span-3 row-span-6">
          <div className="h-full grid grid-rows-6 gap-4">
            <div className="row-span-5">
              <Card extra={"w-full h-full sm:overflow-auto p-6"}>
                {/*product list div */}
                <div className=" overflow-y-auto h-full">
                  <div className="w-full overflow-auto gap-2 flex sticky top-0 z-10 bg-white dark:!bg-navy-900  pb-3 rounded-xl">
                    {/* <div className="flex w-full">
                      <DropDownReactSelect ph="Select Table" />
                    </div>
                    <div className="flex w-full">
                      <DropDownReactSelect ph="Select Category" />
                    </div> */}
                    <div className="grid grid-cols-5 overflow-auto">
                      <CategoriesTab
                        setMenu={setMenu}
                        getAllProducts={getAllProducts}
                      />
                    </div>
                  </div>

                  <div className="w-full flex flex-wrap  ">
                    {menu?.map((item) => {
                      return (
                        <motion.div
                          initial={{ y: 10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -10, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          key={item.id}
                          className="w-1/6 p-2 cursor-pointer"
                          onClick={() => handleAddItem(item)}>
                          <ImageCard item={item} />
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </Card>
            </div>
            <div className=" row-span-1">
              <BottomMenu
                print={handlePrint}
                addProductModal={addProductModal}
                setAddProductModal={setAddProductModal}
              />
            </div>
          </div>
        </div>
        <div className=" col-span-2 row-span-6 h-full">
          {/*selected items div */}
          <div className="grid grid-rows-6 h-full gap-4">
            <div className="overflow-y-auto row-span-6 ">
              <SelectedItemsTable
                cartItems={cartItems.cart}
                selectedItemListRef={selectedItemListRef}
                CustomerSelectRef={CustomerSelectRef}
                setAddCustomerModal={setAddCustomerModal}
                addCustomerModal={addCustomerModal}
              />
            </div>
            <div className="">
              <SummarySection
                paymentProcess={paymentProcess}
                subTotalVal={subTotalVal}
                handlePrint={handlePrint}
                CustomerSelectRef={CustomerSelectRef}
                setOrderNumber={setOrderNumber}
              />
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
        <InvoicePrint1 printRef={printRef} orderNumber={orderNumber} />
      </div>
    </div>
  );
}

export default index;
