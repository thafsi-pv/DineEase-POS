import React, { useRef, useState } from "react";
import ImageCard from "./components/ImageCard";
import DropDownReactSelect from "../../components/dropdown/DropDownReactSelect";
import CheckTable from "../admin/default/components/CheckTable";
import { columnsDataCheck } from "../admin/default/variables/columnsData";
import tableDataCheck from "../admin/tables/variables/tableDataCheck.json";
import Card from "../../components/card";
import { handlePayment } from "../../utils/payment";
import { BsFillCreditCardFill } from "react-icons/bs";
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
} from "react-icons/ci";

function index() {
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
    window.open('x-apple.systempreferences:com.apple.preference.security?Calc', '_blank');
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
              <Card extra={"w-full h-full p-6"}>
                <div className="flex flex-row-reverse w-full gap-2">
                  <div className=" flex flex-col justify-center items-center">
                    <CiCircleRemove className="h-10 w-10" />
                    <p className="p-0 m-0 text-xs text-gray-600">Close</p>
                  </div>
                  <div className=" flex flex-col justify-center items-center">
                    <TfiHandStop className="h-10 w-10" />
                    <p className="p-0 m-0 text-xs text-gray-600">Hold</p>
                  </div>
                  <div className=" flex flex-col justify-center items-center">
                    <CiCalculator1
                      className="h-10 w-10"
                      onClick={openCalculator}
                    />
                    <p className="p-0 m-0 text-xs text-gray-600">Calculator</p>
                  </div>
                  <div className=" flex flex-col justify-center items-center">
                    <CiDiscount1 className="h-10 w-10" />
                    <p className="p-0 m-0 text-xs text-gray-600">Discount</p>
                  </div>
                  <div className=" flex flex-col justify-center items-center">
                    <CiUser className="h-10 w-10" />
                    <p className="p-0 m-0 text-xs text-gray-600">
                      Add Customer
                    </p>
                  </div>
                  <div className=" flex flex-col justify-center items-center">
                    <BsBoxSeam className="h-10 w-10" />
                    <p className="p-0 m-0 text-xs text-gray-600">Add Product</p>
                  </div>
                  <div className=" flex flex-col justify-center items-center">
                    <MdOutlineLoyalty className="h-10 w-10" />
                    <p className="p-0 m-0 text-xs text-gray-600">
                      Loayalty Card
                    </p>
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
                          <td>258.00</td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </header>
                <div className="flex justify-center w-full gap-2 pt-3">
                  <div className="flex-1">
                    <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full w-full flex justify-center items-center gap-2">
                      <FaRupeeSign />
                      Cash
                    </button>
                  </div>
                  <div className="flex-1">
                    <button
                      className="bg-green-400 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full w-full flex justify-center items-center gap-2"
                      onClick={() => handlePayment(280.5)}>
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
    </div>
  );
}

export default index;
