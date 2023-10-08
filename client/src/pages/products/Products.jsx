import React, { useEffect, useState } from "react";
import FormModal from "../../components/modal/FormModal";
import AddProductsModal from "./components/AddProductsModal";

import ProductListTable from "./components/ProductListTable";
import { GET_ALL_ACTIVE_PRODUCT_API } from "../../axios/const";
import ViewProductsModal from "./components/ViewProductsModal";
import axiosInstance2 from "../../axios/axiosInterceptor2";

function Products() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewProduct, setViewProduct] = useState({ show: false, id: 0 });
  const [productList, setProductList] = useState([{}]);
  const [modalData, setModalData] = useState(null);

  useEffect(() => {
    handleGetAllProducts();
  }, []);

  const handleGetAllProducts = async () => {
    const products = await axiosInstance2.get(GET_ALL_ACTIVE_PRODUCT_API);
    setProductList(products?.data);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setViewProduct(false);
  };

  const columnsDataComplex = [
    {
      Header: "NAME",
      accessor: "itemName",
      width: "w-1/12",
    },
    {
      Header: "IMAGE",
      accessor: "imageUrl",
      width: "w-1/12",
    },
    {
      Header: "PRICE",
      accessor: "price",
      width: "w-1/12",
    },
    {
      Header: "CATEGORY",
      accessor: "category",
      width: "w-1/12",
    },
    {
      Header: "CUISINE",
      accessor: "cuisine",
      width: "w-2/12",
    },
    {
      Header: "STATUS",
      accessor: "isActive",
      width: "w-1/12",
    },
    {
      Header: "ACTION",
      accessor: "action",
      width: "w-1/12",
    },
  ];

  return (
    <div className=" mx-auto  mt-6">
      <div>
        <ProductListTable
          columnsData={columnsDataComplex}
          tableData={productList}
          setProductList={setProductList}
          openModal={openModal}
          setModalData={setModalData}
          setViewProduct={setViewProduct}
        />
      </div>

      <FormModal isOpen={isModalOpen} onClose={closeModal} modalWidth="70vw">
        <AddProductsModal
          setIsModalOpen={setIsModalOpen}
          modalData={modalData}
          productList={productList}
          setProductList={setProductList}
        />
      </FormModal>
      <FormModal
        isOpen={viewProduct.show}
        onClose={closeModal}
        modalWidth="70vw">
        <ViewProductsModal id={viewProduct.id} />
      </FormModal>
    </div>
  );
}

export default Products;

// const tableDataComplex = [
//   {
//     image:
//       "https://media.istockphoto.com/id/1329663291/photo/onam-sadhya-traditional-kerala-food-and-culture.jpg?s=612x612&w=0&k=20&c=TkUgy721R_I0c7b_24wwaTdMPkgDr0DcAsbmou8CQJA=",
//     name: "Kerala Sadya",
//     price: "12.00",
//     status: "Active",
//     category: "Veg",
//     action: "Active",
//   },
//   {
//     name: "Appam with Stew",
//     image:
//       "https://akm-img-a-in.tosshub.com/indiatoday/images/story/201604/appam-with-veg-stew-story_647_042216063314.jpg?VersionId=FiSsTFEt00qlFun1WRmCwgeKZU_OZgvu",
//     price: 12.0,
//     status: "Disable",
//     category: "30.Dec.2021",
//     progress: 30,
//   },
//   {
//     name: "Beef Tacos",
//     price: 9.99,
//     image:
//       "https://joyfoodsunshine.com/wp-content/uploads/2022/04/mexian-ground-beef-tacos-recipe-9.jpg",
//     category_name: "Mexican",
//     status: "Error",
//     date: "20.May.2021",
//     progress: 30,
//   },
//   {
//     name: "Chicken Biryani",
//     price: 12.99,
//     image:
//       "https://www.licious.in/blog/wp-content/uploads/2020/12/Hyderabadi-chicken-Biryani.jpg",
//     category: "Rice Dishes",
//     status: "Inactive",
//     date: "12.Jul.2021",
//     progress: 30,
//   },
// ];
