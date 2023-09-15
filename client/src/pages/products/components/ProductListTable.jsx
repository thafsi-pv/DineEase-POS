import React, { useMemo } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import Card from "../../../components/card";
import CardMenu from "../../../components/card/CardMenu";
import { MdCancel, MdCheckCircle, MdOutlineError } from "react-icons/md";
import { CiEdit, CiTrash } from "react-icons/ci";
import { PiEyeLight } from "react-icons/pi";
import Badge from "../../../components/Badge";
import { getRandomDarkColor } from "../../../utils/utils";

const ProductListTable = (props) => {
  const { columnsData, tableData, openModal } = props;

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
    page, // The current page of rows
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state: { pageIndex, pageSize },
    prepareRow,
  } = tableInstance;
  initialState.pageSize = 5;

  const handleEdit = (id) => {
    console.log("🚀 ~ file: ProductListTable.jsx:43 ~ handleEdit ~ id:", id);
  };

  return (
    <Card extra={"w-full h-full px-6 pb-6 sm:overflow-x-auto"}>
      <div class="relative flex items-center justify-between pt-4">
        <div class="text-xl font-bold text-navy-700 dark:text-white flex-grow"></div>
        <div className="flex justify-end p-6">
          <button
            onClick={() => openModal()}
            className="bg-blue-500 text-white px-4 py-2 rounded">
            Add New Item
          </button>
        </div>
        <CardMenu />
      </div>

      <div class="mt-8 overflow-x-scroll xl:overflow-scroll">
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
                    if (cell.column.Header === "NAME") {
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
                    } else if (cell.column.Header === "IMAGE") {
                      data = (
                        <img
                          src={cell.value}
                          className="h-10 w-10 rounded-full"
                          alt=""
                          srcset=""
                        />
                      );
                    } else if (cell.column.Header === "CATEGORY") {
                      data = (
                        <p className="text-sm font-bold text-navy-700 dark:text-white">
                          {cell?.value?.label}
                        </p>
                      );
                    } else if (cell.column.Header === "CUISINE") {
                      data = (
                        <p className="text-sm font-bold text-navy-700 dark:text-white my-2">
                          {cell?.value?.map((cuisine) => (
                            <Badge
                              label={cuisine.label}
                              color={getRandomDarkColor()}
                            />
                          ))}
                        </p>
                      );
                    } else if (cell.column.Header === "PRICE") {
                      data = (
                        <p className="text-sm font-bold text-navy-700 dark:text-white">
                          ₹ {cell.value}
                        </p>
                      );
                    } else if (cell.column.Header === "ACTION") {
                      data = (
                        <div className="space-x-2">
                          <button onClick={() => handleView(value)}>
                            <PiEyeLight className="h-7 w-7 hover:bg-gray-300 hover:rounded-full p-1" />
                          </button>
                          <button
                            onClick={() => handleEdit(cell.row.original._id)}>
                            <CiEdit className="h-7 w-7 hover:bg-gray-300 hover:rounded-full p-1" />
                          </button>
                          <button onClick={() => handleDelete(value)}>
                            <CiTrash className="h-7 w-7 text-red-500 hover:bg-gray-300 hover:rounded-full p-1" />
                          </button>
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
      <div className="mt-4 flex justify-end">
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          Previous
        </button>
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          Next
        </button>
      </div>
    </Card>
  );
};
export default ProductListTable;
