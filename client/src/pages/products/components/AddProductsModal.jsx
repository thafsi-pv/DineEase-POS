import React, { useState } from "react";
import DropDownReactSelect from "../../../components/dropdown/DropDownReactSelect";
import FileInput from "../../../components/fileInput";
import SwithField from "../../../components/fields/SwitchField";

function AddProductsModal() {
  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState("");
  const [portions, setPortions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [image, setImage] = useState(null);

  const handlePortionChange = (e, index) => {
    const newPortions = [...portions];
    newPortions[index] = e.target.value;
    setPortions(newPortions);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleCuisineChange = (e) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setSelectedCuisine(selectedOptions);
  };

  const handleImageUpload = (e) => {
    // Handle image upload logic here
    const uploadedImage = e.target.files[0];
    setImage(uploadedImage);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Product details submitted:", {
      itemName,
      price,
      portions,
      selectedCategory,
      selectedCuisine,
      isActive,
      image,
    });
    // Reset form fields
    setItemName("");
    setPrice("");
    setPortions([]);
    setSelectedCategory("");
    setSelectedCuisine([]);
    setIsActive(false);
    setImage(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex columns-2 justify-center w-full gap-3">
        <div className="w-1/2 p-2">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Item Name:
            </label>
            <input
              type="text"
              className="w-full border rounded-md py-2 px-3 mt-1"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Price:
            </label>
            <input
              type="number"
              className="w-full border rounded-md py-2 px-3 mt-1"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Category:
            </label>

            <DropDownReactSelect />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Cuisine:
            </label>
            <select
              className="w-full border rounded-md py-2 px-3 mt-1"
              multiple
              value={selectedCuisine}
              onChange={handleCuisineChange}>
              {/* Populate cuisines dynamically */}
              <option value="cuisine1">Cuisine 1</option>
              <option value="cuisine2">Cuisine 2</option>
            </select>
          </div>
          <div class="hs-tooltip flex items-center">
            <div class="flex items-center">
              <input
                type="checkbox"
                id="hs-valid-toggle-switch"
                class="relative shrink-0 w-[3.25rem] h-7 bg-gray-100 checked:bg-none checked:bg-green-600 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 border border-transparent ring-1 ring-transparent checked:hover:bg-green-600 checked:focus:bg-green-600 focus:border-green-600 focus:ring-green-600 ring-offset-white focus:outline-none appearance-none dark:bg-gray-700 dark:checked:bg-green-600 dark:focus:ring-offset-gray-800
                before:inline-block before:w-6 before:h-6 before:bg-white checked:before:bg-green-200 before:translate-x-0 checked:before:translate-x-full before:shadow before:rounded-full before:transform before:ring-0 before:transition before:ease-in-out before:duration-200 dark:before:bg-gray-400 dark:checked:before:bg-green-200"
                checked
              />
              <label
                for="hs-valid-toggle-switch"
                class="text-sm text-gray-500 ml-3 dark:text-gray-400">
                Valid switch
              </label>
            </div>
          </div>
        </div>

        <div className="w-1/2">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Portions:
            </label>
            <button
              className="bg-blue-500 text-white py-1 px-2 rounded-md mr-2"
              onClick={() => setPortions([...portions, ""])}>
              Add Portion
            </button>
            {portions.map((portion, index) => (
              <input
                key={index}
                type="text"
                className="w-full border rounded-md py-2 px-3 mt-1"
                value={portion}
                onChange={(e) => handlePortionChange(e, index)}
              />
            ))}
          </div>

          <FileInput inputLabel="Select Image" />
          
        </div>
      </div>

      <div className="mt-3 float-right">
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
          Add Product
        </button>
      </div>
    </form>
  );
}

export default AddProductsModal;
