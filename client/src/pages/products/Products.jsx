import React, { useState } from "react";
import FormModal from "../../components/modal/FormModal";
import AddProductsModal from "./components/AddProductsModal";
import ComplexTable from "../admin/default/components/ComplexTable";
import tableDataComplex from "../admin/default/variables/tableDataComplex.json";

function Products() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

   const columnsDataComplex = [
    {
      Header: "NAME",
      accessor: "name",
    },
    {
      Header: "IMAGE",
      accessor: "image",
    },
    {
      Header: "PRICE",
      accessor: "price",
    },
    {
      Header: "CATEGORY",
      accessor: "category",
    },
    {
      Header: "STATUS",
      accessor: "status",
    },
    {
      Header: "ACTION",
      accessor: "action",
    },
  ];

  return (
    <div className=" mx-auto bg-white shadow-md p-6 rounded-md mt-6">
      <div className="flex justify-end">
        <button
          onClick={() => openModal()}
          className="bg-blue-500 text-white px-4 py-2 rounded">
          Add New Item
        </button>
      </div>

      <div>
        <ComplexTable
          columnsData={columnsDataComplex}
          tableData={tableDataComplex}
        />
      </div>

      <FormModal isOpen={isModalOpen} onClose={closeModal}>
        {/* Pass your input components or content here */}
        <AddProductsModal />

        {/* Add more input components or content as needed */}
      </FormModal>
    </div>
  );
}

export default Products;
