import React, { useEffect, useState } from "react";
import FormModal from "../../components/modal/FormModal";
import AddCustomerModal from "./components/AddCustomerModal";

import CustomerListTable from "./components/CustomerListTable";
import axios from "axios";
import { GET_ALL_ACTIVE_CUSTOMER_API } from "../../utils/const";
import ViewCustomerModal from "./components/ViewCustomerModal";

function Customers() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewCustomer, setViewCustomer] = useState({ show: false, id: 0 });
  const [customerList, setCustomerList] = useState([{}]);
  const [modalData, setModalData] = useState(null);

  useEffect(() => {
    handleGetAllCustomers();
  }, []);

  const handleGetAllCustomers = async () => {
    const customers = await axios.get(GET_ALL_ACTIVE_CUSTOMER_API);
    setCustomerList(customers?.data);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setViewCustomer(false);
  };

  const columnsDataComplex = [
    {
      Header: "FIRSTNAME",
      accessor: "firstName",
      width: "w-1/12",
    },
    {
      Header: "LASTNAME",
      accessor: "lastName",
      width: "w-1/12",
    },
    {
      Header: "MOBILE",
      accessor: "mobile",
      width: "w-1/12",
    },
    {
      Header: "EMAIL",
      accessor: "email",
      width: "w-1/12",
    },
    {
      Header: "LOYALTYPOINT",
      accessor: "loyaltyPoint",
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
        <CustomerListTable
          columnsData={columnsDataComplex}
          tableData={customerList}
          setCustomerList={setCustomerList}
          openModal={openModal}
          setModalData={setModalData}
          setViewCustomer={setViewCustomer}
        />
      </div>

      <FormModal isOpen={isModalOpen} onClose={closeModal} modalWidth="70vw">
        <AddCustomerModal
          setIsModalOpen={setIsModalOpen}
          modalData={modalData}
          customerList={customerList}
          setCustomerList={setCustomerList}
        />
      </FormModal>
      <FormModal
        isOpen={viewCustomer.show}
        onClose={closeModal}
        modalWidth="70vw">
        <ViewCustomerModal id={viewCustomer.id} />
      </FormModal>
    </div>
  );
}

export default Customers;

