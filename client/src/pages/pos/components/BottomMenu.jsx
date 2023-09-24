import React from "react";
import Card from "../../../components/card";
import { CiCalculator1, CiCircleRemove, CiDiscount1, CiLock, CiUser } from "react-icons/ci";
import { BsBoxSeam, BsPrinter } from "react-icons/bs";
import { TfiHandStop } from "react-icons/tfi";
import { MdOutlineLoyalty } from "react-icons/md";

function BottomMenu({ print }) {
  const openCalculator = () => {
    // Open the system calculator on macOS
    window.open(
      "x-apple.systempreferences:com.apple.preference.security?Calc",
      "_blank"
    );
  };
  return (
    <>
      <Card extra={"w-full h-full p-3 pt-4"}>
        <div className="flex flex-row-reverse w-full gap-3 items-center align-middle">
          <div className=" flex flex-col justify-center items-center hover:bg-gray-200 p-1 rounded-xl text-gray-400 hover:text-gray-800 cursor-pointer">
            <CiCircleRemove className="h-10 w-10" />
            <p className="p-0 m-0 text-xs">Close</p>
            <p className="p-0 m-0 text-[9px]">Ctlr+c</p>
          </div>
          <div className=" flex flex-col justify-center items-center hover:bg-gray-200 p-1 rounded-xl text-gray-400 hover:text-gray-800 cursor-pointer">
            <CiLock className="h-10 w-10" />
            <p className="p-0 m-0 text-xs">Screen Lock</p>
            <p className="p-0 m-0 text-[9px]">Ctlr+l</p>
          </div>
          <div
            className=" flex flex-col justify-center items-center  hover:bg-gray-200 p-1 rounded-xl text-gray-400 hover:text-gray-800 cursor-pointer"
            onClick={print}>
            <BsPrinter className="h-10 w-10" />
            <p className="p-0 m-0 text-xs">KOT</p>
            <p className="p-0 m-0 text-[9px]">Ctlr+k</p>
          </div>
          <div className=" flex flex-col justify-center items-center  hover:bg-gray-200 p-1 rounded-xl text-gray-400 hover:text-gray-800 cursor-pointer">
            <TfiHandStop className="h-10 w-10" />
            <p className="p-0 m-0 text-xs">Hold</p>
            <p className="p-0 m-0 text-[9px]">Ctlr+h</p>
          </div>
          <div className=" flex flex-col justify-center items-center  hover:bg-gray-200 p-1 rounded-xl text-gray-400 hover:text-gray-800 cursor-pointer">
            <CiCalculator1 className="h-10 w-10" onClick={openCalculator} />
            <p className="p-0 m-0 text-xs">Calculator</p>
            <p className="p-0 m-0 text-[9px]">Ctlr+x</p>
          </div>
          <div className=" flex flex-col justify-center items-center  hover:bg-gray-200 p-1 rounded-xl text-gray-400 hover:text-gray-800 cursor-pointer">
            <CiDiscount1 className="h-10 w-10" />
            <p className="p-0 m-0 text-xs">Discount</p>
            <p className="p-0 m-0 text-[9px]">Ctlr+d</p>
          </div>
          <div className=" flex flex-col justify-center items-center  hover:bg-gray-200 p-1 rounded-xl text-gray-400 hover:text-gray-800 cursor-pointer">
            <CiUser className="h-10 w-10" />
            <p className="p-0 m-0 text-xs">Add Customer</p>
            <p className="p-0 m-0 text-[9px]">Ctlr+r</p>
          </div>
          <div className=" flex flex-col justify-center items-center  hover:bg-gray-200 p-1 rounded-xl text-gray-400 hover:text-gray-800 cursor-pointer">
            <BsBoxSeam className="h-10 w-10" />
            <p className="p-0 m-0 text-xs">Add Product</p>
            <p className="p-0 m-0 text-[9px]">Ctlr+p</p>
          </div>
          <div className=" flex flex-col justify-center items-center  hover:bg-gray-200 p-1 rounded-xl text-gray-400 hover:text-gray-800 cursor-pointer">
            <MdOutlineLoyalty className="h-10 w-10" />
            <p className="p-0 m-0 text-xs">Loayalty Card</p>
            <p className="m-0 text-[9px]">Ctlr+l</p>
          </div>
        </div>
      </Card>
    </>
  );
}

export default BottomMenu;
