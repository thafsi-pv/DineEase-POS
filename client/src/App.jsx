import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import AdminLayout from "./layout/Default.jsx";
import LockScreen from "./pages/lockscreen/LockScreen.jsx";
const App = () => {
  return (
    <>
      {/* <LockScreen> */}
        <Routes>
          <Route path="admin/*" element={<AdminLayout />} />
          {/* <Route path="/" element={<Navigate to="/admin" replace />} /> */}
        </Routes>
      {/* </LockScreen> */}
    </>
    // <AdminLayout />
  );
};

export default App;
