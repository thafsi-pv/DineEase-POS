import React from "react";
import CardMenu from "../../../components/card/CardMenu";
import Card from "../../../components/card";
import Checkbox from "../../../components/checkbox";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { IoAddCircleOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { alterItemQuantity } from "../../../redux/cartSlice";
import { CiShoppingCart, CiTrash } from "react-icons/ci";
import DropDownReactSelect from "../../../components/dropdown/DropDownReactSelect";
import { BsCart2 } from "react-icons/bs";

function SelectedItemsTable({ cartItems, selectedItemListRef }) {
  console.log(
    "🚀 ~ file: SelectedItemsTable.jsx:12 ~ SelectedItemsTable ~ cartItems:",
    cartItems
  );
  const dispath = useDispatch();

  const handleItemAlterQuantity = (index, type) => {
    const data = { index, type };
    dispath(alterItemQuantity(data));
  };

  return (
    <div className="h-full">
      <Card extra={"w-full h-full px-6"}>
        <header className="relative flex items-center justify-between pt-4">
          <div>
            <div className="flex w-full">
              <DropDownReactSelect ph="Select Customer" />
            </div>
          </div>
          <div className="text-lg font-bold text-navy-700 dark:text-white flex items-center space-x-2">
            <BsCart2 className="text-xl" />
            Cart
            <CardMenu opt1='Clear Cart' opt2='Discount' opt3='Hold' opt4='Products' />
          </div>
        </header>

        <div
          className="mt-8  h-full overflow-y-auto pb-16"
          ref={selectedItemListRef}>
          <table className="w-full" variant="simple" color="gray-500" mb="24px">
            <thead className="sticky top-0 z-0 bg-white  w-full">
              <tr className="">
                <th className="border-b border-gray-200  pb-[10px]  dark:!border-navy-700 w-50p">
                  <div className="text-xs font-bold tracking-wide text-gray-600 lg:text-xs w-full">
                    Name
                  </div>
                </th>
                <th className="border-b border-gray-200  pb-[10px]  dark:!border-navy-700 w-15p">
                  <div className="text-xs font-bold tracking-wide text-gray-600 lg:text-xs w-full">
                    Portion
                  </div>
                </th>
                <th className="border-b border-gray-200  pb-[10px]  dark:!border-navy-700 w-20p">
                  <div className="text-xs font-bold tracking-wide text-gray-600 lg:text-xs w-full">
                    Quatity
                  </div>
                </th>
                <th className="border-b border-gray-200  pb-[10px]  dark:!border-navy-700 w-15p">
                  <div className="text-xs font-bold tracking-wide text-gray-600 lg:text-xs w-full">
                    Rate
                  </div>
                </th>
                <th className="border-b border-gray-200  pb-[10px]  dark:!border-navy-700 w-15p">
                  <div className="text-xs font-bold tracking-wide text-gray-600 lg:text-xs w-full">
                    Remove
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => (
                <tr className="!pb-2 border-b" key={item.id}>
                  <div className="flex items-center gap-2 py-2">
                    <Checkbox />
                    <p className="text-sm font-bold text-navy-700 dark:text-white">
                      {item.itemName}
                    </p>
                  </div>
                  <td className="text-center">
                    <p className="text-sm font-bold text-navy-700 dark:text-white">
                      {item.portion}
                    </p>
                  </td>
                  <td className="py-2 flex justify-center">
                    <div className="flex items-center space-x-1">
                      <AiOutlineMinusCircle
                        className="w-5 h-5 text-gray-600 hover:text-gray-800"
                        onClick={() => handleItemAlterQuantity(index, "-")}
                      />
                      <input
                        type="number"
                        className="rounded-lg w-14 p-1 font-bold text-sm border text-center"
                        value={item.quantity}
                      />
                      <IoAddCircleOutline
                        className="w-5 h-5 text-gray-600 hover:text-gray-800"
                        onClick={() => handleItemAlterQuantity(index, "+")}
                      />
                    </div>
                  </td>
                  <td className="">
                    <p className="text-sm font-bold text-right text-navy-700 dark:text-white">
                      {item.totalRate}
                    </p>
                  </td>
                  <td className="flex justify-end">
                    <CiTrash className="hover:text-red-500 cursor-pointer" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

export default SelectedItemsTable;
