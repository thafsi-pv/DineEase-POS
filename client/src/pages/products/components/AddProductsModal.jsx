import React, { useState } from "react";
import DropDownReactSelect from "../../../components/dropdown/DropDownReactSelect";
import FileInput from "../../../components/fileInput";
import SwithField from "../../../components/fields/SwitchField";
import TextField from "../../../components/fields/TextField";
import InputField from "../../../components/fields/InputField";

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
          <div className="mb-2">
            <InputField
              label="Item Name"
              variant=""
              id="itemName"
              extra=""
              type="text"
              placeholder="Enter Item Name"
            />
          </div>
          <div className="mb-2">
            <InputField
              label="Price"
              variant=""
              id="itemPrice"
              extra=""
              type="number"
              placeholder="Enter Item Price"
            />
          </div>
          <div className="mb-4">
            <DropDownReactSelect
              ph="Select Category"
              label="Category"
              id="ddlCategory"
            />
          </div>
          <div className="mb-4">
            <DropDownReactSelect
              ph="Select Cusine"
              label="Cusine"
              id="ddlCusine"
              isMulti={true}
            />
          </div>

          <div class="hs-tooltip flex items-center">
            <SwithField
              color="green"
              label="Active"
              desc="Product is currently serving or not"
            />
          </div>
          <div class="mt-3">
            <TextField extra="w-full" color="green" label="Remarks" />
          </div>
        </div>

        <div className="w-1/2">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Portions:
            </label>
            <div className="mb-2 flex gap-2">
              <InputField
                label="Portion"
                variant=""
                id="portionTxt"
                extra="flex-1"
                type="text"
                placeholder="Enter Portion"
              />
              <InputField
                label="Price"
                variant=""
                id="itemName"
                extra="flex-1"
                type="number"
                min={0}
                step={0.1}
                placeholder="Enter Portion Price"
              />
            </div>

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
