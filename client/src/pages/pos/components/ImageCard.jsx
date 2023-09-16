import React from "react";
import Card from "../../../components/card";

function ImageCard({ item }) {
  return (
    <Card extra="!bg-gray-200">
      {/* task header */}
      <div className="relative text-center flex flex-row justify-between ">
        <div className="flex  flex-col w-full">
          {/* <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-100 dark:bg-white/5">
            <MdCheckCircle className="h-6 w-6 text-brand-500 dark:text-white" />
          </div> */}
          <img
            className="object-cover rounded-t-2xl h-24 w-50"
            src={item.imageUrl}
            alt=""
          />
          <h4 className=" text-xs font-bold text-navy-700 dark:text-white p-1">
            {item.itemName}
          </h4>
        </div>
      </div>
    </Card>
  );
}

export default ImageCard;
