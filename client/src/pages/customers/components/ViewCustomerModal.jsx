import React, { useEffect, useState } from "react";
import { GET_CUSTOMER_BY_ID } from "../../../utils/const";
import axiosInstance from "../../../utils/axiosInterceptor";

function ViewCustomersModal({ id }) {
  const [customerDetails, setCustomerDetails] = useState();

  useEffect(() => {
    getCustomerDetailsById();
  }, []);

  const getCustomerDetailsById = async () => {
    var url = `${GET_CUSTOMER_BY_ID}?id=${id}`;
    const details = await axiosInstance.get(url);
    setCustomerDetails(details?.data[0]);
  };

  return (
    <div>
      <div className="bg-white p-4 shadow-md rounded-md">
      

        <h2 className="text-xl font-semibold mb-2">
          {customerDetails?.firstName}
        </h2>
        <p className="text-gray-600 mb-4">
          Category: {customerDetails?.category.label}
        </p>
        <p className="text-gray-600 mb-4">
          Cuisine: {customerDetails?.cuisine.map((c) => c.label).join(", ")}
        </p>
        <p className="text-gray-600 mb-4">Price: ${customerDetails?.price}</p>
        <p className="text-gray-600 mb-4">Remarks: {customerDetails?.remarks}</p>

        <div className="text-gray-600 mb-4">
          Portions:{" "}
          {customerDetails?.hasPortions ? "Available" : "Not Available"}
        </div>
        <div className="flex flex-col space-y-1">
          <div className="flex space-x-2">
            <p>Full</p> <p>100</p>
          </div>
          <div className="flex space-x-2">
            <p>Half</p> <p>100</p>
          </div>
        </div>

        <div className="text-gray-600">
          Active: {customerDetails?.isActive ? "Yes" : "No"}
        </div>
      </div>
    </div>
  );
}

export default ViewCustomersModal;
