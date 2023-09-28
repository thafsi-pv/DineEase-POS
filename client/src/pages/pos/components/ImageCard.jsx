import React from "react";
import Card from "../../../components/card";

function ImageCard({ item }) {
  return (
    <Card extra="!bg-gray-200">
      {/* task header */}
      <div className="relative text-center flex flex-row justify-between ">
        <div className="flex  flex-col w-full bg-gray-500 rounded-2xl md:h-24 xl:h-32 lg:h-28">
          {/* <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-100 dark:bg-white/5">
          <MdCheckCircle className="h-6 w-6 text-brand-500 dark:text-white" />
        </div> */}

          <img
            className="object-cover rounded-2xl h-full w-50"
            src={item.imageUrl}
            alt=""
          />
          <h4 className="absolute bottom-0 text-xs font-bold bg-gradient-to-t  from-[#000000] w-full text-white dark:text-white p-1 rounded-b-2xl">
            {item.itemName}
          </h4>
        </div>
      </div>
    </Card>
  );
}

export default ImageCard;

{/* <Card extra="!bg-gray-200">
  <div className="relative text-center flex flex-row justify-between ">
    <div className="flex  flex-col w-full">
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
</Card>; */}
