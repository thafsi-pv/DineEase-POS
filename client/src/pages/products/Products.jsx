import React, { useState } from "react";
import FormModal from "../../components/modal/FormModal";
import AddProductsModal from "./components/AddProductsModal";

import ProductListTable from "./components/ProductListTable";

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
      Header: "IMAGE",
      accessor: "image",
    },
    {
      Header: "NAME",
      accessor: "name",
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

  const tableDataComplex = [
    {
      image:
        "https://media.istockphoto.com/id/1329663291/photo/onam-sadhya-traditional-kerala-food-and-culture.jpg?s=612x612&w=0&k=20&c=TkUgy721R_I0c7b_24wwaTdMPkgDr0DcAsbmou8CQJA=",
      name: "Kerala Sadya",
      price: "12.00",
      status: "Active",
      category: "Veg",
      action: "Active",
    },
    {
      name: "Marketplace",
      price: 12.0,
      status: "Disable",
      category: "30.Dec.2021",
      progress: 30,
    },
    {
      name: "Marketplace",
      status: "Error",
      date: "20.May.2021",
      progress: 30,
    },
    {
      name: "Marketplace",
      status: "Inactive",
      date: "12.Jul.2021",
      progress: 30,
    },
    {
      name: "Kerala Sadya",
      price: 12.0,
      status: "Active",
      category: "Veg",
      progress: 30,
    },
    {
      name: "Marketplace",
      status: "Disable",
      date: "30.Dec.2021",
      progress: 30,
    },
    {
      name: "Marketplace",
      status: "Error",
      date: "20.May.2021",
      progress: 30,
    },
    {
      name: "Marketplace",
      status: "Inactive",
      date: "12.Jul.2021",
      progress: 30,
    },
  ];

  return (
    <div className=" mx-auto  mt-6">
      <div>
        <ProductListTable
          columnsData={columnsDataComplex}
          tableData={tableDataComplex}
          openModal={openModal}
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
