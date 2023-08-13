import React from "react";
import { useSelector } from "react-redux";

function InvoicePrint1({ printRef }) {
  const cartItems = useSelector((store) => store.cart);

  const subTotal = () => {
    return Math.round(
      cartItems.reduce((acc, item) => acc + item.unitRate * item.quantity, 0)
    ).toFixed(2);
  };

  return (
    <div className="bg-white p-6 print-page" ref={printRef}>
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
              <p className="text-gray-600 p-0 w-ful text-right text-[10px]">POS</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col-reverse justify-stretch items-baseline text-right text-[8px]">
          <p>Date: August 13, 2023</p>
          <p>Ref No: 123456</p>
        </div>
      </div>

      <div className="mt-6">
        <table className="w-full" variant="simple" color="gray-500" mb="24px">
          <thead className="sticky top-0 bg-white z-10 w-full">
            <tr className="">
              <th className="border-b border-gray-200  pb-[3px]  dark:!border-navy-700 w-50p">
                <div className="text-[10px] font-bold tracking-wide text-gray-600 lg:text-[10px] w-full">
                  Name
                </div>
              </th>
              <th className="border-b border-gray-200  pb-[3px]  dark:!border-navy-700 w-15p">
                <div className="text-[10px] font-bold tracking-wide text-gray-600 lg:text-[10px] w-full">
                  Portion
                </div>
              </th>
              <th className="border-b border-gray-200  pb-[3px]  dark:!border-navy-700 w-20p">
                <div className="text-[10px] font-bold tracking-wide text-gray-600 lg:text-[10px] w-full">
                  Quatity
                </div>
              </th>
              <th className="border-b border-gray-200  pb-[3px]  dark:!border-navy-700 w-15p">
                <div className="text-[10px] font-bold tracking-wide text-gray-600 lg:text-[10px] w-full">
                  Rate
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, index) => (
              <tr className=" border-b" key={item.id}>
                <div className="flex items-center gap-2">
                  <p className="text-[10px] text-navy-700 dark:text-white">
                    {item.name}
                  </p>
                </div>
                <td className="text-center">
                  <p className="text-[10px] text-navy-700 dark:text-white">
                    {item.portion}
                  </p>
                </td>
                <td className=" flex justify-center">
                  <p className=" text-[10px]  text-center">{item.quantity}</p>
                </td>
                <td className="">
                  <p className="text-[10px] text-right text-navy-700 dark:text-white">
                    {item.totalRate}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 text-right">
        <p>Total Amount: ${subTotal()}</p>
        <p>Loyalty Points Earned: 50</p>
      </div>
    </div>
  );
}

export default InvoicePrint1;
