import React from "react";
import CardMenu from "../../../components/card/CardMenu";
import Card from "../../../components/card";
import Checkbox from "../../../components/checkbox";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { IoAddCircleOutline } from "react-icons/io5";

function SelectedItemsTable() {
  return (
    <div className="h-full">
      <Card extra={"w-full h-full sm:overflow-auto px-6"}>
        <header className="relative flex items-center justify-between pt-4">
          <div className="text-xl font-bold text-navy-700 dark:text-white">
            Selected Items
          </div>

          <CardMenu />
        </header>

        <div className="mt-8  h-full">
          <table className="w-full" variant="simple" color="gray-500" mb="24px">
            <thead>
              <tr className="">
                <th className="border-b border-gray-200 pr-16 pb-[10px]  dark:!border-navy-700">
                  <div className="text-xs font-bold tracking-wide text-gray-600 lg:text-xs text-center w-full">
                    Name
                  </div>
                </th>
                <th className="border-b border-gray-200 pr-16 pb-[10px]  dark:!border-navy-700">
                  <div className="text-xs font-bold tracking-wide text-gray-600 lg:text-xs text-center w-full">
                    Portion
                  </div>
                </th>
                <th className="border-b border-gray-200 pr-16 pb-[10px]  dark:!border-navy-700">
                  <div className="text-xs font-bold tracking-wide text-gray-600 lg:text-xs text-center w-full">
                    Quatity
                  </div>
                </th>
                <th className="border-b border-gray-200 pr-16 pb-[10px]  dark:!border-navy-700">
                  <div className="text-xs font-bold tracking-wide text-gray-600 lg:text-xs text-center w-full">
                    Rate
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="!pb-2 border-b">
                <div className="flex items-center gap-2 py-2">
                  <Checkbox />
                  <p className="text-sm font-bold text-navy-700 dark:text-white">
                    Kerala Sadya
                  </p>
                </div>
                <td className="">
                  <p className="text-sm font-bold text-navy-700 dark:text-white">
                    Full
                  </p>
                </td>
                <td className="py-2">
                  <div className="flex items-center space-x-2">
                    <AiOutlineMinusCircle className="w-8 h-7" />
                    <input
                      type="number"
                      className="rounded-lg w-14 p-1 font-bold text-md border text-center" value={2}
                    />
                    <IoAddCircleOutline className="w-8 h-7" />
                  </div>
                </td>
                <td className="">
                  <p className="text-sm font-bold text-right text-navy-700 dark:text-white">
                    22.00
                  </p>
                </td>
              </tr>
              <tr className="!pb-2 border-b">
                <div className="flex items-center gap-2 py-2">
                  <Checkbox />
                  <p className="text-sm font-bold text-navy-700 dark:text-white">
                  Kerala Parotta with Chicken Curry
                  </p>
                </div>
                <td className="">
                  <p className="text-sm font-bold text-navy-700 dark:text-white">
                    Full
                  </p>
                </td>
                <td className="py-2">
                  <div className="flex items-center space-x-2">
                    <AiOutlineMinusCircle className="w-8 h-7" />
                    <input
                      type="number"
                      className="rounded-lg w-14 p-1 font-bold text-md border text-center" value={1}
                    />
                    <IoAddCircleOutline className="w-8 h-7" />
                  </div>
                </td>
                <td className="">
                  <p className="text-sm font-bold text-right text-navy-700 dark:text-white">
                    22.00
                  </p>
                </td>
              </tr>
              
             
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

export default SelectedItemsTable;
