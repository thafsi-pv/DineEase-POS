import React, { useMemo, useState } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import Card from "../../../components/card";
import CardMenu from "../../../components/card/CardMenu";
import { MdCancel, MdCheckCircle, MdOutlineError, MdOutlineLoyalty } from "react-icons/md";
import {
  CiCircleChevLeft,
  CiCircleChevRight,
  CiEdit,
  CiTrash,
} from "react-icons/ci";
import { PiEyeLight } from "react-icons/pi";
import Badge from "../../../components/Badge";
import {
  DELETE_CUSTOMER_BY_ID,
  GET_CUSTOMER_BY_ID,
} from "../../../utils/const";
import FormModal from "../../../components/modal/FormModal";
import DeleteModal from "./DeleteModal";
import { toast } from "react-hot-toast";
import deleteImg from "../../../assets/img/profile/clip-1738.png";
import { formatMobileNumber } from "../../../utils/utils";
import axiosInstance from "../../../utils/axiosInterceptor";

const CustomerListTable = (props) => {
  const {
    columnsData,
    tableData,
    openModal,
    setModalData,
    setViewCustomer,
    setCustomerList,
  } = props;
  const [deleteModal, setDeleteModal] = useState(false);

  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    initialState,
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state: { pageIndex, pageSize },
    prepareRow,
  } = tableInstance;
  initialState.pageSize = 6;

  const handleAddNewItem = () => {
    openModal();
    setModalData(null);
  };

  const handleEdit = async (id) => {
    var url = `${GET_CUSTOMER_BY_ID}?id=${id}`;
    const data = await axiosInstance.get(url);
    setModalData((prv) => data?.data[0]);
    openModal(true);
  };
  const handleView = async (id) => {
    setViewCustomer((prev) => ({ ...prev, show: true, id }));
  };

  const handleDelete = async (id) => {
    toast.custom((t) => (
      <div
        className={`${
          t.visible ? "animate-enter" : "animate-leave"
        } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}>
        <div className="flex-1 w-0 p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 pt-0.5">
              <img className="h-10 w-10 bg-contain" src={deleteImg} alt="" />
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-gray-900">Delete item</p>
              <p className="mt-1 text-sm text-gray-500">
                Do you want to delete this item?
              </p>
            </div>
          </div>
        </div>
        <div className="flex border-l border-gray-200">
          <button
            onClick={() => deleteItem(id, t.id)}
            className="w-full border border-transparent rounded-none p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            Yes
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            No
          </button>
        </div>
      </div>
    ));

    // setDeleteModal(true);
  };

  const deleteItem = async (id, tid) => {
    toast.dismiss(tid);
    var url = `${DELETE_CUSTOMER_BY_ID}?id=${id}`;
    const data = await axiosInstance.delete(url);
    const newList = tableData.filter((item) => item._id != id);
    setCustomerList(newList);
  };

  return (
    <Card extra={"w-full h-full px-6 pb-6 sm:overflow-x-auto"}>
      <div className="relative flex items-center justify-between pt-4">
        <div className="text-xl font-bold text-navy-700 dark:text-white flex-grow"></div>
        <div className="flex justify-end p-6">
          <button
            onClick={handleAddNewItem}
            className="bg-blue-500 text-white px-4 py-2 rounded">
            Add New Customer
          </button>
        </div>
        <CardMenu />
      </div>

      <div className="mt-8 overflow-x-auto xl:overflow-auto">
        <table {...getTableProps()} className="w-full">
          <thead>
            {headerGroups.map((headerGroup, index) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                {headerGroup.headers.map((column, index) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    key={index}
                    className="border-b border-gray-200 pr-7 pb-[10px] text-start dark:!border-navy-700">
                    <p className="text-xs tracking-wide text-gray-600">
                      {column.render("Header")}
                    </p>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, index) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} key={index}>
                  {row.cells.map((cell, index) => {
                    let data = "";
                    if (cell.column.Header === "FIRSTNAME") {
                      data = (
                        <p className="text-sm font-bold text-navy-700 dark:text-white">
                          {cell.value}
                        </p>
                      );
                    } else if (cell.column.Header === "STATUS") {
                      data = (
                        <div className="flex items-center gap-2">
                          <div className={`rounded-full text-xl`}>
                            {cell.value === true ? (
                              <MdCheckCircle className="text-green-500" />
                            ) : cell.value === "Disable" ? (
                              <MdCancel className="text-red-500" />
                            ) : cell.value === false ? (
                              <MdOutlineError className="text-orange-500" />
                            ) : null}
                          </div>
                          <p className="text-sm font-bold text-navy-700 dark:text-white">
                            {cell.value == true ? "Active" : "Inactive"}
                          </p>
                        </div>
                      );
                    } else if (cell.column.Header === "LASTNAME") {
                      data = (
                        <p className="text-sm font-bold text-navy-700 dark:text-white">
                          {cell.value}
                        </p>
                      );
                    } else if (cell.column.Header === "EMAIL") {
                      data = (
                        <p className="text-sm font-bold text-navy-700 dark:text-white">
                          {cell?.value}
                        </p>
                      );
                    } else if (cell.column.Header === "MOBILE") {
                      data = (
                        <p className="text-sm font-bold text-navy-700 dark:text-white">
                          {formatMobileNumber(cell?.value)}
                        </p>
                      );
                    } else if (cell.column.Header === "ACTION") {
                      data = (
                        <div className="space-x-2">
                          <button
                            onClick={() => handleView(cell.row.original._id)}>
                            <MdOutlineLoyalty className="h-7 w-7 hover:bg-gray-300 hover:rounded-full p-1" />
                          </button>
                          <button
                            onClick={() => handleView(cell.row.original._id)}>
                            <PiEyeLight className="h-7 w-7 hover:bg-gray-300 hover:rounded-full p-1" />
                          </button>
                          <button
                            onClick={() => handleEdit(cell.row.original._id)}>
                            <CiEdit className="h-7 w-7 hover:bg-gray-300 hover:rounded-full p-1" />
                          </button>
                          {!row.original.isDefault && (
                            <button
                              onClick={() =>
                                handleDelete(cell.row.original._id)
                              }>
                              <CiTrash className="h-7 w-7 text-red-500 hover:bg-gray-300 hover:rounded-full p-1" />
                            </button>
                          )}
                        </div>
                      );
                    }
                    return (
                      <td
                        className="pt-[8px] pb-[8px] sm:text-[14px] max-w-[20px] border-b-[1px] border-dotted"
                        {...cell.getCellProps()}
                        key={index}>
                        {data}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* Pagination controls */}
      <div className="mt-4 flex justify-end space-x-2">
        <a
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
          href="#"
          className={`flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white${
            !canPreviousPage ? "opacity-50 cursor-not-allowed" : ""
          }`}>
          Previous
          <CiCircleChevLeft className="w-3.5 h-3.5 ml-2" />
        </a>
        <span className="flex items-center text-gray-800">
          Page{" "}
          <strong className="mx-2">
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </span>
        <a
          onClick={() => nextPage()}
          disabled={!canNextPage}
          href="#"
          className={`flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white${
            !canNextPage ? "opacity-50 cursor-not-allowed" : ""
          }`}>
          Next
          <CiCircleChevRight className="w-3.5 h-3.5 ml-2" />
        </a>
      </div>
      <FormModal isOpen={deleteModal} onClose={""} modalWidth="20vw">
        <DeleteModal id={1} />
      </FormModal>
    </Card>
  );
};
export default CustomerListTable;
