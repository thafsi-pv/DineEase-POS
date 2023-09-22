import React, { useEffect, useState } from "react";
import { GET_PRODUCT_BY_ID } from "../../../utils/const";
import axios from "axios";

function ViewProductsModal({ id }) {
  console.log(
    "🚀 ~ file: ViewProductsModal.jsx:4 ~ ViewProductsModal ~ id:",
    id
  );
  const [productDetails, setProductDetails] = useState();
  console.log(
    "🚀 ~ file: ViewProductsModal.jsx:11 ~ ViewProductsModal ~ productDetails:",
    productDetails
  );

  useEffect(() => {
    getProductDetailsById();
  }, []);

  const getProductDetailsById = async () => {
    var url = `${GET_PRODUCT_BY_ID}?id=${id}`;
    const details = await axios.get(url);
    setProductDetails(details?.data[0]);
    console.log(
      "🚀 ~ file: ViewProductsModal.jsx:16 ~ getProductDetailsById ~ details:",
      details
    );
  };

  return (
    <div>
      <div className="bg-white p-4 shadow-md rounded-md">
        <img
          src={productDetails?.imageUrl}
          alt={productDetails?.itemName}
          className="w-64 h-64 mx-auto mb-4 rounded-lg"
        />

        <h2 className="text-xl font-semibold mb-2">
          {productDetails?.itemName}
        </h2>
        <p className="text-gray-600 mb-4">
          Category: {productDetails?.category.label}
        </p>
        <p className="text-gray-600 mb-4">
          Cuisine: {productDetails?.cuisine.map((c) => c.label).join(", ")}
        </p>
        <p className="text-gray-600 mb-4">Price: ${productDetails?.price}</p>
        <p className="text-gray-600 mb-4">Remarks: {productDetails?.remarks}</p>

        <div className="text-gray-600 mb-4">
          Portions:{" "}
          {productDetails?.hasPortions ? "Available" : "Not Available"}
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
          Active: {productDetails?.isActive ? "Yes" : "No"}
        </div>
      </div>
    </div>
  );
}

export default ViewProductsModal;
