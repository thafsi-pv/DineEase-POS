import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import AdminLayout from "./layout/Default.jsx";
import LockScreen from "./pages/lockscreen/LockScreen.jsx";
import { store } from "./redux/store.js";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
      {/* <LockScreen> */}
      <Provider store={store}>
        <Routes>
          <Route path="admin/*" element={<AdminLayout />} />
          {/* <Route path="/" element={<Navigate to="/admin" replace />} /> */}
        </Routes>
        <Toaster position="top-right" reverseOrder={false} />
      </Provider>
      {/* </LockScreen> */}
    </>
    // <AdminLayout />
  );
};

export default App;
