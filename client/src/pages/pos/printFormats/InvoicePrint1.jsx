import React from "react";
import { useSelector } from "react-redux";
import { convertToWords } from "../../../utils/utils";

function InvoicePrint1({ printRef, showSummary = true, orderNumber }) {
  const cartItems = useSelector((store) => store.cart);

  const totalItems = () => {
    return cartItems.cart.reduce((acc, item) => acc + item.quantity, 0);
  };
  const subTotal = () => {
    return Math.round(
      cartItems.cart.reduce(
        (acc, item) => acc + item.unitRate * item.quantity,
        0
      )
    ).toFixed(2);
  };

  return (
    <div className=" p-6 print-page" ref={printRef}>
      <div className="flex justify-between">
        <div className="flex items-center space-x-4">
          <img
            src="https://blog.resellerspanel.com/wp-content/uploads/2011/05/tld-de.png"
            alt="Restaurant Logo"
            className="w-12 h-12"
          />
          <div>
            <div className="flex flex-col leading-4">
              <div className="mt-1 ml-1 font-poppins text-[26px] font-bold uppercase text-navy-700 dark:text-white">
                Dine<span className="text-green-600">Ease</span>
              </div>
              <p className="text-gray-600 p-0 w-ful text-right text-[10px]">
                POS
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col-reverse justify-stretch items-baseline text-right text-[8px]">
          <p>Customer: {cartItems?.customer?.label}</p>
          <p>Date: August 13, 2023</p>
          {showSummary && <p>Ref No: {orderNumber}</p>}
        </div>
      </div>

      <div className="mt-6">
        <table className="w-full" variant="simple" color="gray-500" mb="24px">
          <thead className="sticky top-0  z-10 w-full">
            <tr className="">
              <th className="border-b border-gray-200  pb-[3px]  dark:!border-navy-700 w-40p">
                <div className="text-[10px] font-bold tracking-wide text-gray-600 lg:text-[10px] w-full">
                  Name
                </div>
              </th>
              <th className="border-b border-gray-200  pb-[3px]  dark:!border-navy-700 w-20p">
                <div className="text-[10px] font-bold tracking-wide text-gray-600 lg:text-[10px] w-full">
                  Quatity
                </div>
              </th>
              <th className="border-b border-gray-200  pb-[3px]  dark:!border-navy-700 w-10p">
                <div className="text-[10px] font-bold tracking-wide text-gray-600 lg:text-[10px] w-full">
                  Rate
                </div>
              </th>
              <th className="border-b border-gray-200  pb-[3px]  dark:!border-navy-700 w-15p">
                <div className="text-[10px] font-bold tracking-wide text-gray-600 lg:text-[10px] w-full">
                  Total
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {cartItems.cart.map((item, index) => (
              <tr className=" border-b" key={item.id}>
                <td className="flex items-center gap-2">
                  <p className="text-[10px] text-navy-700 dark:text-white">
                    {item.itemName}
                    <span className="text-[8px]"> ({item.portion})</span>
                  </p>
                </td>
                <td className="">
                  <p className=" text-[10px]  text-center">{item.quantity}</p>
                </td>
                <td className="">
                  <p className=" text-[10px]  text-center">{item.unitRate}</p>
                </td>
                <td className=" !text-right">
                  <p className="text-[10px] !text-right w-full text-navy-700 dark:text-white">
                    {item.totalRate}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showSummary && (
        <div className="mt-3">
          <p className="text-[7px]">Amount in words:</p>
          <p className="text-[8px]">{convertToWords(subTotal())} Only</p>
        </div>
      )}
      {showSummary && (
        <div className="mt-6 flex justify-end  text-[8px] font-semibold">
          <table>
            <tr>
              <td>Total Items</td>
              <td className="text-right">{totalItems()}</td>
            </tr>
            <tr>
              <td>Total Discount</td>
              <td className="text-right">00.00</td>
            </tr>
            <tr>
              <td>Total Tax</td>
              <td className="text-right">00.00</td>
            </tr>
            <tr>
              <td>Total Amount</td>
              <td className="text-right">{subTotal()}</td>
            </tr>
            <tr>
              <td>Loyalty Points Earned</td>
              <td className="text-right">50</td>
            </tr>
          </table>

          {/* <p>:</p>
        <p>Total :00.000</p>
        <p>Total Tax:00.000</p>
        <p>Total Amount: ${subTotal()}</p>
        <p>Loyalty Points Earned: 50</p> */}
        </div>
      )}
    </div>
  );
}

export default InvoicePrint1;
