import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import AdminLayout from "./layout/Default.jsx";
import LockScreen from "./pages/lockscreen/LockScreen.jsx";
import { store } from "./redux/store.js";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import SignIn from "./pages/auth/SignIn.jsx";
import SignUp from "./pages/auth/SignUp.jsx";

const App = () => {
  return (
    <>
      <LockScreen>
        <Provider store={store}>
          <Routes>
            <Route path="admin/*" element={<AdminLayout />} />
            <Route path="/" element={<Navigate to="/admin" replace />} />
            <Route path="/auth/sign-in" element={<SignIn />} />
            <Route path="/auth/sign-up" element={<SignUp />} />
          </Routes>
          <Toaster position="top-center" reverseOrder={false} />
        </Provider>
      </LockScreen>
    </>
    // <AdminLayout />
  );
};

export default App;
