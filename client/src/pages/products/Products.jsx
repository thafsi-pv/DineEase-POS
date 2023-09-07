import React, { useState } from "react";
import FormModal from "../../components/modal/FormModal";

function Products() {
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

  const [isModalOpen, setIsModalOpen] = useState(true);
  const [counter, setCounter] = useState(0);

  const openModal = () => {
    setIsModalOpen(true);
   
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md p-6 rounded-md mt-6">
      <button
        onClick={() => openModal()}
        className="bg-blue-500 text-white px-4 py-2 rounded">
        Open Modal
      </button>

      <FormModal isOpen={isModalOpen} onClose={closeModal}>
        {/* Pass your input components or content here */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Input Label:
          </label>
          <input
            type="text"
            className="w-full border rounded-md py-2 px-3 mt-1"
            placeholder="Enter something"
          />
        </div>

        {/* Add more input components or content as needed */}
      </FormModal>
      <div>bool{isModalOpen.toString()}</div>
      <div>counter{counter}</div>
      <h2 className="text-2xl font-semibold mb-4">Add Product</h2>
    </div>
  );
}

export default Products;

{
  /* <form onSubmit={handleSubmit}>
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
<div className="mb-4">
  <label className="block text-sm font-medium text-gray-600">
    Category:
  </label>
  <select
    className="w-full border rounded-md py-2 px-3 mt-1"
    value={selectedCategory}
    onChange={handleCategoryChange}
    required>
    <option value="">Select Category</option>
    {/* Populate categories dynamically */
}
//     <option value="category1">Category 1</option>
//     <option value="category2">Category 2</option>
//   </select>
// </div>
// <div className="mb-4">
//   <label className="block text-sm font-medium text-gray-600">
//     Cuisine:
//   </label>
//   <select
//     className="w-full border rounded-md py-2 px-3 mt-1"
//     multiple
//     value={selectedCuisine}
//     onChange={handleCuisineChange}>
//     {/* Populate cuisines dynamically */}
//     <option value="cuisine1">Cuisine 1</option>
//     <option value="cuisine2">Cuisine 2</option>
//   </select>
// </div>
// <div className="mb-4">
//   <label className="block text-sm font-medium text-gray-600">
//     Is Active:
//   </label>
//   <input
//     type="checkbox"
//     className="mt-1"
//     checked={isActive}
//     onChange={() => setIsActive(!isActive)}
//   />
// </div>
// <div className="mb-4">
//   <label className="block text-sm font-medium text-gray-600">
//     Upload Image:
//   </label>
//   <input type="file" accept="image/*" onChange={handleImageUpload} />
// </div>
// <div>
//   <button
//     type="submit"
//     className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
//     Add Product
//   </button>
// </div>
// </form> */}