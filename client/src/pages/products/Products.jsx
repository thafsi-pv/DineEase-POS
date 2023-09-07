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

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
  console.log("🚀 ~ file: Products.jsx:60 ~ Products ~ first isModalOpen:", isModalOpen)

    setIsModalOpen(true);
  console.log("🚀 ~ file: Products.jsx:60 ~ Products ~ last isModalOpen:", isModalOpen)

  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md p-6 rounded-md mt-6">
      <button
        onClick={()=>openModal()}
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

      <h2 className="text-2xl font-semibold mb-4">Add Product</h2>
    
    </div>
  );
}

export default Products;
