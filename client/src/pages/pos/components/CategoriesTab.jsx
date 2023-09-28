import React, { useState } from "react";
import categories from "../../../const/categories.json";

function CategoriesTab() {
  const [selectedCategory, setSelectedCategory] = useState(0);
  return (
    <div class="text-xs font-medium text-center text-gray-500 border-b mb-1 border-gray-200 dark:text-gray-400 dark:border-gray-700">
      <div class=" w-[45rem]  overflow-x-auto">
        <div class="flex -mb-px overflow-x-auto w-full ">
          {categories?.map((item) => {
            return (
              <div class="mr-2">
                <div
                  className={
                    item.value == selectedCategory
                      ? `inline-block p-4 whitespace-nowrap text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500`
                      : "inline-block p-4 whitespace-nowrap border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
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
