import React from "react";
import Card from "../../../components/card";

function ImageCard() {
  return (
    <Card extra="!bg-gray-200">
      {/* task header */}
      <div className="relative flex flex-row justify-between ">
        <div className="flex items-center flex-col">
          {/* <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-100 dark:bg-white/5">
            <MdCheckCircle className="h-6 w-6 text-brand-500 dark:text-white" />
          </div> */}

          <img
            className=" object-cover rounded-t-2xl"
            src="https://www.foodandwine.com/thmb/Wd4lBRZz3X_8qBr69UOu2m7I2iw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/classic-cheese-pizza-FT-RECIPE0422-31a2c938fc2546c9a07b7011658cfd05.jpg"
            alt=""
          />
          <h4 className=" text-sm font-bold text-navy-700 dark:text-white p-1">
            Pizza
          </h4>
        </div>

        {/* <CardMenu /> */}
      </div>
    </Card>
  );
}

export default ImageCard;
