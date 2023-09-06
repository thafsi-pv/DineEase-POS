import React from "react";
import { MdPointOfSale, MdOutlineCategory } from "react-icons/md";
import { GiTable } from "react-icons/gi";
import { IoFastFood } from "react-icons/io5";
import { HiOutlineChatBubbleBottomCenterText } from "react-icons/hi2";

// Admin Imports
import MainDashboard from "./pages/admin/default";
import POS from "./pages/pos";
// import NFTMarketplace from "views/admin/marketplace";
// import Profile from "views/admin/profile";
// import DataTables from "views/admin/tables";
// import RTLDefault from "views/rtl/default";

// Auth Imports
import SignIn from "./pages/auth/SignIn";

// Icon Imports
import {
  MdHome,
  MdOutlineShoppingCart,
  MdBarChart,
  MdPerson,
  MdLock,
} from "react-icons/md";
import ListTable from "./pages/table/ListTable";
import Chat from "./pages/chat/Chat";
import Products from "./pages/products/Products";

const routes = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  {
    name: "POS",
    layout: "/admin",
    path: "pos",
    icon: <MdPointOfSale className="h-6 w-6" />,
    component: <POS />,
  },
  {
    name: "Tables",
    layout: "/admin",
    path: "tables",
    icon: <GiTable className="h-6 w-6" />,
    component: <ListTable />,
  },
  {
    name: "Category",
    layout: "/admin",
    path: "category",
    icon: <MdOutlineCategory className="h-6 w-6" />,
    component: <ListTable />,
  },
  {
    name: "Product",
    layout: "/admin",
    path: "product",
    icon: <IoFastFood className="h-6 w-6" />,
    component: <Products />,
  },
  {
    name: "Chat",
    layout: "/admin",
    path: "chat",
    icon: <HiOutlineChatBubbleBottomCenterText className="h-6 w-6" />,
    component: <Chat />,
  },
  // {
  //   name: "NFT Marketplace",
  //   layout: "/admin",
  //   path: "nft-marketplace",
  //   icon: <MdOutlineShoppingCart className="h-6 w-6" />,
  //   component: <NFTMarketplace />,
  //   secondary: true,
  // },
  // {
  //   name: "Data Tables",
  //   layout: "/admin",
  //   icon: <MdBarChart className="h-6 w-6" />,
  //   path: "data-tables",
  //   component: <DataTables />,
  // },
  // {
  //   name: "Profile",
  //   layout: "/admin",
  //   path: "profile",
  //   icon: <MdPerson className="h-6 w-6" />,
  //   component: <Profile />,
  // },
  {
    name: "Sign In",
    layout: "/auth",
    path: "sign-in",
    icon: <MdLock className="h-6 w-6" />,
    component: <SignIn />,
  },
  // {
  //   name: "RTL Admin",
  //   layout: "/rtl",
  //   path: "rtl",
  //   icon: <MdHome className="h-6 w-6" />,
  //   component: <RTLDefault />,
  //},
];
export default routes;
