import React, { useEffect, useState } from "react";
import FormModal from "../../components/modal/FormModal";
import AddProductsModal from "./components/AddProductsModal";

import ProductListTable from "./components/ProductListTable";
import axios from "axios";

function Products() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    handleGetAllProducts();
  }, []);

  const handleGetAllProducts = async () => {
    const products=await axios.get()
  };

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
      name: "Appam with Stew",
      image:
        "https://akm-img-a-in.tosshub.com/indiatoday/images/story/201604/appam-with-veg-stew-story_647_042216063314.jpg?VersionId=FiSsTFEt00qlFun1WRmCwgeKZU_OZgvu",
      price: 12.0,
      status: "Disable",
      category: "30.Dec.2021",
      progress: 30,
    },
    {
      name: "Beef Tacos",
      price: 9.99,
      image:
        "https://joyfoodsunshine.com/wp-content/uploads/2022/04/mexian-ground-beef-tacos-recipe-9.jpg",
      category_name: "Mexican",
      status: "Error",
      date: "20.May.2021",
      progress: 30,
    },
    {
      name: "Chicken Biryani",
      price: 12.99,
      image:
        "https://www.licious.in/blog/wp-content/uploads/2020/12/Hyderabadi-chicken-Biryani.jpg",
      category: "Rice Dishes",
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

      <FormModal isOpen={isModalOpen} onClose={closeModal} modalWidth="70vw">
        {/* Pass your input components or content here */}
        <AddProductsModal setIsModalOpen={setIsModalOpen} />

        {/* Add more input components or content as needed */}
      </FormModal>
    </div>
  );
}

export default Products;
