import React, { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import Links from "./components/Links";
import SidebarCard from "./componentsrtl/SidebarCard";
import routes from "../../routes";

const Sidebar = () => {
  const [open, setOpen] = useState(false); // State to manage the sidebar open/close
  console.log("🚀 ~ file: index.jsx:9 ~ Sidebar ~ open:", open);

  // Function to toggle the sidebar open/close state
  const toggleSidebar = () => {
    setOpen(!open);
  };

  return (
    <div
      className={`${
        open ? "w-64" : "w-16" // Adjust the width of the sidebar based on the open state
      } duration-175 linear fixed h-screen !z-[49] flex flex-col bg-white pb-10 shadow-2xl shadow-white/5 
      transition-all dark:!bg-navy-800 dark:text-white  rounded-md mb-10 items-center`}>
      {/* Hamburger menu icon */}
      <span
        className="absolute top-4  block cursor-pointer "
        onClick={toggleSidebar}>
        {open ? <HiMenu className="h-6 w-6" /> : <HiMenu className="h-6 w-6"/>}
      </span>

      {open ? (
        <div className={`mx-[56px] mt-[50px] flex items-center leading-5`}>
          <div className="mt-1 ml-1 h-2.5 font-poppins text-[26px] font-bold uppercase text-navy-700 dark:text-white">
            Dine <span className="text-green-600">Ease</span> <br></br>
            <span className="font-light text-sm">POS</span>
          </div>
        </div>
      ) : (
        <div className={`mx-[6px] mt-[50px] flex items-center leading-4`}>
          <div className="mt-1 ml-1 h-2.5 font-poppins text-[26px] font-bold uppercase text-navy-700 dark:text-white p-0 m-0">
            {/* D<span className="text-green-600 p-0 m-0">E</span>{" "}
            <span className="font-light text-sm p-0 m-0">POS</span> */}
            <img src="https://blog.resellerspanel.com/wp-content/uploads/2011/05/tld-de.png" alt="" />
          </div>
        </div>
      )}
      <div className="mt-[58px] mb-7 h-px bg-gray-300 dark:bg-white/30" />

      {/* Nav item */}
      <ul className="mb-auto pt-1">
        {/* Conditionally render the sidebar content based on the open state */}
        {<Links routes={routes} isOpen={open} />}
      </ul>
      {/* Nav item end */}
    </div>
  );
};

export default Sidebar;
