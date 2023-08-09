import React from "react";
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

function index() {
  console.log("🚀 ~ file: index.jsx:12 ~ menu:", menu.restaurant_items);
  return (
    <div className="w-full md:h-[500px] sm:h-[100px] lg:h-[700px] 2xl:h-[700px] 3xl:h-[700px]  overflow-hidden mt-5">
      <div class="grid grid-cols-5 gap-4 relative h-full  dark:!bg-navy-900 ">
        <Card extra={"w-full h-full sm:overflow-auto p-6 col-span-3"}>
          <div class=" overflow-y-scroll">
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
                  <div key={item.id} className="w-1/6 p-2">
                    <ImageCard item={item}/>
                  </div>
                );
              })}

              {/* <div className="w-1/6 p-2">
                <ImageCard />
              </div> */}
            </div>
          </div>
        </Card>
        <div class="col-span-2 overflow-y-scroll">
          <CheckTable
            columnsData={columnsDataCheck}
            tableData={tableDataCheck}
          />
        </div>
        <div className="col-span-3"></div>
        <div className="col-span-2">
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
                <button class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full w-full flex justify-center items-center gap-2">
                  <FaRupeeSign />
                  Cash
                </button>
              </div>
              <div className="flex-1">
                <button
                  class="bg-green-400 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full w-full flex justify-center items-center gap-2"
                  onClick={() => handlePayment(280.5)}>
                  <BsFillCreditCardFill /> <p>Card</p>
                </button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default index;
