import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import AdminLayout from "./layout/Default.jsx";
const App = () => {
  return (
    // <Routes>
    //    <Route path="admin/*" element={<AdminLayout />} />
    //   {/* <Route path="/" element={<Navigate to="/admin" replace />} /> */}
    // </Routes>
    <AdminLayout />
  );
};

export default App;
