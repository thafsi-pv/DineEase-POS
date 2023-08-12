import React from "react";
import CardMenu from "../../../components/card/CardMenu";
import Card from "../../../components/card";
import Checkbox from "../../../components/checkbox";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { IoAddCircleOutline } from "react-icons/io5";

function SelectedItemsTable({ cartItems, selectedItemListRef }) {
  return (
    <div className="h-full">
      <Card extra={"w-full h-full px-6"}>
        <header className="relative flex items-center justify-between pt-4">
          <div className="text-xl font-bold text-navy-700 dark:text-white">
            Selected Items
          </div>

          <CardMenu />
        </header>

        <div className="mt-8  h-full overflow-y-scroll pb-16" ref={selectedItemListRef} >
          <table className="w-full" variant="simple" color="gray-500" mb="24px">
            <thead className="sticky top-0 bg-white z-10 w-full">
              <tr className="">
                <th className="border-b border-gray-200  pb-[10px]  dark:!border-navy-700">
                  <div className="text-xs font-bold tracking-wide text-gray-600 lg:text-xs w-full">
                    Name
                  </div>
                </th>
                <th className="border-b border-gray-200  pb-[10px]  dark:!border-navy-700">
                  <div className="text-xs font-bold tracking-wide text-gray-600 lg:text-xs w-full">
                    Portion
                  </div>
                </th>
                <th className="border-b border-gray-200  pb-[10px]  dark:!border-navy-700">
                  <div className="text-xs font-bold tracking-wide text-gray-600 lg:text-xs w-full">
                    Quatity
                  </div>
                </th>
                <th className="border-b border-gray-200  pb-[10px]  dark:!border-navy-700">
                  <div className="text-xs font-bold tracking-wide text-gray-600 lg:text-xs w-full">
                    Rate
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr className="!pb-2 border-b">
                  <div className="flex items-center gap-2 py-2">
                    <Checkbox />
                    <p className="text-sm font-bold text-navy-700 dark:text-white">
                      {item.name}
                    </p>
                  </div>
                  <td className="text-center">
                    <p className="text-sm font-bold text-navy-700 dark:text-white">
                      {item.portion}
                    </p>
                  </td>
                  <td className="py-2 flex justify-center">
                    <div className="flex items-center space-x-2">
                      <AiOutlineMinusCircle className="w-8 h-7" />
                      <input
                        type="number"
                        className="rounded-lg w-14 p-1 font-bold text-md border text-center"
                        value={item.quantity}
                      />
                      <IoAddCircleOutline className="w-8 h-7" />
                    </div>
                  </td>
                  <td className="">
                    <p className="text-sm font-bold text-right text-navy-700 dark:text-white">
                      {item.rate}
                    </p>
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
