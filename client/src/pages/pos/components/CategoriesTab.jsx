import React, { useEffect, useState } from "react";
import categories from "../../../const/categories.json";
import {
  GET_ALL_ACTIVE_PRODUCT_API,
  GET_PRODUCT_BY_CATEGORY_API,
} from "../../../utils/const";
import axiosInstance2 from "../../../utils/axiosInterceptor2";

function CategoriesTab({ getAllProducts, setMenu }) {
  const [selectedCategory, setSelectedCategory] = useState(0);

  useEffect(() => {
    getAllProducts();
  }, []);

  const getProductByCategory = async (categoryValue) => {
    const url =
      categoryValue == 0
        ? GET_ALL_ACTIVE_PRODUCT_API + "?active=" + true
        : GET_PRODUCT_BY_CATEGORY_API + "?category=" + categoryValue;
    const data = await axiosInstance2.get(url);
    setMenu(data?.data);
    setSelectedCategory(categoryValue);
  };

  return (
    <div class="text-xs font-medium text-center text-gray-500 border-b mb-1 border-gray-200 dark:text-gray-400 dark:border-gray-700">
      <div class=" w-full">
        <div class="flex -mb-px max-w-full">
          {categories?.map((item) => {
            return (
              <div
                class="mr-2 hover:cursor-pointer"
                onClick={() => getProductByCategory(item.value)}>
                <div
                  className={
                    item.value == selectedCategory
                      ? `inline-block p-4 whitespace-nowrap  text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500`
                      : "inline-block p-4 whitespace-nowrap  border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                  }
                  aria-current="page">
                  <p>{item.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default CategoriesTab;
